import { List } from 'immutable'
import { createSelector } from 'reselect'
import moment from 'moment'

import { getUserId } from '../auth/auth.selectors'
import { getArchivedTasksVisibility } from '../app-state/app-state.selectors'
import {
  getEntitiesTasks,
  getActiveEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
} from '../entities/entities.selectors'
import { getActiveTagsIds } from '../tags/tags.selectors'
import { getTasksMenu } from '../tasks-menu/tasks-menu.selectors'
import {
  compareTaskBySubject,
  getAssigneeOfTask,
  compareTagByTitle,
  compareTaskByDueDate,
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
    const tags = task.tags
      .map(tagId => entitiesTags.get(tagId))
      .sort(compareTagByTitle)
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
 * Get filtered tasks for assignee filter
 * @param {Array} tasks Array
 * @param {Object} tasksMenu Object
 * @param {string} userId string
 * @returns {Array} array of tasks
 */

function getFilteredTasksForAssignee(tasks, tasksMenu, userId) {
  return tasks.filter(task => {
    const activeAssignee = tasksMenu.getIn(['filters', 'activeAssignee'])
    const followers = task.getIn(['followers'])
    const assignee = getAssigneeOfTask(followers)

    // No followers exist
    if (assignee === null) {
      return false
    }

    // filter every sent tasks
    if (activeAssignee === null) {
      return (
        assignee.userId !== userId &&
        assignee.status !== 'rejected' &&
        assignee.status !== 'new'
      )
    }

    return (
      assignee.userId === activeAssignee &&
      assignee.status !== 'rejected' &&
      assignee.status !== 'new'
    )
  })
}

/**
 * Get filtered tasks for assignee filter
 * @param {Array} tasks Array
 * @param {Object} tasksMenu Object
 * @param {string} userId string
 * @returns {Array} array of tasks
 */

function getFilteredTasksForSender(tasks, tasksMenu, userId) {
  return tasks.filter(task => {
    const activeSender = tasksMenu.getIn(['filters', 'activeSender'])

    // filter every received tasks
    if (activeSender === null) {
      return task.createdById !== userId
    }

    return task.createdById === activeSender
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
    userId,
  } = data

  let tasks = ids.map(taskId => {
    const task = entitiesTasks.get(taskId)
    const tags = task.tags
      .map(tagId => entitiesTags.get(tagId))
      .sort(compareTagByTitle)
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

  // full text search
  if (tasksSearch) {
    const termLowerCase = tasksSearch.toLowerCase()

    tasks = tasks.filter(task => {
      const subjectLowerCase = task.subject.toLowerCase()
      const descriptionLowerCase = task.description
        ? task.description.toLowerCase()
        : ''

      return (
        subjectLowerCase.includes(termLowerCase) ||
        descriptionLowerCase.includes(termLowerCase)
      )
    })
  }

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

  // apply assignee and sender filter
  const isAssigneeFilter = tasksMenu.getIn(['filters', 'assignee'])
  const isSenderFilter = tasksMenu.getIn(['filters', 'sender'])
  if (isAssigneeFilter && isSenderFilter) {
    const filteredTasksForAssignee = getFilteredTasksForAssignee(
      tasks,
      tasksMenu,
      userId
    )
    const filteredTasksForSender = getFilteredTasksForSender(
      tasks,
      tasksMenu,
      userId
    )

    tasks = filteredTasksForAssignee.concat(filteredTasksForSender)
  }

  // apply only assignee filter
  if (isAssigneeFilter && !isSenderFilter) {
    tasks = getFilteredTasksForAssignee(tasks, tasksMenu, userId)
  }

  // apply only sender filter
  if (isSenderFilter && !isAssigneeFilter) {
    tasks = getFilteredTasksForSender(tasks, tasksMenu, userId)
  }

  // apply date range filter
  const range = tasksMenu.getIn(['filters', 'range'])
  if (range) {
    tasks = filterByDateRange(range, tasks)
  }

  // apply important filter
  const isImportantFilter = tasksMenu.getIn(['filters', 'important'])
  if (isImportantFilter) {
    tasks = tasks.filter(task => task.isImportant)
  }

  // apply unimportant filter
  const isUnimportantFilter = tasksMenu.getIn(['filters', 'unimportant'])
  if (isUnimportantFilter) {
    tasks = tasks.filter(task => !task.isImportant)
  }

  // apply completed filter
  const isCompletedFilter = tasksMenu.getIn(['filters', 'completed'])
  if (isCompletedFilter) {
    tasks = tasks.filter(task => task.isCompleted)
  }

  // apply uncompleted filter
  const isUncompletedFilter = tasksMenu.getIn(['filters', 'uncompleted'])
  if (isUncompletedFilter) {
    tasks = tasks.filter(task => !task.isCompleted)
  }

  // apply no incoming filter
  const isNoIncomingFilter = tasksMenu.getIn(['filters', 'noIncoming'])
  if (isNoIncomingFilter) {
    tasks = tasks.filter(task => !task.isInbox)
  }

  // apply no tags filter
  const isNoTagsFilter = tasksMenu.getIn(['filters', 'noTags'])
  if (isNoTagsFilter) {
    tasks = tasks.filter(task => task.tags.size === 0)
  }

  // apply sort alphabetically
  const isAlphabetSorting = tasksMenu.getIn(['sort', 'alphabet'])
  if (isAlphabetSorting) {
    tasks.sort(compareTaskBySubject)
  }

  // apply sort incomplete
  const isIncompleteSorting = tasksMenu.getIn(['sort', 'incomplete'])
  if (isIncompleteSorting) {
    const tasksIncomplete = tasks.filter(task => !task.isCompleted)
    const tasksComplete = tasks.filter(task => task.isCompleted)

    tasks = tasksIncomplete.concat(tasksComplete)
  }

  // apply sort by Due date
  const isDueDateSorting = tasksMenu.getIn(['sort', 'dueDate'])
  if (isDueDateSorting) {
    const tasksWithDueDate = tasks.filter(task => task.dueDate)
    const tasksWithNullDueDate = tasks.filter(task => !task.dueDate)

    // sort by due date
    tasksWithDueDate.sort(compareTaskByDueDate)

    tasks = tasksWithDueDate.concat(tasksWithNullDueDate)
  }

  // apply sort by Importance
  const isImportantSorting = tasksMenu.getIn(['sort', 'important'])
  if (isImportantSorting) {
    const tasksImportant = tasks.filter(task => task.isImportant)
    const tasksUnimportant = tasks.filter(task => !task.isImportant)

    tasks = tasksImportant.concat(tasksUnimportant)
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

  let tasks = ids.map(taskId => {
    const task = entitiesTasks.get(taskId)
    const tags = task.tags
      .map(tagId => entitiesTags.get(tagId))
      .sort(compareTagByTitle)
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

  // full text search
  if (tasksSearch) {
    const termLowerCase = tasksSearch.toLowerCase()

    tasks = tasks.filter(task => {
      const subjectLowerCase = task.subject.toLowerCase()
      const descriptionLowerCase = task.description
        ? task.description.toLowerCase()
        : ''

      return (
        subjectLowerCase.includes(termLowerCase) ||
        descriptionLowerCase.includes(termLowerCase)
      )
    })
  }

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
export const getTasksItems = state => state.getIn(['tasks', 'items'])
export const getTasksSearch = state => state.getIn(['tasks', 'search'])
export const getArchivedTasksIsAlreadyFetching = state =>
  state.getIn(['tasks', 'archived', 'isAlreadyFetching'])
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
export const getIsDragAndDropActive = state =>
  state.getIn(['tasks', 'isDragAndDropActive'])
export const getDraggingTask = state => state.getIn(['tasks', 'draggingTask'])

// ------ Reselect selectors ----------------------------------------------------

export const getAllTasks = createSelector(
  getArchivedTasksItems,
  getTasksItems,
  getInboxTasksItems,
  getEntitiesTasks,
  getActiveEntitiesTags,
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
    let ids = tasksItems.toSet().union(InboxTasksItems.toSet()).toList()
    ids = ids.toSet().union(archivedTasksItems.toSet()).toList()
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
  getArchivedTasksIsFetching,
  getArchivedTasksItems,
  getTasksIsFetching,
  getTasksItems,
  getTasksSearch,
  getTasksMenu,
  getEntitiesTasks,
  getActiveEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    isArchivedTasksVisible,
    archivedTasksIsFetching,
    archivedTasksItems,
    tasksIsFetching,
    tasksItems,
    tasksSearch,
    tasksMenu,
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

    // Load main tasks
    return {
      isFetching: tasksIsFetching,
      items: loadTasks(tasksItems.toArray(), data),
      type: 'main',
    }
  }
)

export const getInboxTasks = createSelector(
  getArchivedTasksVisibility,
  getInboxTasksIsFetching,
  getInboxTasksItems,
  getTasksSearch,
  getTasksMenu,
  getEntitiesTasks,
  getActiveEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    isArchivedTasksVisible,
    inboxTasksIsFetching,
    InboxTasksItems,
    tasksSearch,
    tasksMenu,
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
      userId,
    }

    if (isArchivedTasksVisible) {
      return {
        isFetching: inboxTasksIsFetching,
        items: [],
        type: 'inbox',
      }
    }

    // Load inbox tasks
    return {
      isFetching: inboxTasksIsFetching,
      items: loadTasks(InboxTasksItems.toArray(), data),
      type: 'inbox',
    }
  }
)

export const getCompletedTasks = createSelector(
  getCompletedTasksItems,
  getTasksSearch,
  getTasksMenu,
  getEntitiesTasks,
  getActiveEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    completedTasksItems,
    tasksSearch,
    tasksMenu,
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
  getEntitiesTasks,
  getActiveEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    selectionTasks,
    tasksSearch,
    tasksMenu,
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
  getEntitiesTasks,
  getActiveEntitiesTags,
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
  getEntitiesTasks,
  getActiveEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    completedTasksItems,
    tasksSearch,
    tasksMenu,
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
      userId,
    }
    const tasks = loadTasks(completedTasksItems.toArray(), data)
    return List(tasks.map(task => task.id))
  }
)

export const getCurrentTask = createSelector(
  getEntitiesTasks,
  getActiveEntitiesTags,
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
    const tags = task.tags
      .map(tagId => entitiesTags.get(tagId))
      .sort(compareTagByTitle)
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
  getInboxTasksItems,
  getTasksItems,
  getTasksSearch,
  getTasksMenu,
  getEntitiesTasks,
  getActiveEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    selectionTasks,
    isArchivedTasksVisible,
    archivedTasksItems,
    InboxTasksItems,
    tasksItems,
    tasksSearch,
    tasksMenu,
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
      userId,
    }

    const selectedTask = entitiesTasks.get(selectedTaskId)
    let typeTask = loadTasks(tasksItems.toArray(), data)
    typeTask = List(typeTask.map(task => task.id))
    if (isArchivedTasksVisible) {
      typeTask = List(loadArchiveTasks(archivedTasksItems.toArray(), data))
      typeTask = List(typeTask.map(task => task.id))
    }

    if (selectedTask.isInbox) {
      typeTask = List(loadTasks(InboxTasksItems.toArray(), data))
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
  getInboxTasksItems,
  getTasksItems,
  getTasksSearch,
  getTasksMenu,
  getEntitiesTasks,
  getActiveEntitiesTags,
  getEntitiesFollowers,
  getEntitiesContacts,
  getActiveTagsIds,
  getUserId,
  (
    selectionTasks,
    isArchivedTasksVisible,
    archivedTasksItems,
    InboxTasksItems,
    tasksItems,
    tasksSearch,
    tasksMenu,
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
      userId,
    }

    const selectedTask = entitiesTasks.get(selectedTaskId)
    let typeTask = loadTasks(tasksItems.toArray(), data)
    typeTask = List(typeTask.map(task => task.id))
    if (isArchivedTasksVisible) {
      typeTask = List(loadArchiveTasks(archivedTasksItems.toArray(), data))
      typeTask = List(typeTask.map(task => task.id))
    }

    if (selectedTask.isInbox) {
      typeTask = List(loadTasks(InboxTasksItems.toArray(), data))
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
