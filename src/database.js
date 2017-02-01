import Firebase from 'firebase'

Firebase.initializeApp({
  apiKey: 'AIzaSyDAaVKZ5WZG9TmbnB32yzaVzdxBFtErO1g',
  authDomain: 'gkeep-302c5.firebaseapp.com',
  databaseURL: 'https://gkeep-302c5.firebaseio.com',
  storageBucket: 'gkeep-302c5.appspot.com',
  messagingSenderId: '102919870492'
})

export default Firebase.database()
