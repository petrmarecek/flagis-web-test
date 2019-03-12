import { all, fork, takeLatest, takeEvery } from 'redux-saga/effects'

import { AUTH } from './auth/auth.actions'
import { APP_STATE } from './app-state/app-state.actions'
import { TASKS } from './tasks/tasks.actions'
import { TASKS_MENU } from './tasks-menu/tasks-menu.actions'
import { TREE } from './tree/tree.actions'
import { TAGS } from './tags/tags.actions'
import { ACTIVITIES } from './activities/activities.actions'
import { NOTIFICATIONS } from './notifications/notifications.actions'
import { COMMENTS } from './comments/comments.actions'
import { ATTACHMENTS } from './attachments/attachments.actions'
import { CONTACTS } from './contacts/contacts.actions'
import { FOLLOWERS } from './followers/followers.actions'
import { ROUTING } from './routing/routing.actions'

import * as auth from './auth/auth.sagas'
import * as task from './tasks/tasks.sagas'
import * as taskMenu from './tasks-menu/tasks-menu.sagas'
import * as tag from './tags/tags.sagas'
import * as tree from './tree/tree.sagas'
import * as appState from './app-state/app-state.sagas'
import * as activities from './activities/activities.sagas'
import * as notifications from './notifications/notifications.sagas'
import * as comment from './comments/comments.sagas'
import * as attachment from './attachments/attachments.sagas'
import * as contact from './contacts/contacts.sagas'
import * as followers from './followers/followers.sagas'
import * as routing from './routing/routing.sagas'

export default function* root() {
  yield all([
    // app-state
    takeEvery(APP_STATE.DEFAULT_DISPLAY, appState.defaultDisplay),
    takeEvery(APP_STATE.HINT_SELECTED, appState.hintSelected),

    // auth
    fork(auth.authFlow),
    fork(auth.initDataFlow),
    takeLatest(AUTH.CONTROL_REDIRECT_SIGN_IN, auth.controlRedirectSignIn),
    takeLatest(AUTH.INIT_EMAIL, auth.initEmail),
    takeLatest(AUTH.CONTROL_REDIRECT_TASKS, auth.controlRedirectTasks),
    takeLatest(AUTH.CHANGE_NAME, auth.changeName),
    takeLatest(AUTH.CHANGE_USER_PHOTO, auth.changeUserPhoto),
    takeLatest(AUTH.TOGGLE_COLOR_THEME, auth.toggleColorTheme),
    takeLatest(AUTH.CHANGE_PASSWORD, auth.changePassword),
    takeLatest(AUTH.EMAIL_RESET_PASSWORD, auth.emailResetPassword),
    takeLatest(AUTH.RESET_PASSWORD, auth.resetPassword),

    // task
    takeLatest(TASKS.FETCH, task.fetchTasks),
    takeLatest(TASKS.FETCH_INBOX, task.fetchInboxTasks),
    takeLatest(TASKS.FETCH_ARCHIVED, task.fetchArchivedTasks),
    takeLatest(TASKS.TOGGLE_IMPORTANT_REQUESTED, task.toggleImportant),
    takeLatest(TASKS.SET_DATE, task.setDate),
    takeLatest(TASKS.SET_ORDER, task.setOrder),
    takeLatest(TASKS.SET_ORDER_TIME_LINE, task.setOrderTimeLine),
    takeLatest(TASKS.SET_DESCRIPTION, task.setDescription),
    takeLatest(TASKS.SET_SUBJECT, task.setSubject),
    takeEvery(TASKS.CREATE, task.createTask),
    takeLatest(TASKS.SET_COMPLETE, task.setComplete),
    takeLatest(TASKS.SET_INCOMPLETE, task.setIncomplete),
    takeLatest(TASKS.SET_ARCHIVE, task.setArchiveTasks),
    takeLatest(TASKS.CANCEL_ARCHIVE, task.cancelArchiveTasks),
    takeEvery(TASKS.ADD_TASK_TAG, task.addTaskTag),
    takeEvery(TASKS.REMOVE_TASK_TAG, task.removeTaskTag),
    takeEvery(TASKS.REMOVE_TASK_FOLLOWER, task.removeTaskFollower),
    takeEvery(TASKS.ADD_REMOVE_TASK_TAGS, task.addRemoveTaskTags),
    takeEvery(TASKS.SELECT, task.selectTask),
    takeEvery(TASKS.SELECT_ALL, task.selectAllTask),
    takeEvery(TASKS.DESELECT, task.deselectTasks),
    takeEvery(TASKS.SEND, task.sendTask),
    takeEvery(TASKS.ACCEPT, task.acceptTask),
    takeEvery(TASKS.REJECT, task.rejectTask),
    takeEvery(TASKS.UNDO_REJECT, task.undoRejectTask),
    takeEvery(TASKS.DELETE, task.deleteTask),
    takeEvery(TASKS.UNDO_DELETE, task.undoDeleteTask),

    // activities
    takeLatest(ACTIVITIES.FETCH, activities.fetchActivities),
    fork(activities.initActivitiesData),

    // notifications
    takeLatest(NOTIFICATIONS.FETCH, notifications.fetchNotifications),
    takeLatest(NOTIFICATIONS.READ, notifications.readNotification),
    takeLatest(NOTIFICATIONS.READ_ALL, notifications.readAllNotifications),

    // comments
    takeLatest(COMMENTS.FETCH, comment.fetchComment),
    fork(comment.initCommentsData),
    takeEvery(COMMENTS.CREATE, comment.createComment),
    takeEvery(COMMENTS.DELETE, comment.deleteComment),

    // attachments
    takeLatest(ATTACHMENTS.FETCH, attachment.fetchAttachment),
    fork(attachment.initAttachmentsData),
    takeEvery(ATTACHMENTS.CREATE, attachment.createAttachment),
    takeEvery(ATTACHMENTS.DELETE, attachment.deleteAttachment),

    // task-menu
    takeEvery(TASKS_MENU.TOGGLE_ASSIGNEE_FILTER, taskMenu.toggleAssigneeFilter),
    takeEvery(TASKS_MENU.CHANGE_RANGE_FILTER, taskMenu.changeRangeFilter),
    takeEvery(
      TASKS_MENU.TOGGLE_IMPORTANT_FILTER,
      taskMenu.toggleImportantFilter
    ),
    takeEvery(
      TASKS_MENU.TOGGLE_UNIMPORTANT_FILTER,
      taskMenu.toggleUnimportantFilter
    ),
    takeEvery(TASKS_MENU.TOGGLE_NO_TAGS_FILTER, taskMenu.toggleNoTagsFilter),
    takeEvery(TASKS_MENU.DELETE_FILTER, taskMenu.deleteFilter),

    // tree
    takeEvery(TREE.CREATE, tree.createTreeItem),
    takeLatest(TREE.FETCH, tree.fetchTree),
    takeEvery(TREE.SELECT_PATH, tree.selectPath),
    takeEvery(TREE.UPDATE, tree.updateTreeItem),
    takeEvery(TREE.DELETE, tree.deleteTreeItem),
    takeEvery(TREE.UNDO_DELETE, tree.undoDeleteTreeItem),
    takeEvery(TREE.DROP_TREE_ITEM, tree.dropTreeItem),
    takeEvery(TREE.DROP_SECTION, tree.dropSection),

    // tags
    takeLatest(TAGS.FETCH, tag.fetchTags),
    takeEvery(TAGS.CREATE, tag.createTag),
    takeLatest(TAGS.SELECT_ACTIVE_TAGS, tag.selectActiveTags),
    takeLatest(TAGS.UPDATE, tag.update),
    takeEvery(TAGS.DELETE, tag.deleteTag),
    takeEvery(TAGS.UNDO_DELETE, tag.undoDeleteTag),
    takeEvery(TAGS.SELECT, tag.selectTags),
    takeEvery(TAGS.DESELECT, tag.deselectTags),
    takeLatest(TAGS.FETCH_TAGS_RELATIONS, tag.fetchTagsRelations),

    // contacts
    takeLatest(CONTACTS.FETCH, contact.fetchContacts),
    takeEvery(CONTACTS.CREATE, contact.createContact),
    takeLatest(CONTACTS.SELECT, contact.selectContacts),
    takeLatest(CONTACTS.DESELECT, contact.deselectContacts),
    takeLatest(CONTACTS.UPDATE, contact.updateContacts),
    takeLatest(CONTACTS.SEND_INVITATION, contact.sendInvitationContact),
    takeEvery(CONTACTS.DELETE, contact.deleteContact),
    takeEvery(CONTACTS.UNDO_DELETE, contact.undoDeleteContact),

    // followers
    takeEvery(FOLLOWERS.CREATE, followers.createFollower),
    takeEvery(FOLLOWERS.DELETE, followers.deleteFollower),

    // routing
    takeEvery(ROUTING.CHANGE_LOCATION, routing.changeLocation),
    takeEvery(ROUTING.CHANGE_NAVIGATION, routing.changeNavigation),
    takeEvery(
      ROUTING.CHANGE_NAVIGATION_SECONDARY,
      routing.changeNavigationSecondary
    ),
  ])
}
