import { push } from 'react-router-redux'
import { delay } from 'redux-saga'
import { call, put, race, take } from 'redux-saga/effects'
import { NotificationManager } from 'react-notifications'

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
import { fetchTree } from 'redux/store/tree/tree.actions'
import * as authActions from 'redux/store/auth/auth.actions'
import api from 'redux/utils/api'
import persistentStore from 'redux/utils/persistentStore'

const AUTH = authActions.AUTH
const MIN_TOKEN_LIFESPAN = 300 * 1000

export function* initData() {

  while (true) { // eslint-disable-line
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

    take(AUTH.LOGOUT)
  }
}

export function* authFlow() {
  // Check if user is logged
  let auth = persistentStore.getItem('auth')
  if (auth) {
    // redirect
    const redirectAction = push('/user/tasks')
    yield put(redirectAction)
  } else {
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
      signOutAction: take(AUTH.LOGOUT),
      refreshTokenLoop: call(tokenLoop, auth)
    })

    if (logOutAction !== null) {
      yield call(logout)
      auth = null
    }

  }
}

export function* controlRedirectSignIn() {
  const auth = persistentStore.getItem('auth')

  if (!auth) {
    const redirectAction = push('/sign-in')
    yield put(redirectAction)
  }
}

export function* controlRedirectTasks() {
  const auth = persistentStore.getItem('auth')

  if (auth) {
    const redirectAction = push('/user/tasks')
    yield put(redirectAction)
  }
}

export function* changePassword(action) {
  try {
    const SUCCESS_MESSAGE_DURATION = 3000

    yield call(api.users.password, action.payload)
    yield put(deselectError('changePassword'))
    yield put(hideLoader())

    NotificationManager.success('Password was changed.', 'Success', SUCCESS_MESSAGE_DURATION)

  } catch (err) {
    yield put(setError('changePassword', 'Incorrect old password'))
    yield put(hideLoader())
    // TODO: handle error
  }
}

export function* emailResetPassword(action) {
  const SUCCESS_MESSAGE_DURATION = 8000

  try {

    yield call(api.users.emailResetPassword, action.payload)
    yield put(hideLoader())
    yield put(changeLocation('/sign-in'))

    NotificationManager.success(
      `If Flagis account exists for ${action.payload.email}, an e-mail will be sent with further instructions.`,
      'Success',
      SUCCESS_MESSAGE_DURATION,
    )

  } catch (err) {
    yield put(hideLoader())
    yield put(changeLocation('/sign-in'))

    NotificationManager.success(
      `If Flagis account exists for ${action.payload.email}, an e-mail will be sent with further instructions.`,
      'Success',
      SUCCESS_MESSAGE_DURATION,
    )
    // TODO: handle error
  }
}

export function* resetPassword(action) {
  const SUCCESS_MESSAGE_DURATION = 8000

  try {

    yield call(api.users.resetPassword, action.payload)
    yield put(hideLoader())
    yield put(changeLocation('/sign-in'))

    NotificationManager.success(
      'Password has successfully been changed.',
      'Success',
      SUCCESS_MESSAGE_DURATION
    )

  } catch (err) {
    yield put(hideLoader())
    yield put(changeLocation('/sign-in'))

    NotificationManager.error(
      'Link is expired. Please ask for a new one.',
      'Error',
      SUCCESS_MESSAGE_DURATION
    )
    // TODO: handle error
  }
}

// ------ HELPER FUNCTIONS ----------------------------------------------------

function setAuthToken(accessToken) {
  api.setApiToken(accessToken)
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

    // dispatch action with auth data
    yield put({ type: FULFILLED, payload: auth })

    // save auth data to persistentStore & client
    persistentStore.setItem('auth', auth)
    setAuthToken(auth.accessToken)

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
        yield put(setError('signIn', 'Please, reset your password. Click on the Forgot your password?'))
      } else {
        yield put(setError('signIn', 'Incorrect E-mail or Password'))
      }
    }

    if (action.type === 'AUTH/SIGN_UP') {
      yield put(setError('signUp', 'This E-mail is already in use'))
    }

    yield put(hideLoader())

    return null
  }
}

function cleanStore() {
  // clean
  persistentStore.clear()
  api.clearApiToken()
}

function* logout() {
  // clean
  cleanStore()

  // redirect
  const redirectAction = push('/sign-in')
  yield put(redirectAction)
}

function* tokenLoop(auth) {
  const { PENDING, FULFILLED, REJECTED } = createLoadActions(AUTH.REFRESH_TOKEN)

  while (true) { // eslint-disable-line

    yield put({ type: PENDING })

    const data = {
      userId: auth.profile.id,
      refreshToken: auth.refreshToken,
    }

    try {
      const response = yield call(api.auth.token, data)
      if (!response) {
        return
      }

      yield put({ type: FULFILLED, payload: response })
      setAuthToken(response.accessToken)

      yield call(delay, response.expiresIn - MIN_TOKEN_LIFESPAN)

    } catch (error) {
      yield put({ type: REJECTED })
      yield put(AUTH.LOGOUT)
      return
    }
  }

}
