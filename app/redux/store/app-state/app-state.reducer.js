import typeToReducer from 'type-to-reducer'

import { APP_STATE } from 'redux/store/app-state/app-state.actions'
import { AUTH } from 'redux/store/auth/auth.actions'
import { AppStateStore } from 'redux/data/records'

export default typeToReducer({

  [APP_STATE.LOADER_VISIBLE]: state =>
    state.setIn(['loader', 'isVisible'], true),

  [APP_STATE.LOADER_HIDE]: state =>
    state.setIn(['loader', 'isVisible'], false),

  [APP_STATE.MULTI_SELECT_VISIBLE]: state =>
    state.setIn(['multiSelect', 'isVisible'], true),

  [APP_STATE.MULTI_SELECT_HIDE]: state =>
    state.setIn(['multiSelect', 'isVisible'], false),

  [APP_STATE.ARCHIVED_TASKS_VISIBLE]: state =>
    state.setIn(['archivedTasks', 'isVisible'], true),

  [APP_STATE.ARCHIVED_TASKS_HIDE]: state =>
    state.setIn(['archivedTasks', 'isVisible'], false),

  [APP_STATE.SET_ANIMATION]: state =>
    state.setIn(['detail', 'animation'], true),

  [APP_STATE.DESELECT_ANIMATION]: state =>
    state.setIn(['detail', 'animation'], false),

  [APP_STATE.SET_DETAIL]: (state, action) =>
    state.setIn(['detail', action.payload.detail], true),

  [APP_STATE.DESELECT_DETAIL]: (state, action) =>
    state.setIn(['detail', action.payload.detail], false),

  [APP_STATE.SET_ERROR]: (state, action) => state
    .setIn([action.payload.type, 'error'], true)
    .setIn([action.payload.type, 'message'], action.payload.message),

  [APP_STATE.DESELECT_ERROR]: (state, action) => state
    .setIn([action.payload.type, 'error'], false)
    .setIn([action.payload.type, 'message'], null),

  [APP_STATE.LEFT_PANEL_RESIZE]: (state, action) => {
    const suggestedWidth = action.payload.width

    // At least one third should be left for center panel
    const centerPanelMinWidth = Math.round(window.innerWidth / 1.5)
    const maxWidth = window.innerWidth - centerPanelMinWidth - 20

    // Set boundaries
    const width = Math.min(Math.max(suggestedWidth, 290), maxWidth)
    return state.setIn(['leftPanel', 'width'], width)
  },

  [APP_STATE.UNDO_SHOW]: (state, action) => state
    .setIn(['undoBox'], action.payload),

  [APP_STATE.UNDO_HIDE]: state => state
    .setIn(['undoBox'], null),

  [APP_STATE.DIALOG_SHOW]: (state, action) => {

    if (action.payload.name === "tree-item-tag-update") {
      state = state
        .setIn(['tagAutocompletes', 'treeUpdate', 'text'], action.payload.data.treeItem.tag.title)
        .setIn(['tagHints', 'search'], action.payload.data.treeItem.tag.title)
    }

    return state.setIn(['currentDialog'], action.payload)
  },

  [APP_STATE.DIALOG_HIDE]: state =>
    state.setIn(['currentDialog'], null),

  [AUTH.LOGOUT]: () => new AppStateStore(),

}, new AppStateStore())
