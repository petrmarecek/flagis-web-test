import { push } from 'react-router-redux'
import { delay } from 'redux-saga'
import { all, fork, cancel, call, put, race, take, select } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { REHYDRATE } from 'redux-persist'
import { Map } from 'immutable'
import { errorMessages, successMessages } from 'utils/messages'
import constants from 'utils/constants'

import { createLoadActions } from 'redux/store/common.sagas'
import {
  setError,
  deselectError,
  hideLoader,
  changeLocation,
} from 'redux/store/app-state/app-state.actions'
import {
  fetchTags,
  fetchTagsRelations
} from 'redux/store/tags/tags.actions'
import { fetchTasks } from 'redux/store/tasks/tasks.actions'
import { initTasksData } from 'redux/store/tasks/tasks.sagas'
import { initAttachmentsData } from 'redux/store/attachments/attachments.sagas'
import { initCommentsData } from 'redux/store/comments/comments.sagas'
import { initTagsData } from 'redux/store/tags/tags.sagas'
import { fetchTree } from 'redux/store/tree/tree.actions'
import * as authActions from 'redux/store/auth/auth.actions'
import * as authSelectors from 'redux/store/auth/auth.selectors'
import api from 'redux/utils/api'
import firebase from 'redux/utils/firebase'

const AUTH = authActions.AUTH

export function* initDataFlow() {

  while (true) { // eslint-disable-line
    const initTime = new Date().toISOString()
    const loginActions = createLoadActions(AUTH.LOGIN)
    const tokenActions = createLoadActions(AUTH.REFRESH_TOKEN)

    yield race({
      login: take(loginActions.FULFILLED),
      token: take(tokenActions.FULFILLED),
    })

    yield put(fetchTags())
    yield put(fetchTagsRelations())
    yield put(fetchTasks())
    yield put(fetchTree())

    // Init data from firestore
    const { tasksSyncing, attachmentsSyncing, commentsSyncing, tagsSyncing } = yield all({
      tasksSyncing: fork(initTasksData, initTime),
      attachmentsSyncing: fork(initAttachmentsData, initTime),
      commentsSyncing: fork(initCommentsData, initTime),
      tagsSyncing: fork(initTagsData, initTime),
    })

    yield take(AUTH.LOGOUT)
    yield cancel(tasksSyncing)
    yield cancel(attachmentsSyncing)
    yield cancel(commentsSyncing)
    yield cancel(tagsSyncing)
  }
}

export function* authFlow() {

  // Wait to load from persist store
  yield take(REHYDRATE)

  // Get auth information
  let auth = yield select(state => authSelectors.getAuth(state))
  if (!auth.isLogged) {
    auth = null
    cleanStore()
  }

  while (true) { // eslint-disable-line

    // login or register
    if (!auth) {
      const {login, register} = yield race({
        login: take(AUTH.LOGIN),
        register: take(AUTH.SIGN_UP),
      })

      if (login) {
        auth = yield call(authorizeUser, api.auth.login, login)
      }

      if (register) {
        auth = yield call(authorizeUser, api.users.create, register)
      }

      // if api return error on login or register
      if (!auth) {
        continue
      }
    }

    const { logOutAction } = yield race({
      logOutAction: take(AUTH.LOGOUT),
      refreshTokenLoop: call(tokenLoop, auth)
    })

    if (logOutAction !== null) {
      yield call(logout)
      auth = null
    }

  }
}

export function* controlRedirectSignIn() {
  const auth = yield select(state => authSelectors.getAuth(state))

  if (!auth.isLogged) {
    const redirectAction = push('/sign-in')
    yield put(redirectAction)
  }
}

export function* controlRedirectTasks() {
  const auth = yield select(state => authSelectors.getAuth(state))

  if (auth.isLogged) {
    const redirectAction = push('/user/tasks')
    yield put(redirectAction)
  }
}

export function* changePassword(action) {
  try {
    yield call(api.users.password, action.payload)
    yield put(deselectError('changePassword'))
    yield put(hideLoader())

    toast.success(successMessages.changePassword, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
    })

  } catch (err) {
    yield put(setError('changePassword', errorMessages.changePassword.badRequest))
    yield put(hideLoader())
  }
}

export function* emailResetPassword(action) {
  try {
    yield call(api.users.emailResetPassword, action.payload)
    yield put(hideLoader())
    yield put(changeLocation('/sign-in'))

    // delay for render sign-in component
    yield delay(100)

    // show notification after redirect to sign-in
    toast.success(successMessages.emailResetPassword(action.payload.email), {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
    })

  } catch (err) {
    yield put(hideLoader())
    yield put(changeLocation('/sign-in'))

    // delay for render sign-in component
    yield delay(100)

    // show notification after redirect to sign-in
    toast.success(successMessages.emailResetPassword(action.payload.email), {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
    })
  }
}

export function* resetPassword(action) {
  try {

    yield call(api.users.resetPassword, action.payload)
    yield put(hideLoader())
    yield put(changeLocation('/sign-in'))

    // delay for render sign-in component
    yield delay(100)

    // show notification after redirect to sign-in
    toast.success(successMessages.changePassword, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
    })

  } catch (err) {
    yield put(hideLoader())
    yield put(changeLocation('/sign-in'))

    // delay for render sign-in component
    yield delay(100)

    // show notification after redirect to sign-in
    toast.error(errorMessages.resetPassword.linkExpired, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_ERROR_DURATION,
    })
  }
}

// ------ HELPER FUNCTIONS ----------------------------------------------------

function* setTokens({ accessToken, firebaseToken }) {
  api.setApiToken(accessToken)
  yield call(firebase.signIn, firebaseToken)
}

function* authorizeUser(authApiCall, action) {
  const { PENDING, FULFILLED, REJECTED } = createLoadActions(AUTH.LOGIN)

  try {
    yield put({ type: PENDING, payload: action.payload })

    // prepare data
    let requestBody = {
      email: action.payload.email,
      password: action.payload.password
    }

    if (action.payload.firstName) {
      requestBody = {
        email: action.payload.email,
        password: action.payload.password,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      }
    }

    // call server
    const auth = yield call(authApiCall, requestBody)

    // save auth data to persistentStore & client
    yield call(setTokens, auth)

    // dispatch action with auth data
    yield put({ type: FULFILLED, payload: auth })

    // hide loader
    yield put(hideLoader())

    // redirect
    const redirectAction = push('/user/tasks')
    yield put(redirectAction)

    return auth

  } catch (error) {
    yield put({ type: REJECTED, error })

    if (action.type === 'AUTH/LOGIN') {
      if (error.response.data.type === 'PasswordResetRequired') {
        yield put(setError('signIn', errorMessages.signIn.passwordResetRequired))
      } else {
        yield put(setError('signIn', errorMessages.signIn.unauthorized))
      }
    }

    if (action.type === 'AUTH/SIGN_UP') {
      yield put(setError('signUp', errorMessages.signUp.conflict))
    }

    yield put(hideLoader())

    return null
  }
}

function cleanStore() {
  // clean
  api.clearApiToken()
}

function* logout() {
  // clean
  cleanStore()

  // Sign out from firebase
  yield call(firebase.signOut)

  // redirect
  const redirectAction = push('/sign-in')
  yield put(redirectAction)
}

function* tokenLoop(auth) {
  const { PENDING, FULFILLED, REJECTED } = createLoadActions(AUTH.REFRESH_TOKEN)

  while (true) { // eslint-disable-line
    yield put({ type: PENDING })

    try {
      const data = {
        userId: auth.profile instanceof Map
          ? auth.profile.get('id')
          : auth.profile.id,
        refreshToken: auth.refreshToken,
      }

      const response = yield call(api.auth.token, data)
      if (!response) {
        return
      }

      // Set access token and firebase token
      yield call(setTokens, response)

      yield put({ type: FULFILLED, payload: response })

      // redirect
      const redirectAction = push('/user/tasks')
      yield put(redirectAction)

      yield call(delay, response.expiresIn - constants.MIN_TOKEN_LIFESPAN)

    } catch (error) {
      yield put({ type: REJECTED })
      yield call(logout)

      return
    }
  }

}
