export const APP_STATE = {
  // Window
  UPDATE_WINDOW: 'APP-STATE/UPDATE_WINDOW',

  // Default display
  DEFAULT_DISPLAY: 'APP-STATE/DEFAULT_DISPLAY',

  // Loader
  SET_LOADER: 'APP-STATE/SET_LOADER',
  DESELECT_LOADER: 'APP-STATE/DESELECT_LOADER',

  // Multi Select
  MULTI_SELECT_VISIBLE: 'APP-STATE/MULTI_SELECT_VISIBLE',
  MULTI_SELECT_HIDE: 'APP-STATE/MULTI_SELECT_HIDE',

  // Archived tasks
  ARCHIVED_TASKS_VISIBLE: 'APP-STATE/ARCHIVED_TASKS_VISIBLE',
  ARCHIVED_TASKS_HIDE: 'APP-STATE/ARCHIVED_TASKS_HIDE',

  // Inbox tasks
  INBOX_TASKS_VISIBLE: 'APP-STATE/INBOX_TASKS_VISIBLE',
  INBOX_TASKS_HIDE: 'APP-STATE/INBOX_TASKS_HIDE',

  // Task tag detail
  SET_ANIMATION: 'APP-STATE/SET_ANIMATION',
  DESELECT_ANIMATION: 'APP-STATE/DESELECT_ANIMATION',
  SET_DETAIL: 'APP-STATE/SET_DETAIL',
  DESELECT_DETAIL: 'APP-STATE/DESELECT_DETAIL',

  // Navigation
  PRIMARY_HIDDEN_NAVIGATION_VISIBLE:
    'APP-STATE/PRIMARY_HIDDEN_NAVIGATION_VISIBLE',
  PRIMARY_HIDDEN_NAVIGATION_HIDE: 'APP-STATE/PRIMARY_HIDDEN_NAVIGATION_HIDE',
  ACCOUNT_NAVIGATION_VISIBLE: 'APP-STATE/ACCOUNT_NAVIGATION_VISIBLE',
  ACCOUNT_NAVIGATION_HIDE: 'APP-STATE/ACCOUNT_NAVIGATION_HIDE',

  // Error
  SET_ERROR: 'APP-STATE/SET_ERROR',
  DESELECT_ERROR: 'APP-STATE/DESELECT_ERROR',

  // Left panel
  LEFT_PANEL_RESIZE: 'APP-STATE/LEFT_PANEL_RESIZE',

  // Undo
  UNDO_SHOW: 'APP-STATE/UNDO_VISIBLE',
  UNDO_HIDE: 'APP-STATE/UNDO_HIDE',
  UNDO_ACTIVE: 'APP-STATE/UNDO_ACTIVE',

  // Dialog
  DIALOG_SHOW: 'APP-STATE/DIALOG_SHOW',
  DIALOG_HIDE: 'APP-STATE/DIALOG_HIDE',

  // Hints
  HINT_SELECTED: 'APP-STATE/HINT_SELECTED',

  // Color Theme
  TOGGLE_COLOR_THEME: 'APP-STATE/TOGGLE_COLOR_THEME',
}

// ------ Window --------------------------------------------------------------------

export const updateWindow = window => ({
  type: APP_STATE.UPDATE_WINDOW,
  payload: { window },
})

// ------ Default display -----------------------------------------------------------

export const defaultDisplay = () => ({
  type: APP_STATE.DEFAULT_DISPLAY,
})

// ------ Loader --------------------------------------------------------------------

export const setLoader = type => ({
  type: APP_STATE.SET_LOADER,
  payload: { type },
})

export const deselectLoader = type => ({
  type: APP_STATE.DESELECT_LOADER,
  payload: { type },
})

// ------ Multi select --------------------------------------------------------------

export const visibleMultiSelect = () => ({
  type: APP_STATE.MULTI_SELECT_VISIBLE,
})

export const hideMultiSelect = () => ({
  type: APP_STATE.MULTI_SELECT_HIDE,
})

// ------ Archived tasks ------------------------------------------------------------

export const visibleArchivedTasks = () => ({
  type: APP_STATE.ARCHIVED_TASKS_VISIBLE,
})

export const hideArchivedTasks = () => ({
  type: APP_STATE.ARCHIVED_TASKS_HIDE,
})

// ------ Inbox tasks ------------------------------------------------------------

export const visibleInboxTasks = () => ({
  type: APP_STATE.INBOX_TASKS_VISIBLE,
})

export const hideInboxTasks = () => ({
  type: APP_STATE.INBOX_TASKS_HIDE,
})

// ------ Task tag detail -----------------------------------------------------------

export const setAnimation = () => ({
  type: APP_STATE.SET_ANIMATION,
})

export const deselectAnimation = () => ({
  type: APP_STATE.DESELECT_ANIMATION,
})

export const setDetail = detail => ({
  type: APP_STATE.SET_DETAIL,
  payload: {
    detail,
  },
})

export const deselectDetail = detail => ({
  type: APP_STATE.DESELECT_DETAIL,
  payload: {
    detail,
  },
})

// ------ Navigation ------------------------------------------------------------

export const primaryHiddenNavigationVisible = () => ({
  type: APP_STATE.PRIMARY_HIDDEN_NAVIGATION_VISIBLE,
})

export const primaryHiddenNavigationHide = () => ({
  type: APP_STATE.PRIMARY_HIDDEN_NAVIGATION_HIDE,
})

export const accountNavigationVisible = () => ({
  type: APP_STATE.ACCOUNT_NAVIGATION_VISIBLE,
})

export const accountNavigationHide = () => ({
  type: APP_STATE.ACCOUNT_NAVIGATION_HIDE,
})

// ------ Error ---------------------------------------------------------------------

export const setError = (type, message) => ({
  type: APP_STATE.SET_ERROR,
  payload: {
    type,
    message,
  },
})

export const deselectError = type => ({
  type: APP_STATE.DESELECT_ERROR,
  payload: { type },
})

// ------ Left panel ----------------------------------------------------------------

export const resizeLeftPanel = width => ({
  type: APP_STATE.LEFT_PANEL_RESIZE,
  payload: {
    width,
  },
})

// ------ Undo ----------------------------------------------------------------------

export const showUndo = name => ({
  type: APP_STATE.UNDO_SHOW,
  payload: {
    name,
  },
})

export const hideUndo = () => ({
  type: APP_STATE.UNDO_HIDE,
})

export const activeUndo = undoType => ({
  type: APP_STATE.UNDO_ACTIVE,
  undoType,
})

// ------ Dialog --------------------------------------------------------------------

export const showDialog = (dialogName, data) => ({
  type: APP_STATE.DIALOG_SHOW,
  payload: {
    name: dialogName,
    data,
  },
})

export const hideDialog = () => ({
  type: APP_STATE.DIALOG_HIDE,
})

// ------ Hints -----------------------------------------------------------

export const hintSelected = (location, context, hint) => ({
  type: APP_STATE.HINT_SELECTED,
  payload: {
    location,
    context,
    hint,
  },
})

// ------ Color Theme -----------------------------------------------------------

export const toggleColorTheme = theme => ({
  type: APP_STATE.TOGGLE_COLOR_THEME,
  payload: { theme },
})
