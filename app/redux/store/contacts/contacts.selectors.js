import { List } from 'immutable'
import { getContactDetail } from '../app-state/app-state.selectors'
import { getEntitiesContacts } from '../entities/entities.selectors'
import { createSelector } from 'reselect'
import search from 'redux/services/search'
import { compareContactByEmail } from '../../utils/component-helper'

// ------ Helper functions ----------------------------------------------------

/**
 * Loads contacts entities
 * @param {Object} data Object of contactSearch and entitiesContact
 * @returns {Array} array of contact
 */

function loadContact(data) {
  const { contactsSearch, entitiesContacts } = data
  let contacts = entitiesContacts.toArray()

  // apply search filter
  if (contactsSearch) {
    contacts = search.contacts
      .get(contactsSearch)
      .map(item => item.ref)
      .map(contactId => entitiesContacts.getIn([contactId]))
  }

  return contacts
    .filter(contact => contact.isContact)
    .sort(compareContactByEmail)
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
  getEntitiesContacts,
  (contactsIsFetching, entitiesContacts) => {

    return ({
      isFetching: contactsIsFetching,
      items: entitiesContacts
        .filter(contact => contact.isContact)
        .sort(compareContactByEmail).toArray(),
    })
  }
)

export const getVisibleContacts = createSelector(
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

export const getContactsEmail = createSelector(
  getEntitiesContacts,
  (entitiesContacts) => {

    return entitiesContacts
      .filter(contact => contact.isContact)
      .map(contact => contact.email.toLowerCase()).toList()
  }
)
