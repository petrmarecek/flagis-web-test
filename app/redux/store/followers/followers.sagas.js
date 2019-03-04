import { put } from 'redux-saga/effects'
import api from 'redux/utils/api'
import { callApi } from 'redux/store/common.sagas'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as followerActions from 'redux/store/followers/followers.actions'

export function* createFollower(action) {
  try {
    const { taskId, userId, type } = action.payload
    const data = { userId, type }
    const follower = yield callApi(api.followers.create, taskId, data)

    yield put(followerActions.addFollower(follower))
    yield put(taskActions.addTaskFollower(taskId, follower.id))
  } catch (err) {
    console.error(err)
  }
}

export function* deleteFollower(action) {
  try {
    const { taskId, userId } = action.payload
    yield callApi(api.followers.delete, taskId, userId)
  } catch (err) {
    console.error(err)
  }
}
