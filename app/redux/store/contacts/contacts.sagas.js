import { normalize } from 'normalizr'

// redux
import { push } from 'react-router-redux'
import {
  call,
  put,
  select,
  cancelled,
  fork,
  take,
  all,
} from 'redux-saga/effects'
import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as contactsActions from 'redux/store/contacts/contacts.actions'
import * as contactsSelectors from 'redux/store/contacts/contacts.selectors'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import * as taskSelectors from 'redux/store/tasks/tasks.selectors'
import * as entitiesSelectors from 'redux/store/entities/entities.selectors'
import * as errorActions from 'redux/store/errors/errors.actions'
import {
  sentryBreadcrumbCategory,
  sentryTagType,
} from 'redux/store/errors/errors.common'
import {
  fetch,
  mainUndo,
  createLoadActions,
  callApi,
} from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import search from 'redux/services/search'
import schema from 'redux/data/schema'
import firebase from 'redux/utils/firebase'
import { getContactTasksRelations } from 'redux/utils/redux-helper'

const CONTACTS = contactsActions.CONTACTS

function* saveChangeFromFirestore(change, isGlobalProfile) {
  const { FULFILLED } = createLoadActions(CONTACTS.FIREBASE)
  const { type, doc } = change
  const contact = doc.data()

  // Don't save changes if contact was deleted
  if (type === 'removed') {
    return
  }

  // Prepare data
  const normalizeData = normalize(contact, schema.contact)
  const entitiesContacts = yield select(state =>
    entitiesSelectors.getEntitiesContacts(state)
  )

  if (isGlobalProfile && entitiesContacts.has(contact.id)) {
    const entitiesContact = entitiesContacts.get(contact.id)

    if (entitiesContact.isContact) {
      return
    }
  }

  // Save changes to store entities
  yield put({ type: FULFILLED, payload: normalizeData })
}

function* syncContactsChannel(channel, isGlobalProfile) {
  const { REJECTED } = createLoadActions(CONTACTS.FIREBASE)

  try {
    while (true) {
      // eslint-disable-line
      const snapshot = yield take(channel)
      yield all(
        snapshot
          .docChanges()
          .map(change => call(saveChangeFromFirestore, change, isGlobalProfile))
      )
    }
  } catch (err) {
    yield put({ type: REJECTED, err })

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.FIRESTORE,
        tagValue: 'SYNC_CONTACTS',
        breadcrumbCategory: sentryBreadcrumbCategory.FIRESTORE,
        breadcrumbMessage: 'SYNC_CONTACTS',
      })
    )
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* initContactsData(initTime) {
  const userId = yield select(state => authSelectors.getUserId(state))
  const channel = firebase.getContactsChannel(userId, initTime)
  return yield fork(syncContactsChannel, channel, false)
}

export function* initGlobalContactsData(initTime) {
  const userId = yield select(state => authSelectors.getUserId(state))
  const channel = firebase.getGlobalProfilesChannel(userId, initTime)
  return yield fork(syncContactsChannel, channel, true)
}

export function* fetchContacts() {
  const result = yield* fetch(CONTACTS.FETCH, {
    method: api.contacts.get,
    args: [],
    schema: schema.contacts,
  })

  // Initialize search service
  search.contacts.resetIndex()
  search.contacts.addItems(result)
}

export function* createContact(action) {
  try {
    const email = action.payload.email

    // check if contact exists on client then delete it
    // it is possible that contact was deleted but relations with tasks were existed
    // then contact was marked as isContact: false and contact remained in redux store
    const isExistingContactOnClient = yield select(state =>
      contactsSelectors.getContactByEmail(state, email)
    )

    if (isExistingContactOnClient) {
      yield put(contactsActions.deleteContactInStore(isExistingContactOnClient))
    }

    const data = { email }
    const contact = yield callApi(api.contacts.create, data)

    // add the contact to the search index
    search.contacts.addItem(contact)

    yield put(contactsActions.addContact(contact))
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* selectContacts(action) {
  const { contactId } = action.payload

  yield put(push(`/user/contacts/${contactId}`))
}

export function* deselectContacts() {
  const isTagDetail = yield select(state =>
    appStateSelectors.getContactDetail(state)
  )

  if (isTagDetail) {
    yield put(appStateActions.deselectDetail('contact'))
  }
}

export function* updateContacts(action) {
  const { contact, type, data, onlyInStore } = action.payload
  const originalData = contact[type]

  if (onlyInStore) {
    return
  }

  try {
    // call server
    const updateData = { [type]: data }
    yield callApi(api.contacts.update, contact.id, updateData)
  } catch (err) {
    // revert to original values
    yield put(contactsActions.updateContact(contact, originalData, type))

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* sendInvitationContact(action) {
  try {
    // call server
    const contactId = action.payload.contactId
    yield callApi(api.contacts.invitation, contactId)
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* prepareDeleteContact(action) {
  const { contact } = action.payload
  const entitiesAllTasks = yield select(state =>
    taskSelectors.getAllTasks(state)
  )
  const relations = getContactTasksRelations(contact.id, entitiesAllTasks)

  if (relations.isTask || relations.isInbox || relations.isArchived) {
    yield put(contactsActions.updateContact(contact, false, 'isContact', true))
    yield put(contactsActions.deselectContacts())
    yield put(contactsActions.deleteContact(contact))
    return
  }

  yield put(contactsActions.deselectContacts())
  yield put(contactsActions.deleteContactInStore(contact))
  yield put(contactsActions.deleteContact(contact))
}

export function* deleteContact(action) {
  const originalContact = action.payload.originalData

  try {
    yield* fetch(CONTACTS.DELETE, {
      method: api.contacts.delete,
      args: [originalContact.id],
      schema: null,
    })

    yield* mainUndo(action, 'contactDelete')

    // delete contact from the search index
    search.contacts.removeItem({ id: action.payload })
  } catch (err) {
    // add the contact to the search index
    search.contacts.addItem(originalContact)

    yield put(contactsActions.addContact(originalContact))

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* undoDeleteContact(action) {
  const createData = action.payload.email
  yield put(contactsActions.createContact(createData))
}
