import auth0 from 'auth0-js';

//------DEPLOYED PATH--------------
// ALL OTHER PATHS MUST BE COMMENTED OUT TO AVOID ERRORS
 const PATH = 'https://workout-tracker-pt2.netlify.com';

//------LOCAL PATH-----------------
// ALL OTHER PATHS MUST BE COMMENTED OUT TO AVOID ERRORS
// const PATH = 'http://localhost:3000';

//------TESTING PATH---------------
// ALL OTHER PATHS MUST BE COMMENTED OUT TO AVOID ERRORS
// const PATH = 'https://testing-testing.netlify.com';

class Auth {
  accessToken;
  idToken;
  expiresAt;

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'workout-tracker-pt2.auth0.com',
      clientID: 'hoc1jpgL2TX2BkA1Q92gImRj7M90MjlO',
      redirectUri: `${PATH}/callback`,
      audience: 'https://workout-tracker-pt2.herokuapp.com/',
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          return reject(err);
        }
      });
    });
  }

  getProfile() {
    return this.profile;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    localStorage.setItem('isLoggedIn', 'true');
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    this.profile = authResult.idTokenPayload;
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }

  logout() {
    // clear access token, id token, profile, expiration, and LoggedIn flag
    this.accessToken = null;
    this.idToken = null;
    this.profile = null;
    this.expiresAt = 0;

    localStorage.removeItem('isLoggedIn');

    //Make sure to change DEPLOYED to DEPLOYED before merging to MASTER!

    this.auth0.logout({
      returnTo: `${PATH}`,
      clientID: 'hoc1jpgL2TX2BkA1Q92gImRj7M90MjlO'
    });
  }

  isAuthenticated() {
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}

const auth = new Auth();

export default auth;
