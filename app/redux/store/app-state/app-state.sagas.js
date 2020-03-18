import { List } from 'immutable'
import { routes } from 'utils/routes'

// toast notifications
import { toast } from 'react-toastify'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import { put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as tasksMenuActions from 'redux/store/tasks-menu/tasks-menu.actions'
import * as tagActions from 'redux/store/tags/tags.actions'
import * as treeActions from 'redux/store/tree/tree.actions'
import * as contactActions from 'redux/store/contacts/contacts.actions'
import * as followerActions from 'redux/store/followers/followers.actions'
import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as tagSelectors from 'redux/store/tags/tags.selectors'
import * as errorActions from 'redux/store/errors/errors.actions'
import {
  sentryBreadcrumbCategory,
  sentryTagType,
} from 'redux/store/errors/errors.common'
import { callApi } from 'redux/store/common.sagas'
import api from 'redux/utils/api'

export function* defaultDisplay() {
  yield put(appStateActions.hideArchivedTasks())
  yield put(appStateActions.hideInboxTasks())
  yield put(taskActions.deselectTasks())
  yield put(taskActions.cancelTimeLine())
  yield put(taskActions.updateTaskSearch(''))
  yield put(tagActions.deselectTags())
  yield put(contactActions.deselectContacts())
  yield put(appStateActions.resetScrollbarPosition())
  yield put(tasksMenuActions.resetTasksMenu())
  yield put(tagActions.selectActiveTags(List()))
  yield put(push(routes.user.tasks))
}

export function* hintSelected(action) {
  const { location, context, hint } = action.payload
  const { parentId, isNewHint, isSendMe, isSendAll } = context

  // Hint selected within main search context
  try {
    if (location === 'mainSearch') {
      if (isNewHint) {
        toast.error(
          toastCommon.errorMessages.createEntity.notAllowedCreate(
            'tag',
            'Tag filter'
          ),
          {
            position: toastCommon.position.DEFAULT,
            autoClose: toastCommon.duration.ERROR_DURATION,
          }
        )

        return
      }

      const activeTags = yield select(state =>
        tagSelectors.getActiveTagsIds(state)
      )
      yield put(tagActions.selectActiveTags(activeTags.unshift(hint.id)))
      return
    }

    // Hint selected within tree context
    if (location === 'tagTree') {
      yield put(
        treeActions.createTreeItem({
          title: hint.title,
          parentId: parentId,
          order: Date.now(),
        })
      )
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
      let profile = hint
      yield put(appStateActions.setAnimation())

      // If contact is not yet defined, add it to the app
      if (isNewHint) {
        const email = profile.email
        const data = { email }
        profile = yield callApi(api.contacts.create, data)
      }

      yield put(followerActions.createFollower(parentId, profile.id))
    }

    // Hint(contact) selected within tasks menu filter
    if (location === 'tasksMenuFilterContacts') {
      // Click on Sent Me button in tasksMenu for assignee filter
      if (isSendMe) {
        const userId = yield select(state => authSelectors.getUserId(state))

        yield put(tasksMenuActions.setActiveAssignee(userId))
        return
      }

      // Click on Sent All button in tasksMenu for assignee filter
      if (isSendAll) {
        yield put(tasksMenuActions.setActiveAssignee('sendAll'))
        return
      }

      // Not allowed create a new contact
      if (isNewHint) {
        toast.error(
          toastCommon.errorMessages.createEntity.notAllowedCreate(
            'contact',
            'Filter'
          ),
          {
            position: toastCommon.position.DEFAULT,
            autoClose: toastCommon.duration.ERROR_DURATION,
          }
        )

        return
      }

      yield put(tasksMenuActions.setActiveAssignee(hint.id))
    }
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
