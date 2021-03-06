import { Set } from 'immutable'

export const TASKS_MENU = {
  RESET: 'TASKS-MENU/RESET',

  // Filters
  TOGGLE_SENDER_FILTER: 'TASKS-MENU/TOGGLE_SENDER_FILTER',
  TOGGLE_ASSIGNEE_FILTER: 'TASKS-MENU/TOGGLE_ASSIGNEE_FILTER',
  CHANGE_RANGE_FILTER: 'TASKS-MENU/CHANGE_RANGE_FILTER',
  TOGGLE_IMPORTANT_FILTER: 'TASKS-MENU/TOGGLE_IMPORTANT_FILTER',
  TOGGLE_UNIMPORTANT_FILTER: 'TASKS-MENU/TOGGLE_UNIMPORTANT_FILTER',
  TOGGLE_COMPLETED_FILTER: 'TASKS-MENU/TOGGLE_COMPLETED_FILTER',
  TOGGLE_UNCOMPLETED_FILTER: 'TASKS-MENU/TOGGLE_UNCOMPLETED_FILTER',
  TOGGLE_NO_INCOMING_FILTER: 'TASKS-MENU/TOGGLE_NO_INCOMING_FILTER',
  TOGGLE_FILTER: 'TASKS-MENU/TOGGLE_FILTER',
  TOGGLE_NO_TAGS_FILTER: 'TASKS-MENU/TOGGLE_NO_TAGS_FILTER',
  DESELECT_NO_TAGS_FILTER: 'TASKS-MENU/DESELECT_NO_TAGS_FILTER',
  SET_ACTIVE_SENDER: 'TASKS-MENU/SET_ACTIVE_SENDER',
  SET_ACTIVE_ASSIGNEE: 'TASKS-MENU/SET_ACTIVE_ASSIGNEE',
  DESELECT_ACTIVE_SENDER: 'TASKS-MENU/DESELECT_ACTIVE_SENDER',
  DESELECT_ACTIVE_ASSIGNEE: 'TASKS-MENU/DESELECT_ACTIVE_ASSIGNEE',
  ADD_ACTIVE_FILTER: 'TASKS-MENU/ADD_ACTIVE_FILTER',
  DELETE_ACTIVE_FILTER: 'TASKS-MENU/DELETE_ACTIVE_FILTER',
  DELETE_FILTER: 'TASKS-MENU/DELETE_FILTER',
  VISIBLE_MENU_FILTER: 'TASKS-MENU/VISIBLE_MENU_FILTER',
  HIDE_MENU_FILTER: 'TASKS-MENU/HIDE_MENU_FILTER',
  SET_USER_IDS_FILTER: 'TASKS-MENU/SET-USER-IDS-FILTER',

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

export const toggleSenderFilter = () => ({
  type: TASKS_MENU.TOGGLE_SENDER_FILTER,
})

export const toggleAssigneeFilter = () => ({
  type: TASKS_MENU.TOGGLE_ASSIGNEE_FILTER,
})

export const changeRangeFilter = value => ({
  type: TASKS_MENU.CHANGE_RANGE_FILTER,
  value,
})

export const toggleImportantFilter = () => ({
  type: TASKS_MENU.TOGGLE_IMPORTANT_FILTER,
})

export const toggleUnimportantFilter = () => ({
  type: TASKS_MENU.TOGGLE_UNIMPORTANT_FILTER,
})

export const toggleCompletedFilter = () => ({
  type: TASKS_MENU.TOGGLE_COMPLETED_FILTER,
})

export const toggleUncompletedFilter = () => ({
  type: TASKS_MENU.TOGGLE_UNCOMPLETED_FILTER,
})

export const toggleNoIncomingFilter = () => ({
  type: TASKS_MENU.TOGGLE_NO_INCOMING_FILTER,
})

export const toggleNoTagsFilter = () => ({
  type: TASKS_MENU.TOGGLE_NO_TAGS_FILTER,
})

export const toggleFilter = filter => ({
  type: TASKS_MENU.TOGGLE_FILTER,
  payload: { filter },
})

export const deselectNoTagsFilter = () => ({
  type: TASKS_MENU.DESELECT_NO_TAGS_FILTER,
})

export const deleteFilter = filter => ({
  type: TASKS_MENU.DELETE_FILTER,
  payload: { filter },
})

export const setActiveSender = sender => ({
  type: TASKS_MENU.SET_ACTIVE_SENDER,
  payload: { sender },
})

export const setActiveAssignee = assignee => ({
  type: TASKS_MENU.SET_ACTIVE_ASSIGNEE,
  payload: { assignee },
})

export const deselectActiveSender = () => ({
  type: TASKS_MENU.DESELECT_ACTIVE_SENDER,
})

export const deselectActiveAssignee = () => ({
  type: TASKS_MENU.DESELECT_ACTIVE_ASSIGNEE,
})

export const addActiveFilter = filter => ({
  type: TASKS_MENU.ADD_ACTIVE_FILTER,
  payload: { filter },
})

export const deleteActiveFilter = filter => ({
  type: TASKS_MENU.DELETE_ACTIVE_FILTER,
  payload: { filter },
})

export const visibleMenuFilter = () => ({
  type: TASKS_MENU.VISIBLE_MENU_FILTER,
})

export const hideMenuFilter = () => ({
  type: TASKS_MENU.HIDE_MENU_FILTER,
})

export const setUserIdsFilter = (userIds = Set()) => ({
  type: TASKS_MENU.SET_USER_IDS_FILTER,
  payload: userIds,
})

// ------ Sort --------------------------------------------------------------

export const toggleSortAlgorithm = algorithm => ({
  type: TASKS_MENU.TOGGLE_SORT_ALGORITHM,
  payload: { algorithm },
})

export const visibleMenuSort = () => ({
  type: TASKS_MENU.VISIBLE_MENU_SORT,
})

export const hideMenuSort = () => ({
  type: TASKS_MENU.HIDE_MENU_SORT,
})

// ------ Options -----------------------------------------------------------

export const visibleMenuOption = () => ({
  type: TASKS_MENU.VISIBLE_MENU_OPTION,
})

export const hideMenuOption = () => ({
  type: TASKS_MENU.HIDE_MENU_OPTION,
})
