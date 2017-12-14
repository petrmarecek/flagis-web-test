export const getTasksMenu = state => {
  return state.getIn(['tasksMenu'])
}

export const getTasksMenuSort = state => {
  return state.getIn(['tasksMenu', 'sort'])
}
