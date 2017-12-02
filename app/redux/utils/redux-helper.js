
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
