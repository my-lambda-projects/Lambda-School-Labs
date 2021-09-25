import React, { Component } from "react";
import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Button, Modal } from "semantic-ui-react";
import {updateIsLoggedInTrue} from "../../actions/isLoggedInAction.js"
require("dotenv").config();

const LOGIN_SUCCESS_PAGE = "/";
const LOGIN_FAIL_PAGE = "/fail";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "dev-ose6zus8.auth0.com",
    clientID: "YIsbwxbfI59b7ZVcrenZ9gFZCObXpI79",
    redirectUri: "https://scratchandmap.club/callback",
    audience: "https://dev-ose6zus8.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid profile"
  });

  constructor() {
    this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("SAMUserID", authResults.idTokenPayload.sub);
        localStorage.setItem("expires_at", expiresAt);
        let keys = Object.keys(authResults)
        let keys2 = Object.keys(authResults.idTokenPayload)
        keys.forEach(key    =>  {
            console.log(key, authResults[key])
        })
        keys2.forEach(key    =>  {
            console.log(key, authResults.idTokenPayload[key])
        })
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/api/signup`,  {
              username: authResults.idTokenPayload.nickname,
              password: "123456789",
              first_name: authResults.idTokenPayload.given_name,
              last_name: authResults.idTokenPayload.family_name,
              age: 24,
              nationality: "american",
              picture_url: authResults.idTokenPayload.picture,
              email: authResults.idTokenPayload.nickname + "@gmail.com",
              role: "user",
              home_country: "United States of America",
              fb_user_id: authResults.idTokenPayload.sub,
              fb_access_token: authResults.accessToken,
              premium: "false",
          })
          .then(data    =>  {
              console.log(data)
          })
        console.log("hit update")
        window.location.hash = "";
        window.location.pathname = LOGIN_SUCCESS_PAGE;
      } else if (err) {
        window.location.pathname = LOGIN_FAIL_PAGE;
        console.log(err);
      }
    });
  }

  getProfile(cb) {
    if (localStorage.getItem("SAMUserID")) {
      return jwtDecode(localStorage.getItem("SAMUserID"));
    } else {
      return {};
    }
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("SAMUserID");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("userInfo");
    window.location.pathname = LOGIN_SUCCESS_PAGE;
  }
  //old funtions start here
  // clearState = () => {
  //   this.setState({ username: "", password: "", email: "" });
  // };

  // showLogin = e => {
  //   this.clearState();
  //   this.setState({ isLoginOpen: true, isRegisterOpen: false });
  // };

  // showRegister = e => {
  //   this.clearState();
  //   this.setState({ isRegisterOpen: true, isLoginOpen: false });
  // };

  // handleInputChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // onSubmitHandler = e => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const action = this.state.isLoginOpen ? "login" : "signup";
  //   axios
  //     .post(`${process.env.REACT_APP_BACKEND_URL}/${action}`, {
  //       username: this.state.username,
  //       email: this.state.email,
  //       password: this.state.password
  //     })
  //     .then(response => {
  //       console.log(response);
  //       this.props.history.push("/map"); //Not currently redirecting
  //     });
  // };
}

//***OLD AUTH CODE */

// <div className="landing">
//   <div className="Nav">
//     <Modal
//       size="mini"
//       trigger={
//         <Button className="navbutton" inverted>
//           SIGN UP
//         </Button>
//       }
//       closeIcon
//     >
//       <Modal.Content>
//         <div className="box-wrapper">
//           {this.state.isLoginOpen && (
//             <FbLogin
//               inputChange={this.handleInputChange}
//               submit={this.onSubmitHandler}
//             />
//           )}
//         </div>
//       </Modal.Content>
//     </Modal>

//     <Modal
//       size="mini"
//       trigger={
//         <Button className="navbutton" inverted>
//           LOG IN
//         </Button>
//       }
//       closeIcon
//     >
//       <Modal.Content image>
//         <div className="box-wrapper">
//           {this.state.isLoginOpen && (
//             <FbLogin
//               inputChange={this.handleInputChange}
//               submit={this.onSubmitHandler}
//             />
//           )}
//         </div>
//       </Modal.Content>
//     </Modal>

{
  /* <div className="auth-wrapper">
        <div className="auth-controller">
          <div
            className={
              "controller" +
              (this.state.isRegisterOpen ? "selected-controller" : "")
            }
            onClick={this.showRegister}
          >
            Sign Up
          </div>
          <div
            className={
              "login-controller" +
              (this.state.isLoginOpen ? "selected-controller" : "")
            }
            onClick={this.showLogin}
          >
            Log In
          </div>
        </div>
      </div> */
}
{
  /* </div>
      </div> */
}
