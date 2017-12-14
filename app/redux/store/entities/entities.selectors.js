export const getEntitiesTasks = state => {
  return state.getIn(['entities', 'tasks'])
}

export const getEntitiesTreeItems = state => {
  return state.getIn(['entities', 'treeItems'])
}
