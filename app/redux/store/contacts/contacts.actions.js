import schema from '../../data/schema'

export const CONTACTS = {
  FETCH: 'CONTACTS/FETCH',
  CREATE: 'CONTACTS/CREATE',
  ADD: 'CONTACTS/ADD',
  SELECT: 'CONTACTS/SELECT',
  DESELECT: 'CONTACTS/DESELECT',
  UPDATE: 'CONTACTS/UPDATE',
  UPDATE_SEARCH: 'CONTACTS/UPDATE_SEARCH',
  DELETE: 'CONTACTS/DELETE',
  UNDO_DELETE: 'UNDO_CONTACTS/DELETE',
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

export const selectContact = contactId => ({
  type: CONTACTS.SELECT,
  payload: { contactId }
})

export const deselectContacts = () => ({
  type: CONTACTS.DESELECT,
})

export const updateContact = (contact, data, type) => ({
  type: CONTACTS.UPDATE,
  payload: { contact, data, type }
})

export const updateContactSearch = search => ({
  type: CONTACTS.UPDATE_SEARCH,
  payload: { search }
})

export const deleteContact = originalData => ({
  type: CONTACTS.DELETE,
  payload: { originalData }
})
