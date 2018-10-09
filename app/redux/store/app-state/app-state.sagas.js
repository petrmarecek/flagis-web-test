import { put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as tasksMenuActions from 'redux/store/tasks-menu/tasks-menu.actions'
import * as tagActions from 'redux/store/tags/tags.actions'
import * as treeActions from 'redux/store/tree/tree.actions'
import * as contactActions from 'redux/store/contacts/contacts.actions'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import * as tagSelectors from 'redux/store/tags/tags.selectors'
import { toast } from 'react-toastify'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'

export function* defaultDisplay() {
  const isArchivedTask = select(state => appStateSelectors.getArchivedTasksVisibility(state))
  if (isArchivedTask) {
    yield put(appStateActions.hideArchivedTasks())
  }

  yield put(taskActions.deselectTasks())
  yield put(tagActions.deselectTags())
  yield put(contactActions.deselectContacts())
  yield put(tasksMenuActions.resetTasksMenu())
  yield put(treeActions.selectPath([]))
  yield put(push('/user/tasks'))
}

export function* changeLocation(action) {
  const pathname = action.payload.pathname
  yield put(push(pathname))
}

export function* hintSelected(action) {

  const { location, context, hint } = action.payload
  const { parentId, isNewHint } = context

  // Hint selected in main search
  if (location === 'mainSearch') {
    if (isNewHint) {
      toast.error(errorMessages.autocomplete.notAllowedCreate, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_ERROR_DURATION,
      })

      return
    }

    const activeTags = yield select(state => tagSelectors.getActiveTagsIds(state))
    yield put(tagActions.selectActiveTags(activeTags.unshift(hint.id)))
    return
  }

  // Hint selected within tree context
  if (location === 'tagTree') {
    yield put(treeActions.createTreeItem({
      title: hint.title,
      parentId: parentId,
      order: Date.now()
    }))
    return
  }

  // Hint(tag) selected within task detail context
  if (location === 'taskDetailTags') {

    // If tag is not yet defined, add it to the app
    if (isNewHint) {
      yield put(tagActions.addTag(hint))
    }

    yield put(taskActions.addTaskTag(parentId, hint))
  }

  // Hint(contact) selected within task detail context
  if (location === 'taskDetailContacts') {
    yield put(appStateActions.setAnimation())

    // If contact is not yet defined, add it to the app
    if (isNewHint) {
      hint.nickName = null

      yield put(contactActions.addContact(hint))
    }

    yield put(taskActions.addTaskContact(parentId, hint))
  }
}


