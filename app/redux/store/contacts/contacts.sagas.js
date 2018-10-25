import { call, put, select } from 'redux-saga/effects'

import * as contactsActions from 'redux/store/contacts/contacts.actions'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import { fetch, mainUndo } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import search from 'redux/services/search'
import schema from 'redux/data/schema'

const CONTACTS = contactsActions.CONTACTS

export function* fetchContacts() {
  const result = yield* fetch(CONTACTS.FETCH, {
    method: api.contacts.get,
    args: [],
    schema: schema.contacts
  })

  // Initialize search service
  search.contacts.resetIndex()
  search.contacts.addItems(result)
}

export function* createContact(action) {
  try {
    const email = action.payload.email
    const data = { email }
    const contact = yield call(api.contacts.create, data)

    // add the contact to the search index
    search.contacts.addItem(contact)

    yield put(contactsActions.addContact(contact))

  } catch(err) {
    console.error(err)
  }
}

export function* deselectContacts() {
  const isTagDetail = yield select(state => appStateSelectors.getContactDetail(state))

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
    yield call(api.contacts.update, contact.id, updateData)

  } catch(err) {
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
    yield call(api.contacts.invitation, contactId)

  } catch(err) {
    // log error
    console.error('Error occured during send invitation to contact', err)
  }
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

  } catch(err) {
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
