import { call, put, take, spawn, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { toast } from 'react-toastify'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'
import _ from 'lodash'

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

    // add userId for repare data of follower in normalizr schema
    if (fetchDef.userId) {
      const userId = fetchDef.userId
      _.forEach(result, (task, key) => {result[key] = _.assign({ userId }, task)})
    }

    // dispatch fetch fulfilled action
    const fulfilledAction = {
      type: FULFILLED,
      payload: result,
    }

    // add schema to meta of action
    if (fetchDef.schema) {
      fulfilledAction['meta'] = { schema: fetchDef.schema }
    }

    yield put(fulfilledAction)

  } catch (err) {
    // TODO: After fix in backend delete logout
    // logout if access token is invalid
    if (err.response.status === 500) {
      toast.error(errorMessages.sessionExpired, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_ERROR_DURATION,
      })
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
  // type and data for undo action
  const undoType = `UNDO_${action.type}`
  const undoData = action.payload.originalData

  // show UI element for undo
  yield put(appStateActions.showUndo(name))

  // reset delay if action for undo was dispatched
  const { undo } = yield race({
    undo: take(act => act.type === 'APP-STATE/UNDO_ACTIVE' && act.undoType === undoType),
    undoAction: take(act =>
      act.type === 'TASK/REJECT' ||
      act.type === 'TASK/DELETE' ||
      act.type === 'TAGS/DELETE' ||
      act.type === 'TREE/DELETE' ||
      act.type === 'CONTACTS/DELETE'
    ),
    timeout: call(delay, 8000),
  })

  // hide UI element
  // if user clicked undo button
  // if action for undo was dispatched
  // if timeout was expired
  yield put(appStateActions.hideUndo())

  // dispatch undo action if user clicked undo button
  if (undo) {
    yield put({
      type: undoType,
      payload: undoData,
    })
  }
}

export function* mainUndo(action, name) {
  yield spawn(onUndo, action, name)
}
