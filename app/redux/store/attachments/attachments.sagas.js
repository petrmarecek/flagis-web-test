import { call, put } from 'redux-saga/effects'
import { fetch } from 'redux/store/common.sagas'
import * as actions from 'redux/store/attachments/attachments.action'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'

const ATTACHMENTS = actions.ATTACHMENTS

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
