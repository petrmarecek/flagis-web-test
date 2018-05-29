// ------ Selectors -------------------------------------------------------------

// Export selectors
export const getTasksMenu = state => state.getIn(['tasksMenu'])
export const getTasksMenuSort = state => state.getIn(['tasksMenu', 'sort'])
export const getTaskMenuFiltersItem = (state, type) => state.getIn(['tasksMenu', 'filters', type])
