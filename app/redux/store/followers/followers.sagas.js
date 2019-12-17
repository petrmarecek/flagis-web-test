// redux
import { put } from 'redux-saga/effects'
import api from 'redux/utils/api'
import { callApi } from 'redux/store/common.sagas'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as followerActions from 'redux/store/followers/followers.actions'
import * as errorActions from 'redux/store/errors/errors.actions'
import {
  sentryBreadcrumbCategory,
  sentryTagType,
} from 'redux/store/errors/errors.common'

export function* createFollower(action) {
  try {
    const { taskId, userId, type } = action.payload
    const data = { userId, type }
    const follower = yield callApi(api.followers.create, taskId, data)

    yield put(followerActions.addFollower(follower))
    yield put(taskActions.addTaskFollower(taskId, follower.id))
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

export function* deleteFollower(action) {
  try {
    const { taskId, userId } = action.payload
    yield callApi(api.followers.delete, taskId, userId)
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
