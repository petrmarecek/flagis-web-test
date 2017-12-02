function loadComments(ids, state) {
  const comments = ids.map(commentId => 
    state.entities.comments.get(commentId))

  return comments
}

export const getComments = state => ({
  isFetching: state.comments.isFetching,
  items: loadComments(state.comments.items, state)
})
