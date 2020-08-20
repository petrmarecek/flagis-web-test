import schema from '../../data/schema'

export const ATTACHMENTS = {
  FETCH: 'ATTACHMENTS/FETCH',
  FIREBASE: 'ATTACHMENTS/FIREBASE',
  CREATE: 'ATTACHMENTS/CREATE',
  ADD: 'ATTACHMENTS/ADD',
  DELETE: 'ATTACHMENTS/DELETE',
}

export const fetchAttachment = taskId => ({
  type: ATTACHMENTS.FETCH,
  payload: taskId,
})

export const createAttachment = attachment => ({
  type: ATTACHMENTS.CREATE,
  payload: attachment,
})

export const addAttachment = attachment => ({
  type: ATTACHMENTS.ADD,
  payload: attachment,
  meta: { schema: schema.attachment },
})

export const deleteAttachment = (taskId, attachmentId) => ({
  type: ATTACHMENTS.DELETE,
  payload: {
    taskId,
    attachmentId,
  },
})
