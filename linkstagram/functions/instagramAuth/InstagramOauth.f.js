//https://github.com/firebase/functions-samples/tree/master/instagram-auth
'use strict';


const admin = require('firebase-admin')
// try { admin.initializeApp() } catch (e) { }
// try {admin.initializeApp(functions.config().firebase);} catch(e) {}
const functions = require('firebase-functions');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const express = require('express');
// Firebase Setup

const serviceAccount = require('./service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

 /* Creates a configured simple-oauth2 client for Instagram.
 */
function instagramOAuth2Client() {
  // Instagram OAuth 2 setup
  // TODO: Configure the `instagram.client_id` and `instagram.client_secret` Google Cloud environment variables.
  const credentials = {
    client: {
      id: firebase.config().instagram.clientId,
      secret: firebase.config().instagram.clientSecret,
    },
    auth: {
      tokenHost: 'https://api.instagram.com',
      tokenPath: '/oauth/access_token',
    },
  };
  return require('simple-oauth2').create(credentials);
}
const OAUTH_REDIRECT_PATH = '/redirect';
const OAUTH_CALLBACK_PATH = '/instagram-callback';
const OAUTH_MOBILE_REDIRECT_PATH = '/instagram-mobile-redirect';
const OAUTH_MOBILE_CALLBACK_PATH = '/instagram-mobile-callback';
const OAUTH_CODE_EXCHANGE_PATH = '/instagram-mobile-exchange-code';
const OAUTH_REDIRECT_URI = `https://${serviceAccount.project_id}.firebaseapp.com/public/popup.html` ;
const OAUTH_SCOPES = 'basic';
const app = express();
app.enable('trust proxy');
app.use(express.static('public'));
app.use(cookieParser());
/**

/**
 * Redirects the User to the Instagram authentication consent screen. Also the 'state' cookie is set for later state
 * verification.
 */
exports = module.exports = functions.https.onRequest((req, res) => {
  const oauth2 = instagramOAuth2Client();

  cookieParser()(req, res, () => {
    const state = req.cookies.state || crypto.randomBytes(20).toString('hex');
    console.log('Setting verification state:', state);
    res.cookie('state', state.toString(), {
      maxAge: 3600000,
      secure: true,
      httpOnly: true,
    });
    const redirectUri = oauth2.authorizationCode.authorizeURL({
      redirect_uri: OAUTH_REDIRECT_URI,
      scope: OAUTH_SCOPES,
      state: state,
    });
    console.log('Redirecting to:', redirectUri);
    res.redirect(redirectUri);
  });
});

/**
 * Exchanges a given Instagram auth code passed in the 'code' URL query parameter for a Firebase auth token.
 * The request also needs to specify a 'state' query parameter which will be checked against the 'state' cookie.
 * The Firebase custom auth token, display name, photo URL and Instagram acces token are sent back in a JSONP callback
 * function with function name defined by the 'callback' query parameter.
 */
exports = module.exports =  functions.https.onRequest((req, res) => {
  const oauth2 = instagramOAuth2Client();

  try {
    return cookieParser()(req, res, () => {
      console.log('Received verification state:', req.cookies.state);
      console.log('Received state:', req.query.state);
      if (!req.cookies.state) {
        throw new Error('State cookie not set or expired. Maybe you took too long to authorize. Please try again.');
      } else if (req.cookies.state !== req.query.state) {
        throw new Error('State validation failed');
      }
      console.log('Received auth code:', req.query.code);
      oauth2.authorizationCode.getToken({
        code: req.query.code,
        redirect_uri: OAUTH_REDIRECT_URI,
      });
    }).then((results) => {
      console.log('Auth code exchange result received:', results);

      // We have an Instagram access token and the user identity now.
      const accessToken = results.access_token;
      const instagramUserID = results.user.id;
      const profilePic = results.user.profile_picture;
      const userName = results.user.full_name;

      // Create a Firebase account and get the Custom Auth Token.
      return createFirebaseAccount(instagramUserID, userName, profilePic, accessToken);
    }).then((firebaseToken) => {
      // Serve an HTML page that signs the user in and updates the user profile.
      return res.jsonp({
        token: firebaseToken,
      });
    });
  } catch (error) {
    return res.jsonp({
      error: error.toString,
    });
  }
});

/**
 * Creates a Firebase account with the given user profile and returns a custom auth token allowing
 * signing-in this account.
 * Also saves the accessToken to the datastore at /instagramAccessToken/$uid
 *
 * @returns {Promise<string>} The Firebase custom auth token in a promise.
 */
function createFirebaseAccount(instagramID, displayName, photoURL, accessToken) {
  // The UID we'll assign to the user.
  const uid = `instagram:${instagramID}`;

  // Save the access token tot he Firebase Realtime Database.
  const databaseTask = admin.database().ref(`/instagramAccessToken/${uid}`)
    .set(accessToken);
  // Create or update the user account.
  const userCreationTask = admin.auth().updateUser(uid, {
    displayName: displayName,
    photoURL: photoURL,
  }).catch((error) => {
    // If user does not exists we create it.
    if (error.code === 'auth/user-not-found') {
      return admin.auth().createUser({
        uid: uid,
        displayName: displayName,
        photoURL: photoURL,
      });
    }
    throw error;
  });

  // Wait for all async task to complete then generate and return a custom auth token.
  return Promise.all([userCreationTask, databaseTask]).then(() => {
    // Create a Firebase custom auth token.
    return admin.auth().createCustomToken(uid);
  }).then((token) => {
    console.log('Created Custom token for UID "', uid, '" Token:', token);
    return token;
  });
}
// var server = app.listen(process.env.PORT || '8080', () => {
//   console.log('App listening on port %s', server.address().port);
//   console.log('Press Ctrl+C to quit.');
// });