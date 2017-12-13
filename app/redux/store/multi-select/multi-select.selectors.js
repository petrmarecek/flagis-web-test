export const getAddTags = state => {
  return state.getIn(['multiSelect', 'tasks', 'addTags']).map(tagId => state.getIn(['entities', 'tags', tagId]))
}

export const getRemoveTags = state => {
  return state.getIn(['multiSelect', 'tasks', 'removeTags']).map(tagId => state.getIn(['entities', 'tags', tagId]))
}
