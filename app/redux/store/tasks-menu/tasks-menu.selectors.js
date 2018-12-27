import { createSelector } from 'reselect'
import {  getEntitiesContacts } from '../entities/entities.selectors'
import { List } from 'immutable'

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getTasksMenuFiltersActiveAssigneeIds = state => state.getIn(['tasksMenu', 'filters', 'activeAssignee'])

// Export selectors
export const getTasksMenu = state => state.getIn(['tasksMenu'])
export const getTasksMenuSort = state => state.getIn(['tasksMenu', 'sort'])
export const getTasksMenuFiltersItem = (state, type) => state.getIn(['tasksMenu', 'filters', type])

// ------ Reselect selectors ----------------------------------------------------

export const getTasksMenuFiltersActiveAssignee = createSelector(
  getEntitiesContacts,
  getTasksMenuFiltersActiveAssigneeIds,
  (entitiesContacts, activeAssignee) => {
    if (activeAssignee === null || activeAssignee === 'sendAll') {
      return null
    }

    const listActiveAssignee = List().push(activeAssignee)
    return listActiveAssignee.map(assigneeId => entitiesContacts.get(assigneeId))
}
)
