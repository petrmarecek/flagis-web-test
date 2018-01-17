import { call, put, select, fork } from 'redux-saga/effects'
import {
  fetch,
  mainUndo,
} from 'redux/store/common.sagas'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as tagsActions from 'redux/store/tags/tags.actions'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as taskMenuActions from 'redux/store/tasks-menu/tasks-menu.action'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import * as taskSelectors from 'redux/store/tasks/tasks.selectors'
import * as tagsSelectors from 'redux/store/tags/tags.selectors'
import search from 'redux/services/search'

const TASKS = taskActions.TASKS

export function* fetchTasks() {
  const isArchivedTasks = yield select(state => appStateSelectors.getArchivedTasksVisibility(state))

  if (isArchivedTasks) {
    yield put(appStateActions.hideArchivedTasks())
  }

  const activeTags = yield select(state => tagsSelectors.getActiveTagsIds(state))
  const result = yield* fetch(TASKS.FETCH, {
    method: api.tasks.search,
    args: [{
      isArchived: false,
      isTrashed: false,
      tags: activeTags,
    }],
    schema: schema.taskList
  })

  // Initialize search service
  search.tasks.resetIndex()
  search.tasks.addItems(result)
}

export function* fetchArchivedTasks() {
  const isArchivedTasks = yield select(state => appStateSelectors.getArchivedTasksVisibility(state))

  if (!isArchivedTasks) {
    yield put(appStateActions.visibleArchivedTasks())
  }

  const activeTags = yield select(state => tagsSelectors.getActiveTagsIds(state))
  const result = yield* fetch(TASKS.FETCH_ARCHIVED, {
    method: api.tasks.search,
    args: [{
      isArchived: true,
      isCompleted: true,
      isTrashed: false,
      tags: activeTags,
    }],
    schema: schema.taskList
  })

  // Initialize search service
  search.tasks.resetIndex()
  search.tasks.addItems(result)
}

export function* createTask(action) {
  try {
    // TODO: implement optimistic insert
    const data = {
      subject: action.payload.subject,
      dueDate: action.payload.dueDate,
      tags: action.payload.tags,
    }
    const task = yield call(api.tasks.create, data)

    if (action.payload.isImportant) {
      yield put(taskActions.requestToggleImportant(task))
    }

    // add task to the search index
    search.tasks.addItem(task)

    yield put(taskActions.addTask(task))

    if(task.tags.length !== 0) {
      for (const tag of task.tags) {
        yield put(tagsActions.addTagsRelations(tag.id, task.id))
      }
    }

  } catch(err) {
    console.error('Cannot create task.', err)
    // TODO: handle error
  }
}

export function* toggleImportant(action) {
  const task = action.payload.task
  const originalIsImportant = task.isImportant

  try {
    const isImportant = !originalIsImportant

    // optimistic update
    yield put(taskActions.setImportant(task, isImportant))

    // call server
    const update = { isImportant }
    yield updateTask(task.id, update)

  } catch (err) {
    // log error
    console.error('Error occured during task update', err)

    // revert to original state
    yield put(taskActions.setImportant(task, originalIsImportant))
  }
}

export function* setArchiveTasks(action) {
  const newArchiveTasks = action.payload.newArchiveTasksList

  try {
    // call server
    const update = { isArchived: true }
    for (const archiveTaskId of newArchiveTasks) {
      // update task (change isArchived: true)
      yield* updateTask(archiveTaskId, update)

      // delete relations for archived task and tags
      const tagList = yield select(state => taskSelectors.getTaskTags(state, archiveTaskId))
      if(tagList.length !== 0) {
        for (const tag of tagList) {
          yield put(tagsActions.deleteTagsRelations(tag, archiveTaskId))
        }
      }
    }

  } catch(err) {
    // TODO: revert to original state
  }
}

export function* cancelArchiveTasks(action) {
  const newTasksList = action.payload.newTasksList

  try {
    // call server
    const newOrder = Date.now()
    const update = {
      isArchived: false,
      order: newOrder,
    }
    for (const taskId of newTasksList) {
      // update task (change isArchived: false)
      yield* updateTask(taskId, update)

      // add relations for archived task and tags
      const tagList = yield select(state => taskSelectors.getTaskTags(state, taskId))
      if(tagList.length !== 0) {
        for (const tag of tagList) {
          yield put(tagsActions.addTagsRelations(tag, taskId))
        }
      }
    }

  } catch(err) {
    // TODO: revert to original state
  }
}

export function* setComplete(action) {
  const taskId = action.payload.taskId
  try {

    // call server
    const update = { isCompleted: true }
    yield* updateTask(taskId, update)

  } catch(err) {
    // TODO: revert to original state
  }
}

export function* setIncomplete(action) {
  const taskId = action.payload.taskId
  try {

    // update isCompleted and put task to top
    const update = { isCompleted: false }
    yield* updateTask(taskId, update)

  } catch(err) {
    console.error(err)
    // TODO: revert to original state
  }
}

export function* setOrder(action) {
  const task = action.payload.task
  const order = action.payload.order

  try {
    // call server
    const update = { order }
    yield* updateTask(task.id, update)

  } catch(err) {
    // TODO: revert
    // We need to both revert Task.order field and position within loaded list
  }
}

export function* setDate(action) {
  const fieldName = action.payload.type
  const fieldValue = action.payload.date
  yield* setTaskField(action.payload.task, fieldName, fieldValue)
}

export function* setDescription(action) {
  yield* setTaskField(action.payload.task, 'description', action.payload.description)
}

export function* setSubject(action) {
  yield* setTaskField(action.payload.task, 'subject', action.payload.subject)
}

export function* selectTask(action) {
  const isMultiSelect = action.payload.isMultiSelect
  const sizeOfTaskList = action.payload.taskList.size

  if (isMultiSelect) {
    if (sizeOfTaskList === 0) {
      yield put(appStateActions.hideMultiSelect())
      return
    }

    yield put(appStateActions.visibleMultiSelect())
  } else {

    yield put(appStateActions.hideMultiSelect())

    const archivedTasks = yield select(state => appStateSelectors.getArchivedTasksVisibility(state))
    if (archivedTasks) {
      yield put(appStateActions.setDetail('archive'))
    } else {
      yield put(appStateActions.setDetail('task'))
    }
  }
}

export function* selectAllTask() {
  yield put(taskMenuActions.hideMenuOption())
  yield put(appStateActions.visibleMultiSelect())
}

export function* deselectTasks() {
  const isMultiSelectVisible = yield select(state => appStateSelectors.getMultiSelectVisibility(state))
  const isTaskDetail = yield select(state => appStateSelectors.getTaskTagDetail(state).task)
  const isArchiveDetail = yield select(state => appStateSelectors.getTaskTagDetail(state).archive)

  if (isMultiSelectVisible) {
    yield put(appStateActions.hideMultiSelect())
  }

  if (isTaskDetail) {
    yield put(appStateActions.deselectDetail('task'))
  }

  if (isArchiveDetail) {
    yield put(appStateActions.deselectDetail('archive'))
  }
}

export function* deleteTask(action) {
  const update = { isTrashed: true }
  for (const taskId of action.payload.taskDeleteList) {
    try {
      // update task (change isTrashed: true)
      yield* updateTask(taskId, update)

      const tagList = yield select(state => taskSelectors.getTaskTags(state, taskId))
      if(tagList.length !== 0) {
        for (const tag of tagList) {
          yield put(tagsActions.deleteTagsRelations(tag, taskId))
        }
      }

      // delete task from the search index
      search.tasks.removeItem({ id: taskId })
    } catch(err) {
      console.error(err)
    }
  }

  yield put(taskActions.deselectTasks())
  yield* mainUndo(action, 'taskDelete')
}

export function* undoDeleteTask(action) {
  const update = { isTrashed: false }

  for (const taskId of action.payload.taskDeleteList) {
    try {
      // update task (change isTrashed: false)
      yield* updateTask(taskId, update)

      const tagList = yield select(state => taskSelectors.getTaskTags(state, taskId))
      if(tagList.length !== 0) {
        for (const tag of tagList) {
          yield put(tagsActions.addTagsRelations(tag, taskId))
        }
      }

    } catch(err) {
      console.error(err)
    }
  }
}

export function* removeTag(action) {
  const taskId = action.payload.taskId

  try {
    // Find current list of tags
    const tagList = yield select(state => taskSelectors.getTaskTags(state, taskId))

    // Remove the target tag
    const tags = tagList
      .filter(tagId => tagId !== action.payload.tag.id)
      .map(tagId => ({ id: tagId }))
      .toJS()

    // Update list on the server & relations
    yield call(api.tasks.setTags, taskId, tags)
    yield put(tagsActions.deleteTagsRelations(action.payload.tag.id, action.payload.taskId))

    // Refresh task list if add tag that it set as active
    const activeTags = yield select(tagsSelectors.getActiveTagsIds)
    const tagId = action.payload.tag.id

    if (activeTags.includes(tagId)) {
      yield put(taskActions.deselectTasks())
      yield* fetch(TASKS.FETCH, {
        method: api.tasks.search,
        args: [{
          isArchived: false,
          isTrashed: false,
          tags: activeTags,
        }],
        schema: schema.taskList
      })
    }

    // Remove from current list if it does not match filter anymore
    // const activeTags = yield select(tagsSelectors.getActiveTagsIds)
    // if (activeTags.includes(action.payload.tag.id)) {
    //   yield put(taskActions.removeTaskFromLists(taskId))
    // }

  } catch(err) {
    console.error(err)
    // TODO: revert to original state
  }
}

export function* addTaskTag(action) {
  try {
    const taskId = action.payload.taskId
    const tag = action.payload.tag

    // Save relation on server (don't block rest of saga)
    yield fork(saveTaskTagRelation, taskId, tag)

    // Add relation
    yield put(tagsActions.addTagsRelations(tag.id, taskId))

  } catch(err) {
    console.error(err)
    // TODO: revert to original state
  }
}

// ------ HELPER FUNCTIONS ----------------------------------------------------

function* saveTaskTagRelation(taskId, tag) {
  try {
    const tagData = { title: tag.title }
    if (!tag.isNew) {
      tagData.id = tag.id
    }

    // Construct result list of tags
    const tagList = yield select(state => taskSelectors.getTaskTags(state, taskId))
    const tagsList = tagList.includes(tag.id)
      ? tagList.delete(tagList.indexOf(tag.id))
      : tagList

    const tags = tagsList
      .map(tagId => ({ id: tagId }))
      .push(tagData)
      .toJS()

    // Send them to server
    const resultTagList = yield call(() => api.tasks.setTags(taskId, tags))

    const activeTags = yield select(state => tagsSelectors.getActiveTagsIds(state))
    const tagId = tag.id
    if (activeTags.includes(tagId)) {
      yield* fetch(TASKS.FETCH, {
        method: api.tasks.search,
        args: [{
          isArchived: false,
          isTrashed: false,
          tags: activeTags,
        }],
        schema: schema.taskList
      })
    }

    // If we added a new task --> replace instance with the server one
    if (tag.isNew) {
      const matchedTags = resultTagList.filter(t => t.title.toLowerCase() === tag.title.toLowerCase())
      if (matchedTags.length !== 1) {
        throw new Error('Cannot find related tag.')
      }

      const serverTag = matchedTags[0]
      yield put(tagsActions.replaceTag(tag.id, serverTag, taskId))
    }
  } catch (err) {
    console.log(err)
    // TODO: detatch tag from task or add retry action
  }
}

function* setTaskField(task, fieldName, newFieldValue) {

  const originalFieldValue = task[fieldName]

  try {
    // optimistic update
    yield put(taskActions.setField(task, fieldName, newFieldValue))

    // call server
    const update = { [fieldName]: newFieldValue }
    yield* updateTask(task.id, update)

  } catch(err) {
    // log error
    console.error('Error occured during task update', err)

    // revert original values
    yield put(taskActions.setField(task, fieldName, originalFieldValue))
  }
}

function* updateTask(taskId, update) {

  // call server
  const updatedTask = yield call(api.tasks.update, taskId, update)

  // update task in the search index
  search.tasks.updateItem(updatedTask)

  // replace task in the store with the updated one
  yield put(taskActions.replaceTask(updatedTask))
}
