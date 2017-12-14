export const getMultiSelectAddTags = state => {
  return state.getIn(['multiSelect', 'tasks', 'addTags']).map(tagId => state.getIn(['entities', 'tags', tagId]))
}

export const getMultiSelectAddTagsIds = state => {
  return state.getIn(['multiSelect', 'tasks', 'addTags'])
}

export const getMultiSelectRemoveTags = state => {
  return state.getIn(['multiSelect', 'tasks', 'removeTags']).map(tagId => state.getIn(['entities', 'tags', tagId]))
}

export const getMultiSelectRemoveTagsIds = state => {
  return state.getIn(['multiSelect', 'tasks', 'removeTags'])
}

export const getMultiSelectActiveTags = state => {
  return state.getIn(['multiSelect', 'tasks', 'activeTags'])
}

export const getMultiSelectInactiveTags = state => {
  return state.getIn(['multiSelect', 'tasks', 'inactiveTags'])
}

export const getMultiSelectOtherTags = state => {
  return state.getIn(['multiSelect', 'tasks', 'otherTags'])
}
