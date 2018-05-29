import { List } from 'immutable'
import moment from 'moment/moment'
import { getSelectionTasks } from '../tasks/tasks.selectors'
import { getEntitiesAttachments } from '../entities/entities.selectors'
import { createSelector } from 'reselect'

// ------ Helper functions ----------------------------------------------------

/**
 * Loads attachments entities
 * @param {Object} data Object of selectionTasks and entitiesAttachments
 * @returns {List} list of attachments
 */

function loadAttachments(data) {
  const { selectionTasks, entitiesAttachments } = data
  let attachments = List()

  const taskId = selectionTasks.last()
  const entitiesAttachmentsItems = entitiesAttachments
    .filter(attachment => attachment.taskId === taskId)
    .filter(attachment => !attachment.isDeleted)

  // Get values from map without keys
  entitiesAttachmentsItems.forEach(attachment => {
    attachments = attachments.push(attachment)
  })

  // Sort by createdAt
  attachments = attachments.sort((a, b) => {
    if (moment(a.createdAt) < moment(b.createdAt)) return -1;
    if (moment(a.createdAt) > moment(b.createdAt)) return 1;

    return 0;
  })

  return attachments
}

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getAttachmentsIsFetching = state => state.getIn(['attachments', 'isFetching'])

// ------ Reselect selectors ----------------------------------------------------

export const getAttachments = createSelector(
  getAttachmentsIsFetching,
  getSelectionTasks,
  getEntitiesAttachments,
  (attachmentsIsFetching, selectionTasks, entitiesAttachments) => {
    const data = { selectionTasks, entitiesAttachments }

    return ({
      isFetching: attachmentsIsFetching,
      items: loadAttachments(data)
    })
  }
)
