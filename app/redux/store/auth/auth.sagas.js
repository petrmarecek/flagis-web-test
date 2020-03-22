import { Map } from 'immutable'
import { routes } from 'utils/routes'
import date from '../../utils/date'
import constants from 'utils/constants'
import fileHelper from 'utils/file-helper'

// toast notifications
import { toast } from 'react-toastify'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
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
import { REHYDRATE } from 'redux-persist'
import * as authActions from 'redux/store/auth/auth.actions'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as notificationActions from 'redux/store/notifications/notifications.actions'
import * as tagActions from 'redux/store/tags/tags.actions'
import * as treeActions from 'redux/store/tree/tree.actions'
import * as contactsActions from 'redux/store/contacts/contacts.actions'
import * as contactsSelectors from 'redux/store/contacts/contacts.selectors'
import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import {
  initTasksData,
  initInboxTasksData,
} from 'redux/store/tasks/tasks.sagas'
import { initTagsData } from 'redux/store/tags/tags.sagas'
import { initTagTreeItemsData } from 'redux/store/tree/tree.sagas'
import { initNotificationsData } from 'redux/store/notifications/notifications.sagas'
import {
  initContactsData,
  initGlobalContactsData,
} from 'redux/store/contacts/contacts.sagas'
import * as errorActions from 'redux/store/errors/errors.actions'
import {
  sentryBreadcrumbCategory,
  sentryTagType,
} from 'redux/store/errors/errors.common'
import { createLoadActions, callApi } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import firebase from 'redux/utils/firebase'
import dateUtil from 'redux/utils/date'
import { loaderTypes } from 'redux/store/app-state/app-state.common'

const AUTH = authActions.AUTH

export function* initDataFlow() {
  try {
    while (true) {
      // eslint-disable-line
      const initTime = dateUtil.getDateToISOString()
      const loginActions = createLoadActions(AUTH.LOGIN)
      const tokenActions = createLoadActions(AUTH.REFRESH_TOKEN)
      const { pathname } = window.location
      const { user } = routes
      const isArchivePathname =
        pathname.substring(0, user.archive.length) === user.archive

      yield race({
        login: take(loginActions.FULFILLED),
        token: take(tokenActions.FULFILLED),
      })

      yield put(tagActions.fetchTags())
      yield put(contactsActions.fetchContacts())
      yield put(tagActions.fetchTagsRelations())
      yield put(taskActions.fetchTasks())
      yield put(notificationActions.fetchNotifications())
      yield put(taskActions.fetchInboxTasks())
      yield put(treeActions.fetchTree())

      if (isArchivePathname) {
        yield put(taskActions.fetchArchivedTasks())
      }

      // Init data from firestore
      const {
        tasksSyncing,
        inboxTasksSyncing,
        tagsSyncing,
        tagTreeItemsSyncing,
        contactsSyncing,
        globalContactsSyncing,
        notificationsSyncing,
      } = yield all({
        tasksSyncing: fork(initTasksData, initTime),
        inboxTasksSyncing: fork(initInboxTasksData, initTime),
        tagsSyncing: fork(initTagsData, initTime),
        tagTreeItemsSyncing: fork(initTagTreeItemsData, initTime),
        contactsSyncing: fork(initContactsData, initTime),
        globalContactsSyncing: fork(initGlobalContactsData, initTime),
        notificationsSyncing: fork(initNotificationsData, initTime),
      })

      yield take(AUTH.LOGOUT)
      yield cancel(tasksSyncing)
      yield cancel(inboxTasksSyncing)
      yield cancel(tagsSyncing)
      yield cancel(tagTreeItemsSyncing)
      yield cancel(contactsSyncing)
      yield cancel(globalContactsSyncing)
      yield cancel(notificationsSyncing)

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
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: 'AUTH_INIT_DATA',
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: 'AUTH_INIT_DATA',
      })
    )
  }
}

export function* authFlow() {
  try {
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
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: 'AUTH_SIGN',
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: 'AUTH_SIGN',
      })
    )
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
    // call server
    const profile = yield callApi(api.users.update, action.payload)

    // save profile to redux-store
    yield put(authActions.updateProfile(profile))

    // update nickname for me contact
    const nickname = `${profile.firstName} ${profile.lastName}`
    const me = yield select(state =>
      contactsSelectors.getContactById(state, profile.id)
    )
    yield put(contactsActions.updateContact(me, nickname, 'nickname', true))

    // deselect form for change name
    yield put(appStateActions.deselectError('changeName'))
    yield put(appStateActions.deselectLoader('form'))

    // show notification of successful profile update
    toast.success(toastCommon.successMessages.changeName, {
      position: toastCommon.position.DEFAULT,
      autoClose: toastCommon.duration.SUCCESS_DURATION,
    })
  } catch (err) {
    // show notification of unsuccessful profile update
    yield put(
      appStateActions.setError(
        'changeName',
        toastCommon.errorMessages.somethingWrong
      )
    )
    yield put(appStateActions.deselectLoader('form'))

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

export function* changeUserPhoto(action) {
  try {
    const file = action.payload

    // Set file extension to lower case
    const prepareFile = fileHelper.setFileExtensionToLowerCase(file)
    const { name, type, size } = prepareFile

    yield put(appStateActions.setLoader(loaderTypes.PROFILE_PICTURE))

    // prepare data for getting upload data
    const fileMetaData = {
      fileName: name,
      mimeType: type,
    }

    // get upload data
    const { fileKey, uploadUrl } = yield callApi(
      api.files.getUploadData,
      fileMetaData
    )

    const fileBuffer = yield call(fileHelper.readFileAsArrayBuffer, prepareFile)

    // upload file to S3
    yield callApi(api.files.uploadFile, uploadUrl, fileBuffer, type)

    // prepare data for creating attachment
    const fileData = {
      ...fileMetaData,
      fileKey,
      size,
    }

    // call server
    const profile = yield callApi(api.users.updatePhoto, fileData)

    // save profile to redux-store
    yield put(authActions.updateProfile(profile))

    // update photo for me contact
    const me = yield select(state =>
      contactsSelectors.getContactById(state, profile.id)
    )
    yield put(contactsActions.updateContact(me, profile.photo, 'photo', true))

    yield put(appStateActions.deselectLoader(loaderTypes.PROFILE_PICTURE))
  } catch (err) {
    yield put(appStateActions.deselectLoader(loaderTypes.PROFILE_PICTURE))
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

export function* resetUserPhoto(action) {
  try {
    // call server
    const profile = yield callApi(api.users.resetPhoto)

    // save profile to redux-store
    yield put(authActions.updateProfile(profile))
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

export function* toggleColorTheme(action) {
  try {
    const settings = { colorTheme: action.payload.theme }

    // call server
    const profile = yield callApi(api.users.update, {
      settings: JSON.stringify(settings),
    })

    // save profile to redux-store
    yield put(authActions.updateProfile(profile))
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

export function* changePassword(action) {
  try {
    yield callApi(api.users.password, action.payload)
    yield put(appStateActions.deselectError('changePassword'))
    yield put(appStateActions.deselectLoader('form'))

    toast.success(toastCommon.successMessages.changePassword, {
      position: toastCommon.position.DEFAULT,
      autoClose: toastCommon.duration.SUCCESS_DURATION,
    })
  } catch (err) {
    yield put(
      appStateActions.setError(
        'changePassword',
        toastCommon.errorMessages.changePassword.badRequest
      )
    )
    yield put(appStateActions.deselectLoader('form'))

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

export function* emailResetPassword(action) {
  try {
    yield call(api.users.emailResetPassword, action.payload)
    yield put(appStateActions.deselectLoader('form'))
    yield put(push(routes.signIn))

    // delay for render sign-in component
    yield delay(100)

    // show notification after redirect to sign-in
    toast.success(
      toastCommon.successMessages.emailResetPassword(action.payload.email),
      {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.SUCCESS_DURATION,
      }
    )
  } catch (err) {
    yield put(appStateActions.deselectLoader('form'))
    yield put(push(routes.signIn))

    // delay for render sign-in component
    yield delay(100)

    // show notification after redirect to sign-in
    toast.success(
      toastCommon.successMessages.emailResetPassword(action.payload.email),
      {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.SUCCESS_DURATION,
      }
    )

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

export function* sendContactUs(action) {
  try {
    yield call(api.contactUs.create, action.payload)
    yield put(appStateActions.deselectLoader('form'))

    // show notification after redirect to sign-in
    toast.success(toastCommon.successMessages.contactUs, {
      position: toastCommon.position.DEFAULT,
      autoClose: toastCommon.duration.SUCCESS_DURATION,
    })
  } catch (err) {
    yield put(
      appStateActions.setError(
        'contactUs',
        toastCommon.errorMessages.somethingWrong
      )
    )
    yield put(appStateActions.deselectLoader('form'))

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

export function* resetPassword(action) {
  try {
    yield call(api.users.resetPassword, action.payload)
    yield put(appStateActions.deselectLoader('form'))
    yield put(push(routes.signIn))

    // delay for render sign-in component
    yield delay(100)

    // show notification after redirect to sign-in
    toast.success(toastCommon.successMessages.changePassword, {
      position: toastCommon.position.DEFAULT,
      autoClose: toastCommon.duration.SUCCESS_DURATION,
    })
  } catch (err) {
    yield put(appStateActions.deselectLoader('form'))
    yield put(push(routes.sisgnIn))

    // delay for render sign-in component
    yield delay(100)

    // show notification after redirect to sign-in
    toast.error(toastCommon.errorMessages.resetPassword.linkExpired, {
      position: toastCommon.position.DEFAULT,
      autoClose: toastCommon.duration.ERROR_DURATION,
    })

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

// ------ HELPER FUNCTIONS ----------------------------------------------------

function* setTokens({ accessToken, firebaseToken }) {
  api.setApiToken(accessToken)

  // firebase auth
  try {
    // sign in to firebase
    const { user } = yield call(firebase.signIn, firebaseToken)

    // save token and refreshToken from firebase to redux store
    yield put(authActions.setFirebaseTokens(firebaseToken, user.refreshToken))
  } catch (err) {
    // get firebaseRefreshToken
    const firebaseRefreshToken = yield select(
      authSelectors.getFirebaseRefreshToken
    )

    // get new token and refreshToken from firebase
    const newTokens = yield call(firebase.createNewToken(firebaseRefreshToken))

    // sign in to firebase
    yield call(firebase.signIn, firebaseToken)

    // save token and refreshToken from firebase to redux store
    yield put(
      authActions.setFirebaseTokens(
        newTokens['access_token'],
        newTokens['refresh_token']
      )
    )
  }
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
    yield put({
      type: FULFILLED,
      payload: {
        expiresAt: date.getExpiresAt(auth.expiresIn),
        ...auth,
      },
    })

    // hide loader
    yield put(appStateActions.deselectLoader('form'))

    // redirect
    const redirectAction = push(routes.user.tasks)
    yield put(redirectAction)

    return auth
  } catch (err) {
    yield put({ type: REJECTED, err })

    if (action.type === 'AUTH/LOGIN') {
      if (err.response.data.type === 'PasswordResetRequired') {
        yield put(
          appStateActions.setError(
            'signIn',
            toastCommon.errorMessages.signIn.passwordResetRequired
          )
        )
      } else {
        yield put(
          appStateActions.setError(
            'signIn',
            toastCommon.errorMessages.signIn.unauthorized
          )
        )
      }
    }

    if (
      action.type === 'AUTH/SIGN_UP' ||
      action.type === 'AUTH/SIGN_UP_INVITATION'
    ) {
      yield put(
        appStateActions.setError(
          'signUp',
          toastCommon.errorMessages.signUp.conflict
        )
      )
    }

    yield put(appStateActions.deselectLoader('form'))

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
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

      yield put({
        type: FULFILLED,
        payload: {
          expiresAt: date.getExpiresAt(response.expiresIn),
          ...response,
        },
      })

      // redirect
      const { pathname } = window.location
      const redirectAction = push(pathname)
      yield put(redirectAction)

      yield race({
        action: take(AUTH.REFRESH_TOKEN),
        delay: call(delay, response.expiresIn - constants.MIN_TOKEN_LIFESPAN),
      })
    } catch (err) {
      yield put({ type: REJECTED })

      yield call(logout)

      // send error to sentry
      yield put(
        errorActions.errorSentry(err, {
          tagType: sentryTagType.ACTION,
          tagValue: 'AUTH_TOKEN_LOOP',
          breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
          breadcrumbMessage: 'AUTH_TOKEN_LOOP',
        })
      )

      return
    }
  }
}
