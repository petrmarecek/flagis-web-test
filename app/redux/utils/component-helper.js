import { List, Set } from 'immutable'
import moment from 'moment'
import showdown from 'showdown'
import commonUtils from 'redux/utils/common'
import constants from '../../utils/constants'

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
    ? commonUtils.computeIntHash(title, 23)
    : colorIndex
}

export const tagColor = {
  0: '#F7BED2',
  1: '#F99C9C',
  2: '#D36363',
  3: '#C55B79',
  4: '#D88C69',
  5: '#E4B25F',
  6: '#F7CE4D',
  7: '#E4DB27',
  8: '#7BA6DE',
  9: '#52C2D9',
  10: '#4DCBBD',
  11: '#9EDB5B',
  12: '#5BDBA3',
  13: '#3FB198',
  14: '#B3AD36',
  15: '#C8C629',
  16: '#34A2EE',
  17: '#6999B9',
  18: '#9188E3',
  19: '#E197F0',
  20: '#F288C1',
  21: '#D28CB2',
  22: '#ADB09F',
  23: '#6F8083',
}

export function getTagColor(index) {
  return tagColor[index]
}

export function markdownToHTML(markdown) {
  const converter = new showdown.Converter()
  return converter.makeHtml(markdown)
}

export function isObjectEmpty(obj) {
  /*eslint-disable prefer-reflect */
  return Object.getOwnPropertyNames(obj).length === 0
}

export const isStringEmpty = (str) => {
  return str.trim().length === 0
}

export const getHintDirectionRender = inputPositionTop => {
  const topHeight = constants.WINDOW_HEIGHT - inputPositionTop
  const maxHintsHeight = topHeight - constants.OFFSET

  return maxHintsHeight <= constants.MIN_HINTS_HEIGHT ? 'bottomToTop' : 'topToBottom'
}

export function getAssigneeOfTask(followers) {
  const taskFollowers = Array.isArray(followers) ? followers : followers.toArray()
  let result = null

  if (taskFollowers.length === 0) {
    return null
  }

  taskFollowers.forEach(follower => {
    const { type } = follower

    if (type === 'assignee') {
      result = follower
    }
  })

  return result
}

export const compareTaskBySubject = (taskA, taskB) => {
  const subjectA = taskA.subject.toLowerCase()
  const subjectB = taskB.subject.toLowerCase()

  return subjectA.localeCompare(subjectB)
}

export const compareTagByTitle = (tagA, tagB) => {
  const titleA = tagA.title.toLowerCase()
  const titleB = tagB.title.toLowerCase()

  return titleA.localeCompare(titleB)
}

export const compareContactByEmail = (contactA, contactB) => {
  const emailA = contactA.email.toLowerCase()
  const emailB = contactB.email.toLowerCase()

  return emailA.localeCompare(emailB)
}

export const getSortedTags = (tags, selectedTags) => {

  const orderedTagIds = tags.sort(compareTagByTitle).map(tag => tag.id)
  const tagsById = tags.reduce((acc, tag) => {
    acc[tag.id] = tag
    return acc
  }, {})

  const result = []

  // First, put selected tags
  selectedTags.reverse().forEach(tagId => {

    // Do not add this tag if it is not present on the task
    // (e.g. when we delete that tag, but list of tasks is
    // not yet updated)
    if (!tagsById.hasOwnProperty(tagId)) {
      return
    }

    result.push(tagsById[tagId])
  })

  // Second, add others
  orderedTagIds.forEach(tagId => {

    // Skip those that are already added
    if (selectedTags.includes(tagId)) {
      return
    }

    result.push(tagsById[tagId])
  })

  return result
}

export const getWidthTagItems = tags => {
  let result = 0

  tags.forEach(tag => {
    const character = tag.title.length
    const widthText = Math.floor(character * 7.5)
    result += (widthText + 20)
  })

  return result
}