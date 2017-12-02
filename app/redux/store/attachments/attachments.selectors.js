function loadAttachments(ids, state) {
  const attachments = ids.map(attachmentId => state.entities.attachments.get(attachmentId))
  return attachments
}

export const getAttachments = state => ({
  isFetching: state.attachments.isFetching,
  items: loadAttachments(state.attachments.items, state)
})
