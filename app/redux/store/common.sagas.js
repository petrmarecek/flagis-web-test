import { call, put, take, spawn, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { NotificationManager } from 'react-notifications'

import * as appStateActions from 'redux/store/app-state/app-state.actions'
import { logout } from 'redux/store/auth/auth.actions'
import { deselectTasks } from 'redux/store/tasks/tasks.actions'
import { deselectTags } from 'redux/store/tags/tags.actions'

/**
 * Creates common action types for fetch action type
 * @param {String} actionType Type of fetch action
 * @returns {Object} Object with action type definitions
 */
export function createLoadActions(actionType) {
  return {
    PENDING: `${actionType}_PENDING`,
    FULFILLED: `${actionType}_FULFILLED`,
    REJECTED: `${actionType}_REJECTED`,
  }
}

/**
 * Simulates redux promise middleware
 * @param {String} actionType Fetch action type
 * @param {Object} fetchDef Definition of fetch action
 * @param {Function} fetchDef.method API method to call
 * @param {Array} fetchDef.args API method args
 * @param {Object} fetchDef.schema Normalizr schema of API call results
 * @param {Object} fetchDef.payload Original action payload
 */
export function* fetch(actionType, fetchDef) {
  const { PENDING, FULFILLED, REJECTED } = createLoadActions(actionType)
  let result = null

  if (actionType === 'TASK/FETCH') {
    yield put(deselectTasks())
  }

  if (actionType === 'TAGS/FETCH') {
    yield put(deselectTags())
  }

  try {
    // dispatch fetch pending action
    yield put({
      type: PENDING,
      payload: fetchDef.payload || {}
    })

    // call server & dispatch result
    const args = fetchDef.args || []
    result = yield call(fetchDef.method, ...args)
    const fulfilledAction = {
      type: FULFILLED,
      payload: result,
    }

    if (fetchDef.schema) {
      fulfilledAction['meta'] = { schema: fetchDef.schema }
    }

    yield put(fulfilledAction)

  } catch (err) {
    // TODO: After fix in backend delete logout
    // logout if access token is invalid
    if (err.response.status === 500) {
      NotificationManager.info('Your session has expired.', 20000)
      yield put(logout())
    } else {
      console.error('Cannot fetch data.', err)

      // dispatch error
      yield put({
        type: REJECTED,
        error: err,
      })
    }
  }

  // Return the result so that callers can use it
  return result
}

// Undo
function* onUndo(action, name) {
  const undoAction = `UNDO_${action.type}`
  const undoData = action.payload.originalData

  yield put(appStateActions.showUndo(name))

  const { undo } = yield race({
    undo: take(act => act.type === 'APP-STATE/UNDO_ACTIVE' && act.undoType === undoAction),
    actionAgain: take(act => act.type === action.type),
    timeout: call(delay, 8000),
  })

  yield put(appStateActions.hideUndo())

  if (undo) {
    yield put({
      type: undoAction,
      payload: undoData,
    })
  }
}

export function* mainUndo(action, name) {
  yield spawn(onUndo, action, name)
}
