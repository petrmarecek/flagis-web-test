import { List } from 'immutable'
import { getContactDetail } from '../app-state/app-state.selectors'
import { getEntitiesContacts } from '../entities/entities.selectors'
import { createSelector } from 'reselect'

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
 * Loads tags entities for given tags IDs
 * @param {Object} ids Array of tags
 * @param {Object} data Object of tagsSearch and entitiesTags
 * @returns {Array} array of tags
 */

function loadContact(data) {
  const { entitiesContacts } = data

  /*// apply search filter
  if (tagsSearch) {
    const foundIds = search.tags.get(tagsSearch).map(item => item.ref)
    ids = intersection(ids, foundIds)
  }*/

  return entitiesContacts.sort(compareContactByEmail).toArray()
}

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getContactsIsFetching = state => state.getIn(['contacts', 'isFetching'])
const getCurrentContactId = state => state.getIn(['contacts', 'current'])

// ------ Reselect selectors ----------------------------------------------------

export const getContacts = createSelector(
  getContactsIsFetching,
  getEntitiesContacts,
  (contactsIsFetching, entitiesContacts) => {
    const data = { entitiesContacts }

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
  getEntitiesContacts,
  (isContactDetail, contactId, entitiesContacts) => {

    if (!isContactDetail) {
      return null
    }

    if (!contactId) {
      return null
    }

    const data = { entitiesContacts }
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
  getEntitiesContacts,
  (isContactDetail, contactId, entitiesContacts) => {

    if (!isContactDetail) {
      return null
    }

    if (!contactId) {
      return null
    }

    const data = { entitiesContacts }
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
