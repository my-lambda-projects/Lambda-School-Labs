import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  upload_present: process.env.REACT_APP_UPLOAD_PRESENT,
  yelpkey: process.env.REACT_APP_YELP_KEY,
  googlekey: process.env.REACT_APP_GOOGLE_KEY
};
  
firebase.initializeApp(config);

export const auth = firebase.auth();

export default firebase;