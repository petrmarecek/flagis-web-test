import { all, select, call, cancelled, cancel, fork, put, take } from 'redux-saga/effects'
import { normalize } from 'normalizr'

import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as commentActions from 'redux/store/comments/comments.actions'
import * as taskSelectors from 'redux/store/tasks/tasks.selectors'
import { fetch, createLoadActions } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import firebase from 'redux/utils/firebase'
import dateUtil from 'redux/utils/date'

const APP_STATE = appStateActions.APP_STATE
const COMMENTS = commentActions.COMMENTS

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
      yield all(snapshot.docChanges().map(change => call(saveChangeFromFirestore, change)))
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
    schema: schema.comments
  })
}

export function* initCommentsData() {
  while (true) { // eslint-disable-line
    let detail = (yield take(APP_STATE.SET_DETAIL)).payload.detail

    if (detail === 'task') {
      const initTime = dateUtil.getDateToISOString()
      const taskId = yield select(state => taskSelectors.getSelectionTasks(state).first())

      // Start syncing task comments with firestore
      const channel = firebase.getCommentsChannel(taskId, initTime)
      const commentsSyncing = yield fork(syncCommentsChannel, channel)

      // Wait for cancel
      detail = yield take(APP_STATE.DESELECT_DETAIL)

      // Cancel syncing
      yield cancel(commentsSyncing)
    }
  }
}

export function* createComment(action) {
  try {
    // TODO: implement optimistic insert
    const taskId = action.payload.taskId
    const content = action.payload.content
    const comment = yield call(api.comments.create, taskId, content)

    yield put(commentActions.addComment(comment))

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
