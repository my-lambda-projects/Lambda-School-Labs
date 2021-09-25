import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { StripeProvider } from "react-stripe-elements";

import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import Snackbar from "./components/Snackbar/Snackbar";
import Landing from "./components/Landing/Landing";
import User from "./components/User/User";
import UserNotFound404 from "./components/404/UserNotFound404";
import API_URL from "./API_URL";
import WithSnackbar from "./components/Snackbar/SnackbarHOC";

// CssBaseline is the Material UI built in CSS reset
class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      validatePassword: "",
      isLoggedIn: false,
      tabState: 0,
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSignIn = e => {
    const { history, handleSnackbarOpen } = this.props;
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post(`${API_URL}/login`, { email, password })
      .then(res => {
        this.setState(
          {
            open: false,
            isLoggedIn: true
          },
          handleSnackbarOpen("success", "Logged in successful!")
        );
        localStorage.setItem("token", res.data.token);
        history.push(`/${email}`);
      })
      .catch(error => {
        if (error.response.status === 423) {
          handleSnackbarOpen("error", "User does not exist");
        } else if (error.response.status === 422) {
          handleSnackbarOpen("error", "Password does not match");
        }
      });
  };

  handleSignUp = e => {
    e.preventDefault();
    const { handleSnackbarOpen } = this.props;
    const { firstName, lastName, email, password } = this.state;
    axios
      .post(`${API_URL}/signup`, { firstName, lastName, email, password })
      .then(res => {
        this.setState(
          { tabState: 1 },
          handleSnackbarOpen("success", "User successfully created!")
        );
        console.log(res);
      })
      .catch(error => {
        handleSnackbarOpen("error", "User already exists!");
        console.log(error);
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleLogOut = () => {
    const { history, handleSnackbarOpen } = this.props;
    this.setState(
      {
        isLoggedIn: false,
        tabState: 0
      },
      handleSnackbarOpen("success", "Logged out successfully!")
    );
    localStorage.removeItem("token");
    history.push("/");
  };

  handleTabChange = (event, value) => {
    this.setState({ tabState: value });
  };

  unauthorizedRedirect = () => {
    const { handleSnackbarOpen } = this.props;
    this.setState(
      {
        tabState: 1,
        open: true
      },
      handleSnackbarOpen("error", "Please Sign In")
    );
  };

  render() {
    const {
      tabState,
      firstName,
      lastName,
      email,
      password,
      validatePassword,
      isLoggedIn,
      open
    } = this.state;
    const { ...snackbarState } = this.props;
    return (
      // test key need to put into config when using production key
      <StripeProvider apiKey="pk_test_UIFQFAQQTuGQzdsoR1LhXtCz">
        <div>
          <React.Fragment>
            <Snackbar {...snackbarState} />
            <CssBaseline>
              <React.Fragment>
                <Route
                  path="/"
                  render={props => (
                    <Landing
                      {...props}
                      handleTabChange={this.handleTabChange}
                      handleLogOut={this.handleLogOut}
                      tabState={tabState}
                      handleChange={this.handleChange}
                      handleSignUp={this.handleSignUp}
                      handleSignIn={this.handleSignIn}
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      password={password}
                      validatePassword={validatePassword}
                      isLoggedIn={isLoggedIn}
                      handleClose={this.handleClose}
                      handleOpen={this.handleOpen}
                      open={open}
                    />
                  )}
                  exact
                />
                <Route
                  path="/:user"
                  render={props => (
                    <User
                      {...props}
                      isLoggedIn={isLoggedIn}
                      unauthorizedRedirect={this.unauthorizedRedirect}
                      handleTabChange={this.handleTabChange}
                      handleLogOut={this.handleLogOut}
                      tabState={tabState}
                      handleChange={this.handleChange}
                      handleSignUp={this.handleSignUp}
                      handleSignIn={this.handleSignIn}
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      password={password}
                      validatePassword={validatePassword}
                      handleClose={this.handleClose}
                      handleOpen={this.handleOpen}
                      open={open}
                    />
                  )}
                />
                {/* If user logs in redirect User otherwise display landing page */}

                <Route
                  path="/:user/user-not-found"
                  render={props => (
                    <UserNotFound404
                      {...props}
                      isLoggedIn={isLoggedIn}
                      handleTabChange={this.handleTabChange}
                      handleLogOut={this.handleLogOut}
                      tabState={tabState}
                      handleChange={this.handleChange}
                      handleSignUp={this.handleSignUp}
                      handleSignIn={this.handleSignIn}
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      password={password}
                      validatePassword={validatePassword}
                      handleClose={this.handleClose}
                      handleOpen={this.handleOpen}
                      open={open}
                    />
                  )}
                />
              </React.Fragment>
            </CssBaseline>
          </React.Fragment>
        </div>
      </StripeProvider>
    );
  }
}

export default WithSnackbar(withRouter(App));
