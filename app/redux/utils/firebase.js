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
      .where('isTrashed', '==', false)
      .where('isArchived', '==', false)
      .where('updatedAt', '>', initTime)

    return eventChannel(emit => ref.onSnapshot(emit))
  },

  signIn: token => firebase.auth().signInWithCustomToken(token),

  signOut: () => firebase.auth().signOut(),
}
