import { getTimeLineByDueDate } from 'redux/utils/component-helper'
import moment from 'moment'

// For task order nad filter group order in tag tree
export function computeOrder(items, dropIndex) {

  // Moving just one task
  if (items.length === 1) {
    return null
  }

  // Moved to the top
  if (dropIndex === 0) {
    return Date.now()
  }

  // Moved to the end
  if (dropIndex === (items.length - 1)) {
    // Subtract an hour to the order
    const hourInMs = 60 * 60 * 1000
    const prevItemsOrder = items[dropIndex - 1].order
    return new Date(prevItemsOrder - hourInMs).getTime()
  }

  // Moved in the middle
  const prevItemsOrder = items[dropIndex - 1].order
  const nextItemsOrder = items[dropIndex + 1].order
  return prevItemsOrder + ((prevItemsOrder - nextItemsOrder) / 2)
}

export function computeTreeOrder(items, dropIndex, isSection) {

  // Moving just one task
  if (items.size === 1) {
    return null
  }

  const itemsArray = items.toArray()

  // Moved to the top
  if (dropIndex === 0) {

    // Subtract an hour to the order
    const hourInMs = 60 * 60 * 1000
    const nextItemsOrder = itemsArray[dropIndex + 1].order
    return new Date(nextItemsOrder - hourInMs).getTime()
  }

  // Moved to the end
  if (dropIndex === (itemsArray.length - 1)) {
    return Date.now()
  }

  // Moved in the middle
  const prevItemsOrder = itemsArray[dropIndex - 1].order
  const nextItemsOrder = isSection
    ? itemsArray[dropIndex + 1].order
    : itemsArray[dropIndex].order

  return prevItemsOrder + ((nextItemsOrder - prevItemsOrder) / 2)
}

export function computeTimeLine(tasks, move) {
  const {sourceSection, sourceDueDate, targetSection, targetDueDate, targetIndex, direction} = move
  const sectionTasks = getTimeLineByDueDate(tasks)[targetSection]

  // Move to the same section
  if (sectionTasks.length === 1 && sourceSection === targetSection) {
    return null
  }

  // Move to the empty section
  if (sectionTasks.length === 0) {
    if (targetSection === 'othersTasks') {
      return {
        dueDate: 'othersTasks',
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
    const hourInMs = 60 * 60 * 1000
    const nextOrderTimeLine = nextTask.orderTimeLine
    const orderTimeLine = new Date(nextOrderTimeLine + hourInMs).getTime()
    const nextDueDate = nextTask.dueDate

    if (!nextDueDate) {
      return {
        dueDate: 'othersTasks',
        orderTimeLine: null
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
    const hourInMs = 60 * 60 * 1000
    const prevOrderTimeLIne = task.orderTimeLine
    const orderTimeLine = new Date(prevOrderTimeLIne - hourInMs).getTime()
    const prevDueDate = task.dueDate

    if (!prevDueDate) {
      return {
        dueDate: 'othersTasks',
        orderTimeLine: null
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
  let orderTimeLine = nextOrderTimeLine + ((prevOrderTimeLine - nextOrderTimeLine) / 2)
  let prevDueDate = sectionTasks[targetIndex - 1].dueDate

  // Down direction
  if (direction === 'DOWN') {
    prevOrderTimeLine = sectionTasks[targetIndex].orderTimeLine
    nextOrderTimeLine = sectionTasks[targetIndex + 1].orderTimeLine
    orderTimeLine = nextOrderTimeLine + ((prevOrderTimeLine - nextOrderTimeLine) / 2)
    prevDueDate = sectionTasks[targetIndex].dueDate
  }

  if (!prevDueDate) {
    return {
      dueDate: 'othersTasks',
      orderTimeLine: null
    }
  }

  return {
    dueDate: moment(prevDueDate),
    orderTimeLine
  }
}

