export const getEntitiesTasks = state => {
  return state.getIn(['entities', 'tasks'])
}

export const getActiveEntitiesTasks = state => {
  const tasks = state.getIn(['entities', 'tasks'])

  return tasks
    .filter(task => task && task.isTrashed === false)
    .filter(task => task && task.isArchived === false)
}

export const getEntitiesTreeItems = state => {
  return state.getIn(['entities', 'treeItems'])
}
