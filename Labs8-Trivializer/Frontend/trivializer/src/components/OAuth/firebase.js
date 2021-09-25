import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCWagGc-I72tiBhJL7FJCdOCfCNzeSrH9g",
  authDomain: "bar-trivializer.firebaseapp.com",
  databaseURL: "https://bar-trivializer.firebaseio.com",
  projectId: "bar-trivializer",
  storageBucket: "bar-trivializer.appspot.com",
  messagingSenderId: "427746073809"
};

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
