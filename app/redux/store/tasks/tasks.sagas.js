import { normalize } from 'normalizr'
import { all, cancelled, take, call, put, select, fork } from 'redux-saga/effects'
import {
  createLoadActions,
  fetch,
  mainUndo,
} from 'redux/store/common.sagas'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as tagsActions from 'redux/store/tags/tags.actions'
import * as taskMenuActions from 'redux/store/tasks-menu/tasks-menu.actions'
import * as followerActions from 'redux/store/followers/followers.actions'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as entitiesSelectors from 'redux/store/entities/entities.selectors'
import * as taskSelectors from 'redux/store/tasks/tasks.selectors'
import * as taskMenuSelectors from 'redux/store/tasks-menu/tasks-menu.selectors'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import search from 'redux/services/search'
import firebase from 'redux/utils/firebase'
import dateUtil from 'redux/utils/date'

import { toast } from 'react-toastify'
import { successMessages } from 'utils/messages'
import constants from 'utils/constants'

const TASKS = taskActions.TASKS

function* saveChangeFromFirestore(change, userId) {
  const { FULFILLED } = createLoadActions(TASKS.FIREBASE)
  const task = change.doc.data()

  // Prepare data
  task.tags = task.tags[userId]
  const normalizeData = normalize(task, schema.task)
  const storeItems = yield select(state => taskSelectors.getTasksItems(state))
  const storeArchivedItems = yield select(state => taskSelectors.getArchivedTasksItems(state))
  const isDetailVisible = yield select(state => appStateSelectors.getDetail(state))
  const { id, isArchived, isTrashed } = task

  // Return task from archive
  if (!isArchived && !isTrashed && !storeItems.includes(id) && storeArchivedItems.includes(id)) {
    // Show notification
    toast.success(successMessages.tasks.cancelArchive, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
    })

    // Close archive detail
    if (isDetailVisible.archive) {
      yield put(appStateActions.deselectDetail('archive'))
    }

    // Update task in search
    search.tasks.updateItem(task)
  }

  // Move task to archive
  if (isArchived && !isTrashed && !storeArchivedItems.includes(id) && storeItems.includes(id)) {
    // Show notification
    toast.success(successMessages.tasks.archive, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
    })

    // Close detail
    if (isDetailVisible.task) {
      yield put(appStateActions.deselectDetail('task'))
    }

    // Update task in search
    search.tasks.updateItem(task)
  }

  // New task
  if (!storeItems.includes(id) && !storeArchivedItems.includes(id)) {
    // Add new task to search
    search.tasks.addItem(task)
  }

  // Delete task
  if (isTrashed) {
    // Close detail
    if (isDetailVisible.task) {
      yield put(appStateActions.deselectDetail('task'))
    }

    // Close archive detail
    if (isDetailVisible.archive) {
      yield put(appStateActions.deselectDetail('archive'))
    }

    // Delete task from search
    search.tasks.removeItem({ id })
  }

  // Save changes to store
  yield put({type: FULFILLED, payload: normalizeData})

  // Update tag relations in store
  const entitiesTasks = yield select(state => entitiesSelectors.getActiveEntitiesTasks(state))
  yield put({ type: TASKS.FIREBASE_TAGS_RELATIONS, payload: entitiesTasks })
}

function* syncTasksChannel(channel, userId) {
  while (true) { // eslint-disable-line
    const snapshot = yield take(channel)
    yield all(snapshot.docChanges().map(change => call(saveChangeFromFirestore, change, userId)))
  }
}

export function* fetchTasks() {
  const isArchivedTasks = yield select(state => appStateSelectors.getArchivedTasksVisibility(state))
  const isInboxTasks = yield select(state => appStateSelectors.getInboxTasksVisibility(state))

  if (isArchivedTasks) {
    yield put(appStateActions.hideArchivedTasks())
  }

  if (isInboxTasks) {
    yield put(appStateActions.hideInboxTasks())
  }

  const result = yield* fetch(TASKS.FETCH, {
    method: api.tasks.search,
    args: [{
      isArchived: false,
      isTrashed: false,
      tags: [],
    }],
    schema: schema.tasks
  })

  // Initialize search service
  search.tasks.resetIndex()
  search.tasks.addItems(result)

  // Reset full text search
  const text = yield select(state => taskMenuSelectors.getTaskMenuFiltersItem(state, 'searchText'))
  yield put(taskMenuActions.changeSearchText(''))
  yield put(taskMenuActions.changeSearchText(text))
}

export function* fetchArchivedTasks() {
  const isArchivedTasks = yield select(state => appStateSelectors.getArchivedTasksVisibility(state))

  if (!isArchivedTasks) {
    yield put(appStateActions.visibleArchivedTasks())
  }

  const result = yield* fetch(TASKS.FETCH_ARCHIVED, {
    method: api.tasks.search,
    args: [{
      isArchived: true,
      isCompleted: true,
      isTrashed: false,
      tags: [],
    }],
    schema: schema.tasks
  })

  // Initialize search service
  search.tasks.removeItems(result)
  search.tasks.addItems(result)

  // Reset full text search
  const text = yield select(state => taskMenuSelectors.getTaskMenuFiltersItem(state, 'searchText'))
  yield put(taskMenuActions.changeSearchText(''))
  yield put(taskMenuActions.changeSearchText(text))
}

export function* fetchInboxTasks() {

  yield* fetch(TASKS.FETCH_INBOX, {
    method: api.tasks.inbox,
    args: [],
    schema: schema.tasks
  })
}

export function* initTasksData(initTime) {
  const userId = yield select(state => authSelectors.getUserId(state))
  const channel = firebase.getTasksChannel(userId, initTime)
  return yield fork(syncTasksChannel, channel, userId)
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
    const update = {
      isArchived: false,
      order: dateUtil.getMilliseconds(),
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
  try {
    // call server
    const taskId = action.payload.task.id
    const order = action.payload.order
    const update = { order }

    // call server
    const updatedTask = yield call(api.tasks.update, taskId, update)

    // update task in the search index
    search.tasks.updateItem(updatedTask)

  } catch(err) {
    // TODO: revert
    // We need to both revert Task.order field and position within loaded list
  }
}

export function* setOrderTimeLine(action) {

  try {
    // call server
    const taskId = action.payload.task.id
    const { dueDate, orderTimeLine } = action.payload
    const update = { dueDate, orderTimeLine }

    // call server
    const updatedTask = yield call(api.tasks.update, taskId, update)

    // update task in the search index
    search.tasks.updateItem(updatedTask)

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
    yield put(appStateActions.setDetail('task'))
  }
}

export function* selectAllTask() {
  yield put(taskMenuActions.hideMenuOption())
  yield put(appStateActions.visibleMultiSelect())
}

export function* deselectTasks() {
  const isMultiSelectVisible = yield select(state => appStateSelectors.getMultiSelectVisibility(state))
  const isTaskDetail = yield select(state => appStateSelectors.getDetail(state).task)
  const isArchiveDetail = yield select(state => appStateSelectors.getDetail(state).archive)

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

export function* removeTaskTag(action) {
  const { taskId, tag } = action.payload

  try {
    // Update store
    yield put(taskActions.removeTaskTagStore(taskId, tag))
    yield put(tagsActions.deleteTagsRelations(tag.id, taskId))

    // Find current list of tags
    const tagList = yield select(state => taskSelectors.getTaskTags(state, taskId))

    // Remove the target tag
    const tags = tagList
      .filter(tagId => tagId !== tag.id)
      .map(tagId => ({ id: tagId }))
      .toJS()

    // Update list on the server
    yield call(api.tasks.setTags, taskId, tags)

  } catch(err) {
    console.error(err)
    // TODO: revert to original state
  }
}

export function* addTaskTag(action) {
  const { taskId, tag } = action.payload

  try {
    // Update store
    yield put(tagsActions.addTagsRelations(tag.id, taskId))

    // Save relation on server (don't block rest of saga)
    yield fork(saveTaskTagRelation, taskId, tag)
  } catch(err) {
    console.error(err)
    // TODO: revert to original state
  }
}

export function* addRemoveTaskTags(action) {
  const { taskId, addTags, removeTags } = action.payload

  try {
    // Find current list of tags
    let tags = yield select(state => taskSelectors.getTaskTags(state, taskId))

    for (const tag of addTags) {
      // Update store
      yield put(taskActions.addTaskTagStore(taskId, tag))
      yield put(tagsActions.addTagsRelations(tag.id, taskId))

      // Add tag to current tags of task
      tags = tags.push(tag.id)
    }

    for (const tag of removeTags) {
      // Update store
      yield put(taskActions.removeTaskTagStore(taskId, tag))
      yield put(tagsActions.deleteTagsRelations(tag.id, taskId))

      // Remove tag from current tags of task
      tags = tags.filter(tagId => tagId !== tag.id)
    }

    tags = tags.map(tagId => ({ id: tagId })).toJS()

    // Update list on the server
    yield call(api.tasks.setTags, taskId, tags)

  } catch(err) {
    console.error(err)
    // TODO: revert to original state
  }
}

export function* removeTaskFollower(action) {
  try {
    const { taskId, userId, followerId } = action.payload
    yield put(followerActions.deleteFollower(taskId, userId, followerId))

  } catch(err) {
    console.error(err)
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
