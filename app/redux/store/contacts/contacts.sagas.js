import { call, put } from 'redux-saga/effects'

import * as contactsActions from 'redux/store/contacts/contacts.actions'
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
