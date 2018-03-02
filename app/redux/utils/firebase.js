import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDFw-G0nAvPxD3Sw9wi2SnKIOxSTQGyVUY",
  authDomain: "flagis-development.firebaseapp.com",
  databaseURL: "https://flagis-development.firebaseio.com",
  projectId: "flagis-development",
  storageBucket: "flagis-development.appspot.com",
  messagingSenderId: "153227018743"
}

firebase.initializeApp(config)

export default {

  signIn: token => firebase.auth().signInWithCustomToken(token),

  signOut: () => firebase.auth().signOut(),
}
