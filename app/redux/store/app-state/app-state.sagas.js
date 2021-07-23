import { routes } from 'utils/routes'
import { autocompleteLocations } from 'components/autocomplete/enums'

// toast notifications
import toast from 'utils/toastify-helper'
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
import * as tagSelectors from 'redux/store/tags/tags.selectors'
import * as errorActions from 'redux/store/errors/errors.actions'
import {
  sentryBreadcrumbCategory,
  sentryTagType,
} from 'redux/store/errors/errors.common'
import { callApi } from 'redux/store/common.sagas'
import api from 'redux/utils/api'
import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as contactsActions from 'redux/store/contacts/contacts.actions'

export function* defaultDisplay() {
  yield put(appStateActions.hideArchivedTasks())
  yield put(taskActions.deselectTasks())
  yield put(taskActions.updateTaskSearch(''))
  yield put(tagActions.deselectTags())
  yield put(contactActions.deselectContacts())
  yield put(appStateActions.resetScrollbarPosition())
  yield put(tasksMenuActions.resetTasksMenu())
  yield put(treeActions.clearTagTreeSelection())
  yield put(push(routes.user.tasks))
}

export function* hintSelected(action) {
  const { location, context, hint } = action.payload
  const { parentId, isNewHint } = context

  // Hint selected within main search context
  try {
    if (location === autocompleteLocations.MAIN_SEARCH) {
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
    if (location === autocompleteLocations.TAG_TREE) {
      if (hint.email) {
        // If contact is not yet defined, add it to the app
        if (isNewHint && hint.email) {
          const userEmail = yield select(state =>
            authSelectors.getUserEmail(state)
          )

          // validation for email of user
          if (userEmail === hint.email) {
            toast.error(toastCommon.errorMessages.contact.userEmailConflict, {
              position: toastCommon.position.DEFAULT,
              autoClose: toastCommon.duration.ERROR_DURATION,
            })

            return
          }

          const data = { email: hint.email }
          const contact = yield callApi(api.contacts.create, data)
          yield put(contactsActions.addContact(contact))

          yield put(
            treeActions.createTreeItem({
              title: hint.title || null,
              parentId: parentId,
              order: Date.now(),
              fromUserId: contact.id,
              toUserId: contact.id,
            })
          )
        } else {
          yield put(
            treeActions.createTreeItem({
              title: hint.title || null,
              parentId: parentId,
              order: Date.now(),
              fromUserId: hint.id,
              toUserId: hint.id,
            })
          )
        }
      } else {
        yield put(
          treeActions.createTreeItem({
            title: hint.title || null,
            parentId: parentId,
            order: Date.now(),
            fromUserId: null,
            toUserId: null,
          })
        )
      }

      return
    }

    // Hint(tag) selected within task detail context
    if (location === autocompleteLocations.TASK_DETAIL_TAGS) {
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
        const userEmail = yield select(state =>
          authSelectors.getUserEmail(state)
        )

        // validation for email of user
        if (userEmail === hint.email) {
          toast.error(toastCommon.errorMessages.contact.userEmailConflict, {
            position: toastCommon.position.DEFAULT,
            autoClose: toastCommon.duration.ERROR_DURATION,
          })

          return
        }

        const data = { email: hint.email }
        const contact = yield callApi(api.contacts.create, data)
        yield put(contactsActions.addContact(contact))

        yield put(followerActions.createFollower(parentId, contact.id))
      } else {
        yield put(followerActions.createFollower(parentId, hint.id))
      }
    }

    // Hint(contact) selected within tasks menu filter
    const isAssigneeFilter =
      location === autocompleteLocations.TASK_MENU_FILTER_CONTACT_ASSIGNEE
    const isSenderFilter =
      location === autocompleteLocations.TASK_MENU_FILTER_CONTACT_SENDER
    if (isAssigneeFilter || isSenderFilter) {
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

      if (isAssigneeFilter) {
        yield put(tasksMenuActions.setActiveAssignee(hint.id))
      }

      if (isSenderFilter) {
        yield put(tasksMenuActions.setActiveSender(hint.id))
      }
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
