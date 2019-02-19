import { push } from 'react-router-redux'
import { delay } from 'redux-saga'
import {
  all,
  fork,
  cancel,
  call,
  put,
  race,
  take,
  select,
} from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { REHYDRATE } from 'redux-persist'
import { Map } from 'immutable'
import { errorMessages, successMessages } from 'utils/messages'
import constants from 'utils/constants'
import { routes } from 'utils/routes'

import * as authActions from 'redux/store/auth/auth.actions'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as tagActions from 'redux/store/tags/tags.actions'
import * as treeActions from 'redux/store/tree/tree.actions'
import * as contactsActions from 'redux/store/contacts/contacts.actions'
import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import {
  initTasksData,
  initInboxTasksData,
} from 'redux/store/tasks/tasks.sagas'
import { initTagsData } from 'redux/store/tags/tags.sagas'
import { initTagTreeItemsData } from 'redux/store/tree/tree.sagas'
import {
  initContactsData,
  initGlobalContactsData,
} from 'redux/store/contacts/contacts.sagas'
import { createLoadActions } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import firebase from 'redux/utils/firebase'
import dateUtil from 'redux/utils/date'

const AUTH = authActions.AUTH

export function* initDataFlow() {
  while (true) {
    // eslint-disable-line
    const initTime = dateUtil.getDateToISOString()
    const loginActions = createLoadActions(AUTH.LOGIN)
    const tokenActions = createLoadActions(AUTH.REFRESH_TOKEN)

    yield race({
      login: take(loginActions.FULFILLED),
      token: take(tokenActions.FULFILLED),
    })

    yield put(tagActions.fetchTags())
    yield put(contactsActions.fetchContacts())
    yield put(tagActions.fetchTagsRelations())
    yield put(taskActions.fetchTasks())
    yield put(taskActions.fetchInboxTasks())
    yield put(treeActions.fetchTree())

    // Init data from firestore
    const {
      tasksSyncing,
      inboxTasksSyncing,
      tagsSyncing,
      tagTreeItemsSyncing,
      contactsSyncing,
      globalContactsSyncing,
    } = yield all({
      tasksSyncing: fork(initTasksData, initTime),
      inboxTasksSyncing: fork(initInboxTasksData, initTime),
      tagsSyncing: fork(initTagsData, initTime),
      tagTreeItemsSyncing: fork(initTagTreeItemsData, initTime),
      contactsSyncing: fork(initContactsData, initTime),
      globalContactsSyncing: fork(initGlobalContactsData, initTime),
    })

    yield take(AUTH.LOGOUT)
    yield cancel(tasksSyncing)
    yield cancel(inboxTasksSyncing)
    yield cancel(tagsSyncing)
    yield cancel(tagTreeItemsSyncing)
    yield cancel(contactsSyncing)
    yield cancel(globalContactsSyncing)

    // Cancel snapshot for comments and attachments from firestore
    const { task, inbox } = yield select(state =>
      appStateSelectors.getDetail(state)
    )
    if (task) {
      yield put(appStateActions.deselectDetail('task'))
    }

    if (inbox) {
      yield put(appStateActions.deselectDetail('inbox'))
    }
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

  while (true) {
    // eslint-disable-line

    // login or register
    if (!auth) {
      const { login, register } = yield race({
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
      refreshTokenLoop: call(tokenLoop, auth),
    })

    if (logOutAction !== null) {
      yield call(logout)
      auth = null
    }
  }
}

export function* initEmail(action) {
  const { invitationId } = action.payload
  try {
    const { email } = yield call(api.invitation.email, invitationId)
    const profile = {
      id: 0,
      email,
      firstName: null,
      lastName: null,
      createdAt: null,
      updatedAt: null,
    }

    yield put(authActions.updateProfile(profile))
  } catch (err) {
    const redirectAction = push(routes.signIn)
    yield put(redirectAction)
  }
}

export function* controlRedirectSignIn() {
  const auth = yield select(state => authSelectors.getAuth(state))

  if (!auth.isLogged) {
    const redirectAction = push(routes.signIn)
    yield put(redirectAction)
  }
}

export function* controlRedirectTasks() {
  const auth = yield select(state => authSelectors.getAuth(state))

  if (auth.isLogged) {
    const redirectAction = push(routes.user.tasks)
    yield put(redirectAction)
  }
}

export function* changeName(action) {
  try {
    const profile = yield call(api.users.update, action.payload)
    yield put(authActions.updateProfile(profile))
    yield put(appStateActions.deselectError('changeName'))
    yield put(appStateActions.deselectLoader('form'))

    toast.success(successMessages.changeName, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
    })
  } catch (err) {
    yield put(
      appStateActions.setError('changeName', errorMessages.somethingWrong)
    )
    yield put(appStateActions.deselectLoader('form'))
  }
}

export function* changeUserImage() {
  //TODO: Update profile
}

export function* changePassword(action) {
  try {
    yield call(api.users.password, action.payload)
    yield put(appStateActions.deselectError('changePassword'))
    yield put(appStateActions.deselectLoader('form'))

    toast.success(successMessages.changePassword, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
    })
  } catch (err) {
    yield put(
      appStateActions.setError(
        'changePassword',
        errorMessages.changePassword.badRequest
      )
    )
    yield put(appStateActions.deselectLoader('form'))
  }
}

export function* emailResetPassword(action) {
  try {
    yield call(api.users.emailResetPassword, action.payload)
    yield put(appStateActions.deselectLoader('form'))
    yield put(push(routes.signIn))

    // delay for render sign-in component
    yield delay(100)

    // show notification after redirect to sign-in
    toast.success(successMessages.emailResetPassword(action.payload.email), {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
    })
  } catch (err) {
    yield put(appStateActions.deselectLoader('form'))
    yield put(push(routes.signIn))

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
    yield put(appStateActions.deselectLoader('form'))
    yield put(push(routes.signIn))

    // delay for render sign-in component
    yield delay(100)

    // show notification after redirect to sign-in
    toast.success(successMessages.changePassword, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
    })
  } catch (err) {
    yield put(appStateActions.deselectLoader('form'))
    yield put(push(routes.sisgnIn))

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

function getRedirectPathname() {
  const { pathname } = window.location
  const { user } = routes
  const isTasksPathname =
    pathname.substring(0, user.tasks.length) === user.tasks
  const isInboxPathname =
    pathname.substring(0, user.inbox.length) === user.inbox
  const isTagsPathname = pathname.substring(0, user.tags.length) === user.tags

  if (isTasksPathname || isInboxPathname || isTagsPathname) {
    return pathname
  }

  return user.tasks
}

function* setTokens({ accessToken, firebaseToken }) {
  api.setApiToken(accessToken)
  yield call(firebase.signIn, firebaseToken)
}

function* authorizeUser(authApiCall, action) {
  const { PENDING, FULFILLED, REJECTED } = createLoadActions(AUTH.LOGIN)
  const { payload } = action

  try {
    yield put({ type: PENDING, payload: action.payload })

    // call server
    const auth = yield call(authApiCall, payload)

    // set access token and firebase token
    yield call(setTokens, auth)

    // dispatch action with auth data
    yield put({ type: FULFILLED, payload: auth })

    // hide loader
    yield put(appStateActions.deselectLoader('form'))

    // redirect
    const redirectAction = push(routes.user.tasks)
    yield put(redirectAction)

    return auth
  } catch (error) {
    yield put({ type: REJECTED, error })

    if (action.type === 'AUTH/LOGIN') {
      if (error.response.data.type === 'PasswordResetRequired') {
        yield put(
          appStateActions.setError(
            'signIn',
            errorMessages.signIn.passwordResetRequired
          )
        )
      } else {
        yield put(
          appStateActions.setError('signIn', errorMessages.signIn.unauthorized)
        )
      }
    }

    if (
      action.type === 'AUTH/SIGN_UP' ||
      action.type === 'AUTH/SIGN_UP_INVITATION'
    ) {
      yield put(
        appStateActions.setError('signUp', errorMessages.signUp.conflict)
      )
    }

    yield put(appStateActions.deselectLoader('form'))

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

  // sign out from firebase
  yield call(firebase.signOut)

  // redirect
  const redirectAction = push(routes.signIn)
  yield put(redirectAction)
}

function* tokenLoop(auth) {
  const { PENDING, FULFILLED, REJECTED } = createLoadActions(AUTH.REFRESH_TOKEN)

  while (true) {
    // eslint-disable-line
    yield put({ type: PENDING })

    try {
      const data = {
        userId:
          auth.profile instanceof Map
            ? auth.profile.get('id')
            : auth.profile.id,
        refreshToken: auth.refreshToken,
      }

      const response = yield call(api.auth.token, data)
      if (!response) {
        return
      }

      // set access token and firebase token
      yield call(setTokens, response)

      yield put({ type: FULFILLED, payload: response })

      // redirect
      const redirectPathname = getRedirectPathname()
      const redirectAction = push(redirectPathname)
      yield put(redirectAction)

      yield call(delay, response.expiresIn - constants.MIN_TOKEN_LIFESPAN)
    } catch (error) {
      yield put({ type: REJECTED })
      yield call(logout)

      return
    }
  }
}
