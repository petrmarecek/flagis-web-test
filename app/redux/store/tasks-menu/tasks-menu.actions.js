export const TASKS_MENU = {
  RESET: 'TASKS-MENU/RESET',

  // Filters
  CHANGE_RANGE_FILTER: 'TASKS-MENU/CHANGE_RANGE_FILTER',
  TOGGLE_IMPORTANT_FILTER: 'TASKS-MENU/TOGGLE_IMPORTANT_FILTER',
  TOGGLE_UNIMPORTANT_FILTER: 'TASKS-MENU/TOGGLE_UNIMPORTANT_FILTER',
  TOGGLE_NO_TAGS_FILTER: 'TASKS-MENU/TOGGLE_NO_TAGS_FILTER',
  CHANGE_SEARCH_TEXT_FILTER: 'TASKS-MENU/CHANGE_SEARCH_TEXT_FILTER',
  ADD_ACTIVE_FILTER: 'TASKS-MENU/ADD_ACTIVE_FILTER',
  DELETE_ACTIVE_FILTER: 'TASKS-MENU/DELETE_ACTIVE_FILTER',
  DELETE_FILTER: 'TASKS-MENU/DELETE_FILTER',
  VISIBLE_MENU_FILTER: 'TASKS-MENU/VISIBLE_MENU_FILTER',
  HIDE_MENU_FILTER: 'TASKS-MENU/HIDE_MENU_FILTER',

  // Sort
  TOGGLE_SORT_ALGORITHM: 'TASKS-MENU/TOGGLE_SORT_ALGORITHM',
  VISIBLE_MENU_SORT: 'TASKS-MENU/VISIBLE_MENU_SORT',
  HIDE_MENU_SORT: 'TASKS-MENU/HIDE_MENU_SORT',

  // Options
  VISIBLE_MENU_OPTION: 'TASKS-MENU/VISIBLE_MENU_OPTION',
  HIDE_MENU_OPTION: 'TASKS-MENU/HIDE_MENU_OPTION',
}

export const resetTasksMenu = () => ({
  type: TASKS_MENU.RESET,
})

// ------ Filters -----------------------------------------------------------

export const changeRangeFilter = value => ({
  type: TASKS_MENU.CHANGE_RANGE_FILTER,
  value
})

export const toggleImportantFilter = () => ({
  type: TASKS_MENU.TOGGLE_IMPORTANT_FILTER
})

export const toggleUnimportantFilter = () => ({
  type: TASKS_MENU.TOGGLE_UNIMPORTANT_FILTER
})

export const toggleNoTagsFilter = () => ({
  type: TASKS_MENU.TOGGLE_NO_TAGS_FILTER
})

export const changeSearchText = value => ({
  type: TASKS_MENU.CHANGE_SEARCH_TEXT_FILTER,
  payload: {
    value
  }
})

export const addActiveFilter = filter => ({
  type: TASKS_MENU.ADD_ACTIVE_FILTER,
  payload: {
    filter
  }
})

export const deleteActiveFilter = filter => ({
  type: TASKS_MENU.DELETE_ACTIVE_FILTER,
  payload: {
    filter
  }
})

export const deleteFilter = filter => ({
  type: TASKS_MENU.DELETE_FILTER,
  payload: {
    filter
  }
})

export const visibleMenuFilter = () => ({
  type: TASKS_MENU.VISIBLE_MENU_FILTER
})

export const hideMenuFilter = () => ({
  type: TASKS_MENU.HIDE_MENU_FILTER
})

// ------ Sort --------------------------------------------------------------

export const toggleSortAlgorithm = algorithm => ({
  type: TASKS_MENU.TOGGLE_SORT_ALGORITHM,
  payload: {
    algorithm
  }
})

export const visibleMenuSort = () => ({
  type: TASKS_MENU.VISIBLE_MENU_SORT
})

export const hideMenuSort = () => ({
  type: TASKS_MENU.HIDE_MENU_SORT
})

// ------ Options -----------------------------------------------------------


export const visibleMenuOption = () => ({
  type: TASKS_MENU.VISIBLE_MENU_OPTION
})

export const hideMenuOption = () => ({
  type: TASKS_MENU.HIDE_MENU_OPTION
})