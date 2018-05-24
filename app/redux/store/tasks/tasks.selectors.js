import { List } from 'immutable'
import { createSelector } from 'reselect'
import search from 'redux/services/search'
import moment from 'moment'
import intersection from 'lodash/intersection'
import {
  getTaskDetail,
  getTaskArchiveDetail,
  getArchivedTasksVisibility
} from '../app-state/app-state.selectors'
import { getEntitiesTasks, getEntitiesTags } from '../entities/entities.selectors'
import { getActiveTagsIds } from '../tags/tags.selectors'
import { getRoutingPathname } from '../routing/routing.selectors'

// ------ Helper functions ----------------------------------------------------

/**
 * Filters tasks by date range
 * @param {String} range Date range today/week/month
 * @param {Array} tasks List of tasks to filter
 * @returns {Array} Result list of task
 */

function filterByDateRange(range, tasks) {
  const now = moment()
  const today = now.dayOfYear()
  const month = now.month()
  const week = now.week()

  const dateFilters = {
    today: dueDate => dueDate.dayOfYear() === today,
    month: dueDate => dueDate.month() === month,
    week: dueDate => dueDate.week() === week,
  }

  const rangeFilter = dateFilters[range]
  return tasks.filter(task => {

    // filter tasks without dueDate
    if (!task.dueDate) {
      return false
    }

    // include those which match filter or are overdue
    const dueDate = moment(task.dueDate)
    return rangeFilter(dueDate) || dueDate.isBefore(now)
  })
}

/**
 * Loads task entities for given task IDs
 * @param {Object} ids Array of tasks
 * @param {Object} data Object of tasksItems, tasksMenu, entitiesTasks, entitiesTags, activeTagsIds
 * @returns {Array} List of tasks
 */

function loadTasks(ids, data) {

  // apply search filter
  if (data.tasksMenu.getIn(['filters', 'searchText'])) {
    const foundIds = search.tasks.get(data.tasksMenu.getIn(['filters', 'searchText'])).map(item => item.ref)
    ids = intersection(ids, foundIds)
  }

  let tasks = ids.map(taskId => {
    const task = data.entitiesTasks.get(taskId)
    const tags = task.tags.map(tagId => data.entitiesTags.get(tagId))
    return task.set('tags', tags)
  })

  // sort task by order
  tasks.sort((a, b) => {
    if (a.order > b.order) return -1;
    if (a.order < b.order) return 1;

    return 0;
  })

  // apply tag search
  const activeTags = data.activeTagsIds
  if (activeTags.size !== 0) {
    const tags = activeTags.map(tagId => {
      return data.entitiesTags.get(tagId)
    }).toList()

    tasks = findTasksByTags(tasks, tags)
  }

  // apply date range filter
  const range = data.tasksMenu.getIn(['filters', 'range'])
  if (range) {
    tasks = filterByDateRange(range, tasks)
  }

  // apply important filter
  if (data.tasksMenu.getIn(['filters', 'important'])) {
    tasks = tasks.filter(task => task.isImportant)
  }

  // apply unimportant filter
  if (data.tasksMenu.getIn(['filters', 'unimportant'])) {
    tasks = tasks.filter(task => !task.isImportant)
  }

  // apply no tags filter
  if (data.tasksMenu.getIn(['filters', 'noTags'])) {
    tasks = tasks.filter(task => task.tags.size === 0)
  }

  // apply sort alphabetically
  if (data.tasksMenu.getIn(['sort', 'alphabet'])) {
    tasks.sort((a, b) => {
      if(a.subject.toLowerCase() < b.subject.toLowerCase()) return -1;
      if(a.subject.toLowerCase() > b.subject.toLowerCase()) return 1;
      return 0;
    })
  }

  // apply sort by due date
  if (data.tasksMenu.getIn(['sort', 'dueDate'])) {
    const tasksDueDate = tasks.filter(task => task.dueDate)
    const tasksOthers = tasks.filter(task => !task.dueDate)

    // Sort tasks with dueDate by dueDate and orderTimeLine
    tasksDueDate.sort((a, b) => {
      if (moment(a.dueDate) < moment(b.dueDate)) return -1;
      if (moment(a.dueDate) > moment(b.dueDate)) return 1;

      if (a.orderTimeLine > b.orderTimeLine) return -1;
      if (a.orderTimeLine < b.orderTimeLine) return 1;

      return 0;
    })

    // Sort tasks without dueDate by orderTimeLine
    tasksOthers.sort((a, b) => {
      if (a.orderTimeLine > b.orderTimeLine) return -1;
      if (a.orderTimeLine < b.orderTimeLine) return 1;

      return 0;
    })

    tasks = tasksDueDate.concat(tasksOthers)
  }

  // apply sort by importance
  if (data.tasksMenu.getIn(['sort', 'important'])) {
    const tasksImportant = tasks.filter(task => task.isImportant)
    const tasksUnimportant = tasks.filter(task => !task.isImportant)

    tasks = tasksImportant.concat(tasksUnimportant)
  }

  // apply sort incomplete
  if (data.tasksMenu.getIn(['sort', 'incomplete'])) {
    const tasksIncomplete = tasks.filter(task => !task.isCompleted)
    const tasksComplete = tasks.filter(task => task.isCompleted)

    tasks = tasksIncomplete.concat(tasksComplete)
  }

  return tasks
}

/**
 * Loads task entities for given task IDs (only archived tasks)
 * @param {Object} ids Array of tasks
 * @param {Object} data Object of archivedTasksItems, tasksMenu, entitiesTasks, entitiesTags, activeTagsIds
 * @returns {Array} List of tasks
 */

function loadArchiveTasks(ids, data) {
  // apply search filter
  if (data.tasksMenu.getIn(['filters', 'searchText'])) {
    const foundIds = search.tasks.get(data.tasksMenu.getIn(['filters', 'searchText'])).map(item => item.ref)
    ids = intersection(ids, foundIds)
  }

  let tasks = ids.map(taskId => {
    const task = data.entitiesTasks.get(taskId)
    const tags = task.tags.map(tagId => data.entitiesTags.get(tagId))
    return task.set('tags', tags)
  })

  // apply sort by archive date
  tasks.sort((a, b) => {
    if(a.archivedAt > b.archivedAt) return -1;
    if(a.archivedAt < b.archivedAt) return 1;
    return 0;
  })

  // apply tag search
  const activeTags = data.activeTagsIds
  if (activeTags.size !== 0) {
    const tags = activeTags.map(tagId => {
      return data.entitiesTags.get(tagId)
    }).toList()

    tasks = findTasksByTags(tasks, tags)
  }

  return tasks
}

/**
 * Return last selected task
 * @param {List} selectionTasks List of selected tasks
 * @returns {String} id of task
 */

function getSelectedTaskId(selectionTasks) {
  if (selectionTasks.size === 0) {
    return null
  }

  return selectionTasks.last()
}

/**
 * Find tasks by active tags
 * @param {Array} tasks Array of tasks entities
 * @param {List} tags List of tags entities
 * @returns {Array} entities Array of tasks
 */

function findTasksByTags(tasks, tags) {
  const entities = []

  tasks.forEach(task => {
    let includes = true

    tags.forEach(tag => {
      if (!task.tags.includes(tag)) {
        includes = false
      }
    })

    if (includes) {
      entities.push(task)
    }

  })

  return entities
}

// ------ Selectors ----------------------------------------------------

// Local selectors
const getTasksIsFetching = state => state.getIn(['tasks', 'isFetching'])
const getArchivedTasksIsFetching = state => state.getIn(['tasks', 'archived', 'isFetching'])
const getTasksMenu = state => state.getIn(['tasksMenu'])

// Export selectors
export const getTasksItems = state => state.getIn(['tasks', 'items'])
export const getArchivedTasksItems = state => state.getIn(['tasks', 'archived', 'items'])
export const getTaskTags = (state, taskId) => state.getIn(['entities', 'tasks', taskId, 'tags'])
export const getCompletedTasksItems = state => state.getIn(['tasks', 'completed'])
export const getSelectionTasks = state => state.getIn(['tasks', 'selection'])

// ------ Reselect selectors ----------------------------------------------------

export const getTasks = createSelector(
  getRoutingPathname,
  getArchivedTasksIsFetching,
  getArchivedTasksItems,
  getTasksIsFetching,
  getTasksItems,
  getTasksMenu,
  getEntitiesTasks,
  getEntitiesTags,
  getActiveTagsIds,
  (pathName,
   archivedTasksIsFetching,
   archivedTasksItems,
   tasksIsFetching,
   tasksItems,
   tasksMenu,
   entitiesTasks,
   entitiesTags,
   activeTagsIds) => {

    const archived = pathName === '/user/archive'
    const data = { tasksMenu, entitiesTasks, entitiesTags, activeTagsIds }

    if (archived) {
      return ({
        isFetching: archivedTasksIsFetching,
        items: loadArchiveTasks(archivedTasksItems.toArray(), data),
        type: 'archived',
      })
    }

    return ({
      isFetching: tasksIsFetching,
      items: loadTasks(tasksItems.toArray(), data),
      type: 'main',
    })
  }
)

export const getCompletedTasks = createSelector(
  getCompletedTasksItems,
  getTasksMenu,
  getEntitiesTasks,
  getEntitiesTags,
  getActiveTagsIds,
  (completedTasksItems, tasksMenu, entitiesTasks, entitiesTags, activeTagsIds) => {

    const data = { tasksMenu, entitiesTasks, entitiesTags, activeTagsIds }

    return ({
      items: loadTasks(completedTasksItems.toArray(), data)
    })
  }
)

export const getCurrentTaskTags = createSelector(
  getEntitiesTasks,
  getSelectionTasks,
  (entitiesTasks, selectionTasks) => {

    const selectedTaskId = getSelectedTaskId(selectionTasks)
    if (!selectedTaskId) {
      return List()
    }

    return entitiesTasks.getIn([selectedTaskId, 'tags'])
  }
)

export const getSelectTasks = createSelector(
  getSelectionTasks,
  getTasksMenu,
  getEntitiesTasks,
  getEntitiesTags,
  getActiveTagsIds,
  (selectionTasks, tasksMenu, entitiesTasks, entitiesTags, activeTagsIds) => {

    const data = { tasksMenu, entitiesTasks, entitiesTags, activeTagsIds }
    return loadTasks(selectionTasks.toArray(), data)
  }
)

export const getTasksId = createSelector(
  getRoutingPathname,
  getArchivedTasksItems,
  getTasksItems,
  getTasksMenu,
  getEntitiesTasks,
  getEntitiesTags,
  getActiveTagsIds,
  (pathName, archivedTasksItems, tasksItems, tasksMenu, entitiesTasks, entitiesTags, activeTagsIds) => {

    const archived = pathName === '/user/archive'
    const data = { tasksMenu, entitiesTasks, entitiesTags, activeTagsIds }

    if (archived) {
      const tasks = loadArchiveTasks(archivedTasksItems.toArray(), data)
      return List(tasks.map(task => task.id))
    }

    const tasks = loadTasks(tasksItems.toArray(), data)
    return List(tasks.map(task => task.id))

  }
)

export const getCompletedTasksId = createSelector(
  getCompletedTasksItems,
  getTasksMenu,
  getEntitiesTasks,
  getEntitiesTags,
  getActiveTagsIds,
  (completedTasksItems, tasksMenu, entitiesTasks, entitiesTags, activeTagsIds) => {

    const data = { tasksMenu, entitiesTasks, entitiesTags, activeTagsIds }
    const tasks = loadTasks(completedTasksItems.toArray(), data)
    return List(tasks.map(task => task.id))
  }
)

export const getCurrentTask = createSelector(
  getEntitiesTasks,
  getEntitiesTags,
  getSelectionTasks,
  (entitiesTasks, entitiesTags, selectionTasks) => {

    const selectedTaskId = getSelectedTaskId(selectionTasks)
    if (!selectedTaskId) {
      return null
    }

    const task = entitiesTasks.get(selectedTaskId)
    return task.setIn(['tags'], task.getIn(['tags']).map(tagId => entitiesTags.getIn([tagId])))
  }
)

export const getNextTask = createSelector(
  getTaskDetail,
  getTaskArchiveDetail,
  getSelectionTasks,
  getArchivedTasksVisibility,
  getArchivedTasksItems,
  getTasksItems,
  getTasksMenu,
  getEntitiesTasks,
  getEntitiesTags,
  getActiveTagsIds,
  (isTaskDetail,
   isTaskArchiveDetail,
   selectionTasks,
   isArchivedTasksVisible,
   archivedTasksItems,
   tasksItems,
   tasksMenu,
   entitiesTasks,
   entitiesTags,
   activeTagsIds) => {

    const selectedTaskId = getSelectedTaskId(selectionTasks)
    if (!selectedTaskId) {
      return null
    }

    // Tasks after filtering and sorting
    const data = { tasksMenu, entitiesTasks, entitiesTags, activeTagsIds }
    let typeTask = loadTasks(tasksItems.toArray(), data)
    typeTask = List(typeTask.map(task => task.id))
    if (isArchivedTasksVisible) {
      typeTask = List(loadArchiveTasks(archivedTasksItems.toArray(), data))
      typeTask = List(typeTask.map(task => task.id))
    }

    const sizeListOfTasks = typeTask.size
    if (sizeListOfTasks === 1) {
      return null
    }

    let nextIndex = typeTask.indexOf(selectedTaskId) + 1
    if (nextIndex === sizeListOfTasks) {
      nextIndex = 0
    }

    const nextTaskId = typeTask.get(nextIndex)
    const nextTask = entitiesTasks.get(nextTaskId)
    return nextTask.setIn(['tags'], nextTask.getIn(['tags']).map(tagId => entitiesTags.getIn([tagId])))
  }
)

export const getPreviousTask = createSelector(
  getTaskDetail,
  getTaskArchiveDetail,
  getSelectionTasks,
  getArchivedTasksVisibility,
  getArchivedTasksItems,
  getTasksItems,
  getTasksMenu,
  getEntitiesTasks,
  getEntitiesTags,
  getActiveTagsIds,
  (isTaskDetail,
   isTaskArchiveDetail,
   selectionTasks,
   isArchivedTasksVisible,
   archivedTasksItems,
   tasksItems,
   tasksMenu,
   entitiesTasks,
   entitiesTags,
   activeTagsIds) => {
    if (!isTaskDetail && !isTaskArchiveDetail) {
      return null
    }

    const selectedTaskId = getSelectedTaskId(selectionTasks)
    if (!selectedTaskId) {
      return null
    }

    // Tasks after filtering and sorting
    const data = { tasksMenu, entitiesTasks, entitiesTags, activeTagsIds }
    let typeTask = loadTasks(tasksItems.toArray(), data)
    typeTask = List(typeTask.map(task => task.id))
    if (isArchivedTasksVisible) {
      typeTask = List(loadArchiveTasks(archivedTasksItems.toArray(), data))
      typeTask = List(typeTask.map(task => task.id))
    }

    const sizeListOfTasks = typeTask.size
    if (sizeListOfTasks === 1) {
      return null
    }

    let prevIndex = typeTask.indexOf(selectedTaskId) - 1
    if (prevIndex < 0) {
      prevIndex = sizeListOfTasks - 1
    }

    const nextTaskId = typeTask.get(prevIndex)
    const nextTask = entitiesTasks.get(nextTaskId)
    return nextTask.setIn(['tags'], nextTask.getIn(['tags']).map(tagId => entitiesTags.getIn([tagId])))
  }
)

export const getSelectTasksTags = (state) => {
  const selectTasks = state.getIn(['tasks', 'selection'])
  return selectTasks.map(taskId => {
    const tagsList = getTaskTags(state, taskId)

    if (tagsList.size === 0) {
      return List()
    }

    return tagsList
  }).toList()
}
