import _ from 'lodash'
import moment from 'moment'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import date from '../utils/date'
import api from 'redux/utils/api'
import firebase from 'redux/utils/firebase'
import { call, put, take, spawn, race, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import { AUTH, logout } from 'redux/store/auth/auth.actions'
import { deselectTasks } from 'redux/store/tasks/tasks.actions'
import { deselectTags } from 'redux/store/tags/tags.actions'
import { getAuth } from './auth/auth.selectors'
import * as errorActions from 'redux/store/errors/errors.actions'
import {
  sentryBreadcrumbCategory,
  sentryTagType,
} from 'redux/store/errors/errors.common'

export function* refreshTokenIfRequired(auth) {

  if (!moment().isSameOrAfter(auth.expiresAt)) {
    return
  }

  // Initialize request
  const { PENDING, FULFILLED, REJECTED } = createLoadActions(AUTH.REFRESH_TOKEN)
  yield put({ type: PENDING })

  try {
    // Call API with current refresh token
    const data = {
      userId:
        auth.profile instanceof Map
          ? auth.profile.get('id')
          : auth.profile.id,
      refreshToken: auth.refreshToken,
    }

    // Store new tokens and expiration dates
    const response = yield call(api.auth.token, data)
    yield put({
      type: FULFILLED,
      payload: {
        expiresAt: date.getExpiresAt(response.expiresIn),
        expiresIn: response.expiresIn,
        accessToken: response.accessToken,
        firebaseToken: response.firebaseToken,
      }
    })

    // Use the new token in API module
    api.setApiToken(response.accessToken)

    // Refresh also Firebase ID token
    yield call(firebase.refreshToken)

  } catch (err) {
    yield put({ type: REJECTED, payload: err })
    errorActions.errorSentry(err, {
      tagType: sentryTagType.ACTION,
      tagValue: AUTH.REFRESH_TOKEN,
      breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
      breadcrumbMessage: AUTH.REFRESH_TOKEN,
    })

    // Something went wrong with refresh, logout user
    yield put(logout())
  }
}

/**
 * Call api if access token is valid
 * @param {Object} action Definition of action
 * @param {Object} args Other arguments of function
 */
export function* callApi(action, ...args) {
  // Get current auth data
  const auth = yield select(getAuth)

  // Refresh token if it is already expired
  yield call(refreshTokenIfRequired, auth)

  // Call API
  return yield call(action, ...args)
}

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
      payload: fetchDef.payload || {},
    })

    // call server & dispatch result
    const args = fetchDef.args || []
    result = yield callApi(fetchDef.method, ...args)

    // add userId for repare data of follower in normalizr schema
    if (fetchDef.userId) {
      const userId = fetchDef.userId
      _.forEach(result, (task, key) => {
        result[key] = _.assign({ userId }, task)
      })
    }

    if (fetchDef.isInbox) {
      const isInbox = fetchDef.isInbox
      _.forEach(result, (task, key) => {
        result[key] = _.assign({ isInbox }, task)
      })
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
      toast.error(toastCommon.errorMessages.sessionExpired, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.ERROR_DURATION,
      })
      yield put(logout())
    } else {
      // dispatch error
      yield put({
        type: REJECTED,
        error: err,
      })

      // send error to sentry
      yield put(
        errorActions.errorSentry(err, {
          tagType: sentryTagType.ACTION,
          tagValue: actionType,
          breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
          breadcrumbMessage: actionType,
        })
      )
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
    undo: take(
      act => act.type === 'APP-STATE/UNDO_ACTIVE' && act.undoType === undoType
    ),
    undoAction: take(
      act =>
        act.type === 'TASK/REJECT' ||
        act.type === 'TASK/DELETE' ||
        act.type === 'TAGS/DELETE' ||
        act.type === 'TREE/DELETE' ||
        act.type === 'CONTACTS/DELETE'
    ),
    timeout: call(delay, 12000),
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
