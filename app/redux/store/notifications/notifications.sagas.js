import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import firebase from 'redux/utils/firebase'
import { OrderedSet } from 'immutable'
import { normalize } from 'normalizr'
import { fetch, createLoadActions, callApi } from 'redux/store/common.sagas'
import { all, put, select, cancelled, fork, take } from 'redux-saga/effects'

import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as notificationsActions from 'redux/store/notifications/notifications.actions'
import * as authSelectors from 'redux/store/auth/auth.selectors'

const NOTIFICATIONS = notificationsActions.NOTIFICATIONS

function* saveChangeFromFirestore(change) {
  const { FULFILLED } = createLoadActions(NOTIFICATIONS.FIREBASE)
  const notification = change.doc.data()

  // Prepare data
  const normalizeData = normalize(notification, schema.notification)

  // Save changes to store entities
  yield put({ type: FULFILLED, payload: normalizeData })
}

function* syncNotificationsChannel(channel) {
  const { REJECTED } = createLoadActions(NOTIFICATIONS.FIREBASE)

  try {
    while (true) {
      // eslint-disable-line
      const snapshot = yield take(channel)
      yield all(
        snapshot
          .docChanges()
          .map(change => callApi(saveChangeFromFirestore, change))
      )
    }
  } catch (err) {
    yield put({ type: REJECTED, err })
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* initNotificationsData(initTime) {
  const userId = yield select(state => authSelectors.getUserId(state))
  const channel = firebase.getNotificationsChannel(userId, initTime)
  return yield fork(syncNotificationsChannel, channel)
}

export function* fetchNotifications(action) {
  yield* fetch(NOTIFICATIONS.FETCH, {
    method: api.notifications.list,
    args: [action.payload],
    schema: schema.notifications,
  })
}

export function* readNotification(action) {
  const { notification, task } = action.payload
  const userId = yield select(state => authSelectors.getUserId(state))

  if (task !== null) {
    if (task.isArchived) {
      yield put(appStateActions.visibleInboxTasks())
    }

    if (userId !== task.createdById) {
      yield put(appStateActions.visibleInboxTasks())
    }

    yield put(taskActions.selectTask(OrderedSet().add(task.id), false))
  }

  yield callApi(api.notifications.read, notification.id)
}

export function* readAllNotifications() {
  yield callApi(api.notifications.readAll)
}
