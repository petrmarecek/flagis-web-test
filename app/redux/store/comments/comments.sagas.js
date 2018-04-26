import { all, call, cancelled, cancel, fork, put, take } from 'redux-saga/effects'
import { normalize } from 'normalizr'

import * as actions from 'redux/store/comments/comments.action'
import { fetch, createLoadActions } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import firebase from 'redux/utils/firebase'

const COMMENTS = actions.COMMENTS

function* saveChangeFromFirestore(change) {
  const { FULFILLED } = createLoadActions(COMMENTS.FIREBASE)
  const comment = change.doc.data()

  // Prepare data
  const normalizeData = normalize(comment, schema.comment)

  // Save changes to store entities
  yield put({ type: FULFILLED, payload: normalizeData })
}

function* syncCommentsChannel(channel) {
  const { REJECTED } = createLoadActions(COMMENTS.FIREBASE)

  try {
    while (true) { // eslint-disable-line
      const snapshot = yield take(channel)
      yield all(snapshot.docChanges.map(change => call(saveChangeFromFirestore, change)))
    }
  } catch(err) {
    yield put({ type: REJECTED, err })

  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* fetchComment(action) {
  yield* fetch(COMMENTS.FETCH, {
    method: api.comments.get,
    args: [action.payload],
    schema: schema.commentList
  })
}

export function* initCommentsData(taskId, initTime) {
  const channel = firebase.getCommentsChannel(taskId, initTime)
  return yield fork(syncCommentsChannel, channel)
}

export function* commentsFirebaseListener(action) {
  const { taskId, initTime, cancelListener } = action.payload
  const commentsSyncing = yield fork(initCommentsData, taskId, initTime)

  if (cancelListener) {
    yield cancel(commentsSyncing)
  }
}

export function* createComment(action) {
  try {
    // TODO: implement optimistic insert
    const taskId = action.payload.taskId
    const content = action.payload.content
    const comment = yield call(api.comments.create, taskId, content)

    yield put(actions.addComment(comment))

  } catch(err) {
    console.error('Cannot create comment.', err)
    // TODO: handle error
  }
}

export function* deleteComment(action) {
  try {
    const taskId = action.payload.taskId
    const commentId = action.payload.commentId
    yield call(api.comments.delete, taskId, commentId)

  } catch(err) {
    console.error('Cannot delete comment.', err)
    // TODO: handle error
  }
}
