import { call, put } from 'redux-saga/effects'

import * as contactsActions from 'redux/store/contacts/contacts.actions'
import { fetch } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'

const CONTACTS = contactsActions.CONTACTS

export function* fetchContacts(action) {
  yield* fetch(CONTACTS.FETCH, {
    method: api.contact.get,
    args: [action.payload],
    schema: schema.contactList
  })
}

export function* createContact(action) {
  try {
    const email = action.payload.email
    const contact = yield call(api.contact.create, email)

    yield put(contactsActions.addContact(contact))

  } catch(err) {
    console.error('Cannot create contact.', err)
  }
}
