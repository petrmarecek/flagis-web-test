import schema from '../../data/schema'

export const TASKS = {
  FETCH: 'TASK/FETCH',
  FETCH_ARCHIVED: 'TASK/FETCH_ARCHIVED',
  CREATE: 'TASK/CREATE',
  FIREBASE: 'TASK/FIREBASE',
  FIREBASE_TAGS_RELATIONS: 'TASK/FIREBASE_TAGS_RELATIONS',
  SELECT: 'TASK/SELECT',
  SELECT_ALL: 'TASK/SELECT_ALL',
  DESELECT: 'TASK/DESELECT',
  SET_COMPLETE: 'TASK/SET_COMPLETE',
  SET_INCOMPLETE: 'TASK/SET_INCOMPLETE',
  SET_ARCHIVE: 'TASK/SET_ARCHIVE',
  CANCEL_ARCHIVE: 'TASK/CANCEL_ARCHIVE',
  TOGGLE_IMPORTANT_REQUESTED: 'TASK/TOGGLE_IMPORTANT-REQUESTED',
  SET_IMPORTANT: 'TASK/SET_IMPORTANT',
  REPLACE: 'TASK/REPLACE',
  ADD: 'TASK/ADD',
  SET_DATE: 'TASK/SET_DATE',
  SET_ORDER: 'TASK/SET_ORDER',
  SET_ORDER_TIME_LINE: 'TASK/SET_TIME_LINE_ORDER',
  SET_DESCRIPTION: 'TASK/SET_DESCRIPTION',
  SET_SUBJECT: 'TASK/SET_SUBJECT',
  MOVE: 'TASK/MOVE',
  MOVE_TIME_LINE: 'TASK/MOVE_TIME_LINE',
  ADD_TASK_TAG: 'TASK/ADD_TASK_TAG',
  REMOVE_TASK_TAG: 'TASK/REMOVE_TASK_TAG',
  ADD_REMOVE_TASK_TAGS: 'TASK/ADD_REMOVE_TASK_TAGS',
  ADD_TASK_TAG_STORE: 'TASK/ADD_TASK_TAG_STORE',
  REMOVE_TASK_TAG_STORE: 'TASK/REMOVE_TASK_TAG_STORE',
  DELETE: 'TASK/DELETE',
  UNDO_DELETE: 'UNDO_TASK/DELETE',
  SET_FIELD: 'TASK/SET_FIELD',
  REMOVE_FROM_LISTS: 'TASK/REMOVE_FROM_LISTS',
}

export const fetchTasks = () => ({
  type: TASKS.FETCH
})

export const fetchArchivedTasks = () => ({
  type: TASKS.FETCH_ARCHIVED
})

export const createTask = taskWithTags => ({
  type: TASKS.CREATE,
  payload: taskWithTags,
})

export const selectTask = (taskList, isMultiSelect) => ({
  type: TASKS.SELECT,
  payload: {
    taskList,
    isMultiSelect,
  }
})

export const selectAllTask = taskList => ({
  type: TASKS.SELECT_ALL,
  payload: {
    taskList
  }
})

export const deselectTasks = () => ({
  type: TASKS.DESELECT,
})

export const setComplete = taskId => ({
  type: TASKS.SET_COMPLETE,
  payload: { taskId }
})

export const setIncomplete = taskId => ({
  type: TASKS.SET_INCOMPLETE,
  payload: { taskId }
})

export const setArchiveTasks = (newArchiveTasksList, tasksList, completedList, archivedList, entitiesList, selectedList) => ({
  type: TASKS.SET_ARCHIVE,
  payload: {
    newArchiveTasksList,
    tasksList,
    completedList,
    archivedList,
    entitiesList,
    selectedList
  }
})

export const cancelArchiveTasks = (newTasksList, tasksList, completedList, archivedList, entitiesList, selectedList) => ({
  type: TASKS.CANCEL_ARCHIVE,
  payload: {
    newTasksList,
    tasksList,
    completedList,
    archivedList,
    entitiesList,
    selectedList
  }
})

export const requestToggleImportant = task => ({
  type: TASKS.TOGGLE_IMPORTANT_REQUESTED,
  payload: { task },
})

export const setImportant = (task, isImportant) => ({
  type: TASKS.SET_IMPORTANT,
  payload: { task, isImportant },
})

export const setDate = (task, date, type) => ({
  type: TASKS.SET_DATE,
  payload: { task, date, type },
})

export const setOrder = (task, order) => ({
  type: TASKS.SET_ORDER,
  payload: { task, order },
})

export const setOrderTimeLine = (task, dueDate, orderTimeLine) => ({
  type: TASKS.SET_ORDER_TIME_LINE,
  payload: {
    task,
    dueDate,
    orderTimeLine
  },
})

export const setDescription = (task, description) => ({
  type: TASKS.SET_DESCRIPTION,
  payload: { task, description },
})

export const setSubject = (task, subject) => ({
  type: TASKS.SET_SUBJECT,
  payload: { task, subject },
})

export const setField = (task, fieldName, fieldValue) => ({
  type: TASKS.SET_FIELD,
  payload: { task, fieldName, fieldValue },
})

export const moveTask = (taskId, order) => ({
  type: TASKS.MOVE,
  payload: {
    taskId,
    order,
  },
})

export const moveTimeLineTask = (taskId, dueDate, orderTimeLine) => ({
  type: TASKS.MOVE_TIME_LINE,
  payload: {
    taskId,
    dueDate,
    orderTimeLine,
  },
})

export const replaceTask = task => ({
  type: TASKS.REPLACE,
  payload: task,
  meta: { schema: schema.task }
})

export const addTask = task => ({
  type: TASKS.ADD,
  payload: task,
  meta: { schema: schema.task }
})

export const addTaskTag = (taskId, tag) => ({
  type: TASKS.ADD_TASK_TAG,
  payload: {
    taskId,
    tag
  }
})

export const removeTaskTag = (taskId, tag) => ({
  type: TASKS.REMOVE_TASK_TAG,
  payload: {
    taskId,
    tag
  }
})

export const addRemoveTaskTags = (taskId, addTags, removeTags) => ({
  type: TASKS.ADD_REMOVE_TASK_TAGS,
  payload: {
    taskId,
    addTags,
    removeTags
  }
})

export const addTaskTagStore = (taskId, tag) => ({
  type: TASKS.ADD_TASK_TAG_STORE,
  payload: {
    taskId,
    tag
  }
})

export const removeTaskTagStore = (taskId, tag) => ({
  type: TASKS.REMOVE_TASK_TAG_STORE,
  payload: {
    taskId,
    tag
  }
})

export const deleteTask = (taskDeleteList, taskList, taskCompleteList, taskArchiveList, taskEntitiesList, originalData) => ({
  type: TASKS.DELETE,
  payload: {
    taskDeleteList,
    taskList,
    taskCompleteList,
    taskArchiveList,
    taskEntitiesList,
    originalData,
  }
})

export const removeTaskFromLists = taskId => ({
  type: TASKS.REMOVE_FROM_LISTS,
  payload: {
    taskId
  }
})


