import auth0 from 'auth0-js';

class Auth {
   
  constructor() {
      this.authFlag = "isLoggedIn";
      this.auth0 = new auth0.WebAuth({
        domain: 'venky-yagatilee.auth0.com',
        clientID: '46Ngw5RelPCvdaCoKrqPvIWyvgFQBqvx',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'https://labspt2-housecup.herokuapp.com/',
        responseType: 'token id_token',
        scope: 'openid profile'
      }); 
        this.getProfile = this.getProfile.bind(this);
        this.getIdToken = this.getIdToken.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this); 
        this.setSession = this.setSession.bind(this) ;
        this.silentAuth = this.silentAuth.bind(this);

  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  getAccessToken() {
    return this.accessToken;
  }
  
  isAuthenticated() {
    // return JSON.parse(localStorage.getItem(this.authFlag));
    return new Date().getTime() < this.expiresAt;
  }

  login() {
    this.auth0.authorize();
    this.loginFlag = !this.loginFlag;
  }

handleAuthentication () {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        // console.log(`Auth Results`, authResult)
        this.setSession(authResult);
        resolve();
      });
    });
  }

  setSession (authResult)  {
    // Set the time that the Access Token will expire at
    let expires = authResult.idTokenPayload.exp * 10000000 + new Date().getTime();
    // this.expiresAt = JSON.stringify( authResult.expiresIn * 1000 + new Date().getTime());
    //Save token returned by auth0 to auth
    this.profile = authResult.idTokenPayload;
    this.idToken = authResult.idToken;
    this.accessToken = authResult.accessToken;
    // this.loginFlag = !this.loginFlag;
    this.expiresAt = expires;
    // console.log(this.profile);
    //Set authFlag in local storage to true
    // localStorage.setItem(this.authFlag, 'true');
    localStorage.setItem('isLoggedIn', 'true');
    // localStorage.setItem("Profile", JSON.stringify(this.profile));  Removed the profile info from local storage.
  }

  logout () {
    //Set authFlag in local storage to false
    // localStorage.setItem(this.authFlag, JSON.stringify(false));
    // localStorage.removeItem("Profile");
    // this.loginFlag = !this.loginFlag;
    this.accessToken = null;
    this.idToken = null;
    this.profile = null;
    this.expiresAt = 0;
    localStorage.removeItem('isLoggedIn');
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: '46Ngw5RelPCvdaCoKrqPvIWyvgFQBqvx',
    });
  }  
  silentAuth ()  {
    this.auth0.checkSession({}, (err, authResult) => {
      if(err) {
        this.logout();
        console.log(`Cannot issue a new Token at this time please read the following error: ${err.error}`, )
      } 
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }
  
}

const auth = new Auth();
export default auth;
