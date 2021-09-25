import * as firebase from 'firebase';

const prodConfig = {
  apiKey: "AIzaSyDsQ1r5hgfllHJFlZVjBwI2Bp8btznK5Os",
  authDomain: "linkstasitecs5-18740.firebaseapp.com",
  databaseURL:"https://linkstasitecs5-18740.firebaseio.com",
  projectId: "linkstasitecs5-18740",
  storageBucket: '',
  messagingSenderId: "633569245331",
};

const devConfig = {
  apiKey: "AIzaSyDkT8JAvL8ZK7CtnhKI7rJUbvtRrvDJou0",
    authDomain: "linkstasite-dev.firebaseapp.com",
    databaseURL: "https://linkstasite-dev.firebaseio.com",
    projectId: "linkstasite-dev",
    storageBucket: "",
    messagingSenderId: "178394875945"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
