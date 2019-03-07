import { createSelector } from 'reselect'

// ------ Selectors -------------------------------------------------------------

// Export selectors
export const getEntitiesTasks = state => state.getIn(['entities', 'tasks'])
export const getEntitiesTags = state => state.getIn(['entities', 'tags'])
export const getEntitiesTreeItems = state =>
  state.getIn(['entities', 'treeItems'])
export const getEntitiesAttachments = state =>
  state.getIn(['entities', 'attachments'])
export const getEntitiesActivities = state =>
  state.getIn(['entities', 'activities'])
export const getEntitiesNotifications = state =>
  state.getIn(['entities', 'notifications'])
export const getEntitiesComments = state =>
  state.getIn(['entities', 'comments'])
export const getEntitiesContacts = state =>
  state.getIn(['entities', 'contacts'])
export const getEntitiesFollowers = state =>
  state.getIn(['entities', 'followers'])

// ------ Reselect selectors ----------------------------------------------------

export const getActiveEntitiesTasks = createSelector(
  getEntitiesTasks,
  entitiesTasks => {
    return entitiesTasks
      .filter(task => task && task.isTrashed === false)
      .filter(task => task && task.isArchived === false)
  }
)

export const getTask = createSelector(
  getEntitiesTasks,
  entitiesTasks => {
    return entitiesTasks
      .filter(task => task && task.isTrashed === false)
      .filter(task => task && task.isArchived === false)
  }
)
