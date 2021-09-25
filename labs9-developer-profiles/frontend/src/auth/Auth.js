import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";
import axios from "axios";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    responseType: "token id_token",
    scope: "openid profile email"
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = props => {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        const user = this.getProfile();
        let userInfo;
        let userArrHolder;
        // google returns given_name
        if (user.given_name) {
          userInfo = {
            first_name: user.given_name || "",
            last_name: user.family_name || "",
            email: user.email
          }
          // github+email return name
        } else if (user.name) {
          // github is verified, email is not
          if (user.email_verified) {
            userArrHolder = user.name.split(' ');
            userInfo = {
              first_name: userArrHolder[0] || "",
              last_name: userArrHolder[1] || "",
              email: user.email
            }
            // email signups contain no name
          } else {
            userInfo = {
              email: user.email,
              first_name: "",
              last_name: ""
            }
          }
        }
        if(!userInfo.email){
          props.history.push("/");
          console.log("error getting email");
        } else {
            axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/new`, userInfo)
            .then(res => {
              // db returns .first() user when user is returning, which is an object
              // db returns users arr with [0] index being new user when user is new
              if (Array.isArray(res.data)) {
                props.history.push('/dashboard/new');
              } else if (res.data) {
                props.history.push('/dashboard');
              }
            })
            .catch(err => console.log(err));
        }
      } else if (err) {
        props.history.push("/");
      }
    });
  }

  // renewAuth = () => {
  //   auth0.checkSession({
  //     audience: 'https://mystore.com/api/v2',
  //     scope: 'read:order write:order'
  //     }, function (err, authResult) {
  //       // Renewed tokens or error
  //   });
  // }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.auth0.logout({
      returnTo: process.env.REACT_APP_AUTH_REDIRECT,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID
    });
  }

  getProfile = () => {
    if (localStorage.getItem("id_token")) {
      return jwtDecode(localStorage.getItem("id_token"));
    } else {
      return { status: "No user" };
    }
  }
}
