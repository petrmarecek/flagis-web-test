import { createSelector } from 'reselect'

// ------ Selectors -------------------------------------------------------------

// Export selectors
export const getEntitiesTasks = state => state.getIn(['entities', 'tasks'])
export const getEntitiesTags = state => state.getIn(['entities', 'tags'])
export const getEntitiesTreeItems = state => state.getIn(['entities', 'treeItems'])
export const getEntitiesAttachments = state => state.getIn(['entities', 'attachments'])
export const getEntitiesComments = state => state.getIn(['entities', 'comments'])

// ------ Reselect selectors ----------------------------------------------------

export const getActiveEntitiesTasks = createSelector(
  getEntitiesTasks,
  (entitiesTasks) => {

    return entitiesTasks
      .filter(task => task && task.isTrashed === false)
      .filter(task => task && task.isArchived === false)
  }
)
