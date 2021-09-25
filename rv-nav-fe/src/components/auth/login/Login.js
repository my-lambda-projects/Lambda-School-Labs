import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../store/actions";
import MapHeader from "../../header/MapHeader";
import {loadingPage} from "../loading/LoadingPage";

//CSS STYLES
import "./Login.css";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};

firebase.initializeApp(config);

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      credentials: {
        email: "",
        password: "",
        errors: {
          email: "",
          password: ""
        }
      },
      loading: false,
      isSignedIn: false
    };
  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/map",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
    // console.log('%cFirebase USER from did mount:) ->>', 'color: red; font-size: 16px;', firebase.auth())
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.credentials.errors;

    switch (name) {
      case "email":
        errors.email = value.length < 1 ? "Email cannot be empty" : "";
        break;

      case "password":
        errors.password =
          value.length < 8 ? "Password must be at least 8 characters long" : "";
        break;
      default:
        break;
    }

    this.setState({
      credentials: {
        ...this.state.credentials,
        errors,
        [name]: value
      }
    });
  };

  loginSubmit = event => {
    event.preventDefault();
    //Google analytics tracking
    window.gtag("event", "login", {
      event_category: "access",
      event_label: "login"
    });
    this.setState({ loading: true });
      return this.props
        .login(this.state.credentials)
        .then(res => {
          this.setState({ loading: false });
          this.setState({
            email: "",
            password: ""
          });
          if (res) {

            this.props.history.push("/map");
          }
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log("login err", err);
        });
  };

  unmaskPassword() {
    var passwordInput = document.querySelector("#password-input");
    var passwordStatus = document.querySelector(".password-mask");
    passwordStatus.backgroundImage = "none";

    if (passwordStatus && passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordStatus.classList.add("password-eye-off");
      passwordStatus.classList.remove("password-eye");
    } else {
      passwordInput.type = "password";
      passwordStatus.classList.remove("password-eye-off");
      passwordStatus.classList.add("password-eye");
    }
  }

  render() {
    const { errors } = this.state.credentials;
    // const isEnabled = this.state.credentials.username.length >= 5 && this.state.credentials.password.length >= 8;
    return (
      <div className="login-wrapper">
        <MapHeader />
        <div className="login-main">
          {this.state.loading === true ? (
            <p className="login-auth-loading">Let the adventure begin...</p>
          ) : (
            <form className="login-main-form" onSubmit={this.loginSubmit}>
              <div className="login-header">
                <h2 className="login-welcome-back">Welcome Back!</h2>
                <h4 className="its-great-to-see-you-again">
                  It's great to see you again.
                </h4>
              </div>
              {/* <div className="login-social-media">
                {/* {this.state.isSignedIn ? (
                  <div>
                    {this.state.isSignedIn ? (
                      <>
                        <h6>
                          Welcome {firebase.auth().currentUser.displayName}
                        </h6>
                        <button onClick={() => firebase.auth().signOut()}>
                          Logout
                        </button>
                      </>
                    ) : localStorage.getItem(
                        "firebaseui::rememberedAccounts"
                      ) ? (
                      localStorage.removeItem("firebaseui::rememberedAccounts")
                    ) : null}
                  </div>
                ) : (
                  // <StyledFirebaseAuth
                  //   uiConfig={this.uiConfig}
                  //   firebaseAuth={firebase.auth()}
                  // />
                )} *
              </div> */}
              {/* <div className="or">
                <span>or</span>
              </div> */}
              {this.props.error === "Invalid username or password" ? (
                <p className="login-main-form-error">
                  Invalid Email or Password
                </p>
              ) : null}
              <div className="login-input-and-button">
                <label className="login-main-form-label">Email</label>
                <input
                  className="login-main-form-input"
                  type="string"
                  name="email"
                  // placeholder=""
                  value={this.state.credentials.email}
                  onChange={this.handleChange}
                  required
                ></input>
                {errors.email.length > 0 && (
                  <p className="login-main-form-error">{errors.email}</p>
                )}
                <span className="password-mask" onClick={this.unmaskPassword}>
                  MASK
                </span>
                <label className="login-main-form-label" id="password">
                  Password
                </label>
                <input
                  className="login-main-form-input"
                  type="password"
                  id="password-input"
                  name="password"
                  // placeholder=""
                  value={this.state.credentials.password}
                  onChange={this.handleChange}
                  required
                ></input>
                {errors.password.length > 0 && (
                  <p className="login-main-form-error">{errors.password}</p>
                )}

                <button
                  className="login-lets-go-button"
                  variant="warning"
                  type="submit"
                >
                  Let's Go
                </button>
                <div className="need-account">
                  <div>
                    <span>Need to create an account?</span>
                  </div>
                  <div>
                    <a id="sign-up" href="/register">
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { error: state.error };
};

export default withRouter(connect(mapStateToProps, { login })(LoginForm));
