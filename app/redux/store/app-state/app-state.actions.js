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

  // Task tag detail
  SET_DETAIL: 'APP-STATE/SET_DETAIL',
  DESELECT_DETAIL: 'APP-STATE/DESELECT_DETAIL',

  // Error
  SET_ERROR: 'APP-STATE/SET_ERROR',
  DESELECT_ERROR: 'APP-STATE/DESELECT_ERROR',

  // Left panel
  LEFT_PANEL_RESIZE: 'APP-STATE/LEFT_PANEL_RESIZE',

  // Dialog
  DIALOG_SHOW: 'APP-STATE/DIALOG_SHOW',
  DIALOG_HIDE: 'APP-STATE/DIALOG_HIDE',

  // Tag hints
  TAG_HINTS_SHOW: 'APP-STATE/TAG_HINTS_SHOW',
  TAG_HINTS_HIDE: 'APP-STATE/TAG_HINTS_HIDE',
  TAG_HINTS_UPDATE: 'APP-STATE/TAG_HINTS_UPDATE',
  TAG_HINTS_SELECT: 'APP-STATE/TAG_HINTS_SELECT',
  TAG_HINTS_OUTSIDE_CLICK: 'APP-STATE/TAG_HINTS_OUTSIDE_CLICK',

  // Tag autocomplete
  TAG_AUTOCOMPLETE_GO_PREV: 'APP-STATE/TAG_AUTOCOMPLETE_GO_PREV',
  TAG_AUTOCOMPLETE_GO_NEXT: 'APP-STATE/TAG_AUTOCOMPLETE_GO_NEXT',
  TAG_AUTOCOMPLETE_FOCUS: 'APP-STATE/TAG_AUTOCOMPLETE_FOCUS',
  TAG_AUTOCOMPLETE_SET_FOCUS: 'APP-STATE/TAG_AUTOCOMPLETE_SET_FOCUS',
  TAG_AUTOCOMPLETE_BLUR: 'APP-STATE/TAG_AUTOCOMPLETE_BLUR',
  TAG_AUTOCOMPLETE_TEXT_CHANGED: 'APP-STATE/TAG_AUTOCOMPLETE_TEXT_CHANGED',
  TAG_AUTOCOMPLETE_POSITION_CHANGED: 'APP-STATE/TAG_AUTOCOMPLETE_POSITION_CHANGED',
  TAG_AUTOCOMPLETE_SUBMIT: 'APP-STATE/TAG_AUTOCOMPLETE_SUBMIT',
  TAG_AUTOCOMPLETE_RESET: 'APP-STATE/TAG_AUTOCOMPLETE_RESET',
}

// ------ Default display --------------------------------------------------------------

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

// ------ Loader --------------------------------------------------------------

export const visibleLoader = () => ({
  type: APP_STATE.LOADER_VISIBLE
})

export const hideLoader = () => ({
  type: APP_STATE.LOADER_HIDE
})

// ------ Multi select --------------------------------------------------------

export const visibleMultiSelect = () => ({
  type: APP_STATE.MULTI_SELECT_VISIBLE
})

export const hideMultiSelect = () => ({
  type: APP_STATE.MULTI_SELECT_HIDE
})

// ------ Archived tasks --------------------------------------------------------

export const visibleArchivedTasks = () => ({
  type: APP_STATE.ARCHIVED_TASKS_VISIBLE
})

export const hideArchivedTasks = () => ({
  type: APP_STATE.ARCHIVED_TASKS_HIDE
})

// ------ Task tag detail --------------------------------------------------------

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

// ------ Error ---------------------------------------------------------------

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

// ------ Left panel ----------------------------------------------------------

export const resizeLeftPanel = width => ({
  type: APP_STATE.LEFT_PANEL_RESIZE,
  payload: {
    width
  }
})

// ------ Dialog --------------------------------------------------------------

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

// ------ Tag hints -----------------------------------------------------------

export const showTagHints = payload => ({
  type: APP_STATE.TAG_HINTS_SHOW,
  payload,
})

export const updateTagHints = payload => ({
  type: APP_STATE.TAG_HINTS_UPDATE,
  payload,
})

export const hintsClickOutside = context => ({
  type: APP_STATE.TAG_HINTS_OUTSIDE_CLICK,
  payload: {
    context,
  }
})

export const hideTagHints = () => ({
  type: APP_STATE.TAG_HINTS_HIDE,
})

export const tagHintSelected = (autocompleteId, context, tag) => ({
  type: APP_STATE.TAG_HINTS_SELECT,
  payload: {
    autocompleteId,
    context,
    tag,
  }
})

// ------ Tag autocomplete ----------------------------------------------------

export const tagAutocompleteGoNext = autocompleteId => ({
  type: APP_STATE.TAG_AUTOCOMPLETE_GO_NEXT,
  payload: {
    autocompleteId,
  },
})

export const tagAutocompleteGoPrev = autocompleteId => ({
  type: APP_STATE.TAG_AUTOCOMPLETE_GO_PREV,
  payload: {
    autocompleteId
  },
})

export const tagAutocompleteFocus = (autocompleteId, data) => ({
  type: APP_STATE.TAG_AUTOCOMPLETE_FOCUS,
  payload: {
    autocompleteId,
    data,
  }
})

export const tagAutocompleteSetFocus = autocompleteId => ({
  type: APP_STATE.TAG_AUTOCOMPLETE_SET_FOCUS,
  payload: {
    autocompleteId
  },
})

export const tagAutocompleteBlur = autocompleteId => ({
  type: APP_STATE.TAG_AUTOCOMPLETE_BLUR,
  payload: {
    autocompleteId
  }
})

export const tagAutocompleteTextChanged = (autocompleteId, text, position) => ({
  type: APP_STATE.TAG_AUTOCOMPLETE_TEXT_CHANGED,
  payload: {
    autocompleteId,
    text,
    position,
  }
})

export const tagAutocompletePositionChanged = (autocompleteId, position) => ({
  type: APP_STATE.TAG_AUTOCOMPLETE_POSITION_CHANGED,
  payload: {
    autocompleteId,
    position,
  }
})

export const tagAutocompleteSubmit = (autocompleteId, context, tag) => ({
  type: APP_STATE.TAG_AUTOCOMPLETE_SUBMIT,
  payload: {
    autocompleteId,
    context,
    tag,
  }
})

export const tagAutocompleteReset = (autocompleteId) => ({
  type: APP_STATE.TAG_AUTOCOMPLETE_RESET,
  payload: {
    autocompleteId,
  }
})
