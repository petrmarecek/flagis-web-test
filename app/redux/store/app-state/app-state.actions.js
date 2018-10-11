export const APP_STATE = {
  // Default display
  DEFAULT_DISPLAY: 'APP-STATE/DEFAULT_DISPLAY',

  // React router
  CHANGE_LOCATION: 'APP-STATE/CHANGE_LOCATION',

  // Loader
  LOADER_VISIBLE: 'APP-STATE/LOADER_VISIBLE',
  LOADER_HIDE: 'APP-STATE/LOADER_HIDE',

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
}

// ------ Default display -----------------------------------------------------------

export const defaultDisplay = () => ({
  type: APP_STATE.DEFAULT_DISPLAY
})

// ------ React router --------------------------------------------------------------

export const changeLocation = pathname => ({
  type: APP_STATE.CHANGE_LOCATION,
  payload: {
    pathname
  }
})

// ------ Loader --------------------------------------------------------------------

export const visibleLoader = () => ({
  type: APP_STATE.LOADER_VISIBLE
})

export const hideLoader = () => ({
  type: APP_STATE.LOADER_HIDE
})

// ------ Multi select --------------------------------------------------------------

export const visibleMultiSelect = () => ({
  type: APP_STATE.MULTI_SELECT_VISIBLE
})

export const hideMultiSelect = () => ({
  type: APP_STATE.MULTI_SELECT_HIDE
})

// ------ Archived tasks ------------------------------------------------------------

export const visibleArchivedTasks = () => ({
  type: APP_STATE.ARCHIVED_TASKS_VISIBLE
})

export const hideArchivedTasks = () => ({
  type: APP_STATE.ARCHIVED_TASKS_HIDE
})

// ------ Inbox tasks ------------------------------------------------------------

export const visibleInboxTasks = () => ({
  type: APP_STATE.INBOX_TASKS_VISIBLE
})

export const hideInboxTasks = () => ({
  type: APP_STATE.INBOX_TASKS_HIDE
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
    detail
  }
})

export const deselectDetail = detail => ({
  type: APP_STATE.DESELECT_DETAIL,
  payload: {
    detail
  }
})

// ------ Error ---------------------------------------------------------------------

export const setError = (type, message) => ({
  type: APP_STATE.SET_ERROR,
  payload: {
    type,
    message,
  }
})

export const deselectError = type => ({
  type: APP_STATE.DESELECT_ERROR,
  payload: { type }
})

// ------ Left panel ----------------------------------------------------------------

export const resizeLeftPanel = width => ({
  type: APP_STATE.LEFT_PANEL_RESIZE,
  payload: {
    width
  }
})

// ------ Undo ----------------------------------------------------------------------

export const showUndo = name => ({
  type: APP_STATE.UNDO_SHOW,
  payload: {
    name
  }
})

export const hideUndo = () => ({
  type: APP_STATE.UNDO_HIDE
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
  }
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
  }
})

