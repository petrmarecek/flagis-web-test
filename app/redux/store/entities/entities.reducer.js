import { Map, List } from 'immutable'
import typeToReducer from 'type-to-reducer'
import dateUtil from 'redux/utils/date'
import _ from 'lodash'
import { getAssigneeOfTask } from 'redux/utils/component-helper'

import { AUTH } from 'redux/store/auth/auth.actions'
import { TASKS } from 'redux/store/tasks/tasks.actions'
import { TREE } from 'redux/store/tree/tree.actions'
import { TAGS } from 'redux/store/tags/tags.actions'
import { ACTIVITIES } from 'redux/store/activities/activities.actions'
import { NOTIFICATIONS } from 'redux/store/notifications/notifications.actions'
import { COMMENTS } from 'redux/store/comments/comments.actions'
import { ATTACHMENTS } from 'redux/store/attachments/attachments.actions'
import { CONTACTS } from 'redux/store/contacts/contacts.actions'
import { FOLLOWERS } from 'redux/store/followers/followers.actions'
import * as records from 'redux/data/records'

export default typeToReducer(
  {
    // ------ Tasks --------------------------------------------------------------

    [TASKS.ADD]: (state, action) => saveTasks(action.payload, state),

    [TASKS.FETCH]: {
      FULFILLED: (state, action) => saveTasks(action.payload, state),
    },

    [TASKS.FETCH_INBOX]: {
      FULFILLED: (state, action) => saveTasks(action.payload, state),
    },

    [TASKS.FETCH_ARCHIVED]: {
      FULFILLED: (state, action) => saveTasks(action.payload, state),
    },

    [TASKS.FIREBASE]: {
      FULFILLED: (state, action) => saveTasks(action.payload, state),
    },

    [TASKS.FIREBASE_REMOVE_TASK_FOLLOWER]: (state, action) =>
      state
        .deleteIn(['tasks', action.payload.taskId])
        .deleteIn(['followers', action.payload.followerId]),

    [TASKS.SET_COMPLETE]: (state, action) =>
      state
        .setIn(['tasks', action.payload.taskId, 'isCompleted'], true)
        .setIn(
          ['tasks', action.payload.taskId, 'completedAt'],
          new Date().toISOString(),
        ),

    [TASKS.SET_INCOMPLETE]: (state, action) =>
      state
        .setIn(['tasks', action.payload.taskId, 'isCompleted'], false)
        .setIn(['tasks', action.payload.taskId, 'completedAt'], null),

    [TASKS.SET_ARCHIVE]: (state, action) =>
      state.setIn(['tasks'], action.payload.entitiesList),

    [TASKS.CANCEL_ARCHIVE]: (state, action) =>
      state.setIn(['tasks'], action.payload.entitiesList),

    [TASKS.SET_IMPORTANT]: (state, action) =>
      state.setIn(
        ['tasks', action.payload.task.id, 'isImportant'],
        action.payload.isImportant,
      ),

    [TASKS.SET_FIELD]: (state, action) =>
      state.setIn(
        ['tasks', action.payload.task.id, action.payload.fieldName],
        action.payload.fieldValue,
      ),

    [TASKS.REPLACE]: (state, action) => saveTasks(action.payload, state),

    [TASKS.MOVE]: (state, action) =>
      state.setIn(
        ['tasks', action.payload.taskId, 'order'],
        action.payload.order,
      ),

    [TASKS.ADD_TASK_TAG]: (state, action) =>
      state.updateIn(['tasks', action.payload.taskId, 'tags'], tagList =>
        tagList.push(action.payload.tag.id),
      ),

    [TASKS.ADD_TASK_FOLLOWER]: (state, action) =>
      state.updateIn(
        ['tasks', action.payload.taskId, 'followers'],
        followersList => followersList.push(action.payload.followerId),
      ),

    [TASKS.ADD_TASK_TAG_STORE]: (state, action) =>
      state.updateIn(['tasks', action.payload.taskId, 'tags'], tagList =>
        tagList.push(action.payload.tag.id),
      ),

    [TASKS.SET_TASK_TAG_STORE]: (state, action) =>
      state.setIn(
        ['tasks', action.payload.taskId, 'tags'],
        List(action.payload.tagIds),
      ),

    [TASKS.REMOVE_TASK_TAG_STORE]: (state, action) =>
      state.updateIn(['tasks', action.payload.taskId, 'tags'], tagList =>
        tagList.filter(tagId => tagId !== action.payload.tag.id),
      ),

    [TASKS.REMOVE_TASK_FOLLOWER]: (state, action) =>
      state.updateIn(
        ['tasks', action.payload.taskId, 'followers'],
        followersList =>
          followersList.filter(
            followerId => followerId !== action.payload.followerId,
          ),
      ),

    [TASKS.SEND]: (state, action) =>
      state.setIn(
        ['followers', action.payload.followerId, 'status'],
        'pending',
      ),

    [TASKS.ACCEPT]: (state, action) =>
      state
        .setIn(
          ['tasks', action.payload.taskId, 'order'],
          dateUtil.getMilliseconds(),
        )
        .setIn(['followers', action.payload.followerId, 'status'], 'accepted'),

    [TASKS.REJECT]: (state, action) => {
      const { task } = action.payload.originalData
      const assignee = getAssigneeOfTask(task.followers)

      return state
        .deleteIn(['tasks', task.id])
        .deleteIn(['followers', assignee.id])
    },

    [TASKS.DELETE]: (state, action) =>
      state.setIn(['tasks', action.payload.taskEntitiesList]),

    [TASKS.UNDO_DELETE]: (state, action) =>
      state.setIn(['tasks', action.payload.taskEntitiesList]),

    // ------ Tree --------------------------------------------------------------

    [TREE.ADD]: (state, action) => saveTree(action.payload, state),

    [TREE.FETCH]: {
      FULFILLED: (state, action) => saveTree(action.payload, state),
    },

    [TREE.FIREBASE]: {
      FULFILLED: (state, action) => saveTree(action.payload, state),
    },

    [TREE.UPDATE]: {
      PENDING: (state, action) =>
        state.setIn(
          ['treeItems', action.payload.treeItem.id, 'title'],
          action.payload.title,
        ),

      FULFILLED: (state, action) => saveTree(action.payload, state),
    },

    [TREE.DELETE]: {
      PENDING: (state, action) =>
        state.deleteIn(['treeItems', action.payload.originalData.id]),
    },

    [TREE.MOVE_SECTION]: (state, action) =>
      state.setIn(
        ['treeItems', action.payload.sectionId, 'order'],
        action.payload.order,
      ),

    [TREE.MOVE_TREE_ITEM]: (state, action) =>
      state
        .setIn(
          ['treeItems', action.payload.source.id, 'order'],
          action.payload.order,
        )
        .setIn(
          ['treeItems', action.payload.source.id, 'parentId'],
          action.payload.targetParentId,
        ),

    // ------ Tags --------------------------------------------------------------

    [TAGS.FETCH]: {
      FULFILLED: (state, action) => {
        const tags = convertToImmutable(
          action.payload.entities.tags || {},
          records.Tag,
        )
        return state.mergeIn(['tags'], tags)
      },
    },

    [TAGS.FIREBASE]: {
      FULFILLED: (state, action) => {
        const tags = convertToImmutable(
          action.payload.entities.tags || {},
          records.Tag,
        )
        return state.mergeIn(['tags'], tags)
      },
    },

    [TAGS.ADD]: (state, action) =>
      state.setIn(
        ['tags', action.payload.tag.id],
        new records.Tag(action.payload.tag),
      ),

    // Replace tag in either tags & task referencing the tag
    [TAGS.REPLACE]: (state, action) =>
      state
        .deleteIn(['tags', action.payload.originalTagId])
        .setIn(
          ['tags', action.payload.tag.id],
          new records.Tag(action.payload.tag),
        )
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
      FULFILLED: (state, action) => state.deleteIn(['tags', action.payload]),
    },
    // ------ Auth --------------------------------------------------------------

    [AUTH.LOGOUT]: () => new records.EntitiesStore(),

    // ------ Activities ----------------------------------------------------------

    [ACTIVITIES.FETCH]: {
      FULFILLED: (state, action) => saveActivities(action.payload, state),
    },

    [ACTIVITIES.FIREBASE]: {
      FULFILLED: (state, action) => saveActivities(action.payload, state),
    },

    // ------ Notifications ----------------------------------------------------------

    [NOTIFICATIONS.FETCH]: {
      FULFILLED: (state, action) => saveNotifications(action.payload, state),
    },

    [NOTIFICATIONS.FIREBASE]: {
      FULFILLED: (state, action) => saveNotifications(action.payload, state),
    },

    [NOTIFICATIONS.READ]: (state, action) =>
      state.setIn(
        ['notifications', action.payload.notification.id, 'readAt'],
        dateUtil.getDateToISOString(),
      ),

    [NOTIFICATIONS.READ_TASK]: (state, action) => {
      const { taskId } = action.payload
      let notifications = state.get('notifications')

      notifications = notifications
        .filter(notification => {
          return notification.readAt === null && notification.taskId === taskId
        })
        .map(notification =>
          notification.set('readAt', dateUtil.getDateToISOString()),
        )

      return state.mergeIn(['notifications'], notifications)
    },

    [NOTIFICATIONS.READ_ALL]: state => {
      let notifications = state.get('notifications')

      notifications = notifications
        .filter(notification => notification.readAt === null)
        .map(notification =>
          notification.set('readAt', dateUtil.getDateToISOString()),
        )

      return state.mergeIn(['notifications'], notifications)
    },

    // ------ Comments ----------------------------------------------------------

    [COMMENTS.FETCH]: {
      FULFILLED: (state, action) => saveComments(action.payload, state),
    },

    [COMMENTS.FIREBASE]: {
      FULFILLED: (state, action) => saveComments(action.payload, state),
    },

    [COMMENTS.ADD]: (state, action) => saveComments(action.payload, state),

    [COMMENTS.DELETE]: (state, action) => state
      .setIn(['comments', action.payload.commentId, 'content'], 'The message was deleted')
      .setIn(['comments', action.payload.commentId, 'trashedAt'], new Date()),

    // ------ Attachments -----------------------------------------------------

    [ATTACHMENTS.FETCH]: {
      FULFILLED: (state, action) => saveAttachments(action.payload, state),
    },

    [ATTACHMENTS.FIREBASE]: {
      FULFILLED: (state, action) => saveAttachments(action.payload, state),
    },

    [ATTACHMENTS.ADD]: (state, action) =>
      saveAttachments(action.payload, state),

    [ATTACHMENTS.DELETE]: (state, action) =>
      state.deleteIn(['attachments', action.payload.attachmentId]),

    // ------ Contacts ----------------------------------------------------------

    [CONTACTS.FETCH]: {
      FULFILLED: (state, action) => saveContacts(action.payload, state),
    },

    [CONTACTS.FIREBASE]: {
      FULFILLED: (state, action) => saveContacts(action.payload, state),
    },

    [CONTACTS.ADD]: (state, action) => saveContacts(action.payload, state),

    // Replace contact in either contacts & task referencing the tag
    [CONTACTS.REPLACE]: (state, action) =>
      state
        .deleteIn(['contacts', action.payload.originalContactId])
        .setIn(
          ['contacts', action.payload.contact.id],
          new records.Contact(action.payload.contact),
        )
        .updateIn(
          ['tasks', action.payload.relatedTaskId, 'contacts'],
          contactsList => {
            const contactIndex = contactsList.indexOf(
              action.payload.originalContactId,
            )
            return contactsList.splice(
              contactIndex,
              1,
              action.payload.contact.id,
            )
          },
        ),

    [CONTACTS.UPDATE]: (state, action) => {
      const contactId = action.payload.contact.id
      const fieldName = action.payload.type
      const fieldValue = action.payload.data

      // Update contact itself
      return state.setIn(['contacts', contactId, fieldName], fieldValue)
    },

    [CONTACTS.SEND_INVITATION]: (state, action) =>
      state.setIn(['contacts', action.payload.contactId, 'isInvited'], true),

    [CONTACTS.DELETE_IN_STORE]: (state, action) =>
      state.deleteIn(['contacts', action.payload.originalData.id]),

    // ------ Followers ----------------------------------------------------------

    [FOLLOWERS.ADD]: (state, action) => saveFollowers(action.payload, state),

    [FOLLOWERS.DELETE]: (state, action) =>
      state.deleteIn(['followers', action.payload.followerId]),
  },
  new records.EntitiesStore(),
)

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
      resultMap = resultMap.setIn(
        [treeItemId, treeItemFieldName],
        treeItemFieldValue,
      )
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
  const { profile, createdBy, followers } = payload.entities
  const profiles = profile ? _.assign(profile, createdBy) : createdBy

  // filter contacts
  const entitiesContacts = state.get('contacts')
  const filterProfiles = profiles
    ? Object.keys(profiles)
      .filter(key => {
        const contact = entitiesContacts.get(key)

        if (!contact) {
          return true
        }

        if (contact.isContact) {
          return false
        }

        if (contact.me) {
          return false
        }

        return true
      })
      .reduce((result, key) => {
        result[key] = profiles[key]
        return result
      }, {})
    : null

  // receive followers without profile from firestore, so set old value
  const entitiesFollowers = state.get('followers')
  const preparedFollowers = followers
    ? Object.keys(followers).reduce((result, key) => {
      const entityFollower = entitiesFollowers.get(key)
      const follower = followers[key]

      if (!follower.profile && entityFollower) {
        follower.profile = entityFollower.profile
      }

      result[key] = follower
      return result
    }, {})
    : null

  const rawTasks = payload.entities.tasks || {}
  const rawTags = payload.entities.tags || {}
  const rawFollowers = preparedFollowers || {}
  const rawContacts = filterProfiles || {}

  const contacts = convertToImmutable(rawContacts, records.Contact)
  const tags = convertToImmutable(rawTags, records.Tag)
  const tasks = convertToImmutable(rawTasks, records.Task)
  const immutableFollowers = convertToImmutable(rawFollowers, records.Follower)

  return state
    .mergeIn(['tasks'], tasks)
    .mergeIn(['tags'], tags)
    .mergeIn(['followers'], immutableFollowers)
    .mergeIn(['contacts'], contacts)
}

function saveActivities(payload, state) {
  // filter activities
  const filterActivities = Object.values(payload.entities.activitie)
    .filter(activitie => {
      const { type, data } = activitie
      const newData =
        type === 'TASKS/UPDATE' && data !== null ? Object.keys(data.new)[0] : ''

      return (
        newData === 'completedAt' ||
        type === 'TASKS/CREATE' ||
        type === 'TASKS/SEND-TO-FOLLOWER' ||
        type === 'TASKS/ACCEPT-BY-FOLLOWER' ||
        type === 'TASKS/REJECT-BY-FOLLOWER'
      )
    })
    .reduce((result, activitie) => {
      result[activitie.id] = payload.entities.activitie[activitie.id]
      return result
    }, {})

  const rawActivities = filterActivities || {}
  const activities = convertToImmutable(rawActivities, records.Activities)

  return state.mergeIn(['activities'], activities)
}

function saveNotifications(payload, state) {
  const rawNotifications = payload.entities.notification || {}
  const notifications = convertToImmutable(
    rawNotifications,
    records.Notification,
  )

  return state.mergeIn(['notifications'], notifications)
}

function saveComments(payload, state) {
  const rawComments = payload.entities.comment || {}
  const comments = convertToImmutable(rawComments, records.Comment)

  return state.mergeIn(['comments'], comments)
}

function saveAttachments(payload, state) {
  const rawAttachments = payload.entities.attachment || {}
  const attachments = convertToImmutable(rawAttachments, records.Attachment)

  return state.mergeIn(['attachments'], attachments)
}

function saveContacts(payload, state) {
  const rawContacts = payload.entities.contacts || {}
  const contacts = convertToImmutable(rawContacts, records.Contact)

  return state.mergeIn(['contacts'], contacts)
}

function saveFollowers(payload, state) {
  const rawFollowers = payload.entities.followers || {}
  const rawContacts = payload.entities.profile || {}
  const contacts = convertToImmutable(rawContacts, records.Contact)
  const followers = convertToImmutable(rawFollowers, records.Follower)

  return state.mergeIn(['followers'], followers).mergeIn(['contacts'], contacts)
}

function convertToImmutable(entities, record) {
  const recordItems = Object.keys(entities).reduce((result, key) => {
    switch (record) {
      // Task record -> tags to List
      case records.Task:
        result[key] = new record(entities[key])
          .set('tags', List(entities[key].tags))
          .set('followers', List(entities[key].followers))
        break

      default:
        result[key] = new record(entities[key])
        break
    }

    return result
  }, {})

  return Map(recordItems)
}
