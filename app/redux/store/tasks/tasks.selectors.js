import { List } from 'immutable'
import moment from 'moment'
import intersection from 'lodash/intersection'
import search from '../../services/search'

export const getCurrentTaskTags = state => {
  const selectedTaskId = getSelectedTaskId(state)
  if (!selectedTaskId) {
    return List()
  }

  return state.entities.getIn(['tasks', selectedTaskId, 'tags'])
}

export const getTaskTags = (state, taskId) => {
  return state.entities.getIn(['tasks', taskId, 'tags'])
}

export const getSelectTasksTags = (state) => {
  const selectTasks = state.tasks.selection
  return selectTasks.map(taskId => {
    const tagsList = getTaskTags(state, taskId)

    if (tagsList.size === 0) {
      return List()
    }

    return tagsList
  }).toList()
}

export const getSelectTasks = (state) => {
  const selectTasks = state.tasks.selection
  return loadTasks(selectTasks.toArray(), state)
}

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
 * @param {Array} ids Array of task ids
 * @param {Object} state Redux state
 * @returns {Array} List of tasks
 */

function loadTasks(ids, state) {
  // apply search filter
  if (state.tasksMenu.filters.searchText) {
    const foundIds = search.tasks.get(state.tasksMenu.filters.searchText).map(item => item.ref)
    ids = intersection(ids, foundIds)
  }

  let tasks = ids.map(taskId => {
    const task = state.entities.tasks.get(taskId)
    const tags = task.tags.map(tagId => state.entities.tags.get(tagId))
    return task.set('tags', tags)
  })

  // apply date range filter
  if (state.tasksMenu.filters.range) {
    tasks = filterByDateRange(state.tasksMenu.filters.range, tasks)
  }

  // apply important filter
  if (state.tasksMenu.filters.important) {
    tasks = tasks.filter(task => task.isImportant)
  }

  // apply unimportant filter
  if (state.tasksMenu.filters.unimportant) {
    tasks = tasks.filter(task => !task.isImportant)
  }

  // apply no tags filter
  if (state.tasksMenu.filters.noTags) {
    tasks = tasks.filter(task => task.tags.size === 0)
  }

  // apply sort alphabetically
  if (state.tasksMenu.sort.alphabet) {
    tasks.sort((a, b) => {
      if(a.subject.toLowerCase() < b.subject.toLowerCase()) return -1;
      if(a.subject.toLowerCase() > b.subject.toLowerCase()) return 1;
      return 0;
    })
  }

  // apply sort by due date
  if (state.tasksMenu.sort.dueDate) {
    const tasksDueDate = tasks.filter(task => task.dueDate)
    const tasksOthers = tasks.filter(task => !task.dueDate)

    tasksDueDate.sort((a, b) => {
      if(a.dueDate < b.dueDate) return -1;
      if(a.dueDate > b.dueDate) return 1;
      return 0;
    })

    tasks = tasksDueDate.concat(tasksOthers)
  }

  // apply sort by importance
  if (state.tasksMenu.sort.important) {
    const tasksImportant = tasks.filter(task => task.isImportant)
    const tasksUnimportant = tasks.filter(task => !task.isImportant)

    tasks = tasksImportant.concat(tasksUnimportant)
  }

  // apply sort incomplete
  if (state.tasksMenu.sort.incomplete) {
    const tasksIncomplete = tasks.filter(task => !task.isCompleted)
    const tasksComplete = tasks.filter(task => task.isCompleted)

    tasks = tasksIncomplete.concat(tasksComplete)
  }

  return tasks
}

/**
 * Loads task entities for given task IDs (only archived tasks)
 * @param {Array} ids Array of task ids
 * @param {Object} state Redux state
 * @returns {Array} List of tasks
 */

function loadArchiveTasks(ids, state) {
  // apply search filter
  if (state.tasksMenu.filters.searchText) {
    const foundIds = search.tasks.get(state.tasksMenu.filters.searchText).map(item => item.ref)
    ids = intersection(ids, foundIds)
  }

  const tasks = ids.map(taskId => {
    const task = state.entities.tasks.get(taskId)
    const tags = task.tags.map(tagId => state.entities.tags.get(tagId))
    return task.set('tags', tags)
  })

  // apply sort by archive date
  tasks.sort((a, b) => {
    if(a.archivedAt > b.archivedAt) return -1;
    if(a.archivedAt < b.archivedAt) return 1;
    return 0;
  })

  return tasks
}

export const getTasks = state => {
  const archived = state.routing.locationBeforeTransitions.pathname === '/user/archive'

  if (archived) {
    return ({
      isFetching: state.tasks.archived.isFetching,
      items: loadArchiveTasks(state.tasks.archived.items.toArray(), state),
      type: 'archived',
    })
  }

  return ({
    isFetching: state.tasks.isFetching,
    items: loadTasks(state.tasks.items.toArray(), state),
    type: 'main',
  })
}

export const getCompletedTasks = state => ({
  items: loadTasks(state.tasks.completed.toArray(), state)
})

export const getTasksId = state => {
  const archived = state.routing.locationBeforeTransitions.pathname === '/user/archive'

  if (archived) {
    const tasks = loadArchiveTasks(state.tasks.archived.items.toArray(), state)
    return List(tasks.map(task => task.id))
  }

  const tasks = loadTasks(state.tasks.items.toArray(), state)
  return List(tasks.map(task => task.id))

}

export const getCompletedTasksId = state => {
  const tasks = loadTasks(state.tasks.completed.toArray(), state)
  return List(tasks.map(task => task.id))
}

export const getCurrentTask = state => {
  const selectedTaskId = getSelectedTaskId(state)
  if (!selectedTaskId) {
    return null
  }

  const task = state.entities.tasks.get(selectedTaskId)
  return task.setIn(['tags'], task.tags.map(tagId => state.entities.getIn(['tags', tagId])))
}

export const getNextTask = state => {
  if (!state.appState.taskTagDetail.task && !state.appState.taskTagDetail.archive) {
    return null
  }

  const selectedTaskId = getSelectedTaskId(state)
  if (!selectedTaskId) {
    return null
  }

  // Tasks after filtering and sorting
  let typeTask = loadTasks(state.tasks.items.toArray(), state)
  typeTask = List(typeTask.map(task => task.id))
  if (state.appState.archivedTasks.isVisible) {
    typeTask = List(loadArchiveTasks(state.tasks.archived.items.toArray(), state))
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
  const nextTask = state.entities.tasks.get(nextTaskId)
  return nextTask.setIn(['tags'], nextTask.tags.map(tagId => state.entities.getIn(['tags', tagId])))
}

export const getPreviousTask = state => {
  if (!state.appState.taskTagDetail.task && !state.appState.taskTagDetail.archive) {
    return null
  }

  const selectedTaskId = getSelectedTaskId(state)
  if (!selectedTaskId) {
    return null
  }

  // Tasks after filtering and sorting
  let typeTask = loadTasks(state.tasks.items.toArray(), state)
  typeTask = List(typeTask.map(task => task.id))
  if (state.appState.archivedTasks.isVisible) {
    typeTask = List(loadArchiveTasks(state.tasks.archived.items.toArray(), state))
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
  const nextTask = state.entities.tasks.get(nextTaskId)
  return nextTask.setIn(['tags'], nextTask.tags.map(tagId => state.entities.getIn(['tags', tagId])))
}

// ------ Helper functions ----------------------------------------------------

function getSelectedTaskId(state) {
  const taskList = state.tasks.selection
  if (taskList.size === 0) {
    return null
  }

  return taskList.last()
}