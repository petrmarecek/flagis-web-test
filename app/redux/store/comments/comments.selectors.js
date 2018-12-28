import { List } from 'immutable'
import moment from 'moment'
import { getSelectionTasks } from '../tasks/tasks.selectors'
import { getEntitiesComments, getEntitiesContacts } from '../entities/entities.selectors'
import { createSelector } from 'reselect'

// ------ Helper functions ----------------------------------------------------

/**
 * Loads comments entities
 * @param {Object} data Object of selectionTasks and entitiesComments
 * @returns {List} list of comments
 */

function loadComments(data) {
  const { selectionTasks, entitiesComments, entitiesContacts } = data
  let comments = List()

  const taskId = selectionTasks.last()
  const entitiesCommentsItems = entitiesComments
    .filter(comment => comment.taskId === taskId)
    .filter(comment => !comment.isDeleted)

  // Get values from map without keys
  entitiesCommentsItems.forEach(comment => {

    // prepare author of comment for existing contact
    if (entitiesContacts.has(comment.createdById)) {
      const { createdById, author } = comment
      const { isContact, nickname } = entitiesContacts.get(createdById)
      const newAuthor = isContact ? nickname : author

      comment = comment.set('author', newAuthor)
    }

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
  getEntitiesContacts,
  (commentsIsFetching, selectionTasks, entitiesComments, entitiesContacts) => {
    const data = { selectionTasks, entitiesComments, entitiesContacts }

    return ({
      isFetching: commentsIsFetching,
      items: loadComments(data)
    })
  }
)
