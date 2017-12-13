function loadAttachments(ids, state) {
  const attachments = ids.map(attachmentId => state.getIn(['entities', 'attachments']).get(attachmentId))
  return attachments
}

export const getAttachments = state => ({
  isFetching: state.getIn(['attachments', 'isFetching']),
  items: loadAttachments(state.getIn(['attachments', 'items']), state)
})
