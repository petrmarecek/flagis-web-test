function loadComments(ids, state) {
  const comments = ids.map(commentId =>
    state.getIn(['entities', 'comments']).get(commentId))

  return comments
}

export const getComments = state => ({
  isFetching: state.getIn(['comments', 'isFetching']),
  items: loadComments(state.getIn(['comments', 'items']), state)
})
