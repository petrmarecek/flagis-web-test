// redux
import { put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as tagActions from 'redux/store/tags/tags.actions'
import * as contactActions from 'redux/store/contacts/contacts.actions'
import { getAccountNavigationVisibility } from 'redux/store/app-state/app-state.selectors'

export function* changeLocation(action) {
  const { pathname } = action.payload

  yield put(push(pathname))
}

export function* changeNavigation(action) {
  const { pathname, type } = action.payload
  const isVisibleAccountNavigation = yield select(state =>
    getAccountNavigationVisibility(state)
  )

  yield put(taskActions.deselectTasks())
  yield put(tagActions.deselectTags())
  yield put(contactActions.deselectContacts())
  yield put(taskActions.cancelTimeLine())
  yield put(appStateActions.resetScrollbarPosition())
  yield put(tagActions.selectActiveTags([]))

  if (type === 'inbox') {
    yield put(appStateActions.visibleInboxTasks())
  } else {
    yield put(appStateActions.hideInboxTasks())
  }

  if (type === 'archived') {
    yield put(taskActions.fetchArchivedTasks())
  } else {
    yield put(appStateActions.hideArchivedTasks())
  }

  if (isVisibleAccountNavigation) {
    yield put(appStateActions.accountNavigationHide())
  }

  yield put(push(pathname))
}

export function* changeNavigationSecondary(action) {
  const { pathname, type } = action.payload

  yield put(taskActions.deselectTasks())

  if (type === 'timeline') {
    yield put(taskActions.setTimeLine())
  } else {
    yield put(taskActions.cancelTimeLine())
  }

  yield put(push(pathname))
}
