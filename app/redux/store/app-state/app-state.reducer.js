import typeToReducer from 'type-to-reducer'

import { APP_STATE } from 'redux/store/app-state/app-state.actions'
import { AUTH } from 'redux/store/auth/auth.actions'
import { AppStateStore } from 'redux/data/records'

export default typeToReducer(
  {
    [APP_STATE.UPDATE_WINDOW]: (state, action) =>
      state
        .setIn(['window', 'width'], action.payload.window.innerWidth)
        .setIn(['window', 'height'], action.payload.window.innerHeight),

    [APP_STATE.SET_LOADER]: (state, action) =>
      state.setIn(['loader', action.payload.type], true),

    [APP_STATE.DESELECT_LOADER]: (state, action) =>
      state.setIn(['loader', action.payload.type], false),

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

    [APP_STATE.PRIMARY_HIDDEN_NAVIGATION_VISIBLE]: state =>
      state.setIn(
        ['navigation', 'primary', 'hiddenNavigation', 'isVisible'],
        true
      ),

    [APP_STATE.SET_SCROLLBAR_POSITION]: (state, action) =>
      state.setIn(
        ['scrollbarPosition', action.payload.list],
        action.payload.position
      ),

    [APP_STATE.RESET_SCROLLBAR_POSITION]: state =>
      state
        .setIn(['scrollbarPosition', 'task'], null)
        .setIn(['scrollbarPosition', 'tag'], null)
        .setIn(['scrollbarPosition', 'archived'], null)
        .setIn(['scrollbarPosition', 'contact'], null)
        .setIn(['scrollbarPosition', 'notification'], null),

    [APP_STATE.PRIMARY_HIDDEN_NAVIGATION_HIDE]: state =>
      state.setIn(
        ['navigation', 'primary', 'hiddenNavigation', 'isVisible'],
        false
      ),

    [APP_STATE.SET_PRIMARY_HIDDEN_NAVIGATION_ANIMATION]: state =>
      state.setIn(
        ['navigation', 'primary', 'hiddenNavigation', 'isAnimation'],
        true
      ),

    [APP_STATE.DESELECT_PRIMARY_HIDDEN_NAVIGATION_ANIMATION]: state =>
      state.setIn(
        ['navigation', 'primary', 'hiddenNavigation', 'isAnimation'],
        false
      ),

    [APP_STATE.ACCOUNT_NAVIGATION_VISIBLE]: state =>
      state.setIn(['navigation', 'account', 'isVisible'], true),

    [APP_STATE.ACCOUNT_NAVIGATION_HIDE]: state =>
      state.setIn(['navigation', 'account', 'isVisible'], false),

    [APP_STATE.SET_ERROR]: (state, action) =>
      state
        .setIn([action.payload.type, 'error'], true)
        .setIn([action.payload.type, 'message'], action.payload.message),

    [APP_STATE.DESELECT_ERROR]: (state, action) =>
      state
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

    [APP_STATE.UNDO_SHOW]: (state, action) =>
      state.setIn(['undoBox'], action.payload),

    [APP_STATE.UNDO_HIDE]: state => state.setIn(['undoBox'], null),

    [APP_STATE.DIALOG_SHOW]: (state, action) => {
      if (action.payload.name === 'tree-item-tag-update') {
        state = state
          .setIn(
            ['tagAutocompletes', 'treeUpdate', 'text'],
            action.payload.data.treeItem.tag.title
          )
          .setIn(['tagHints', 'search'], action.payload.data.treeItem.tag.title)
      }

      return state.setIn(['currentDialog'], action.payload)
    },

    [APP_STATE.DIALOG_HIDE]: state => state.setIn(['currentDialog'], null),

    [AUTH.LOGOUT]: () => new AppStateStore(),
  },
  new AppStateStore()
)
