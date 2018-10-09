import { Map, List } from 'immutable'
import typeToReducer from 'type-to-reducer'

import { AUTH } from 'redux/store/auth/auth.actions'
import { TASKS } from 'redux/store/tasks/tasks.actions'
import { TREE } from 'redux/store/tree/tree.actions'
import { TAGS } from 'redux/store/tags/tags.actions'
import { COMMENTS } from 'redux/store/comments/comments.actions'
import { ATTACHMENTS } from 'redux/store/attachments/attachments.actions'
import { CONTACTS } from 'redux/store/contacts/contacts.actions'
import { FOLLOWERS } from 'redux/store/followers/followers.actions'
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

  [TASKS.FIREBASE]: {
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

  [TASKS.SET_FIELD]: (state, action) =>
    state.setIn(['tasks', action.payload.task.id, action.payload.fieldName], action.payload.fieldValue),

  [TASKS.REPLACE]: (state, action) =>
    saveTasks(action.payload, state),

  [TASKS.MOVE]: (state, action) =>
    state.setIn(['tasks', action.payload.taskId, 'order'], action.payload.order),

  [TASKS.MOVE_TIME_LINE]: (state, action) => {
    if (action.payload.orderTimeLine) {
      return state
        .setIn(['tasks', action.payload.taskId, 'dueDate'], action.payload.dueDate)
        .setIn(['tasks', action.payload.taskId, 'orderTimeLine'], action.payload.orderTimeLine)
    }

    return state.setIn(['tasks', action.payload.taskId, 'dueDate'], action.payload.dueDate)
  },

  [TASKS.ADD_TASK_TAG]: (state, action) => state
    .updateIn(['tasks', action.payload.taskId, 'tags'], tagList => tagList.push(action.payload.tag.id)),

  [TASKS.ADD_TASK_FOLLOWER]: (state, action) => state
    .updateIn(['tasks', action.payload.taskId, 'followers'],
        followersList => followersList.push(action.payload.followerId)),

  [TASKS.ADD_TASK_TAG_STORE]: (state, action) => state
    .updateIn(['tasks', action.payload.taskId, 'tags'], tagList => tagList.push(action.payload.tag.id)),

  [TASKS.REMOVE_TASK_TAG_STORE]: (state, action) => state
    .updateIn(['tasks', action.payload.taskId, 'tags'],
      tagList => tagList.filter(tagId => tagId !== action.payload.tag.id)),

  [TASKS.REMOVE_TASK_FOLLOWER]: (state, action) => state
    .updateIn(['tasks', action.payload.taskId, 'followers'],
      followersList => followersList.filter(followerId => followerId !== action.payload.followerId)),

  [TASKS.DELETE]: (state, action) => state
    .setIn(['tasks', action.payload.taskEntitiesList]),

  [TASKS.UNDO_DELETE]: (state, action) => state
    .setIn(['tasks', action.payload.taskEntitiesList]),

  // ------ Tree --------------------------------------------------------------

  [TREE.ADD]: (state, action) => saveTree(action.payload, state),

  [TREE.FETCH]: {
    FULFILLED: (state, action) => saveTree(action.payload, state)
  },

  [TREE.FIREBASE]: {
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

  [TREE.MOVE_SECTION]: (state, action) =>
    state.setIn(['treeItems', action.payload.sectionId, 'order'], action.payload.order),

  [TREE.MOVE_TREE_ITEM]: (state, action) => state
    .setIn(['treeItems', action.payload.source.id, 'order'], action.payload.order)
    .setIn(['treeItems', action.payload.source.id, 'parentId'], action.payload.targetParentId),

  // ------ Tags --------------------------------------------------------------

  [TAGS.FETCH]: {
    FULFILLED: (state, action) => {
      const tags = convertToImmutable(action.payload.entities.tags || {}, records.Tag)
      return state.mergeIn(['tags'], tags)
    }
  },

  [TAGS.FIREBASE]: {
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
    FULFILLED: (state, action) => state.deleteIn(['tags', action.payload])
  },
  // ------ Auth --------------------------------------------------------------

  [AUTH.LOGOUT]: () => new records.EntitiesStore(),

  // ------ Comments ----------------------------------------------------------

  [COMMENTS.FETCH]: {
    FULFILLED: (state, action) => saveComments(action.payload, state)
  },

  [COMMENTS.FIREBASE]: {
    FULFILLED: (state, action) => saveComments(action.payload, state)
  },

  [COMMENTS.ADD]: (state, action) => saveComments(action.payload, state),

  [COMMENTS.DELETE]: (state, action) =>
    state.deleteIn(['comments', action.payload.commentId]),

  // ------ Attachments -----------------------------------------------------

  [ATTACHMENTS.FETCH]: {
    FULFILLED: (state, action) => saveAttachments(action.payload, state)
  },

  [ATTACHMENTS.FIREBASE]: {
    FULFILLED: (state, action) => saveAttachments(action.payload, state)
  },

  [ATTACHMENTS.ADD]: (state, action) => saveAttachments(action.payload, state),

  [ATTACHMENTS.DELETE]: (state, action) =>
    state.deleteIn(['attachments', action.payload.attachmentId]),

  // ------ Contacts ----------------------------------------------------------

  [CONTACTS.FETCH]: {
    FULFILLED: (state, action) => saveContacts(action.payload, state)
  },

  [CONTACTS.ADD]: (state, action) => saveContacts(action.payload, state),

  // Replace contact in either contacts & task referencing the tag
  [CONTACTS.REPLACE]: (state, action) => state
    .deleteIn(['contacts', action.payload.originalContactId])
    .setIn(['contacts', action.payload.contact.id], new records.Contact(action.payload.contact))
    .updateIn(['tasks', action.payload.relatedTaskId, 'contacts'], contactsList => {
      const contactIndex = contactsList.indexOf(action.payload.originalContactId)
      return contactsList.splice(contactIndex, 1, action.payload.contact.id)
    }),

  [CONTACTS.UPDATE]: (state, action) => {

    const contactId = action.payload.contact.id
    const fieldName = action.payload.type
    const fieldValue = action.payload.data

    // Update contact itself
    return state.setIn(['contacts', contactId, fieldName], fieldValue)
  },

  [CONTACTS.SEND_INVITATION]: (state, action) =>
    state.setIn(['contacts', action.payload.contactId, 'isInvited'], true),

  [CONTACTS.DELETE]: (state, action) =>
    state.deleteIn(['contacts', action.payload.originalData.id]),

  // ------ Followers ----------------------------------------------------------

  [FOLLOWERS.ADD]: (state, action) => saveFollowers(action.payload, state),

  [FOLLOWERS.SEND_TASK]: (state, action) =>
    state.setIn(['followers', action.payload.followerId, 'status'], 'pending'),

  [FOLLOWERS.ACCEPT_TASK]: (state, action) =>
    state.setIn(['followers', action.payload.followerId, 'status'], 'accepted'),

  [FOLLOWERS.REJECT_TASK]: (state, action) =>
    state.setIn(['followers', action.payload.followerId, 'status'], 'rejected'),

  [FOLLOWERS.DELETE]: (state, action) =>
    state.deleteIn(['followers', action.payload.followerId])

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
  const rawFollowers = payload.entities.followers || {}
  const rawContacts = payload.entities.profile || {}
  const contacts = convertToImmutable(rawContacts, records.Contact)
  const followers = convertToImmutable(rawFollowers, records.Follower)
  const tags = convertToImmutable(rawTags, records.Tag)
  const tasks = convertToImmutable(rawTasks, records.Task)

  return state
    .mergeIn(['tasks'], tasks)
    .mergeIn(['tags'], tags)
    .mergeIn(['followers'], followers)
    .mergeIn(['contacts'], contacts)
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

function saveContacts(payload, state) {
  const rawContacts = payload.entities.contacts || {}
  const contacts = convertToImmutable(rawContacts, records.Contact)

  return state
    .mergeIn(['contacts'], contacts)
}

function saveFollowers(payload, state) {
  const rawFollowers = payload.entities.followers || {}
  const rawContacts = payload.entities.profile || {}
  const contacts = convertToImmutable(rawContacts, records.Contact)
  const followers = convertToImmutable(rawFollowers, records.Follower)

  return state
    .mergeIn(['followers'], followers)
    .mergeIn(['contacts'], contacts)
}

function convertToImmutable(entities, record) {
  const recordItems = Object.keys(entities).reduce((result, key) => {
    result[key] = new record(entities[key])

    switch (record) {

      // Task record -> tags to List
      case records.Task:
        result[key] = result[key]
          .set('tags', List(result[key].tags))
          .set('followers', List(result[key].followers))
        break;

      default:
        break;
    }

    return result
  }, {})

  return Map(recordItems)
}
