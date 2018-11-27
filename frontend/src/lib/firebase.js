import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyApnhSf01wOrLcf1ECOi9uNYa4WygheEcM',
  authDomain: 'mflow-cs3200.firebaseapp.com',
  databaseURL: 'https://mflow-cs3200.firebaseio.com',
  projectId: 'mflow-cs3200',
  storageBucket: 'mflow-cs3200.appspot.com',
  messagingSenderId: '811816723772',
}

firebase.initializeApp(config)
export default firebase
