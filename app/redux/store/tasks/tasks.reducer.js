import { List } from 'immutable'
import typeToReducer from 'type-to-reducer'

import { AUTH } from 'redux/store/auth/auth.actions'
import { TASKS } from 'redux/store/tasks/tasks.actions'
import { TaskStore } from 'redux/data/records'

export default typeToReducer({

  [TASKS.ADD]: (state, action) => {
    const newTaskId = action.payload.result
    return state.updateIn(['items'],
      items => items.insert(0, newTaskId))
  },

  [TASKS.FETCH]: {
    PENDING: state => state.withMutations(taskStore => {

      // reset tasks set
      taskStore.setIn(['isFetching'], true)
      taskStore.setIn(['items'], List())
      taskStore.setIn(['completed'], List())
    }),

    FULFILLED: (state, action) => {
      const tasks = action.payload.entities.tasks
      const completedTasksIds = completedTasks(tasks)
      const taskIds = action.payload.result

      return state
        .setIn(['isFetching'], false)
        .setIn(['items'], List(taskIds))
        .setIn(['completed'], List(completedTasksIds))
    }
  },

  [TASKS.FETCH_ARCHIVED]: {
    PENDING: state => state.withMutations(taskStore => {

      // reset tasks set
      taskStore.setIn(['archived', 'isFetching'], true)
      taskStore.setIn(['archived', 'items'], List())
    }),

    FULFILLED: (state, action) => {
      const taskIds = action.payload.result

      return state
        .setIn(['archived', 'isFetching'], false)
        .setIn(['archived', 'items'], List(taskIds))
    }
  },

  // Update lists for tasks
  [TASKS.FIREBASE]: {
    FULFILLED: (state, action) => {
      // Get new lists for tasks store
      const { newItems, newCompleted, newArchived } = updateTasksListsFromFirestore(state, action)

      // Set new lists
      return state
        .setIn(['items'], newItems)
        .setIn(['completed'], newCompleted)
        .setIn(['archived', 'items'], newArchived)
    }
  },

  [TASKS.SELECT]: (state, action) => state
    .setIn(['selection'], action.payload.taskList),

  [TASKS.SELECT_ALL]: (state, action) => state
    .setIn(['selection'], action.payload.taskList),

  [TASKS.DESELECT]: state => state
    .updateIn(['selection'], set => set.clear()),

  [TASKS.SET_COMPLETE]: (state, action) => state
    .updateIn(['completed'], list => list.unshift(action.payload.taskId)),

  [TASKS.SET_INCOMPLETE]: (state, action) => state
    .updateIn(['completed'], list => list.filter(taskId => taskId !== action.payload.taskId)),

  [TASKS.SET_ARCHIVE]: (state, action) => state
    .setIn(['items'], action.payload.tasksList)
    .setIn(['completed'], action.payload.completedList)
    .setIn(['archived', 'items'], action.payload.archivedList)
    .setIn(['selection'], action.payload.selectedList),

  [TASKS.CANCEL_ARCHIVE]: (state, action) => state
    .setIn(['items'], action.payload.tasksList)
    .setIn(['completed'], action.payload.completedList)
    .setIn(['archived', 'items'], action.payload.archivedList)
    .setIn(['selection'], action.payload.selectedList),

  [TASKS.DELETE]: (state, action) => state
    .setIn(['items'], action.payload.taskList)
    .setIn(['completed'], action.payload.taskCompleteList)
    .setIn(['archived', 'items'], action.payload.taskArchiveList),

  [TASKS.UNDO_DELETE]: (state, action) => state
    .setIn(['items'], action.payload.taskList)
    .setIn(['completed'], action.payload.taskCompleteList)
    .setIn(['archived', 'items'], action.payload.taskArchiveList),

  [TASKS.REMOVE_FROM_LISTS]: (state, action) => state
    .updateIn(['completed'], list => list.filter(taskId => taskId !== action.payload.taskId))
    .updateIn(['items'], list => list.filter(taskId => taskId !== action.payload.taskId)),


  [AUTH.LOGOUT]: () => new TaskStore(),

}, new TaskStore())

function completedTasks(tasks) {
  if (!tasks) {
    return null
  }

  const completedTasksList = []
  for (const task of Object.values(tasks)) {
    if (task.isCompleted) {
      completedTasksList.push(task.id)
    }
  }

  return completedTasksList
}

function updateTasksListsFromFirestore(state, action) {
  const task = action.payload.entities.tasks
  const resultId = action.payload.result
  const { id, isCompleted, isArchived, isTrashed } = task[resultId]

  let newItems = state.getIn(['items'])
  let newCompleted = state.getIn(['completed'])
  let newArchived = state.getIn(['archived', 'items'])

  // Uncompleted task
  if (!isCompleted && !isArchived && !isTrashed) {
    if (!newItems.includes(id)) {
      newItems = newItems.push(id)
    }

    if (newArchived.includes(id)) {
      newArchived = newArchived.filter(taskId => taskId !== id)
    }

    if (newCompleted.includes(id)) {
      newCompleted = newCompleted.filter(taskId => taskId !== id)
    }

    return { newItems, newCompleted, newArchived }
  }

  // Completed task
  if (isCompleted && !isArchived && !isTrashed) {
    if (!newItems.includes(id)) {
      newItems = newItems.push(id)
    }

    if (!newCompleted.includes(id)) {
      newCompleted = newCompleted.push(id)
    }

    if (newArchived.includes(id)) {
      newArchived = newArchived.filter(taskId => taskId !== id)
    }

    return { newItems, newCompleted, newArchived }
  }

  // Archived task
  if (isCompleted && isArchived && !isTrashed) {
    if (!newArchived.includes(id)) {
      newArchived = newArchived.push(id)
    }

    if (newItems.includes(id)) {
      newItems = newItems.filter(taskId => taskId !== id)
    }

    if (newCompleted.includes(id)) {
      newCompleted = newCompleted.filter(taskId => taskId !== id)
    }

    return { newItems, newCompleted, newArchived }
  }

  // Trashed task
  if (isTrashed) {
    if (newItems.includes(id)) {
      newItems = newItems.filter(taskId => taskId !== id)
    }

    if (newCompleted.includes(id)) {
      newCompleted = newCompleted.filter(taskId => taskId !== id)
    }

    if (newArchived.includes(id)) {
      newArchived = newArchived.filter(taskId => taskId !== id)
    }

    return { newItems, newCompleted, newArchived }
  }

  return { newItems, newCompleted, newArchived }
}
