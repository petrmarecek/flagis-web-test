import { getTimeLineByDueDate } from 'redux/utils/component-helper'
import moment from 'moment'
import dateUtil from 'redux/utils/date'

// For task order nad filter group order in tag tree
export function computeOrder(tasks, move) {
  const { targetIndex, direction } = move

  // Moving just one task
  if (tasks.length === 1) {
    return null
  }

  // Moved to the top
  if (targetIndex === 0) {
    return dateUtil.getMilliseconds()
  }

  // Moved to the end
  if (targetIndex === (tasks.length - 1)) {
    // Subtract an hour to the order
    const hourInMs = 60 * 60 * 1000
    const prevItemsOrder = tasks[targetIndex].order
    return new Date(prevItemsOrder - hourInMs).getTime()
  }

  // Moved in the middle
  // Up direction
  let prevItemsOrder = tasks[targetIndex - 1].order
  let nextItemsOrder = tasks[targetIndex].order

  if (direction === 'DOWN') {
    prevItemsOrder = tasks[targetIndex].order
    nextItemsOrder = tasks[targetIndex + 1].order
  }

  return nextItemsOrder + ((prevItemsOrder - nextItemsOrder) / 2)
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
  if (targetIndex === (itemsArray.length - 1)) {
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

  return prevItemsOrder + ((nextItemsOrder - prevItemsOrder) / 2)
}

export function computeTreeItemOrder(items, dropIndex, direction, sourceParentId, targetParentId) {

  // Moving just one task
  if (items.size === 1 && sourceParentId === targetParentId) {
    return null
  }

  const itemsArray = items.toArray()

  // Moved to the top
  if (dropIndex === 0) {

    // Subtract an hour to the order
    const hourInMs = 60 * 60 * 1000
    const nextItemsOrder = itemsArray[dropIndex].order
    return new Date(nextItemsOrder - hourInMs).getTime()
  }

  // Moved to the end
  if (dropIndex === (itemsArray.length - 1)) {
    // Subtract an hour to the order
    const hourInMs = 60 * 60 * 1000
    const nextItemsOrder = itemsArray[dropIndex].order
    return new Date(nextItemsOrder + hourInMs).getTime()
  }

  // Moved in the middle
  let prevItemsOrder = itemsArray[dropIndex].order
  let nextItemsOrder = itemsArray[dropIndex + 1].order
  if (direction === 'TOP') {
    prevItemsOrder = itemsArray[dropIndex - 1].order
    nextItemsOrder = itemsArray[dropIndex].order
  }

  return prevItemsOrder + ((nextItemsOrder - prevItemsOrder) / 2)
}

export function computeTimeLine(tasks, move) {
  const { sourceSection, sourceDueDate, targetSection, targetDueDate, targetIndex, bottom, direction } = move
  const sectionTasks = getTimeLineByDueDate(tasks)[targetSection]

  // Move to the same section
  if (sectionTasks.length === 1 && sourceSection === targetSection) {
    return null
  }

  // Move to the empty section
  if (sectionTasks.length === 0) {

    if (targetSection === 'noDueDatesTasks') {
      return {
        dueDate: null,
        orderTimeLine: null
      }
    }

    const time = sourceDueDate
      ? {
          'hour': moment(sourceDueDate).get('hour'),
          'minute': moment(sourceDueDate).get('minute'),
          'second': moment(sourceDueDate).get('second'),
          'millisecond': moment(sourceDueDate).get('millisecond'),
        }
      : {
          'hour': 23,
          'minute': 45,
          'second': 0,
          'millisecond': 0,
        }

    return {
      dueDate: targetDueDate.set({
        'hour': time.hour,
        'minute': time.minute,
        'second': time.second,
        'millisecond': time.millisecond,
        orderTimeLine: null
      }),
      orderTimeLine: null,
    }
  }

  // Moved to the top of section
  if (targetIndex === 0) {
    const nextTask = sectionTasks[0]
    const nextOrderTimeLine = nextTask.orderTimeLine
    let orderTimeLine = new Date(nextOrderTimeLine + 1000).getTime()
    const nextDueDate = nextTask.dueDate

    if (targetSection === 'noDueDatesTasks') {
      return {
        dueDate: null,
        orderTimeLine
      }
    }

    // Dragging upwards to other section
    if ((sourceSection !== targetSection) && bottom) {
      orderTimeLine = new Date(nextOrderTimeLine - 1000).getTime()

      return {
        dueDate: moment(nextDueDate),
        orderTimeLine
      }
    }

    return {
      dueDate: moment(nextDueDate),
      orderTimeLine
    }
  }

  // Moved to the end of section
  if (targetIndex === (sectionTasks.length - 1)) {
    const task = sectionTasks[targetIndex]
    const prevOrderTimeLIne = task.orderTimeLine
    const orderTimeLine = new Date(prevOrderTimeLIne - 1000).getTime()
    const prevDueDate = task.dueDate

    if (targetSection === 'noDueDatesTasks') {
      return {
        dueDate: null,
        orderTimeLine
      }
    }

    return {
      dueDate: moment(prevDueDate),
      orderTimeLine
    }
  }

  // Moved in the middle
  // Up direction
  let prevOrderTimeLine = sectionTasks[targetIndex - 1].orderTimeLine
  let nextOrderTimeLine = sectionTasks[targetIndex].orderTimeLine
  let prevDueDate = sectionTasks[targetIndex - 1].dueDate

  // Down direction
  if (direction === 'DOWN') {
    prevOrderTimeLine = sectionTasks[targetIndex].orderTimeLine
    nextOrderTimeLine = sectionTasks[targetIndex + 1].orderTimeLine
    prevDueDate = sectionTasks[targetIndex].dueDate
  }

  const orderTimeLine = nextOrderTimeLine + ((prevOrderTimeLine - nextOrderTimeLine) / 2)
  if (targetSection === 'noDueDatesTasks') {
    return {
      dueDate: null,
      orderTimeLine
    }
  }

  return {
    dueDate: moment(prevDueDate),
    orderTimeLine
  }
}

