import { OrderedSet } from 'immutable'
import { normalize } from 'normalizr'

// TODO: fix a blinkHeadTitle function
/* eslint-disable-next-line */
import { notificationText } from 'components/notification-list/notifications-common'
/* eslint-disable-next-line */
import { blinkHeadTitle } from 'components/head-title/head-title-common'

// redux
import { all, put, select, cancelled, fork, take } from 'redux-saga/effects'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import firebase from 'redux/utils/firebase'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as notificationsActions from 'redux/store/notifications/notifications.actions'
import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as errorActions from 'redux/store/errors/errors.actions'
import {
  sentryBreadcrumbCategory,
  sentryTagType,
} from 'redux/store/errors/errors.common'
import { fetch, createLoadActions, callApi } from 'redux/store/common.sagas'

const NOTIFICATIONS = notificationsActions.NOTIFICATIONS

function* saveChangeFromFirestore(change) {
  const { FULFILLED } = createLoadActions(NOTIFICATIONS.FIREBASE)
  const notification = change.doc.data()
  /* eslint-disable-next-line */
  const changeType = change.type

  // TODO: fix a blinkHeadTitle function
  // set title for a new notification
  // if (changeType === 'added') {
  //   const title = notificationText(notification.type)
  //   blinkHeadTitle(title)
  // }

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

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.FIRESTORE,
        tagValue: 'SYNC_NOTIFICATIONS',
        breadcrumbCategory: sentryBreadcrumbCategory.FIRESTORE,
        breadcrumbMessage: 'SYNC_NOTIFICATIONS',
      })
    )
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
  try {
    const { notification, task } = action.payload

    if (task !== null && !task.isTrashed) {
      if (task.isArchived) {
        yield put(appStateActions.visibleArchivedTasks())
      }

      yield put(taskActions.selectTask(OrderedSet().add(task.id), false))
    }

    yield callApi(api.notifications.read, notification.id)
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

export function* readTaskNotifications(action) {
  try {
    const { taskId } = action.payload

    yield callApi(api.notifications.taskReadAll, taskId)
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

export function* readAllNotifications(action) {
  try {
    yield callApi(api.notifications.readAll)
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
