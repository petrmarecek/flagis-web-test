import { List, Set } from 'immutable'
import moment from 'moment'
import showdown from 'showdown'
import commonUtils from 'redux/utils/common'

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
  const now = moment().set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0})
  const today = now.dayOfYear()
  const tomorrow = now.clone().add(1, 'days').dayOfYear()
  const week = now.isoWeek()
  const month = now.month()
  const year = now.year()

  const previousDaysTasks = []
  const todayTasks = []
  const tomorrowTasks = []
  const weekTasks = []
  const monthTasks = []
  const laterTasks = []
  const noDueDatesTasks = []

  for(const task of tasks) {
    const dueDate = moment(task.dueDate)
    const currentYear = dueDate.year() === year

    if (dueDate.isBefore(now)) {
      previousDaysTasks.push(task)
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

    if (!task.dueDate) {
      noDueDatesTasks.push(task)
      continue
    }

    laterTasks.push(task)
  }

  return {
    previousDaysTasks,
    todayTasks,
    tomorrowTasks,
    weekTasks,
    monthTasks,
    laterTasks,
    noDueDatesTasks
  }
}

export function getTagRelations(relations, parentRelations, tagId) {

  // Get relations for current tag
  const currentTagRelations = relations.get(tagId)
  if (!currentTagRelations) {
    return Set()
  }

  // If it is a nested tag --> intersect with parent tags
  return parentRelations
    ? currentTagRelations.intersect(parentRelations || Set())
    : currentTagRelations
}

export const getColorIndex = (colorIndex, title) => {
  return colorIndex === null
    ? commonUtils.computeIntHash(title, 10)
    : colorIndex
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

export function markdownToHTML(markdown) {
  const converter = new showdown.Converter()
  return converter.makeHtml(markdown)
}

export function isObjectEmpty(obj) {
  /*eslint-disable prefer-reflect */
  return Object.getOwnPropertyNames(obj).length === 0
}
