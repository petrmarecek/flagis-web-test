import schema from '../../data/schema'

export const CONTACTS = {
  FETCH: 'CONTACTS/FETCH',
  FIREBASE: 'CONTACTS/FIREBASE',
  CREATE: 'CONTACTS/CREATE',
  ADD: 'CONTACTS/ADD',
  REPLACE: 'CONTACTS/REPLACE',
  SELECT: 'CONTACTS/SELECT',
  DESELECT: 'CONTACTS/DESELECT',
  UPDATE: 'CONTACTS/UPDATE',
  UPDATE_SEARCH: 'CONTACTS/UPDATE_SEARCH',
  SEND_INVITATION: 'CONTACTS/SEND_INVITATION',
  PREPARE_DELETE: 'CONTACTS/PREPARE_DELETE',
  DELETE_IN_STORE: 'CONTACTS/DELETE_IN_STORE',
  DELETE: 'CONTACTS/DELETE',
  UNDO_DELETE: 'UNDO_CONTACTS/DELETE',
}

export const fetchContacts = () => ({
  type: CONTACTS.FETCH,
})

export const createContact = email => ({
  type: CONTACTS.CREATE,
  payload: { email },
})

export const addContact = contact => ({
  type: CONTACTS.ADD,
  payload: contact,
  meta: { schema: schema.contact },
})

export const replaceContact = (originalContactId, contact, relatedTaskId) => ({
  type: CONTACTS.REPLACE,
  payload: {
    originalContactId,
    contact,
    relatedTaskId,
  },
})

export const selectContact = contactId => ({
  type: CONTACTS.SELECT,
  payload: { contactId },
})

export const deselectContacts = () => ({
  type: CONTACTS.DESELECT,
})

export const updateContact = (contact, data, type, onlyInStore = false) => ({
  type: CONTACTS.UPDATE,
  payload: { contact, data, type, onlyInStore },
})

export const updateContactSearch = search => ({
  type: CONTACTS.UPDATE_SEARCH,
  payload: { search },
})

export const sendInvitationContact = contactId => ({
  type: CONTACTS.SEND_INVITATION,
  payload: { contactId },
})

export const prepareDeleteContact = contact => ({
  type: CONTACTS.PREPARE_DELETE,
  payload: { contact },
})

export const deleteContactInStore = originalData => ({
  type: CONTACTS.DELETE_IN_STORE,
  payload: { originalData },
})

export const deleteContact = originalData => ({
  type: CONTACTS.DELETE,
  payload: { originalData },
})
