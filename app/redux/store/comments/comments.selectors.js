import { List } from 'immutable'
import moment from 'moment'
import { getSelectionTasks } from '../tasks/tasks.selectors'
import {
  getEntitiesComments,
  getEntitiesContacts,
  getEntitiesActivities,
} from '../entities/entities.selectors'
import { createSelector } from 'reselect'

// ------ Helper functions ----------------------------------------------------

/**
 * Loads comments entities
 * @param {Object} data Object of selectionTasks and entitiesComments
 * @returns {List} list of comments
 */

function loadComments(data) {
  const {
    selectionTasks,
    entitiesComments,
    entitiesContacts,
    entitiesActivities,
  } = data

  let result = List()
  const taskId = selectionTasks.last()
  let entitiesCommentsItems = entitiesComments.filter(
    comment => comment.taskId === taskId && !comment.isDeleted
  )

  const entitiesActivitiesItems = entitiesActivities.filter(
    comment => comment.taskId === taskId
  )

  entitiesCommentsItems = entitiesCommentsItems.concat(entitiesActivitiesItems)
  // Get values from map without keys
  entitiesCommentsItems.forEach(comment => {
    // prepare author of comment for existing contact
    if (entitiesContacts.has(comment.createdById)) {
      const { createdById } = comment
      const { nickname } = entitiesContacts.get(createdById)

      comment = comment.set('author', nickname)
    }

    result = result.push(comment)
  })

  // Sort by createdAt
  result = result.sort((a, b) => {
    if (moment(a.createdAt) < moment(b.createdAt)) return 1
    if (moment(a.createdAt) > moment(b.createdAt)) return -1

    return 0
  })

  return result
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
  getEntitiesActivities,
  (
    commentsIsFetching,
    selectionTasks,
    entitiesComments,
    entitiesContacts,
    entitiesActivities
  ) => {
    const data = {
      selectionTasks,
      entitiesComments,
      entitiesContacts,
      entitiesActivities,
    }

    return {
      isFetching: commentsIsFetching,
      items: loadComments(data),
    }
  }
)
