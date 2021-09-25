import * as firebase from 'firebase';
import Rebase from 're-base';
var config = {
    apiKey: "AIzaSyDsQ1r5hgfllHJFlZVjBwI2Bp8btznK5Os",
    authDomain: "linkstasitecs5-18740.firebaseapp.com",
    databaseURL: "https://linkstasitecs5-18740.firebaseio.com",
    projectId: "linkstasitecs5-18740",
    storageBucket: "",
    messagingSenderId: "633569245331"
  };
  // const app = firebase.initializeApp(config);
  // const base = Rebase.createClass(app.database());
  // export const firebaseAuth = firebase.auth;
  // export default { base };
  firebase.initializeApp(config)

  export const ref = firebase.database().ref()
  export const firebaseAuth = firebase.auth 

  export const storageKey = 'KEY_FOR_LOCAL_STORAGE';

  export const isAuthenticated = () => {
    return !!firebaseAuth.currentUser || !!localStorage.getItem(storageKey);
  };