import { List } from 'immutable'
import moment from "moment/moment";

function loadAttachments(state) {
  const taskId = state.getIn(['tasks', 'selection']).last()
  const entitiesAttachments = state.getIn(['entities', 'attachments']).filter(attachment => attachment.taskId === taskId)
  let attachments = List()

  // Get values from map without keys
  entitiesAttachments.forEach(attachment => {
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

export const getAttachments = state => ({
  isFetching: state.getIn(['attachments', 'isFetching']),
  items: loadAttachments(state)
})
