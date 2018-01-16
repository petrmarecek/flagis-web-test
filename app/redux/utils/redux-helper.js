import { getTimeLineByDueDate } from 'redux/utils/component-helper'
import moment from 'moment'

export function computeTaskOrder(tasks, dropIndex) {

  // Moving just one task
  if (tasks.length === 1) {
    return null
  }

  // Moved to the top
  if (dropIndex === 0) {
    return Date.now()
  }

  // Moved to the end
  if (dropIndex === (tasks.length - 1)) {

    // Subtract an hour to the order
    const hourInMs = 60 * 60 * 1000
    const prevTaskOrder = tasks[dropIndex - 1].order
    return new Date(prevTaskOrder - hourInMs).getTime()
  }

  // Moved in the middle
  const prevTaskOrder = tasks[dropIndex - 1].order
  const nextTaskOrder = tasks[dropIndex + 1].order
  return prevTaskOrder + ((nextTaskOrder - prevTaskOrder) / 2)
}

export function computeTaskDate(tasks, move) {

  const {sourceSection, sourceDueDate, targetSection, targetDueDate, targetIndex, direction} = move
  const sectionTasks = getTimeLineByDueDate(tasks)[targetSection]
  if (sectionTasks.length === 1 && sourceSection === targetSection) {
    return null
  }

  if (sectionTasks.length === 0) {
    if (targetSection === 'othersTasks') {
      return 'othersTasks'
    }

    const time = sourceDueDate
      ? {
          'hour': moment(sourceDueDate).get('hour'),
          'minute': moment(sourceDueDate).get('minute'),
          'second': moment(sourceDueDate).get('second'),
          'millisecond': moment(sourceDueDate).get('millisecond'),
        }
      : {
          'hour': 0,
          'minute': 0,
          'second': 0,
          'millisecond': 0,
        }

    return targetDueDate.set({
      'hour': time.hour,
      'minute': time.minute,
      'second': time.second,
      'millisecond': time.millisecond,
    })
  }

  // Moved to the top section - subtract 1 s
  if (targetIndex === 0) {
    const nextDueDate = sectionTasks[0].dueDate
    if (!nextDueDate) {
      return 'othersTasks'
    }

    return moment(nextDueDate).subtract(1, 's')
  }

  // Moved to the end section - add 1 s
  if (targetIndex === (sectionTasks.length - 1)) {
    const prevDueDate = sectionTasks[targetIndex].dueDate
    if (!prevDueDate) {
      return 'othersTasks'
    }

    return moment(prevDueDate).add(1, 's')
  }

  // Moved in the middle
  if (direction === 'DOWN') {
    const prevDueDate = sectionTasks[targetIndex].dueDate
    const nextDueDate = sectionTasks[targetIndex + 1].dueDate
    if (!prevDueDate && !nextDueDate) {
      return 'othersTasks'
    }

    if (prevDueDate && !nextDueDate) {
      return moment(prevDueDate).add(1, 's')
    }

    const diff = moment(nextDueDate).diff(moment(prevDueDate))
    return moment(prevDueDate).add(diff/2)
  }

  const prevDueDate = sectionTasks[targetIndex - 1].dueDate
  const nextDueDate = sectionTasks[targetIndex].dueDate
  if (!prevDueDate && !nextDueDate) {
    return 'othersTasks'
  }

  if (prevDueDate && !nextDueDate) {
    return moment(prevDueDate).add(1, 's')
  }

  const diff = moment(nextDueDate).diff(moment(prevDueDate))
  return moment(prevDueDate).add(diff/2)
}

export function computeSectionOrder(sections, dropIndex, direction) {
  // Moving just one section
  if (sections.length === 1) {
    return null
  }

  // Moved to the top
  if (dropIndex === 0) {
    return 0
  }

  // Moved in the middle
  const prevSectionOrder = sections.get(dropIndex - 1).order
  return direction === 'DOWN'
    ? prevSectionOrder
    : prevSectionOrder + 1
}
