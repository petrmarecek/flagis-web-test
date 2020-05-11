import schema from '../../data/schema'

export const TASKS = {
  FETCH: 'TASK/FETCH',
  FETCH_INBOX: 'TASK/FETCH_INBOX',
  FETCH_ARCHIVED: 'TASK/FETCH_ARCHIVED',
  CREATE: 'TASK/CREATE',
  FIREBASE: 'TASK/FIREBASE',
  FIREBASE_REMOVE_TASK_FOLLOWER: 'TASK/FIREBASE_REMOVE_TASK_FOLLOWER',
  FIREBASE_TAGS_RELATIONS: 'TASK/FIREBASE_TAGS_RELATIONS',
  CANCEL_TIME_LINE: 'TASK/CANCEL_TIME_LINE',
  SELECT: 'TASK/SELECT',
  SELECT_ALL: 'TASK/SELECT_ALL',
  DESELECT: 'TASK/DESELECT',
  UPDATE_SEARCH: 'TASK/UPDATE_SEARCH',
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
  SET_DESCRIPTION: 'TASK/SET_DESCRIPTION',
  SET_SUBJECT: 'TASK/SET_SUBJECT',
  MOVE: 'TASK/MOVE',
  MOVE_TIME_LINE: 'TASK/MOVE_TIME_LINE',
  ADD_TASK_TAG: 'TASK/ADD_TASK_TAG',
  ADD_TASK_FOLLOWER: 'TASK/ADD_TASK_FOLLOWER',
  REMOVE_TASK_TAG: 'TASK/REMOVE_TASK_TAG',
  REMOVE_TASK_FOLLOWER: 'TASK/REMOVE_TASK_CONTACT',
  ADD_REMOVE_TASK_TAGS: 'TASK/ADD_REMOVE_TASK_TAGS',
  ADD_TASK_TAG_STORE: 'TASK/ADD_TASK_TAG_STORE',
  SET_TASK_TAG_STORE: 'TASK/SET_TASK_TAG_STORE',
  REMOVE_TASK_TAG_STORE: 'TASK/REMOVE_TASK_TAG_STORE',
  PREPARE_DELETE: 'TASK/PREPARE_DELETE',
  DELETE: 'TASK/DELETE',
  UNDO_DELETE: 'UNDO_TASK/DELETE',
  SET_FIELD: 'TASK/SET_FIELD',
  REMOVE_FROM_LISTS: 'TASK/REMOVE_FROM_LISTS',
  SEND: 'TASK/SEND',
  SET_TASK_TAGS: 'TASK/SET_TASK_TAGS',
  ACCEPT: 'TASK/ACCEPT',
  REJECT: 'TASK/REJECT',
  UNDO_REJECT: 'UNDO_TASK/REJECT',
}

export const fetchTasks = () => ({
  type: TASKS.FETCH,
})

export const fetchInboxTasks = () => ({
  type: TASKS.FETCH_INBOX,
})

export const fetchArchivedTasks = () => ({
  type: TASKS.FETCH_ARCHIVED,
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
  },
})

export const selectAllTask = taskList => ({
  type: TASKS.SELECT_ALL,
  payload: {
    taskList,
  },
})

export const deselectTasks = () => ({
  type: TASKS.DESELECT,
})

export const updateTaskSearch = search => ({
  type: TASKS.UPDATE_SEARCH,
  payload: {
    search,
  },
})

export const setComplete = taskId => ({
  type: TASKS.SET_COMPLETE,
  payload: { taskId },
})

export const setIncomplete = taskId => ({
  type: TASKS.SET_INCOMPLETE,
  payload: { taskId },
})

export const setArchiveTasks = (
  newArchiveTasksList,
  tasksList,
  completedList,
  archivedList,
  entitiesList,
  selectedList
) => ({
  type: TASKS.SET_ARCHIVE,
  payload: {
    newArchiveTasksList,
    tasksList,
    completedList,
    archivedList,
    entitiesList,
    selectedList,
  },
})

export const cancelArchiveTasks = (
  newTasksList,
  tasksList,
  completedList,
  archivedList,
  entitiesList,
  selectedList
) => ({
  type: TASKS.CANCEL_ARCHIVE,
  payload: {
    newTasksList,
    tasksList,
    completedList,
    archivedList,
    entitiesList,
    selectedList,
  },
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

export const replaceTask = task => ({
  type: TASKS.REPLACE,
  payload: task,
  meta: { schema: schema.task },
})

export const addTask = task => ({
  type: TASKS.ADD,
  payload: task,
  meta: { schema: schema.task },
})

export const addTaskTag = (taskId, tag) => ({
  type: TASKS.ADD_TASK_TAG,
  payload: {
    taskId,
    tag,
  },
})

export const addTaskFollower = (taskId, followerId) => ({
  type: TASKS.ADD_TASK_FOLLOWER,
  payload: {
    taskId,
    followerId,
  },
})

export const removeTaskTag = (taskId, tag) => ({
  type: TASKS.REMOVE_TASK_TAG,
  payload: {
    taskId,
    tag,
  },
})

export const removeTaskFollower = (taskId, userId, followerId) => ({
  type: TASKS.REMOVE_TASK_FOLLOWER,
  payload: {
    taskId,
    userId,
    followerId,
  },
})

export const setTaskTags = (taskId, tagIds, strategy) => ({
  type: TASKS.SET_TASK_TAGS,
  payload: {
    taskId,
    tagIds,
    strategy,
  }
})

export const addRemoveTaskTags = (taskId, addTags, removeTags) => ({
  type: TASKS.ADD_REMOVE_TASK_TAGS,
  payload: {
    taskId,
    addTags,
    removeTags,
  },
})

export const addTaskTagStore = (taskId, tag) => ({
  type: TASKS.ADD_TASK_TAG_STORE,
  payload: {
    taskId,
    tag,
  },
})

export const setTaskTagStore = (taskId, tagIds) => ({
  type: TASKS.SET_TASK_TAG_STORE,
  payload: {
    taskId,
    tagIds,
  },
})

export const removeTaskTagStore = (taskId, tag) => ({
  type: TASKS.REMOVE_TASK_TAG_STORE,
  payload: {
    taskId,
    tag,
  },
})

export const prepareDeleteTask = deleteTasksIds => ({
  type: TASKS.PREPARE_DELETE,
  payload: {
    deleteTasksIds,
  },
})

export const deleteTask = (
  taskDeleteList,
  taskList,
  taskCompleteList,
  taskArchiveList,
  taskEntitiesList,
  originalData
) => ({
  type: TASKS.DELETE,
  payload: {
    taskDeleteList,
    taskList,
    taskCompleteList,
    taskArchiveList,
    taskEntitiesList,
    originalData,
  },
})

export const removeTaskFromLists = taskId => ({
  type: TASKS.REMOVE_FROM_LISTS,
  payload: { taskId },
})

export const sendTask = (taskId, followerId) => ({
  type: TASKS.SEND,
  payload: {
    taskId,
    followerId,
  },
})

export const acceptTask = (taskId, followerId) => ({
  type: TASKS.ACCEPT,
  payload: {
    taskId,
    followerId,
  },
})

export const rejectTask = originalData => ({
  type: TASKS.REJECT,
  payload: { originalData },
})
