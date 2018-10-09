import { call, put } from 'redux-saga/effects'
import api from 'redux/utils/api'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as followerActions from 'redux/store/followers/followers.actions'

export function* createFollower(action) {
  try {
    const { taskId, userId, type } = action.payload
    const data = { userId, type }
    const follower = yield call(api.followers.create, taskId, data)

    yield put(followerActions.addFollower(follower))
    yield put(taskActions.addTaskFollower(taskId, follower.id))

  } catch(err) {
    console.error(err)
  }
}

export function* sendTaskToFollowers(action) {
  try {
    const { taskId } = action.payload
    yield call(api.followers.send, taskId)

  } catch(err) {
    console.error(err)
  }
}

export function* followerAcceptTask(action) {
  try {
    const { taskId } = action.payload
    yield call(api.followers.accept, taskId)

  } catch(err) {
    console.error(err)
  }
}

export function* followerRejectTask(action) {
  try {
    const { taskId } = action.payload
    yield call(api.followers.reject, taskId)

  } catch(err) {
    console.error(err)
  }
}

export function* deleteFollower(action) {
  try {
    const { taskId, userId } = action.payload
    yield call(api.followers.delete, taskId, userId)

  } catch(err) {
    console.error(err)
  }
}
