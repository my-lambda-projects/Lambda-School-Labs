// NEED TO HIDE below data
// use .env and add .env to gitignore

import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'don-t-eat-that-97fbd.firebaseapp.com',
  databaseURL: 'https://don-t-eat-that-97fbd.firebaseio.com',
  projectId: 'don-t-eat-that-97fbd',
  storageBucket: 'don-t-eat-that-97fbd.appspot.com',
  messagingSenderId: '120302586888'
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();

    // for 3rd party OAuth
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
