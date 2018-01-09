import { List } from 'immutable'
import typeToReducer from 'type-to-reducer'

import { AUTH } from 'redux/store/auth/auth.actions'
import { TAGS } from 'redux/store/tags/tags.actions'
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

  // New set of tags was selected, remove the current one
  [TAGS.SET_ACTIVE_TAGS]: (state, action) => {
    const isArchivedTasks = action.payload.isArchivedTasks

    if (isArchivedTasks) {
      return state
        .setIn(['archived', 'items'], List())
    }

    return state
      .setIn(['items'], List())
      .setIn(['completed'], List())
  },

  [TASKS.SELECT]: (state, action) => state
    .setIn(['selection'], action.payload.taskList),

  [TASKS.SELECT_ALL]: (state, action) => state
    .setIn(['selection'], action.payload.taskList),

  [TASKS.DESELECT]: state => state
    .updateIn(['selection'], set => set.clear()),

  [TASKS.MOVE]: (state, action) => {
    const move = action.payload

    return state.updateIn(['items'], list => {

      // Find index of hovered task & compute index for dragged one
      const targetTaskIndex = list.indexOf(move.targetTaskId)

      // Move taskId within the list
      return list
        .filter(taskId => taskId !== move.sourceTaskId)
        .insert(targetTaskIndex, move.sourceTaskId)
    })
  },

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
