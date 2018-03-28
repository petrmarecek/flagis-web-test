import { List } from 'immutable'
import moment from 'moment'

function loadComments(state) {
  const taskId = state.getIn(['tasks', 'selection']).last()
  const entitiesComments = state.getIn(['entities', 'comments']).filter(comment => comment.taskId === taskId)
  let comments = List()

  // Get values from map without keys
  entitiesComments.forEach(comment => {
    comments = comments.push(comment)
  })

  // Sort by createdAt
  comments = comments.sort((a, b) => {
    if (moment(a.createdAt) < moment(b.createdAt)) return -1;
    if (moment(a.createdAt) > moment(b.createdAt)) return 1;

    return 0;
  })

  return comments
}

export const getComments = (state) => ({
  isFetching: state.getIn(['comments', 'isFetching']),
  items: loadComments(state)
})
