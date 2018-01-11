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

const color = {
  0: '#6F8083',
  1: '#F0BD67',
  2: '#52C2D9',
  3: '#3FB198',
  4: '#6999B9',
  5: '#E197F0',
  6: '#D88C69',
  7: '#9188E3',
  8: '#9EDB5B',
  9: '#ADB09F',
  10: '#7BA6DE',
  11: '#B3AD36',
  12: '#34A2EE',
  13: '#5BDBA3',
  14: '#ff6a6a',
  15: '#6F8083',
}

export function getTagColor(index) {
  return color[index]
}
