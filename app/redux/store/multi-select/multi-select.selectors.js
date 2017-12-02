export const getAddTags = state => {
  return state.multiSelect.tasks.addTags.map(tagId => state.entities.getIn(['tags', tagId]))
}

export const getRemoveTags = state => {
  return state.multiSelect.tasks.removeTags.map(tagId => state.entities.getIn(['tags', tagId]))
}