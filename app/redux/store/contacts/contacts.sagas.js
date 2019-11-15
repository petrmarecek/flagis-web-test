import { normalize } from 'normalizr'

// toast notifications
import { toast } from 'react-toastify'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'

// redux
import { push } from 'react-router-redux'
import { call, put, select, fork, take, all } from 'redux-saga/effects'
import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as contactsActions from 'redux/store/contacts/contacts.actions'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import * as taskSelectors from 'redux/store/tasks/tasks.selectors'
import * as entitiesSelectors from 'redux/store/entities/entities.selectors'
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
  while (true) {
    // eslint-disable-line
    const snapshot = yield take(channel)
    yield all(
      snapshot
        .docChanges()
        .map(change => call(saveChangeFromFirestore, change, isGlobalProfile))
    )
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
    const data = { email }
    const contact = yield callApi(api.contacts.create, data)

    // add the contact to the search index
    search.contacts.addItem(contact)

    yield put(contactsActions.addContact(contact))
  } catch (err) {
    console.error(err)
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
  const contact = action.payload.contact
  const type = action.payload.type
  const data = action.payload.data
  const originalData = contact[type]

  try {
    // call server
    const updateData = { [type]: data }
    yield callApi(api.contacts.update, contact.id, updateData)
  } catch (err) {
    // log error
    console.error('Error occured during contact update', err)

    // revert to original values
    yield put(contactsActions.updateContact(contact, originalData, type))
  }
}

export function* sendInvitationContact(action) {
  try {
    // call server
    const contactId = action.payload.contactId
    yield callApi(api.contacts.invitation, contactId)
  } catch (err) {
    // log error
    console.error('Error occured during send invitation to contact', err)
  }
}

export function* prepareDeleteContact(action) {
  const { contact } = action.payload
  const isArchivedTasksAlreadyFetching = yield select(state =>
    taskSelectors.getArchivedTasksIsAlreadyFetching(state)
  )
  const archivedTasks = yield select(state =>
    taskSelectors.getArchivedTasksItems(state)
  )
  const entitiesAllTasks = yield select(state =>
    taskSelectors.getAllTasks(state)
  )
  const relations = getContactTasksRelations(contact.id, entitiesAllTasks)

  if (relations.isTask) {
    toast.error(
      errorMessages.relations.relationDeleteConflict('contact', 'tasks'),
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_ERROR_DURATION,
      }
    )
    return
  }

  if (relations.isInbox) {
    toast.error(
      errorMessages.relations.relationDeleteConflict('contact', 'inbox tasks'),
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_ERROR_DURATION,
      }
    )
    return
  }

  if (archivedTasks.size === 0 && !isArchivedTasksAlreadyFetching) {
    toast.error(errorMessages.relations.emptyListDeleteConflict('archive'), {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_ERROR_DURATION,
    })
    return
  }

  if (relations.isArchived) {
    toast.error(
      errorMessages.relations.relationDeleteConflict(
        'contact',
        'archive tasks'
      ),
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_ERROR_DURATION,
      }
    )
    return
  }

  yield put(contactsActions.deselectContacts())
  yield put(appStateActions.setLoader('global'))
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

    yield put(appStateActions.deselectLoader('global'))
    yield* mainUndo(action, 'contactDelete')

    // delete contact from the search index
    search.contacts.removeItem({ id: action.payload })
  } catch (err) {
    // log error
    console.error('Error occured during contact delete', err)

    // add the contact to the search index
    search.contacts.addItem(originalContact)

    yield put(contactsActions.addContact(originalContact))
  }
}

export function* undoDeleteContact(action) {
  const createData = action.payload.email
  yield put(contactsActions.createContact(createData))
}
