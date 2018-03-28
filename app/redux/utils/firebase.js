import firebase from 'firebase'
import 'firebase/firestore'
import { config } from 'redux/data/firebase'
import { eventChannel } from 'redux-saga'

// Initialize Firebase
firebase.initializeApp(config)
// Firestore
const db = firebase.firestore()

export default {

  getTasksChannel: (userId, initTime) => {
    const ref = db.collection('tasks')
      .where('createdById', '==', userId)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  getCommentsChannel: (userId, initTime) => {
    const ref = db.collection('comments')
      .where('createdById', '==', userId)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  getAttachmentsChannel: (userId, initTime) => {
    const ref = db.collection('attachments')
      .where('createdById', '==', userId)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  signIn: token => firebase.auth().signInWithCustomToken(token),

  signOut: () => firebase.auth().signOut(),
}
