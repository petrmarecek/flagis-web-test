import { Map, List } from 'immutable'
import typeToReducer from 'type-to-reducer'

import { AUTH } from 'redux/store/auth/auth.actions'
import { TASKS } from 'redux/store/tasks/tasks.actions'
import { TREE } from 'redux/store/tree/tree.actions'
import { TAGS } from 'redux/store/tags/tags.actions'
import { COMMENTS } from 'redux/store/comments/comments.action'
import { ATTACHMENTS } from 'redux/store/attachments/attachments.action'
import * as records from 'redux/data/records'

export default typeToReducer({

  // ------ Tasks --------------------------------------------------------------

  [TASKS.ADD]: (state, action) => saveTasks(action.payload, state),

  [TASKS.FETCH]: {
    FULFILLED: (state, action) => saveTasks(action.payload, state)
  },

  [TASKS.FETCH_ARCHIVED]: {
    FULFILLED: (state, action) => saveTasks(action.payload, state)
  },

  [TASKS.SET_COMPLETE]: (state, action) => state
    .setIn(['tasks', action.payload.taskId, 'isCompleted'], true)
    .setIn(['tasks', action.payload.taskId, 'completedAt'], new Date().toISOString())
  ,

  [TASKS.SET_INCOMPLETE]: (state, action) => state
    .setIn(['tasks', action.payload.taskId, 'isCompleted'], false)
    .setIn(['tasks', action.payload.taskId, 'completedAt'], null)
  ,

  [TASKS.SET_ARCHIVE]: (state, action) => state
    .setIn(['tasks'], action.payload.entitiesList),

  [TASKS.CANCEL_ARCHIVE]: (state, action) => state
    .setIn(['tasks'], action.payload.entitiesList),

  [TASKS.SET_IMPORTANT]: (state, action) =>
    state.setIn(['tasks', action.payload.task.id, 'isImportant'], action.payload.isImportant),

  [TASKS.SET_ORDER]: (state, action) =>
    state.setIn(['tasks', action.payload.task.id, 'order'], action.payload.order),

  [TASKS.SET_ORDER_TIME_LINE]: (state, action) =>
    state.setIn(['tasks', action.payload.task.id, 'orderTimeLine'], action.payload.order),

  [TASKS.SET_FIELD]: (state, action) =>
    state.setIn(['tasks', action.payload.task.id, action.payload.fieldName], action.payload.fieldValue),

  [TASKS.REPLACE]: (state, action) =>
    saveTasks(action.payload, state),

  [TASKS.MOVE_TIME_LINE]: (state, action) => {
    if (action.payload.orderTimeLine) {
      return state
        .setIn(['tasks', action.payload.taskId, 'dueDate'], action.payload.dueDate)
        .setIn(['tasks', action.payload.taskId, 'orderTimeLine'], action.payload.orderTimeLine)
    }

    return state.setIn(['tasks', action.payload.taskId, 'dueDate'], action.payload.dueDate)
  },

  [TASKS.ADD_TAG]: (state, action) => state
    .updateIn(['tasks', action.payload.taskId, 'tags'], tagList => tagList.push(action.payload.tag.id)),

  [TASKS.REMOVE_TAG]: (state, action) => state
    .updateIn(['tasks', action.payload.taskId, 'tags'],
      tagList => tagList.filter(tagId => tagId !== action.payload.tag.id)),

  [TASKS.DELETE]: (state, action) => state
    .setIn(['tasks', action.payload.taskEntitiesList]),

  [TASKS.UNDO_DELETE]: (state, action) => state
    .setIn(['tasks', action.payload.taskEntitiesList]),

  // ------ Tree --------------------------------------------------------------

  [TREE.ADD]: (state, action) => saveTree(action.payload, state),

  [TREE.FETCH]: {
    FULFILLED: (state, action) => saveTree(action.payload, state)
  },

  [TREE.UPDATE]: {
    PENDING: (state, action) => state
      .setIn(['treeItems', action.payload.treeItem.id, 'title'], action.payload.title),

    FULFILLED: (state, action) => saveTree(action.payload, state)
  },

  [TREE.DELETE]: {
    PENDING: (state, action) => state
      .deleteIn(['treeItems', action.payload.originalData.id])
  },

  [TREE.DROP_SECTION]: (state, action) =>
    state.setIn(['treeItems', action.payload.section.id, 'order'], action.payload.order),

  [TREE.MOVE_TREE_ITEM]: (state, action) =>
    state.setIn(['treeItems', action.payload.source.id, 'order'], action.payload.order),

  // ------ Tags --------------------------------------------------------------

  [TAGS.FETCH]: {
    FULFILLED: (state, action) => {
      const tags = convertToImmutable(action.payload.entities.tags || {}, records.Tag)
      return state.mergeIn(['tags'], tags)
    }
  },

  [TAGS.ADD]: (state, action) =>
    state.setIn(['tags', action.payload.tag.id], new records.Tag(action.payload.tag)),

  // Replace tag in either tags & task referencing the tag
  [TAGS.REPLACE]: (state, action) => state
    .deleteIn(['tags', action.payload.originalTagId])
    .setIn(['tags', action.payload.tag.id], new records.Tag(action.payload.tag))
    .updateIn(['tasks', action.payload.relatedTaskId, 'tags'], tagList => {
      const tagIndex = tagList.indexOf(action.payload.originalTagId)
      return tagList.splice(tagIndex, 1, action.payload.tag.id)
    }),

  [TAGS.UPDATE]: (state, action) => {

    const tagId = action.payload.tag.id
    const fieldName = action.payload.type
    const fieldValue = action.payload.data

    // Update treeItems that references target tag
    state = updateReferencingTreeItems(state, tagId, fieldName, fieldValue)

    // Update tag itself
    return state.setIn(['tags', tagId, fieldName], fieldValue)
  },

  [TAGS.DELETE]: {
    FULFILLED: (state, action) => state
      .deleteIn(['tags', action.payload])
  },
  // ------ Auth --------------------------------------------------------------

  [AUTH.LOGOUT]: () => new records.EntitiesStore(),

  // ------ Comments ----------------------------------------------------------

  [COMMENTS.FETCH]: {
    FULFILLED: (state, action) => saveComments(action.payload, state)
  },

  [COMMENTS.ADD]: (state, action) => saveComments(action.payload, state),

  [COMMENTS.DELETE]: (state, action) =>
    state.deleteIn(['comments', action.payload.commentId]),

  // ------ Attachments -----------------------------------------------------

  [ATTACHMENTS.FETCH]: {
    FULFILLED: (state, action) => saveAttachments(action.payload, state)
  },

  [ATTACHMENTS.ADD]: (state, action) => saveAttachments(action.payload, state),

  [ATTACHMENTS.DELETE]: (state, action) =>
    state.deleteIn(['attachments', action.payload.attachmentId]),

}, new records.EntitiesStore())

function updateReferencingTreeItems(state, tagId, tagFieldName, tagFieldValue) {

  // Find target property on the treeItem
  const tagToTreeItemProps = {
    colorIndex: 'tagColorIndex',
    title: 'title',
  }

  const treeItemFieldName = tagToTreeItemProps[tagFieldName]
  if (!treeItemFieldName) {
    return state
  }

  // Find relevant treeItems
  const treeItemFieldValue = tagFieldValue
  const referencingTreeItemsIds = state.treeItems
    .filter(treeItem => treeItem.tagId === tagId)
    .toArray()
    .map(treeItem => treeItem.id)

  // Run update
  return state.updateIn(['treeItems'], treeItemsMap => {

    // For each treeItem that references tag update props
    let resultMap = treeItemsMap
    referencingTreeItemsIds.forEach(treeItemId => {
      resultMap = resultMap.setIn([treeItemId, treeItemFieldName], treeItemFieldValue)
    })

    return resultMap
  })
}

function saveTree(payload, state) {
  const rawItems = payload.entities.treeItem || {}
  const rawTags = payload.entities.tags || {}
  const items = convertToImmutable(rawItems, records.TreeItem)
  const tags = convertToImmutable(rawTags, records.Tag)

  return state
    .mergeIn(['treeItems'], items)
    .mergeIn(['tags'], tags)
}

function saveTasks(payload, state) {
  const rawTasks = payload.entities.tasks || {}
  const rawTags = payload.entities.tags || {}
  const tags = convertToImmutable(rawTags, records.Tag)
  const tasks = convertToImmutable(rawTasks, records.Task)

  return state
    .mergeIn(['tasks'], tasks)
    .mergeIn(['tags'], tags)
}

function saveComments(payload, state) {
  const rawComments = payload.entities.comment || {}
  const comments = convertToImmutable(rawComments, records.Comment)

  return state
    .mergeIn(['comments'], comments)
}


function saveAttachments(payload, state) {
  const rawAttachments = payload.entities.attachment || {}
  const attachments = convertToImmutable(rawAttachments, records.Attachment)

  return state
    .mergeIn(['attachments'], attachments)
}

function convertToImmutable(entities, record) {
  const recordItems = Object.keys(entities).reduce((result, key) => {
    result[key] = new record(entities[key])

    switch (record) {

      // Task record -> tags to OrderedSet
      case records.Task:
        result[key] = result[key].set('tags', List(result[key].tags))
        break;

      default:
        break;
    }

    return result
  }, {})

  return Map(recordItems)
}
