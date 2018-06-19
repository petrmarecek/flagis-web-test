import { getEntitiesContacts } from '../entities/entities.selectors'
import { createSelector } from 'reselect'

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getContactsIsFetching = state => state.getIn(['contacts', 'isFetching'])

// ------ Reselect selectors ----------------------------------------------------

export const getContacts = createSelector(
  getContactsIsFetching,
  getEntitiesContacts,
  (contactsIsFetching, entitiesContacts) => {

    return ({
      isFetching: contactsIsFetching,
      items: entitiesContacts.toArray(),
    })
  }
)
