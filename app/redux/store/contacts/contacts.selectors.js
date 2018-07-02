import { List } from 'immutable'
import { getContactDetail } from '../app-state/app-state.selectors'
import { getEntitiesContacts } from '../entities/entities.selectors'
import { createSelector } from 'reselect'
import search from 'redux/services/search'

// ------ Helper functions ----------------------------------------------------

/**
 * Compares email two contact and sorts it
 * @param {Object} contactA Contact record
 * @param {Object} contactB Contact record
 * @return {Number}
 */

export const compareContactByEmail = (contactA, contactB) => {

  const emailA = contactA.email.toLowerCase()
  const emailB = contactB.email.toLowerCase()

  if (emailA > emailB) {
    return 1
  } else if (emailA < emailB) {
    return -1
  } else {
    return 0
  }
}

/**
 * Loads contacts entities
 * @param {Object} data Object of contactSearch and entitiesContact
 * @returns {Array} array of contact
 */

function loadContact(data) {
  const { contactsSearch, entitiesContacts } = data
  let entities = entitiesContacts.toArray()

  // apply search filter
  if (contactsSearch) {
    entities = search.contacts
      .get(contactsSearch)
      .map(item => item.ref)
      .map(contactId => entitiesContacts.getIn([contactId]))
  }

  return entities.sort(compareContactByEmail)
}

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getContactsIsFetching = state => state.getIn(['contacts', 'isFetching'])
const getCurrentContactId = state => state.getIn(['contacts', 'current'])

// Export selectors
export const getContactsSearch = state => state.getIn(['contacts', 'search'])

// ------ Reselect selectors ----------------------------------------------------

export const getContacts = createSelector(
  getContactsIsFetching,
  getContactsSearch,
  getEntitiesContacts,
  (contactsIsFetching, contactsSearch, entitiesContacts) => {
    const data = { contactsSearch, entitiesContacts }

    return ({
      isFetching: contactsIsFetching,
      items: loadContact(data),
    })
  }
)

export const getCurrentContact = createSelector(
  getCurrentContactId,
  getEntitiesContacts,
  (currentContactId, entitiesContacts) => {

    if (!currentContactId) {
      return null
    }

    return entitiesContacts.get(currentContactId)
  }
)

export const getNextContact = createSelector(
  getContactDetail,
  getCurrentContactId,
  getContactsSearch,
  getEntitiesContacts,
  (isContactDetail, contactId, contactsSearch, entitiesContacts) => {

    if (!isContactDetail) {
      return null
    }

    if (!contactId) {
      return null
    }

    const data = { contactsSearch, entitiesContacts }
    let contacts = loadContact(data)
    contacts = List(contacts.map(contact => contact.id))
    const sizeListOfContacts = contacts.size
    if (sizeListOfContacts === 1) {
      return null
    }

    let nextIndex = contacts.indexOf(contactId) + 1
    if (nextIndex === sizeListOfContacts) {
      nextIndex = 0
    }

    const nextContactId = contacts.get(nextIndex)
    return entitiesContacts.get(nextContactId)
  }
)

export const getPreviousContact = createSelector(
  getContactDetail,
  getCurrentContactId,
  getContactsSearch,
  getEntitiesContacts,
  (isContactDetail, contactId, contactsSearch, entitiesContacts) => {

    if (!isContactDetail) {
      return null
    }

    if (!contactId) {
      return null
    }

    const data = { contactsSearch, entitiesContacts }
    let contacts = loadContact(data)
    contacts = List(contacts.map(contact => contact.id))
    const sizeListOfContacts = contacts.size
    if (sizeListOfContacts === 1) {
      return null
    }

    let prevIndex = contacts.indexOf(contactId) - 1
    if (prevIndex < 0) {
      prevIndex = sizeListOfContacts - 1
    }

    const prevContactId = contacts.get(prevIndex)
    return entitiesContacts.get(prevContactId)
  }
)
