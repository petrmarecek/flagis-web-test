import { List } from 'immutable'
import moment from 'moment'

export function getSelectionInfo(event, task, selectedTasks) {
  let isMultiSelection = false
  let newSelectedTasks = null

  if (event !== null) {
    isMultiSelection = event.ctrlKey || event.metaKey
  }

  if (isMultiSelection) {
    newSelectedTasks = selectedTasks.has(task.id)
      ? selectedTasks.delete(task.id)
      : selectedTasks.add(task.id)
  } else {
    newSelectedTasks = selectedTasks.clear().add(task.id)
  }

  return {
    newSelectedTasks,
    isMultiSelection,
  }
}

export function setArchive(taskId, tasks, completedTasks, archivedTasks, entitiesTasks, selectedTasks) {
  let newArchiveTasksList = List()
  newArchiveTasksList = newArchiveTasksList.unshift(taskId)
  tasks = tasks.delete(tasks.indexOf(taskId))
  completedTasks = completedTasks.delete(completedTasks.indexOf(taskId))
  archivedTasks = archivedTasks.unshift(taskId)
  entitiesTasks = entitiesTasks.setIn([taskId, 'isArchived'], true)
  if (selectedTasks) {
    selectedTasks = selectedTasks.includes()
      ? selectedTasks
      : selectedTasks.delete(taskId)
  }

  return {newArchiveTasksList, tasks, completedTasks, archivedTasks, entitiesTasks, selectedTasks}
}

export function cancelArchive(taskId, tasks, completedTasks, archivedTasks, entitiesTasks, selectedTasks) {
  let newTasks = List()
  newTasks = newTasks.unshift(taskId)
  tasks = tasks.unshift(taskId)
  completedTasks = completedTasks.unshift(taskId)
  archivedTasks = archivedTasks.delete(archivedTasks.indexOf(taskId))
  entitiesTasks = entitiesTasks.setIn([taskId, 'isArchived'], false)
  if (selectedTasks) {
    selectedTasks = selectedTasks.includes()
      ? selectedTasks
      : selectedTasks.delete(taskId)
  }

  return {newTasks, tasks, completedTasks, archivedTasks, entitiesTasks, selectedTasks}
}

export function archiveCompletedTasks(tasks, showCompletedTasks, completedTasks, archivedTasks, entitiesTasks, selectedTasks) {
  const newArchiveTasksList = showCompletedTasks

  for (const completedTask of showCompletedTasks) {
    tasks = tasks.delete(tasks.indexOf(completedTask))
    completedTasks = completedTasks.delete(completedTasks.indexOf(completedTask))
    archivedTasks = archivedTasks.unshift(completedTask)
    entitiesTasks = entitiesTasks.setIn([completedTask, 'isArchived'], true)
    if (selectedTasks) {
      selectedTasks = selectedTasks.includes()
        ? selectedTasks
        : selectedTasks.delete(completedTask)
    }
  }

  return {newArchiveTasksList, tasks, completedTasks, archivedTasks, entitiesTasks, selectedTasks}
}

export function getTimeLineByDueDate(tasks) {
  const now = moment()
  const today = now.dayOfYear()
  const tomorrow = now.clone().add(1, 'days').dayOfYear()
  const week = now.isoWeek()
  const month = now.month()
  const year = now.year()

  const overdueTasks = []
  const todayTasks = []
  const tomorrowTasks = []
  const weekTasks = []
  const monthTasks = []
  const othersTasks = []

  for(const task of tasks) {
    const dueDate = moment(task.dueDate)
    const currentYear = dueDate.year() === year

    if (dueDate.isBefore(now)) {
      overdueTasks.push(task)
      continue
    }

    if (dueDate.dayOfYear() === today && currentYear) {
      todayTasks.push(task)
      continue
    }

    if (dueDate.dayOfYear() === tomorrow && currentYear) {
      tomorrowTasks.push(task)
      continue
    }

    if (dueDate.isoWeek() === week && currentYear) {
      weekTasks.push(task)
      continue
    }

    if (dueDate.month() === month && currentYear) {
      monthTasks.push(task)
      continue
    }

    othersTasks.push(task)
  }

  return {overdueTasks, todayTasks, tomorrowTasks, weekTasks, monthTasks, othersTasks}
}

export function getTagColor(index) {
  switch(index) {
    case 1: {
      return '#F0BD67'
    }

    case 2: {
      return '#52C2D9'
    }

    case 3: {
      return '#3FB198'
    }

    case 4: {
      return '#6999B9'
    }

    case 5: {
      return '#E197F0'
    }

    case 6: {
      return '#D88C69'
    }

    case 7: {
      return '#9188E3'
    }

    case 8: {
      return '#9EDB5B'
    }

    case 9: {
      return '#ADB09F'
    }

    case 10: {
      return '#7BA6DE'
    }

    case 11: {
      return '#B3AD36'
    }

    case 12: {
      return '#34A2EE'
    }

    case 13: {
      return '#5BDBA3'
    }

    case 14: {
      return '#ff6a6a'
    }

    default:
      return '#6F8083'
  }
}
