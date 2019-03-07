import { List } from 'immutable'
import { createSelector } from 'reselect'
import search from 'redux/services/search'
import moment from 'moment'
import intersection from 'lodash/intersection'

import { getUserId } from '../auth/auth.selectors'
import {
  getArchivedTasksVisibility,
  getInboxTasksVisibility,
} from '../app-state/app-state.selectors'
import {
  getEntitiesTasks,
  getEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
} from '../entities/entities.selectors'
import { getActiveTagsIds } from '../tags/tags.selectors'
import { getTasksMenu } from '../tasks-menu/tasks-menu.selectors'
import {
  compareTaskBySubject,
  getAssigneeOfTask,
} from '../../utils/component-helper'

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
 * Loads all task entities for given task IDs
 * @param {Array} ids Array of all tasks
 * @param {Object} data Object
 * @returns {Array} array of tasks
 */

function loadAllTasks(ids, data) {
  const {
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts,
  } = data

  return ids.map(taskId => {
    const task = entitiesTasks.get(taskId)
    const tags = task.tags.map(tagId => entitiesTags.get(tagId))
    const createdBy = entitiesContacts.get(task.createdById)
    const followers = task.followers.map(followerId => {
      const follower = entitiesFollowers.get(followerId)
      const profile = entitiesContacts.get(follower.userId)

      return follower.set('profile', profile)
    })

    return task
      .set('tags', tags)
      .set('createdBy', createdBy)
      .set('followers', followers)
  })
}

/**
 * Loads task entities for given task IDs
 * @param {Array} ids Array of tasks
 * @param {Object} data Object
 * @returns {Array} array of tasks
 */

function loadTasks(ids, data) {
  const {
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts,
    activeTagsIds,
    tasksSearch,
    tasksMenu,
    timeLine,
    userId,
  } = data

  // apply search filter
  if (tasksSearch) {
    const foundIds = search.tasks.get(tasksSearch).map(item => item.ref)
    ids = intersection(ids, foundIds)
  }

  let tasks = ids.map(taskId => {
    const task = entitiesTasks.get(taskId)
    const tags = task.tags.map(tagId => entitiesTags.get(tagId))
    const createdBy = entitiesContacts.get(task.createdById)
    const followers = task.followers.map(followerId => {
      const follower = entitiesFollowers.get(followerId)
      const profile = entitiesContacts.get(follower.userId)

      return follower.set('profile', profile)
    })

    return task
      .set('tags', tags)
      .set('createdBy', createdBy)
      .set('followers', followers)
  })

  // sort task by order
  tasks.sort((a, b) => {
    if (a.order > b.order) return -1
    if (a.order < b.order) return 1

    return 0
  })

  // apply tag search
  const activeTags = activeTagsIds
  if (activeTags.size !== 0) {
    const tags = activeTags
      .map(tagId => {
        return entitiesTags.get(tagId)
      })
      .toList()

    tasks = findTasksByTags(tasks, tags)
  }

  // apply assignee filter
  if (tasksMenu.getIn(['filters', 'activeAssignee'])) {
    tasks = tasks.filter(task => {
      const activeAssignee = tasksMenu.getIn(['filters', 'activeAssignee'])
      const followers = task.getIn(['followers'])
      const assignee = getAssigneeOfTask(followers)
      const assigneeId = assignee ? assignee.userId : null

      // filter every send tasks
      if (activeAssignee === 'sendAll' && assigneeId !== null) {
        return assigneeId !== userId && assignee.status !== 'rejected'
      }

      return assigneeId === activeAssignee && assignee.status !== 'rejected'
    })
  }

  // apply date range filter
  const range = tasksMenu.getIn(['filters', 'range'])
  if (range) {
    tasks = filterByDateRange(range, tasks)
  }

  // apply important filter
  if (tasksMenu.getIn(['filters', 'important'])) {
    tasks = tasks.filter(task => task.isImportant)
  }

  // apply unimportant filter
  if (tasksMenu.getIn(['filters', 'unimportant'])) {
    tasks = tasks.filter(task => !task.isImportant)
  }

  // apply no tags filter
  if (tasksMenu.getIn(['filters', 'noTags'])) {
    tasks = tasks.filter(task => task.tags.size === 0)
  }

  // apply sort alphabetically
  if (tasksMenu.getIn(['sort', 'alphabet'])) {
    tasks.sort(compareTaskBySubject)
  }

  // apply time line
  if (timeLine) {
    const tasksDueDate = tasks.filter(task => task.dueDate)
    const tasksOthers = tasks.filter(task => !task.dueDate)

    // Sort tasks with dueDate by dueDate and orderTimeLine
    tasksDueDate.sort((a, b) => {
      if (moment(a.dueDate) < moment(b.dueDate)) return -1
      if (moment(a.dueDate) > moment(b.dueDate)) return 1

      if (a.orderTimeLine > b.orderTimeLine) return -1
      if (a.orderTimeLine < b.orderTimeLine) return 1

      return 0
    })

    // Sort tasks without dueDate by orderTimeLine
    tasksOthers.sort((a, b) => {
      if (a.orderTimeLine > b.orderTimeLine) return -1
      if (a.orderTimeLine < b.orderTimeLine) return 1

      return 0
    })

    tasks = tasksDueDate.concat(tasksOthers)
  }

  // apply sort by importance
  if (tasksMenu.getIn(['sort', 'important'])) {
    const tasksImportant = tasks.filter(task => task.isImportant)
    const tasksUnimportant = tasks.filter(task => !task.isImportant)

    tasks = tasksImportant.concat(tasksUnimportant)
  }

  // apply sort incomplete
  if (tasksMenu.getIn(['sort', 'incomplete'])) {
    const tasksIncomplete = tasks.filter(task => !task.isCompleted)
    const tasksComplete = tasks.filter(task => task.isCompleted)

    tasks = tasksIncomplete.concat(tasksComplete)
  }

  return tasks
}

/**
 * Loads task entities for given task IDs (only archived tasks)
 * @param {Array} ids Array of tasks
 * @param {Object} data Object
 * @returns {Array} array of tasks
 */

function loadArchiveTasks(ids, data) {
  const {
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts,
    activeTagsIds,
    tasksSearch,
  } = data

  // apply search filter
  if (tasksSearch) {
    const foundIds = search.tasks.get(tasksSearch).map(item => item.ref)
    ids = intersection(ids, foundIds)
  }

  let tasks = ids.map(taskId => {
    const task = entitiesTasks.get(taskId)
    const tags = task.tags.map(tagId => entitiesTags.get(tagId))
    const createdBy = entitiesContacts.get(task.createdById)
    const followers = task.followers.map(followerId => {
      const follower = entitiesFollowers.get(followerId)
      const profile = entitiesContacts.get(follower.userId)

      return follower.set('profile', profile)
    })

    return task
      .set('tags', tags)
      .set('createdBy', createdBy)
      .set('followers', followers)
  })

  // apply sort by archive date
  tasks.sort((a, b) => {
    if (a.archivedAt > b.archivedAt) return -1
    if (a.archivedAt < b.archivedAt) return 1
    return 0
  })

  // apply tag search
  const activeTags = activeTagsIds
  if (activeTags.size !== 0) {
    const tags = activeTags
      .map(tagId => {
        return entitiesTags.get(tagId)
      })
      .toList()

    tasks = findTasksByTags(tasks, tags)
  }

  return tasks
}

/**
 * Loads task entities for given task IDs (only inbox tasks)
 * @param {Array} ids Array of tasks
 * @param {Object} data Object
 * @returns {Array} array of tasks
 */

function loadInboxTasks(ids, data) {
  const {
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts,
  } = data

  const tasks = ids.map(taskId => {
    const task = entitiesTasks.get(taskId)
    const tags = task.tags.map(tagId => entitiesTags.get(tagId))
    const createdBy = entitiesContacts.get(task.createdById)
    const followers = task.followers.map(followerId => {
      const follower = entitiesFollowers.get(followerId)
      const profile = entitiesContacts.get(follower.userId)

      return follower.set('profile', profile)
    })

    return task
      .set('tags', tags)
      .set('createdBy', createdBy)
      .set('followers', followers)
  })

  // sort task by order
  tasks.sort((a, b) => {
    if (a.order > b.order) return -1
    if (a.order < b.order) return 1

    return 0
  })

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

// ------ Selectors -------------------------------------------------------------

// Local selectors
const getTasksIsFetching = state => state.getIn(['tasks', 'isFetching'])
const getArchivedTasksIsFetching = state =>
  state.getIn(['tasks', 'archived', 'isFetching'])
const getInboxTasksIsFetching = state =>
  state.getIn(['tasks', 'inbox', 'isFetching'])

// Export selectors
export const getTimeLine = state => state.getIn(['tasks', 'timeLine'])
export const getTasksItems = state => state.getIn(['tasks', 'items'])
export const getTasksSearch = state => state.getIn(['tasks', 'search'])
export const getArchivedTasksItems = state =>
  state.getIn(['tasks', 'archived', 'items'])
export const getInboxTasksItems = state =>
  state.getIn(['tasks', 'inbox', 'items'])
export const getTaskTags = (state, taskId) =>
  state.getIn(['entities', 'tasks', taskId, 'tags'])
export const getCompletedTasksItems = state =>
  state.getIn(['tasks', 'completed'])
export const getSelectionTasks = state => state.getIn(['tasks', 'selection'])
export const getTaskById = (state, taskId) => {
  const entitiesTasks = getEntitiesTasks(state)
  return entitiesTasks.get(taskId)
}

// ------ Reselect selectors ----------------------------------------------------

export const getAllTasks = createSelector(
  getArchivedTasksItems,
  getTasksItems,
  getInboxTasksItems,
  getEntitiesTasks,
  getEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  (
    archivedTasksItems,
    tasksItems,
    InboxTasksItems,
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts
  ) => {
    let ids = tasksItems
      .toSet()
      .union(InboxTasksItems.toSet())
      .toList()
    ids = ids
      .toSet()
      .union(archivedTasksItems.toSet())
      .toList()
    const data = {
      entitiesTasks,
      entitiesTags,
      entitiesFollowers,
      entitiesContacts,
    }

    return loadAllTasks(ids.toArray(), data)
  }
)

export const getTasks = createSelector(
  getArchivedTasksVisibility,
  getInboxTasksVisibility,
  getArchivedTasksIsFetching,
  getArchivedTasksItems,
  getTasksIsFetching,
  getTasksItems,
  getInboxTasksIsFetching,
  getInboxTasksItems,
  getTasksSearch,
  getTasksMenu,
  getTimeLine,
  getEntitiesTasks,
  getEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    isArchivedTasksVisible,
    isInboxTasksVisible,
    archivedTasksIsFetching,
    archivedTasksItems,
    tasksIsFetching,
    tasksItems,
    inboxTasksIsFetching,
    InboxTasksItems,
    tasksSearch,
    tasksMenu,
    timeLine,
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts,
    activeTagsIds,
    userId
  ) => {
    const data = {
      entitiesTasks,
      entitiesTags,
      entitiesFollowers,
      entitiesContacts,
      activeTagsIds,
      tasksSearch,
      tasksMenu,
      timeLine,
      userId,
    }

    // Load archived tasks
    if (isArchivedTasksVisible) {
      return {
        isFetching: archivedTasksIsFetching,
        items: loadArchiveTasks(archivedTasksItems.toArray(), data),
        type: 'archived',
      }
    }

    // Load inbox tasks
    if (isInboxTasksVisible) {
      return {
        isFetching: inboxTasksIsFetching,
        items: loadInboxTasks(InboxTasksItems.toArray(), data),
        type: 'inbox',
      }
    }

    // Load main tasks
    return {
      isFetching: tasksIsFetching,
      items: loadTasks(tasksItems.toArray(), data),
      type: 'main',
    }
  }
)

export const getCompletedTasks = createSelector(
  getCompletedTasksItems,
  getTasksSearch,
  getTasksMenu,
  getTimeLine,
  getEntitiesTasks,
  getEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    completedTasksItems,
    tasksSearch,
    tasksMenu,
    timeLine,
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts,
    activeTagsIds,
    userId
  ) => {
    const data = {
      entitiesTasks,
      entitiesTags,
      entitiesFollowers,
      entitiesContacts,
      activeTagsIds,
      tasksSearch,
      tasksMenu,
      timeLine,
      userId,
    }

    return {
      items: loadTasks(completedTasksItems.toArray(), data),
    }
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
  getTasksSearch,
  getTasksMenu,
  getTimeLine,
  getEntitiesTasks,
  getEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    selectionTasks,
    tasksSearch,
    tasksMenu,
    timeLine,
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts,
    activeTagsIds,
    userId
  ) => {
    const data = {
      entitiesTasks,
      entitiesTags,
      entitiesFollowers,
      entitiesContacts,
      activeTagsIds,
      tasksSearch,
      tasksMenu,
      timeLine,
      userId,
    }

    return loadTasks(selectionTasks.toArray(), data)
  }
)

export const getTasksId = createSelector(
  getArchivedTasksVisibility,
  getArchivedTasksItems,
  getTasksItems,
  getTasksSearch,
  getTasksMenu,
  getTimeLine,
  getEntitiesTasks,
  getEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    isArchivedTasksVisible,
    archivedTasksItems,
    tasksItems,
    tasksSearch,
    tasksMenu,
    timeLine,
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts,
    activeTagsIds,
    userId
  ) => {
    const archived = isArchivedTasksVisible
    const data = {
      entitiesTasks,
      entitiesTags,
      entitiesFollowers,
      entitiesContacts,
      activeTagsIds,
      tasksSearch,
      tasksMenu,
      timeLine,
      userId,
    }

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
  getTasksSearch,
  getTasksMenu,
  getTimeLine,
  getEntitiesTasks,
  getEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    completedTasksItems,
    tasksSearch,
    tasksMenu,
    timeLine,
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts,
    activeTagsIds,
    userId
  ) => {
    const data = {
      entitiesTasks,
      entitiesTags,
      entitiesFollowers,
      entitiesContacts,
      activeTagsIds,
      tasksSearch,
      tasksMenu,
      timeLine,
      userId,
    }
    const tasks = loadTasks(completedTasksItems.toArray(), data)
    return List(tasks.map(task => task.id))
  }
)

export const getCurrentTask = createSelector(
  getEntitiesTasks,
  getEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getSelectionTasks,
  (
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts,
    selectionTasks
  ) => {
    const selectedTaskId = getSelectedTaskId(selectionTasks)
    if (!selectedTaskId) {
      return null
    }

    const task = entitiesTasks.get(selectedTaskId)
    const tags = task.tags.map(tagId => entitiesTags.get(tagId))
    const createdBy = entitiesContacts.get(task.createdById)
    const followers = task.followers.map(followerId => {
      const follower = entitiesFollowers.get(followerId)
      const profile = entitiesContacts.get(follower.userId)

      return follower.set('profile', profile)
    })

    return task
      .setIn(['tags'], tags)
      .setIn(['createdBy'], createdBy)
      .setIn(['followers'], followers)
  }
)

export const getNextTask = createSelector(
  getSelectionTasks,
  getArchivedTasksVisibility,
  getArchivedTasksItems,
  getInboxTasksVisibility,
  getInboxTasksItems,
  getTasksItems,
  getTasksSearch,
  getTasksMenu,
  getTimeLine,
  getEntitiesTasks,
  getEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    selectionTasks,
    isArchivedTasksVisible,
    archivedTasksItems,
    isInboxTasksVisible,
    InboxTasksItems,
    tasksItems,
    tasksSearch,
    tasksMenu,
    timeLine,
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts,
    activeTagsIds,
    userId
  ) => {
    const selectedTaskId = getSelectedTaskId(selectionTasks)
    if (!selectedTaskId) {
      return null
    }

    // Tasks after filtering and sorting
    const data = {
      entitiesTasks,
      entitiesTags,
      entitiesFollowers,
      entitiesContacts,
      activeTagsIds,
      tasksSearch,
      tasksMenu,
      timeLine,
      userId,
    }

    let typeTask = loadTasks(tasksItems.toArray(), data)
    typeTask = List(typeTask.map(task => task.id))
    if (isArchivedTasksVisible) {
      typeTask = List(loadArchiveTasks(archivedTasksItems.toArray(), data))
      typeTask = List(typeTask.map(task => task.id))
    }

    if (isInboxTasksVisible) {
      typeTask = List(loadInboxTasks(InboxTasksItems.toArray(), data))
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
    if (!nextTask) {
      return null
    }

    return nextTask
  }
)

export const getPreviousTask = createSelector(
  getSelectionTasks,
  getArchivedTasksVisibility,
  getArchivedTasksItems,
  getInboxTasksVisibility,
  getInboxTasksItems,
  getTasksItems,
  getTasksSearch,
  getTasksMenu,
  getTimeLine,
  getEntitiesTasks,
  getEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    selectionTasks,
    isArchivedTasksVisible,
    archivedTasksItems,
    isInboxTasksVisible,
    InboxTasksItems,
    tasksItems,
    tasksSearch,
    tasksMenu,
    timeLine,
    entitiesTasks,
    entitiesTags,
    entitiesFollowers,
    entitiesContacts,
    activeTagsIds,
    userId
  ) => {
    const selectedTaskId = getSelectedTaskId(selectionTasks)
    if (!selectedTaskId) {
      return null
    }

    // Tasks after filtering and sorting
    const data = {
      entitiesTasks,
      entitiesTags,
      entitiesFollowers,
      entitiesContacts,
      activeTagsIds,
      tasksSearch,
      tasksMenu,
      timeLine,
      userId,
    }

    let typeTask = loadTasks(tasksItems.toArray(), data)
    typeTask = List(typeTask.map(task => task.id))
    if (isArchivedTasksVisible) {
      typeTask = List(loadArchiveTasks(archivedTasksItems.toArray(), data))
      typeTask = List(typeTask.map(task => task.id))
    }

    if (isInboxTasksVisible) {
      typeTask = List(loadInboxTasks(InboxTasksItems.toArray(), data))
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

    const prevTaskId = typeTask.get(prevIndex)
    const prevTask = entitiesTasks.get(prevTaskId)
    if (!prevTask) {
      return null
    }

    return prevTask
  }
)

export const getSelectTasksTags = createSelector(
  getSelectionTasks,
  getEntitiesTasks,
  (selectionTasks, entitiesTasks) => {
    return selectionTasks
      .map(taskId => {
        const tagsList = entitiesTasks.getIn([taskId, 'tags'])

        if (tagsList.size === 0) {
          return List()
        }

        return tagsList
      })
      .toList()
  }
)
