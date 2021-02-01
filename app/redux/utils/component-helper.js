import { Map, List, Set } from 'immutable'
import commonUtils from 'redux/utils/common'
import constants from 'utils/constants'
import moment from 'moment'
import showdown from 'showdown'
import R from 'ramda'
import { getTagsRelations } from 'redux/store/tags/tags.selectors'
import { getContactsRelations } from 'redux/store/contacts/contacts.selectors'

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

export function setArchive(
  taskId,
  tasks,
  completedTasks,
  archivedTasks,
  entitiesTasks,
  selectedTasks,
) {
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

  return {
    newArchiveTasksList,
    tasks,
    completedTasks,
    archivedTasks,
    entitiesTasks,
    selectedTasks,
  }
}

export function cancelArchive(
  taskId,
  tasks,
  completedTasks,
  archivedTasks,
  entitiesTasks,
  selectedTasks,
) {
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

  return {
    newTasks,
    tasks,
    completedTasks,
    archivedTasks,
    entitiesTasks,
    selectedTasks,
  }
}

export function archiveCompletedTasks(
  tasks,
  showCompletedTasks,
  completedTasks,
  archivedTasks,
  entitiesTasks,
  selectedTasks,
) {
  const newArchiveTasksList = showCompletedTasks

  for (const completedTask of showCompletedTasks) {
    tasks = tasks.delete(tasks.indexOf(completedTask))
    completedTasks = completedTasks.delete(
      completedTasks.indexOf(completedTask),
    )
    archivedTasks = archivedTasks.unshift(completedTask)
    entitiesTasks = entitiesTasks.setIn([completedTask, 'isArchived'], true)
    if (selectedTasks) {
      selectedTasks = selectedTasks.includes()
        ? selectedTasks
        : selectedTasks.delete(completedTask)
    }
  }

  return {
    newArchiveTasksList,
    tasks,
    completedTasks,
    archivedTasks,
    entitiesTasks,
    selectedTasks,
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

export function getTreeRelations(state) {
  return Map({
    ...getTagsRelations(state).toObject(),
    ...getContactsRelations(state),
  })

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
  converter.setOption('simpleLineBreaks', true)
  return converter.makeHtml(markdown)
}

export function isObjectEmpty(obj) {
  /*eslint-disable prefer-reflect */
  return Object.getOwnPropertyNames(obj).length === 0
}

export const isString = R.is(String)

export const isStringEmpty = str => {
  if (!isString(str)) {
    return false
  }

  return str.trim().length === 0
}

export const getHintDirectionRender = inputPositionTop => {
  const topHeight = constants.WINDOW_HEIGHT - inputPositionTop
  const maxHintsHeight = topHeight - constants.OFFSET

  return maxHintsHeight <= constants.MIN_HINTS_HEIGHT
    ? 'bottomToTop'
    : 'topToBottom'
}

export function getAssigneeOfTask(followers) {
  if (!followers) {
    return null
  }

  let taskFollowers = followers
  let result = null

  if (
    typeof taskFollowers === 'object' &&
    !Array.isArray(taskFollowers) &&
    !List.isList(taskFollowers)
  ) {
    if (isObjectEmpty(taskFollowers)) {
      return null
    }

    taskFollowers = Object.values(taskFollowers)
  }

  taskFollowers = Array.isArray(taskFollowers)
    ? taskFollowers
    : taskFollowers.toArray()
  if (taskFollowers.length === 0) {
    return null
  }

  taskFollowers.forEach(follower => {
    if (follower.type === 'assignee') {
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

export const compareTaskByDueDate = (taskA, taskB) => {
  const subjectA = moment(taskA.dueDate).valueOf()
  const subjectB = moment(taskB.dueDate).valueOf()

  return subjectA - subjectB
}

export const compareTreeItemsByOrder = (treeItemA, treeItemB) => {
  const subjectA = treeItemA.order
  const subjectB = treeItemB.order

  return subjectA - subjectB
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
  tags = tags.filter(tag => tag !== undefined) // eslint-disable-line
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
    result += widthText + 20
  })

  return result
}
