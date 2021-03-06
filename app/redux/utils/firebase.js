import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../../config'
import { eventChannel } from 'redux-saga'

// Initialize Firebase
firebase.initializeApp(config.firebase)

// Firestore
const db = firebase.firestore()

export default {
  getTasksChannel: (userId, initTime) => {
    const ref = db
      .collection('tasks')
      .where('createdById', '==', userId)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  getCollaboratedTasksChannel: (userId, initTime) => {
    const ref = db
      .collection('tasks')
      .where('followerIds', 'array-contains', userId)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  getNotificationsChannel: (userId, initTime) => {
    const ref = db
      .collection('notifications')
      .where('userId', '==', userId)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  getActivitiesChannel: (taskId, initTime) => {
    const ref = db
      .collection('activities')
      .where('taskId', '==', taskId)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  getCommentsChannel: (taskId, initTime) => {
    const ref = db
      .collection('comments')
      .where('taskId', '==', taskId)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  getAttachmentsChannel: (taskId, initTime) => {
    const ref = db
      .collection('attachments')
      .where('taskId', '==', taskId)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  getTagsChannel: (userId, initTime) => {
    const ref = db
      .collection('tags')
      .where('createdById', '==', userId)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  getTagTreeItemsChannel: (userId, initTime) => {
    const ref = db
      .collection('tagTreeItems')
      .where('createdById', '==', userId)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  getContactsChannel: (userId, initTime) => {
    const ref = db
      .collection('users')
      .doc(userId)
      .collection('contacts')
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  getGlobalProfilesChannel: (userId, initTime) => {
    const ref = db
      .collection('users')
      .where('accessibleFor', 'array-contains', userId)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  signIn: token => firebase.auth().signInWithCustomToken(token),
  refreshToken: () => firebase.auth().currentUser.getIdToken(true),
  signOut: () => firebase.auth().signOut(),
}
