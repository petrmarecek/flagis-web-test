import schema from '../../data/schema'

export const COMMENTS = {
  FETCH: 'COMMENT/FETCH',
  FIREBASE: 'COMMENT/FIREBASE',
  FIREBASE_LISTENER: 'COMMENT/FIREBASE_LISTENER',
  CREATE: 'COMMENT/CREATE',
  ADD: 'COMMENT/ADD',
  DELETE: 'COMMENT/DELETE',
}

export const fetchComment = taskId => ({
  type: COMMENTS.FETCH,
  payload: taskId
})

export const commentsFirebaseListener = (taskId, initTime, cancelListener) => ({
  type: COMMENTS.FIREBASE_LISTENER,
  payload: {
    taskId,
    initTime,
    cancelListener
  }
})

export const createComment = comment => ({
  type: COMMENTS.CREATE,
  payload: comment
})

export const addComment = comment => ({
  type: COMMENTS.ADD,
  payload: comment,
  meta: { schema: schema.comment }
})

export const deleteComment = (taskId, commentId) => ({
  type: COMMENTS.DELETE,
  payload: {
    taskId,
    commentId,
  }
})
