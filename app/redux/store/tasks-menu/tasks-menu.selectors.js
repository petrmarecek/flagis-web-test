import { createSelector } from 'reselect'
import { getEntitiesContacts } from '../entities/entities.selectors'
import { List } from 'immutable'

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getTasksMenuFiltersActiveSenderIds = state =>
  state.getIn(['tasksMenu', 'filters', 'activeSender'])
const getTasksMenuFiltersActiveAssigneeIds = state =>
  state.getIn(['tasksMenu', 'filters', 'activeAssignee'])

// Export selectors
export const getTasksMenu = state => state.getIn(['tasksMenu'])
export const getTasksMenuSort = state => state.getIn(['tasksMenu', 'sort'])
export const getTasksMenuFiltersItem = (state, type) =>
  state.getIn(['tasksMenu', 'filters', type])

// ------ Reselect selectors ----------------------------------------------------

export const getTasksMenuFiltersActiveSender = createSelector(
  getEntitiesContacts,
  getTasksMenuFiltersActiveSenderIds,
  (entitiesContacts, activeSender) => {
    if (activeSender === null) {
      return null
    }

    const listActiveSenders = List().push(activeSender)
    return listActiveSenders.map(senderId => entitiesContacts.get(senderId))
  }
)

export const getTasksMenuFiltersActiveAssignee = createSelector(
  getEntitiesContacts,
  getTasksMenuFiltersActiveAssigneeIds,
  (entitiesContacts, activeAssignee) => {
    if (activeAssignee === null) {
      return null
    }

    const listActiveAssignee = List().push(activeAssignee)
    return listActiveAssignee.map(assigneeId =>
      entitiesContacts.get(assigneeId)
    )
  }
)
