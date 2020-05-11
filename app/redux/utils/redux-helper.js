import { getAssigneeOfTask } from 'redux/utils/component-helper'
import dateUtil from 'redux/utils/date'
import R from 'ramda'

// For task order nad filter group order in tag tree
export function computeOrder(tasks, move) {
  const { targetIndex, direction, isActiveTags } = move

  // Moving just one task
  if (tasks.length === 1) {
    return null
  }

  // Moved to the top
  if (targetIndex === 0) {
    // Add a second to the order if tag filter is activated
    if (isActiveTags) {
      const prevItemsOrder = tasks[targetIndex].order
      return new Date(prevItemsOrder + 1000).getTime()
    }

    return dateUtil.getMilliseconds()
  }

  // Moved to the end
  if (targetIndex === tasks.length - 1) {
    // Subtract a second to the order
    const prevItemsOrder = tasks[targetIndex].order
    return new Date(prevItemsOrder - 1000).getTime()
  }

  // Moved in the middle
  // Up direction
  let prevItemsOrder = tasks[targetIndex - 1].order
  let nextItemsOrder = tasks[targetIndex].order

  if (direction === 'DOWN') {
    prevItemsOrder = tasks[targetIndex].order
    nextItemsOrder = tasks[targetIndex + 1].order
  }

  return nextItemsOrder + (prevItemsOrder - nextItemsOrder) / 2
}

export function computeTreeSectionOrder(items, move) {
  const { targetIndex, direction } = move

  // Moving just one task
  if (items.size === 1) {
    return null
  }

  const itemsArray = items.toArray()

  // Moved to the top
  if (targetIndex === 0) {
    // Subtract an hour to the order
    const hourInMs = 60 * 60 * 1000
    const nextItemsOrder = itemsArray[targetIndex].order
    return new Date(nextItemsOrder - hourInMs).getTime()
  }

  // Moved to the end
  if (targetIndex === itemsArray.length - 1) {
    return dateUtil.getMilliseconds()
  }

  // Moved in the middle
  // Up direction
  let prevItemsOrder = itemsArray[targetIndex - 1].order
  let nextItemsOrder = itemsArray[targetIndex].order

  if (direction === 'DOWN') {
    prevItemsOrder = itemsArray[targetIndex].order
    nextItemsOrder = itemsArray[targetIndex + 1].order
  }

  return prevItemsOrder + (nextItemsOrder - prevItemsOrder) / 2
}

export function computeTreeItemOrder(items, drop) {
  const { targetIndex, direction, sourceParentId, targetParentId } = drop

  // Moving just one task
  if (items.size === 1 && sourceParentId === targetParentId) {
    return null
  }

  const itemsArray = items.toArray()

  // Moved to the top
  if (targetIndex === 0) {
    // Subtract an hour to the order
    const hourInMs = 60 * 60 * 1000
    const nextItemsOrder = itemsArray[targetIndex].order
    return new Date(nextItemsOrder - hourInMs).getTime()
  }

  // Moved to the end
  if (targetIndex === itemsArray.length - 1) {
    // Subtract an hour to the order
    const hourInMs = 60 * 60 * 1000
    const nextItemsOrder = itemsArray[targetIndex].order
    return new Date(nextItemsOrder + hourInMs).getTime()
  }

  // Moved in the middle
  let prevItemsOrder = itemsArray[targetIndex].order
  let nextItemsOrder = itemsArray[targetIndex + 1].order

  if (direction === 'TOP') {
    prevItemsOrder = itemsArray[targetIndex - 1].order
    nextItemsOrder = itemsArray[targetIndex].order
  }

  return prevItemsOrder + (nextItemsOrder - prevItemsOrder) / 2
}

export function getTasksTagsRelations(tagId, entitiesTasks) {
  let result = false

  for (const task of entitiesTasks) {
    const { tags } = task

    if (tags.includes(tagId)) {
      result = true
      break
    }
  }

  return result
}

export function getContactTasksRelations(contactId, entitiesTasks) {
  let result = { isTask: false, isInbox: false, isArchived: false }
  const isTakeLens = R.lensProp('isTask')
  const isInboxLens = R.lensProp('isInbox')
  const isArchivedLens = R.lensProp('isArchived')

  for (const task of entitiesTasks) {
    const { isArchived, followers, createdById } = task
    const assignee = getAssigneeOfTask(followers)

    if (assignee === null) {
      continue
    }

    const profileId = assignee.profile.id
    const isInbox = assignee.status === 'pending'
    if (profileId !== contactId && createdById !== contactId) {
      continue
    }

    if (isInbox && !result.isInbox) {
      result = R.set(isInboxLens, true, result)
      continue
    }

    if (isArchived && !result.isArchived) {
      result = R.set(isArchivedLens, true, result)
      continue
    }

    result = R.set(isTakeLens, true, result)
    break
  }

  return result
}
