import { createSelector } from 'reselect'
import { getEntitiesInbox } from '../entities/entities.selectors'

// Export selectors
export const getInboxIsFetching = state => state.getIn(['inbox', 'isFetching'])

// ------ Reselect selectors ----------------------------------------------------
export const getInboxCount = createSelector(
  getEntitiesInbox,
  (entitiesInbox) => {

    return entitiesInbox.size
  }
)



