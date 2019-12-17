import { normalize } from 'normalizr'

// redux
import {
  all,
  select,
  call,
  cancelled,
  cancel,
  fork,
  put,
  take,
} from 'redux-saga/effects'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as attachmentActions from 'redux/store/attachments/attachments.actions'
import * as taskSelectors from 'redux/store/tasks/tasks.selectors'
import * as errorActions from 'redux/store/errors/errors.actions'
import {
  sentryBreadcrumbCategory,
  sentryTagType,
} from 'redux/store/errors/errors.common'
import { fetch, createLoadActions, callApi } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import firebase from 'redux/utils/firebase'
import dateUtil from 'redux/utils/date'

const APP_STATE = appStateActions.APP_STATE
const ATTACHMENTS = attachmentActions.ATTACHMENTS

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
    while (true) {
      // eslint-disable-line
      const snapshot = yield take(channel)
      yield all(
        snapshot
          .docChanges()
          .map(change => call(saveChangeFromFirestore, change))
      )
    }
  } catch (err) {
    yield put({ type: REJECTED, err })

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.FIRESTORE,
        tagValue: 'SYNC_ACTTACHMENTS',
        breadcrumbCategory: sentryBreadcrumbCategory.FIRESTORE,
        breadcrumbMessage: 'SYNC_ACTTACHMENTS',
      })
    )
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
    schema: schema.attachments,
  })
}

export function* initAttachmentsData() {
  while (true) {
    // eslint-disable-line
    let detail = (yield take(APP_STATE.SET_DETAIL)).payload.detail

    if (detail === 'task' || detail === 'inbox') {
      const initTime = dateUtil.getDateToISOString()
      const taskId = yield select(state =>
        taskSelectors.getSelectionTasks(state).first()
      )

      // Start syncing task attachments with firestore
      const channel = firebase.getAttachmentsChannel(taskId, initTime)
      const attachmentsSyncing = yield fork(syncAttachmentsChannel, channel)

      // Wait for cancel
      detail = yield take(APP_STATE.DESELECT_DETAIL)

      // Cancel syncing
      yield cancel(attachmentsSyncing)
    }
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
    const attachment = yield callApi(api.attachments.create, taskId, data)

    yield put(attachmentActions.addAttachment(attachment))
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* deleteAttachment(action) {
  try {
    const taskId = action.payload.taskId
    const attachmentId = action.payload.attachmentId
    yield callApi(api.attachments.delete, taskId, attachmentId)
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}
