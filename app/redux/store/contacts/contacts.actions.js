import schema from '../../data/schema'

export const CONTACTS = {
  FETCH: 'CONTACTS/FETCH',
  CREATE: 'CONTACTS/CREATE',
  ADD: 'CONTACTS/ADD',
  UPDATE_SEARCH: 'CONTACTS/UPDATE_SEARCH',
}

export const fetchContacts = () => ({
  type: CONTACTS.FETCH
})

export const createContact = email => ({
  type: CONTACTS.CREATE,
  payload: { email },
})

export const addContact = contact => ({
  type: CONTACTS.ADD,
  payload: contact ,
  meta: { schema: schema.contact }
})


export const updateContactSearch = search => ({
  type: CONTACTS.UPDATE_SEARCH,
  payload: { search }
})
