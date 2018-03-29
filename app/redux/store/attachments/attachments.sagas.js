import {call, cancelled, fork, put, select, take} from 'redux-saga/effects'
import { normalize } from 'normalizr'

import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as actions from 'redux/store/attachments/attachments.action'
import { fetch, createLoadActions } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import firebase from 'redux/utils/firebase'

const ATTACHMENTS = actions.ATTACHMENTS

export function* initAttachmentsData(initTime) {
  const userId = yield select(state => authSelectors.getUserId(state))
  const channel = firebase.getAttachmentsChannel(userId, initTime)
  return yield fork(syncAttachmentsChannel, channel)
}

function* syncAttachmentsChannel(channel) {
  const { FULFILLED } = createLoadActions(ATTACHMENTS.FIREBASE)

  try {

    while (true) { // eslint-disable-line
      const data = yield take(channel)

      // Prepare data
      const attachments = data.docs.map(doc => doc.data())
      const normalizeData = normalize(attachments, schema.attachmentList)

      // Save changes to store entities
      yield put({ type: FULFILLED, payload: normalizeData })

    }

  } catch(err) {
    console.error(err)

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
