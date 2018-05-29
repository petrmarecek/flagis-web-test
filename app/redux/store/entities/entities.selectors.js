
export const getEntitiesTasks = state => state.getIn(['entities', 'tasks'])

export const getEntitiesTags = state => state.getIn(['entities', 'tags'])

export const getEntitiesTreeItems = state => state.getIn(['entities', 'treeItems'])

export const getEntitiesAttachments = state => state.getIn(['entities', 'attachments'])

export const getEntitiesComments = state => state.getIn(['entities', 'comments'])

export const getActiveEntitiesTasks = state => {
  const tasks = state.getIn(['entities', 'tasks'])

  return tasks
    .filter(task => task && task.isTrashed === false)
    .filter(task => task && task.isArchived === false)
}
