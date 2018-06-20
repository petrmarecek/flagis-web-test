import { call, put, select } from 'redux-saga/effects'

import * as contactsActions from 'redux/store/contacts/contacts.actions'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import { fetch } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'

const CONTACTS = contactsActions.CONTACTS

export function* fetchContacts() {
  yield* fetch(CONTACTS.FETCH, {
    method: api.contacts.get,
    args: [],
    schema: schema.contactList
  })
}

export function* createContact(action) {
  try {
    const email = action.payload.email
    const data = { email }
    const contact = yield call(api.contacts.create, data)

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
