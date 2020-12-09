import _ from 'lodash'
import { normalize } from 'normalizr'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import { delay } from 'redux-saga'
import { push } from 'react-router-redux'
import {
  all,
  take,
  call,
  put,
  select,
  cancelled,
  fork,
  race,
} from 'redux-saga/effects'
import {
  createLoadActions,
  fetch,
  mainUndo,
  callApi,
} from 'redux/store/common.sagas'
import * as errorActions from 'redux/store/errors/errors.actions'
import {
  sentryBreadcrumbCategory,
  sentryTagType,
} from 'redux/store/errors/errors.common'
import * as appStateActions from 'redux/store/app-state/app-state.actions'
import * as taskActions from 'redux/store/tasks/tasks.actions'
import * as tagsActions from 'redux/store/tags/tags.actions'
import * as taskMenuActions from 'redux/store/tasks-menu/tasks-menu.actions'
import * as followerActions from 'redux/store/followers/followers.actions'
import * as notificationActions from 'redux/store/notifications/notifications.actions'
import * as appStateSelectors from 'redux/store/app-state/app-state.selectors'
import * as authSelectors from 'redux/store/auth/auth.selectors'
import * as entitiesSelectors from 'redux/store/entities/entities.selectors'
import * as taskSelectors from 'redux/store/tasks/tasks.selectors'
import * as contactsActions from 'redux/store/contacts/contacts.actions'
import * as contactsSelectors from 'redux/store/contacts/contacts.selectors'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'
import firebase from 'redux/utils/firebase'
import dateUtil from 'redux/utils/date'
import { getAssigneeOfTask } from 'redux/utils/component-helper'
import { loaderTypes } from 'redux/store/app-state/app-state.common'
import { TagsUpdateStrategy } from 'utils/enums'

// google analytics
import * as ga from 'redux/utils/react-ga-helper'

const TASKS = taskActions.TASKS

function* saveChangeFromFirestore(change, userId, isCollaboratedTask) {
  const { FULFILLED } = createLoadActions(TASKS.FIREBASE)
  const task = change.doc.data()
  const changeType = change.type

  // Prepare data
  task.tags = task.tags[userId]
  task.userId = userId
  const { id, createdById, followers, isTrashed } = task
  const storeItems = yield select(state => taskSelectors.getTasksItems(state))
  const storeArchivedItems = yield select(state =>
    taskSelectors.getArchivedTasksItems(state)
  )
  const storeInboxItems = yield select(state =>
    taskSelectors.getInboxTasksItems(state)
  )
  const storeSelectionItem = yield select(state =>
    taskSelectors.getSelectionTasks(state).first()
  )
  const isDetailVisible = yield select(state =>
    appStateSelectors.getDetail(state)
  )

  // Collaborated task
  if (isCollaboratedTask) {
    // Set isInbox property in task entities
    const assignee = getAssigneeOfTask(Object.values(followers))
    const status = assignee !== null ? assignee.status : assignee
    task.isInbox = status === 'pending'

    // rewrite isArchived of task for assignee
    if (createdById !== userId && assignee !== null) {
      _.set(task, 'isArchived', assignee.isArchived)
    }

    // Remove follower from task (pending, accepted)
    if (
      (status === 'pending' || status === 'accepted') &&
      changeType === 'removed'
    ) {
      // Close task detail
      if (isDetailVisible.task && storeSelectionItem === id) {
        yield put(appStateActions.deselectDetail('task'))
      }

      // Rejected action
      if (!storeItems.includes(id) && !storeInboxItems.includes(id)) {
        return
      }

      toast.info(toastCommon.infoMessages.collaboration.removeFollower, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.INFO_DURATION,
      })

      // Call action for edit redux-store
      yield put({
        type: TASKS.FIREBASE_REMOVE_TASK_FOLLOWER,
        payload: {
          taskId: id,
          followerId: assignee.id,
        },
      })

      return
    }

    // Move task from inbox to tasks list (accepted)
    if (
      status === 'accepted' &&
      !isTrashed &&
      !storeItems.includes(id) &&
      storeInboxItems.includes(id)
    ) {
      // Show notification
      toast.success(toastCommon.successMessages.tasks.accepted, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.SUCCESS_DURATION,
      })
    }

    // Owner deleted task -> show notification
    if (isTrashed) {
      toast.info(toastCommon.infoMessages.collaboration.deletedTask, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.INFO_DURATION,
      })
    }
  }

  const { isArchived } = task
  // Return task from archive
  if (
    !isArchived &&
    !isTrashed &&
    !storeItems.includes(id) &&
    storeArchivedItems.includes(id)
  ) {
    // Show notification
    toast.success(toastCommon.successMessages.tasks.cancelArchive, {
      position: toastCommon.position.DEFAULT,
      autoClose: toastCommon.duration.SUCCESS_DURATION,
    })

    // Close archive detail
    if (isDetailVisible.archive && storeSelectionItem === id) {
      yield put(appStateActions.deselectDetail('archive'))
    }
  }

  // Move task to archive
  if (
    isArchived &&
    !isTrashed &&
    !storeArchivedItems.includes(id) &&
    storeItems.includes(id)
  ) {
    // Show notification
    toast.success(toastCommon.successMessages.tasks.archive, {
      position: toastCommon.position.DEFAULT,
      autoClose: toastCommon.duration.SUCCESS_DURATION,
    })

    // Close task detail
    if (isDetailVisible.task && storeSelectionItem === id) {
      yield put(appStateActions.deselectDetail('task'))
    }
  }

  // Delete task
  if (isTrashed) {
    // Close task detail
    if (isDetailVisible.task && storeSelectionItem === id) {
      yield put(appStateActions.deselectDetail('task'))
    }

    // Close archive detail
    if (isDetailVisible.archive && storeSelectionItem === id) {
      yield put(appStateActions.deselectDetail('archive'))
    }
  }

  // Save changes to store
  const normalizeData = normalize(task, schema.task)
  yield put({ type: FULFILLED, payload: normalizeData })

  // Update tag relations in store
  const entitiesTasks = yield select(state =>
    entitiesSelectors.getActiveEntitiesTasks(state)
  )
  yield put({ type: TASKS.FIREBASE_TAGS_RELATIONS, payload: entitiesTasks })
}

function* syncTasksChannel(channel, userId, isCollaboratedTask) {
  const { REJECTED } = createLoadActions(TASKS.FIREBASE)

  try {
    while (true) {
      // eslint-disable-line
      const snapshot = yield take(channel)
      yield all(
        snapshot
          .docChanges()
          .map(change =>
            call(saveChangeFromFirestore, change, userId, isCollaboratedTask)
          )
      )
    }
  } catch (err) {
    yield put({ type: REJECTED, err })

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.FIRESTORE,
        tagValue: 'SYNC_TASKS',
        breadcrumbCategory: sentryBreadcrumbCategory.FIRESTORE,
        breadcrumbMessage: 'SYNC_TASKS',
      })
    )
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* initTasksData(initTime) {
  const userId = yield select(state => authSelectors.getUserId(state))
  const channel = firebase.getTasksChannel(userId, initTime)
  return yield fork(syncTasksChannel, channel, userId, false)
}

export function* initInboxTasksData(initTime) {
  const userId = yield select(state => authSelectors.getUserId(state))
  const channel = firebase.getCollaboratedTasksChannel(userId, initTime)
  return yield fork(syncTasksChannel, channel, userId, true)
}

export function* fetchTasks() {
  const userId = yield select(state => authSelectors.getUserId(state))
  const tasks = yield* fetch(TASKS.FETCH, {
    method: api.tasks.search,
    args: [
      {
        isArchived: false,
        isTrashed: false,
        tags: [],
      },
    ],
    schema: schema.tasks,
    userId,
  })

  /*
  We have to set the own profile as me in the contacts.

  The own profile is in the contacts, because this profile is the owner of tasks
  and also a someone else can be the owner of tasks - an collaboration.
  So we have to save an createdBy profile of a task to the contacts.

  Also the reason is that tasks are fetched from the firestore with an old data of an createdBy profile,
  because if a user update his name, this update would have to be set for the every task in firestore for this user.
  So the update of own profile would not be shown.

  TODO: change workflow for contacts ^^^
  */
  if (!_.isEmpty(tasks)) {
    // set contact as me
    const me = yield select(state =>
      contactsSelectors.getContactById(state, userId)
    )
    yield put(contactsActions.updateContact(me, true, 'me', true))
  }

  // Reset full text search
  const text = yield select(state => taskSelectors.getTasksSearch(state))
  yield put(taskActions.updateTaskSearch(''))
  yield put(taskActions.updateTaskSearch(text))
}

export function* fetchArchivedTasks() {
  const isArchivedTasks = yield select(state =>
    appStateSelectors.getArchivedTasksVisibility(state)
  )
  const userId = yield select(state => authSelectors.getUserId(state))

  if (!isArchivedTasks) {
    yield put(appStateActions.visibleArchivedTasks())
  }

  yield* fetch(TASKS.FETCH_ARCHIVED, {
    method: api.tasks.search,
    args: [
      {
        isArchived: true,
        isCompleted: true,
        isTrashed: false,
        tags: [],
      },
    ],
    schema: schema.tasks,
    userId,
  })

  // Reset full text search
  const text = yield select(state => taskSelectors.getTasksSearch(state))
  yield put(taskActions.updateTaskSearch(''))
  yield put(taskActions.updateTaskSearch(text))
}

export function* fetchInboxTasks() {
  yield* fetch(TASKS.FETCH_INBOX, {
    method: api.tasks.inbox,
    args: [],
    schema: schema.tasks,
    isInbox: true,
  })
}

export function* createTask(action) {
  try {
    // TODO: implement optimistic insert
    const data = {
      subject: action.payload.subject,
      dueDate: action.payload.dueDate,
      tags: action.payload.tags,
    }
    const task = yield callApi(api.tasks.create, data)

    // track the create task action to the google analytics
    ga.trackEvent(ga.events[action.type])

    if (action.payload.isImportant) {
      yield put(taskActions.requestToggleImportant(task))
    }

    yield put(taskActions.addTask(task))

    if (task.tags.length !== 0) {
      for (const tag of task.tags) {
        yield put(tagsActions.addTagsRelations(tag.id, task.id))
      }
    }
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
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
    // revert to original state
    yield put(taskActions.setImportant(task, originalIsImportant))

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* prepareToggleDragAndDrop(action) {
  const newDragAndDrop = action.payload.value

  if (!newDragAndDrop) {
    yield delay(500)
    const currentDraggingTask = yield select(taskSelectors.getDraggingTask)

    if (!currentDraggingTask) {
      yield put(taskActions.toggleDragAndDrop(false))
      return
    }

    return
  }

  yield put(taskActions.toggleDragAndDrop(newDragAndDrop))
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
      const tagList = yield select(state =>
        taskSelectors.getTaskTags(state, archiveTaskId)
      )
      if (tagList.length !== 0) {
        for (const tag of tagList) {
          yield put(tagsActions.deleteTagsRelations(tag, archiveTaskId))
        }
      }
    }

    yield put(appStateActions.deselectLoader('global'))
  } catch (err) {
    // TODO: revert to original state

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
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
      const tagList = yield select(state =>
        taskSelectors.getTaskTags(state, taskId)
      )
      if (tagList.length !== 0) {
        for (const tag of tagList) {
          yield put(tagsActions.addTagsRelations(tag, taskId))
        }
      }
    }
  } catch (err) {
    // TODO: revert to original state

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* setComplete(action) {
  try {
    const taskId = action.payload.taskId
    const detail = yield select(state => appStateSelectors.getDetail(state))

    if (!detail.task) {
      yield put(taskActions.deselectTasks())
    }

    // call server
    const update = { isCompleted: true }
    yield* updateTask(taskId, update)
  } catch (err) {
    // TODO: revert to original state

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* setCompleteTasks() {
  const selectedTasks = yield select(state =>
    taskSelectors.getSelectTasks(state)
  )

  for (const task of selectedTasks) {
    if (task.isCompleted) {
      continue
    }

    yield put(taskActions.setComplete(task.id))
  }
}

export function* setIncomplete(action) {
  try {
    const taskId = action.payload.taskId
    const detail = yield select(state => appStateSelectors.getDetail(state))

    if (!detail.task) {
      yield put(taskActions.deselectTasks())
    }

    // update isCompleted and put task to top
    const update = { isCompleted: false }
    yield* updateTask(taskId, update)
  } catch (err) {
    // TODO: revert to original state

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* setIncompleteTasks() {
  const selectedTasks = yield select(state =>
    taskSelectors.getSelectTasks(state)
  )

  for (const task of selectedTasks) {
    if (!task.isCompleted) {
      continue
    }

    yield put(taskActions.setIncomplete(task.id))
  }
}

export function* setOrder(action) {
  try {
    // call server
    const taskId = action.payload.task.id
    const order = action.payload.order
    const update = { order }

    // remove dragging task
    yield put(taskActions.removeDraggingTask())

    // call server
    yield callApi(api.tasks.update, taskId, update)
  } catch (err) {
    // TODO: revert
    // We need to both revert Task.order field and position within loaded list

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* setDate(action) {
  const fieldName = action.payload.type
  const fieldValue = action.payload.date
  yield* setTaskField(action.payload.task, fieldName, fieldValue)
}

export function* setDescription(action) {
  yield* setTaskField(
    action.payload.task,
    'description',
    action.payload.description
  )
}

export function* setSubject(action) {
  yield* setTaskField(action.payload.task, 'subject', action.payload.subject)
}

export function* selectTask(action) {
  const { taskList, isMultiSelect } = action.payload
  const taskId = taskList.first()
  const sizeOfTaskList = taskList.size

  if (isMultiSelect) {
    if (sizeOfTaskList === 0) {
      yield put(appStateActions.hideMultiSelect())
      return
    }

    yield put(appStateActions.visibleMultiSelect())
  } else {
    const archivedTasksVisible = yield select(state =>
      appStateSelectors.getArchivedTasksVisibility(state)
    )

    yield put(appStateActions.hideMultiSelect())

    // read all notification for taskId
    yield put(notificationActions.readTaskNotifications(taskId))

    if (archivedTasksVisible) {
      yield put(push(`/user/archive/${taskId}`))
      yield put(appStateActions.setDetail('archive'))
      return
    }

    yield put(push(`/user/tasks/${taskId}`))
    yield put(appStateActions.setDetail('task'))
  }
}

export function* selectAllTask() {
  yield put(taskMenuActions.hideMenuOption())
  yield put(appStateActions.visibleMultiSelect())
}

export function* deselectTasks() {
  const isMultiSelectVisible = yield select(state =>
    appStateSelectors.getMultiSelectVisibility(state)
  )
  const { task, archive } = yield select(state =>
    appStateSelectors.getDetail(state)
  )

  if (isMultiSelectVisible) {
    yield put(appStateActions.hideMultiSelect())
  }

  if (task) {
    yield put(appStateActions.deselectDetail('task'))
  }

  if (archive) {
    yield put(appStateActions.deselectDetail('archive'))
  }
}

export function* prepareDeleteTask(action) {
  let { deleteTasksIds } = action.payload
  if (!deleteTasksIds) {
    return
  }

  const userId = yield select(state => authSelectors.getUserId(state))
  let newTasksList = yield select(state => taskSelectors.getTasksItems(state))
  let newTaskCompleteList = yield select(state =>
    taskSelectors.getCompletedTasksItems(state)
  )
  let newArchivedTasks = yield select(state =>
    taskSelectors.getArchivedTasksItems(state)
  )
  let newTaskEntitiesList = yield select(state =>
    entitiesSelectors.getEntitiesTasks(state)
  )
  deleteTasksIds = deleteTasksIds.filter(
    taskId => newTaskEntitiesList.get(taskId).createdById === userId
  )

  const originalData = {
    taskDeleteList: deleteTasksIds,
    taskList: newTasksList,
    taskCompleteList: newTaskCompleteList,
    taskArchiveList: newArchivedTasks,
    taskEntitiesList: newTaskEntitiesList,
  }

  for (const taskId of deleteTasksIds) {
    newTasksList = newTasksList.includes(taskId)
      ? newTasksList.delete(newTasksList.indexOf(taskId))
      : newTasksList

    newTaskCompleteList = newTaskCompleteList.includes(taskId)
      ? newTaskCompleteList.delete(newTaskCompleteList.indexOf(taskId))
      : newTaskCompleteList

    newArchivedTasks = newArchivedTasks.includes(taskId)
      ? newArchivedTasks.delete(newArchivedTasks.indexOf(taskId))
      : newArchivedTasks

    newTaskEntitiesList = newTaskEntitiesList.setIn([taskId, 'isTrashed'], true)
  }

  // show loader for multi delete of tasks
  if (deleteTasksIds.size > 1) {
    yield put(appStateActions.setLoader(loaderTypes.GLOBAL))
  }

  yield put(taskActions.deselectTasks())
  yield put(
    taskActions.deleteTask(
      deleteTasksIds,
      newTasksList,
      newTaskCompleteList,
      newArchivedTasks,
      newTaskEntitiesList,
      originalData
    )
  )
}

export function* deleteTask(action) {
  const update = { isTrashed: true }
  try {
    for (const taskId of action.payload.taskDeleteList) {
      // update task (change isTrashed: true)
      yield* updateTask(taskId, update)

      const tagList = yield select(state =>
        taskSelectors.getTaskTags(state, taskId)
      )
      if (tagList.length !== 0) {
        for (const tag of tagList) {
          yield put(tagsActions.deleteTagsRelations(tag, taskId))
        }
      }
    }
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }

  yield put(taskActions.deselectTasks())
  yield put(appStateActions.deselectLoader('global'))
  yield* mainUndo(action, 'taskDelete')
}

export function* undoDeleteTask(action) {
  const update = { isTrashed: false }

  try {
    for (const taskId of action.payload.taskDeleteList) {
      // update task (change isTrashed: false)
      yield* updateTask(taskId, update)

      const tagList = yield select(state =>
        taskSelectors.getTaskTags(state, taskId)
      )
      if (tagList.length !== 0) {
        for (const tag of tagList) {
          yield put(tagsActions.addTagsRelations(tag, taskId))
        }
      }
    }
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* removeTaskTag(action) {
  const { taskId, tag } = action.payload

  try {
    // Update store
    yield put(taskActions.removeTaskTagStore(taskId, tag))
    yield put(tagsActions.deleteTagsRelations(tag.id, taskId))

    // Find current list of tags
    const tagList = yield select(state =>
      taskSelectors.getTaskTags(state, taskId)
    )

    // Remove the target tag
    const tags = tagList
      .filter(tagId => tagId !== tag.id)
      .map(tagId => ({ id: tagId }))
      .toJS()

    // Update list on the server
    yield callApi(api.tasks.setTags, taskId, tags)
  } catch (err) {
    // TODO: revert to original state

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* addTaskTag(action) {
  const { taskId, tag } = action.payload

  try {
    // Update store
    yield put(tagsActions.addTagsRelations(tag.id, taskId))

    // Save relation on server (don't block rest of saga)
    yield fork(saveTaskTagRelation, taskId, tag)
  } catch (err) {
    // TODO: revert to original state

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* setTaskTags(action) {
  const { taskId, tagIds, strategy } = action.payload

  // set original order of task
  const draggingTask = yield select(state =>
    taskSelectors.getDraggingTask(state)
  )
  yield put(taskActions.setOrder(draggingTask, draggingTask.order))

  let originalTagList = yield select(state =>
    taskSelectors.getTaskTags(state, taskId)
  )

  const resultTagIds =
    strategy === TagsUpdateStrategy.OVERRIDE
      ? tagIds
      : _.uniq([...tagIds, ...originalTagList.toJS()])

  // Write new tag IDs
  yield callApi(
    api.tasks.setTags,
    taskId,
    resultTagIds.map(tagId => ({ id: tagId }))
  )

  // Update local task cache
  yield put(taskActions.setTaskTagStore(taskId, resultTagIds))

  // Update task-tag references
  for (const tagId of resultTagIds) {
    const tagIndex = originalTagList.indexOf(tagId)

    if (tagIndex >= 0) {
      // This tag has been already present
      originalTagList = originalTagList.delete(tagIndex)
    } else {
      // This tag is new, write a new relation
      yield put(tagsActions.addTagsRelations(tagId, taskId))
    }
  }

  // Remaining tags were deleted, remove them from relations
  for (const tagId of originalTagList) {
    // This tag has been removed, remove original relation
    yield put(tagsActions.deleteTagsRelations(tagId, taskId))
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
    yield callApi(api.tasks.setTags, taskId, tags)
  } catch (err) {
    // TODO: revert to original state

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* removeTaskFollower(action) {
  try {
    const { taskId, userId, followerId } = action.payload
    yield put(followerActions.deleteFollower(taskId, userId, followerId))
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* sendTask(action) {
  try {
    const { taskId } = action.payload
    const { send } = api.followers
    yield callApi(send, taskId)

    // track the send task action to the google analytics
    ga.trackEvent(ga.events[action.type])
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* acceptTask(action) {
  try {
    const { taskId } = action.payload
    const { accept } = api.followers

    // read all notification for taskId
    yield put(notificationActions.readTaskNotifications(taskId))

    yield callApi(accept, taskId)
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* rejectTask(action) {
  try {
    const { task } = action.payload.originalData
    const { reject } = api.followers

    // Debounce by 50ms
    yield call(delay, 50)
    // Dispatch undo action
    yield* mainUndo(action, 'taskRejected')

    // Wait for undo
    const { undo } = yield race({
      undo: take('UNDO_TASK/REJECT'),
      timeout: call(delay, 12000),
    })

    // Dispatch undo -> don't call API
    if (undo) {
      return
    }

    // read all notification for task
    yield put(notificationActions.readTaskNotifications(task.id))

    // call API
    yield callApi(reject, task.id)
  } catch (err) {
    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: action.type,
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: action.type,
      })
    )
  }
}

export function* undoRejectTask(action) {
  const { task, type } = action.payload
  const originalTask = task.toJS()
  originalTask.isInbox = type === 'inbox'

  yield put(taskActions.addTask(originalTask))
}

// ------ HELPER FUNCTIONS ----------------------------------------------------

function* saveTaskTagRelation(taskId, tag) {
  try {
    const tagData = { title: tag.title }
    if (!tag.isNew) {
      tagData.id = tag.id
    }

    // Construct result list of tags
    const tagList = yield select(state =>
      taskSelectors.getTaskTags(state, taskId)
    )
    const tagsList = tagList.includes(tag.id)
      ? tagList.delete(tagList.indexOf(tag.id))
      : tagList

    const tags = tagsList
      .map(tagId => ({ id: tagId }))
      .push(tagData)
      .toJS()

    // Send them to server
    const resultTagList = yield callApi(() => api.tasks.setTags(taskId, tags))

    // If we added a new task --> replace instance with the server one
    if (tag.isNew) {
      const matchedTags = resultTagList.filter(
        t => t.title.toLowerCase() === tag.title.toLowerCase()
      )
      if (matchedTags.length !== 1) {
        throw new Error('Cannot find related tag.')
      }

      const serverTag = matchedTags[0]
      yield put(tagsActions.replaceTag(tag.id, serverTag, taskId))
    }
  } catch (err) {
    // TODO: detatch tag from task or add retry action

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: 'SAVE_TASK-TAG-RELATIONS',
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: 'SAVE_TASK-TAG-RELATIONS',
      })
    )
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
  } catch (err) {
    // revert original values
    yield put(taskActions.setField(task, fieldName, originalFieldValue))

    // send error to sentry
    yield put(
      errorActions.errorSentry(err, {
        tagType: sentryTagType.ACTION,
        tagValue: 'SAVE_TASK-FIELD',
        breadcrumbCategory: sentryBreadcrumbCategory.ACTION,
        breadcrumbMessage: 'SAVE_TASK-FIELD',
      })
    )
  }
}

function* updateTask(taskId, update) {
  // call server
  let updatedTask = yield callApi(api.tasks.update, taskId, update)

  // add userId for repare data of follower in normalizr schema
  const userId = yield select(state => authSelectors.getUserId(state))
  updatedTask = _.assign({ userId }, updatedTask)

  // replace task in the store with the updated one
  yield put(taskActions.replaceTask(updatedTask))
}
