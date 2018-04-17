import { all, fork, takeLatest, takeEvery } from 'redux-saga/effects'

import { AUTH } from './auth/auth.actions'
import { APP_STATE } from './app-state/app-state.actions'
import { TASKS } from './tasks/tasks.actions'
import { TASKS_MENU } from './tasks-menu/tasks-menu.action'
import { TREE } from './tree/tree.actions'
import { TAGS } from './tags/tags.actions'
import { COMMENTS } from './comments/comments.action'
import { ATTACHMENTS } from './attachments/attachments.action'

import * as auth from './auth/auth.sagas'
import * as task from './tasks/tasks.sagas'
import * as taskMenu from './tasks-menu/tasks-menu.sagas'
import * as tag from './tags/tags.sagas'
import * as tree from './tree/tree.sagas'
import * as appState from './app-state/app-state.sagas'
import * as comment from './comments/comments.sagas'
import * as attachment from './attachments/attachments.sagas'

export default function* root() {
  yield all([
    // auth
    fork(auth.authFlow),
    fork(auth.initDataFlow),
    takeLatest(AUTH.CONTROL_REDIRECT_SIGN_IN, auth.controlRedirectSignIn),
    takeLatest(AUTH.CONTROL_REDIRECT_TASKS, auth.controlRedirectTasks),
    takeLatest(AUTH.CHANGE_PASSWORD, auth.changePassword),
    takeLatest(AUTH.EMAIL_RESET_PASSWORD, auth.emailResetPassword),
    takeLatest(AUTH.RESET_PASSWORD, auth.resetPassword),

    // task
    takeLatest(TASKS.FETCH, task.fetchTasks),
    takeLatest(TASKS.FETCH_ARCHIVED, task.fetchArchivedTasks),
    takeLatest(TASKS.TOGGLE_IMPORTANT_REQUESTED, task.toggleImportant),
    takeLatest(TASKS.SET_DATE, task.setDate),
    takeLatest(TASKS.SET_ORDER, task.setOrder),
    takeLatest(TASKS.SET_ORDER_TIME_LINE, task.setOrderTimeLine),
    takeLatest(TASKS.SET_DUE_DATE_TIME_LINE, task.setDueDateTimeLine),
    takeLatest(TASKS.SET_DESCRIPTION, task.setDescription),
    takeLatest(TASKS.SET_SUBJECT, task.setSubject),
    takeEvery(TASKS.CREATE, task.createTask),
    takeLatest(TASKS.SET_COMPLETE, task.setComplete),
    takeLatest(TASKS.SET_INCOMPLETE, task.setIncomplete),
    takeLatest(TASKS.SET_ARCHIVE, task.setArchiveTasks),
    takeLatest(TASKS.CANCEL_ARCHIVE, task.cancelArchiveTasks),
    takeEvery(TASKS.ADD_TAG, task.addTaskTag),
    takeEvery(TASKS.REMOVE_TAG, task.removeTag),
    takeEvery(TASKS.SELECT, task.selectTask),
    takeEvery(TASKS.SELECT_ALL, task.selectAllTask),
    takeEvery(TASKS.DESELECT, task.deselectTasks),
    takeEvery(TASKS.DELETE, task.deleteTask),
    takeEvery(TASKS.UNDO_DELETE, task.undoDeleteTask),

    // task-menu
    takeEvery(TASKS_MENU.CHANGE_RANGE_FILTER, taskMenu.changeRangeFilter),
    takeEvery(TASKS_MENU.TOGGLE_IMPORTANT_FILTER, taskMenu.toggleImportantFilter),
    takeEvery(TASKS_MENU.TOGGLE_UNIMPORTANT_FILTER, taskMenu.toggleUnimportantFilter),
    takeEvery(TASKS_MENU.TOGGLE_NO_TAGS_FILTER, taskMenu.toggleNoTagsFilter),
    takeEvery(TASKS_MENU.DELETE_FILTER, taskMenu.deleteFilter),

    // tree
    takeEvery(TREE.CREATE, tree.createTreeItem),
    takeLatest(TREE.FETCH, tree.fetchTree),
    takeLatest(TREE.SELECT_PATH, tree.selectPath),
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
    takeEvery(TAGS.DESELECT, tag.deselectTags),
    takeLatest(TAGS.FETCH_TAGS_RELATIONS, tag.fetchTagsRelations),

    // comments
    takeLatest(COMMENTS.FETCH, comment.fetchComment),
    takeEvery(COMMENTS.FIREBASE_LISTENER, comment.commentsFirebaseListener),
    takeEvery(COMMENTS.CREATE, comment.createComment),
    takeEvery(COMMENTS.DELETE, comment.deleteComment),

    // attachments
    takeLatest(ATTACHMENTS.FETCH, attachment.fetchAttachment),
    takeEvery(ATTACHMENTS.FIREBASE_LISTENER, attachment.attachmentsFirebaseListener),
    takeEvery(ATTACHMENTS.CREATE, attachment.createAttachment),
    takeEvery(ATTACHMENTS.DELETE, attachment.deleteAttachment),

    // app-state
    takeEvery(APP_STATE.DEFAULT_DISPLAY, appState.defaultDisplay),
    takeEvery(APP_STATE.CHANGE_LOCATION, appState.changeLocation),
    takeLatest(APP_STATE.TAG_AUTOCOMPLETE_FOCUS, appState.handleAutocompleteFocus),
    takeLatest(APP_STATE.TAG_AUTOCOMPLETE_BLUR, appState.handleAutocompleteBlur),
    takeEvery(APP_STATE.TAG_AUTOCOMPLETE_GO_PREV, appState.handleAutocompleteGoPrev),
    takeEvery(APP_STATE.TAG_AUTOCOMPLETE_GO_NEXT, appState.handleAutocompleteGoNext),
    takeEvery(APP_STATE.TAG_AUTOCOMPLETE_TEXT_CHANGED, appState.handleAutocompleteTextChange),
    takeLatest(APP_STATE.TAG_AUTOCOMPLETE_POSITION_CHANGED, appState.handleAutocompletePositionChange),
    takeEvery(APP_STATE.TAG_AUTOCOMPLETE_SUBMIT, appState.handleAutocompleteSubmit),
    takeEvery(APP_STATE.TAG_HINTS_SELECT, appState.selectHint),
    takeLatest(APP_STATE.TAG_HINTS_OUTSIDE_CLICK, appState.handleHintsOutsideClick),
  ])
}
