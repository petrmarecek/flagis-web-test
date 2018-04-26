import { all, call, cancelled, cancel, fork, put, take } from 'redux-saga/effects'
import { normalize } from 'normalizr'

import * as actions from 'redux/store/attachments/attachments.action'
import { fetch, createLoadActions } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import firebase from 'redux/utils/firebase'

const ATTACHMENTS = actions.ATTACHMENTS

function* saveChangeFromFirestore(change) {
  const { FULFILLED } = createLoadActions(ATTACHMENTS.FIREBASE)
  const attachment = change.doc.data()

  // Prepare data
  const normalizeData = normalize(attachment, schema.attachment)

  // Save changes to store entities
  yield put({ type: FULFILLED, payload: normalizeData })
}

function* syncAttachmentsChannel(channel) {
  const { REJECTED } = createLoadActions(ATTACHMENTS.FIREBASE)

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

export function* fetchAttachment(action) {
  yield* fetch(ATTACHMENTS.FETCH, {
    method: api.attachments.get,
    args: [action.payload],
    schema: schema.attachmentList
  })
}

function* initAttachmentsData(taskId, initTime) {
  const channel = firebase.getAttachmentsChannel(taskId, initTime)
  return yield fork(syncAttachmentsChannel, channel)
}

export function* attachmentsFirebaseListener(action) {
  const { taskId, initTime, cancelListener } = action.payload
  const attachmentsSyncing = yield fork(initAttachmentsData, taskId, initTime)

  if (cancelListener) {
    yield cancel(attachmentsSyncing)
  }
}

export function* createAttachment(action) {
  try {
    // TODO: implement optimistic insert
    const taskId = action.payload.taskId

    const data = {
      fileName: action.payload.fileName,
      client: action.payload.client,
      mimeType: action.payload.mimeType,
      size: action.payload.size,
      url: action.payload.url,
      isWritable: false,
    }
    const attachment = yield call(api.attachments.create, taskId, data)

    yield put(actions.addAttachment(attachment))

  } catch(err) {
    console.error('Cannot create comment.', err)
    // TODO: handle error
  }
}

export function* deleteAttachment(action) {
  try {
    const taskId = action.payload.taskId
    const attachmentId = action.payload.attachmentId
    yield call(api.attachments.delete, taskId, attachmentId)

  } catch(err) {
    console.error('Cannot delete comment.', err)
    // TODO: handle error
  }
}
