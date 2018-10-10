import { createSelector } from 'reselect'

// ------ Selectors -------------------------------------------------------------

// Export selectors
export const getEntitiesTasks = state => state.getIn(['entities', 'tasks'])
export const getEntitiesInbox = state => state.getIn(['entities', 'inbox'])
export const getEntitiesTags = state => state.getIn(['entities', 'tags'])
export const getEntitiesTreeItems = state => state.getIn(['entities', 'treeItems'])
export const getEntitiesAttachments = state => state.getIn(['entities', 'attachments'])
export const getEntitiesComments = state => state.getIn(['entities', 'comments'])
export const getEntitiesContacts = state => state.getIn(['entities', 'contacts'])
export const getEntitiesFollowers = state => state.getIn(['entities', 'followers'])

// ------ Reselect selectors ----------------------------------------------------

export const getActiveEntitiesTasks = createSelector(
  getEntitiesTasks,
  (entitiesTasks) => {

    return entitiesTasks
      .filter(task => task && task.isTrashed === false)
      .filter(task => task && task.isArchived === false)
  }
)
