import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./styles/Components.css";
import "./styles/LandingPage.css";
import { auth, provider } from "./OAuth/firebase";
import URL from "../URLs";

const username_regex = /^[a-zA-Z0-9]{4,}$/;
const email_regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
const password_regex = /(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}/;

function validate(field, regex) {
  if (regex.test(field)) {
    return true;
  }
  return false;
}

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      registerURL:
        process.env.REACT_APP_BE_REGISTER_URL || `${URL.current_URL}/register`, // See ../URLs/index.js to change local vs served URL
      signinURL:
        process.env.REACT_APP_BE_LOGIN_URL || `${URL.current_URL}/login`, // See ../URLs/index.js to change local vs served URL
      signup_username: "",
      signup_email: "",
      signup_password: "",
      signup_password2: "",
      signin_username: "",
      signin_password: "",
      username_error: "",
      email_error: "",
      password_error: "",
      confirm_error: ""
    };
  }

  redirect = e => {
    // Note: This redirect function, and the reload in it, is here because I was using <Link> before, and whenever I clicked it to direct it to /gameslist, the background would stay blurred as if the modal is still open. If there's a better fix for it, please let me know :)
    window.location.reload();
    this.props.history.push("/gameslist");
  };

  // Sets users input to local state
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  validateRegister = () => {
    localStorage.clear();
    sessionStorage.clear();
    // Returning 1 lets us link to our backend, so we want to return 0 if any error occurs.
    let validation = 1;
    if (!this.state.signup_username) {
      validation = 0;
      this.setState({ username_error: "Username cannot be left blank." });
    } else {
      if (validate(this.state.signup_username, username_regex) !== true) {
        validation = 0;
        this.setState({
          username_error:
            "Needs to be: at least 4 characters, letters and numbers only."
        });
      } else {
        this.setState({ username_error: "" });
      }
    }
    if (!this.state.signup_email) {
      validation = 0;
      this.setState({ email_error: "Please enter an email address." });
    } else {
      if (validate(this.state.signup_email, email_regex) !== true) {
        validation = 0;
        this.setState({
          email_error: "Invalid email format, please try again."
        });
      } else {
        this.setState({ email_error: "" });
      }
    }
    if (!this.state.signup_password) {
      validation = 0;
      this.setState({ password_error: "Please enter a password." });
    } else {
      if (validate(this.state.signup_password, password_regex) !== true) {
        validation = 0;
        this.setState({
          password_error:
            "1 lowercase letter, 1 number, and at least 8 characters needed."
        });
      } else {
        this.setState({ password_error: "" });
      }
    }
    if (
      this.state.signup_password !== this.state.signup_password2 ||
      (!this.state.signup_password && !this.state.signup_password2)
    ) {
      validation = 0;
      this.setState({
        confirm_error: "Passwords do not match, please try again."
      });
    } else {
      this.setState({ confirm_error: "" });
    }

    // Now that we've done all the checks, we can return the 0 or 1 message.
    return validation;
  };

  validateSignin = () => {
    localStorage.clear();
    sessionStorage.clear();
    let validation = 1;
    if (!this.state.signin_username) {
      validation = 0;
      this.setState({ username_error: "Please enter a valid Username." });
    } else {
      if (validate(this.state.signin_username, username_regex) !== true) {
        validation = 0;
        this.setState({
          username_error:
            "Needs to be: at least 4 characters, letters and numbers only."
        });
      } else {
        this.setState({ username_error: "" });
      }
    }
    if (!this.state.signin_password) {
      validation = 0;
      this.setState({ password_error: "Please put in a password." });
    } else {
      this.setState({ password_error: "" });
    }
    return validation;
  };

  // Handles the submit call on the Register modal
  handleSubmit = e => {
    e.preventDefault();
    if (e.target.name === "register" || e.target.name === "signin") {
      sessionStorage.clear();
      localStorage.removeItem("guest");
    }
    if (!localStorage.getItem("guest") && !sessionStorage.getItem("jwt")) {
      let credentials;
      let url;

      if (e.target.name === "guest") {
        localStorage.setItem("guest", "yes");
        credentials = {
          username: `guest${Date.now()}`,
          password: `guest${Date.now()}`,
          email: `guest${Date.now()}@gmail.com`
        };
        url = this.state.registerURL;
      } else if (e.target.name === "register" && this.validateRegister()) {
        credentials = {
          username: this.state.signup_username,
          password: this.state.signup_password,
          email: this.state.signup_email
        };
        url = this.state.registerURL;
      } else if (e.target.name === "signin" && this.validateSignin()) {
        credentials = {
          username: this.state.signin_username,
          password: this.state.signin_password
        };
        url = this.state.signinURL;
      } else {
        return;
      }
      axios
        .post(url, {
          username: credentials.username,
          password: credentials.password,
          email: credentials.email || ""
        })
        .then(res => {
          const result = res.data;

          sessionStorage.setItem("jwt", result.token);
          sessionStorage.setItem("user", credentials.username);
          sessionStorage.setItem("userId", result.userId);
          sessionStorage.setItem("status", result.status);

          this.redirect();
        })
        .catch(err => {
          console.log("err.response: ", err.response);
          this.setState({
            password_error: "Incorrect password, please try again."
          });
        });
    } else {
      this.redirect();
    }
  };

  googleLogin = e => {
    localStorage.clear();
    sessionStorage.clear();
    let googleUsername, googleUID;
    e.preventDefault();
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      googleUsername = user.displayName;
      googleUID = user.uid;
      axios
        .post(this.state.registerURL, {
          username: user.displayName,
          password: user.uid,
          email: user.email
        })
        .then(res => {
          localStorage.setItem("register", "yes");
          localStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem(
            "user",
            JSON.stringify(user.displayName)
              .split("")
              .slice(1, -1)
              .join("")
          );
          axios
            .post(this.state.signinURL, {
              username: googleUsername,
              password: googleUID
            })
            .then(res => {
              sessionStorage.setItem("userId", JSON.stringify(res.data.userId));
              sessionStorage.setItem(
                "jwt",
                JSON.stringify(res.data.token)
                  .split("")
                  .slice(1, -1)
                  .join("")
              );
              sessionStorage.setItem("google", "yes");
              window.location.reload();
              this.redirect();
            });
        })
        .catch(err => {
          axios
            .post(this.state.signinURL, {
              username: user.displayName,
              password: user.uid
            })
            .then(res => {
              localStorage.removeItem("register");
              localStorage.setItem("thenerror", "then");
              sessionStorage.setItem(
                "jwt",
                JSON.stringify(res.data.token)
                  .split("")
                  .slice(1, -1)
                  .join("")
              );
              sessionStorage.setItem("userId", JSON.stringify(res.data.userId));
              window.location.reload();
              this.redirect();
              localStorage.setItem("user", JSON.stringify(user));
              sessionStorage.setItem("google", "yes");
            });
        });
      sessionStorage.setItem(
        "user",
        JSON.stringify(user.displayName)
          .split("")
          .slice(1, -1)
          .join("")
      );
      localStorage.setItem("error", "errrrr");
    });
  };
  signOut = e => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  render() {
    return (
      <div className="landing-page">
        {/* Top Navbar */}
        <nav
          id="navbar-color"
          className="navbar navbar-expand-lg navbar-light bg-light"
        >
          {/* Navbar Left Side */}
          <img
            id="logo-img"
            src="../img/trivializer_cropped.png"
            alt="logo"
            width="240px"
            height="85px"
          />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Navbar Right Side */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="landingpage-navbar-right navbar-nav ml-auto">
              {/*<li className="navbar-right-list active">
                <div className="navbar-link">How To Play</div>
    </li>*/}
              <li className="navbar-right-list active">
                <Link to="/faqs" className="navbar-link">
                  FAQ's
                </Link>
              </li>

              {sessionStorage.getItem("userId") &&
              !localStorage.getItem("guest") ? (
                <li className="navbar-right-list active">
                  <div href="#" onClick={this.signOut} className="navbar-link">
                    Sign Out
                  </div>
                </li>
              ) : null}

              {/* Navbar Signup Link */}

              {sessionStorage.getItem("userId") &&
              !localStorage.getItem("guest") ? null : (
                <li className="navbar-right-list">
                  <div className="signup">
                    <div
                      id="new-signup"
                      href="#"
                      className="nav-signup"
                      data-toggle="modal"
                      data-target="#signup"
                    >
                      Sign Up
                    </div>

                    {/* Sign Up Modal */}
                    <div
                      className="modal fade"
                      id="signup"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="signup-title modal-title"
                              id="exampleModalLabel"
                            >
                              Sign Up Below
                            </h5>

                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="signup-body modal-body">
                            <form
                              name="register"
                              className="signup-body"
                              onSubmit={this.handleSubmit}
                            >
                              <input
                                name="signup_username"
                                onChange={this.handleInput}
                                value={this.state.signup_username}
                                placeholder="Username"
                              />
                              <label
                                className="validation-label"
                                style={
                                  this.state.username_error
                                    ? { visibility: "visible" }
                                    : { visibility: "hidden" }
                                }
                              >
                                {this.state.username_error
                                  ? this.state.username_error
                                  : null}
                              </label>
                              <input
                                name="signup_email"
                                onChange={this.handleInput}
                                value={this.state.signup_email}
                                placeholder="Email"
                              />
                              <label
                                className="validation-label"
                                style={
                                  this.state.email_error
                                    ? { visibility: "visible" }
                                    : { visibility: "hidden" }
                                }
                              >
                                {this.state.email_error
                                  ? this.state.email_error
                                  : null}
                              </label>
                              <input
                                type="password"
                                name="signup_password"
                                onChange={this.handleInput}
                                value={this.state.signup_password}
                                placeholder="Password"
                              />
                              <label className="validation-label">
                                {this.state.password_error
                                  ? this.state.password_error
                                  : null}
                              </label>
                              <input
                                type="password"
                                name="signup_password2"
                                onChange={this.handleInput}
                                value={this.state.signup_password2}
                                placeholder="Confirm Password"
                              />
                              <label
                                className="validation-label"
                                style={
                                  this.state.confirm_error
                                    ? { visibility: "visible" }
                                    : { visibility: "hidden" }
                                }
                              >
                                {this.state.confirm_error}
                              </label>
                              <button
                                name="register"
                                onClick={this.handleSubmit}
                                className="create-button btn btn-primary"
                              >
                                Create My Account
                              </button>
                            </form>
                          </div>
                          <div
                            className="google-button-signup"
                            onClick={this.googleLogin}
                          >
                            <img
                              src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/8215f6659adc202403198fef903a447e/sign-in-with-google.svg"
                              onClick={this.googleLogin}
                              alt="googlesignup"
                            />
                            <span className="google-text">
                              {" "}
                              Sign In With Google
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )}

              {/* Navbar Sign In Link */}
              {sessionStorage.getItem("userId") &&
              !localStorage.getItem("guest") ? null : (
                <li className="navbar-right-list">
                  <div className="signin">
                    <div
                      id="new-signin"
                      className="nav-signin"
                      href="#"
                      data-toggle="modal"
                      data-target="#signin"
                    >
                      Sign In
                    </div>

                    {/* Sign In Modal */}
                    <div
                      className="modal fade"
                      id="signin"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="login-modal modal-content">
                          <div className="modal-header">
                            <h5
                              className="login-title modal-title"
                              id="exampleModalLabel"
                            >
                              Login Below
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form
                              name="signin"
                              className="signup-body"
                              onSubmit={this.handleSubmit}
                            >
                              <input
                                name="signin_username"
                                onChange={this.handleInput}
                                value={this.state.signin_username}
                                placeholder="Username"
                              />
                              <label className="validation-label">
                                {this.state.username_error
                                  ? this.state.username_error
                                  : null}
                              </label>
                              <input
                                type="password"
                                name="signin_password"
                                onChange={this.handleInput}
                                value={this.state.signin_password}
                                placeholder="Password"
                              />
                              <label className="validation-label">
                                {this.state.password_error
                                  ? this.state.password_error
                                  : null}
                              </label>
                              <button
                                name="signin"
                                onClick={this.handleSubmit}
                                className="login-button btn btn-primary"
                              >
                                Sign In
                              </button>
                            </form>
                          </div>

                          <div
                            className="google-button-signup"
                            onClick={this.googleLogin}
                          >
                            <img
                              src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/8215f6659adc202403198fef903a447e/sign-in-with-google.svg"
                              alt="googlebutton"
                            />
                            <span className="google-text">
                              {" "}
                              Sign In With Google
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>

        {/* Carousel */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            />
            <li data-target="#carouselExampleIndicators" data-slide-to="1" />
            <li data-target="#carouselExampleIndicators" data-slide-to="2" />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="carousel-design d-block w-100"
                src="../img/neon.jpg"
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="carousel-design d-block w-100"
                src="../img/barscore.jpg"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="carousel-design d-block w-100"
                src="../img/open.jpg"
                alt="Third slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>

        {/* Main Text */}
        <div className="landingpage-main">
          <div className="main-text">
            <h1>Welcome to Bar Trivia</h1>
            <div className="descriptions">
              <p className="description-text">
                Trivializer helps bar trivia hosts create their question sets
                and answer sheets by pulling from a large and free API of trivia
                questions. Questions and answers sheets can be printed easily
                and used on the fly.
              </p>
              <p className="description-text">
                Categories for trivia questions include Entertainment, Science,
                Art, History, and much more. Questions can be filtered by 3
                different difficulty settings and includes True/False or
                Multiple Choice types.
              </p>
              <p className="description-text">
                There are free and paid tiers of the app. Users who register get
                a welcome email and can reset their password via email as well.
                Premium users enjoy unlimited games and questions for their
                trivia rounds.
              </p>
            </div>
            <button
              className="main-button btn btn-success"
              name="guest"
              onClick={this.handleSubmit}
            >
              {sessionStorage.getItem("jwt") && !localStorage.getItem("guest")
                ? "Go To Games"
                : "Play Without Logging In"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      /*mapped functions here*/
    }
  )(LandingPage)
);
