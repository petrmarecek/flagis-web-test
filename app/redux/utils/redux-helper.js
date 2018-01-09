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

export function computeTaskDate(tasks, dropIndex, targetSection, direction, dueDate) {

  const sectionTasks = getTimeLineByDueDate(tasks)[targetSection]
  if (sectionTasks.length === 0) {
    if (targetSection === 'othersTasks') {
      return 'othersTasks'
    }

    return dueDate
  }

  // Moved to the top section - subtract 1 s
  if (dropIndex === 0) {
    const nextDueDate = sectionTasks[0].dueDate
    if (!nextDueDate) {
      return 'othersTasks'
    }

    return moment(nextDueDate).subtract(1, 's')
  }

  // Moved to the end section - add 1 s
  if (dropIndex === (sectionTasks.length - 1)) {
    const prevDueDate = sectionTasks[dropIndex].dueDate
    if (!prevDueDate) {
      return 'othersTasks'
    }

    return moment(prevDueDate).add(1, 's')
  }

  // Moved in the middle
  if (direction === 'DOWN') {
    const prevDueDate = sectionTasks[dropIndex].dueDate
    const nextDueDate = sectionTasks[dropIndex + 1].dueDate
    if (!prevDueDate && !nextDueDate) {
      return 'othersTasks'
    }

    if (prevDueDate && !nextDueDate) {
      return moment(prevDueDate).add(1, 's')
    }

    const diff = moment(nextDueDate).diff(moment(prevDueDate))
    return moment(prevDueDate).add(diff/2)
  }

  const prevDueDate = sectionTasks[dropIndex - 1].dueDate
  const nextDueDate = sectionTasks[dropIndex].dueDate
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
