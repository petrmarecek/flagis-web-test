import { List } from 'immutable'
import moment from 'moment'
import { getSelectionTasks } from '../tasks/tasks.selectors'
import { getEntitiesComments } from '../entities/entities.selectors'
import { createSelector } from 'reselect'

// ------ Helper functions ----------------------------------------------------

/**
 * Loads comments entities
 * @param {Object} data Object of selectionTasks and entitiesComments
 * @returns {List} list of comments
 */

function loadComments(data) {
  const { selectionTasks, entitiesComments } = data
  let comments = List()

  const taskId = selectionTasks.last()
  const entitiesCommentsItems = entitiesComments
    .filter(comment => comment.taskId === taskId)
    .filter(comment => !comment.isDeleted)

  // Get values from map without keys
  entitiesCommentsItems.forEach(comment => {
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

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getCommentsIsFetching = state => state.getIn(['comments', 'isFetching'])

// ------ Reselect selectors ----------------------------------------------------

export const getComments = createSelector(
  getCommentsIsFetching,
  getSelectionTasks,
  getEntitiesComments,
  (commentsIsFetching, selectionTasks, entitiesComments) => {
    const data = { selectionTasks, entitiesComments }

    return ({
      isFetching: commentsIsFetching,
      items: loadComments(data)
    })
  }
)
