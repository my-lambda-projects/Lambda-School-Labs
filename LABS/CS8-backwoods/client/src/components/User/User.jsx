import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";
import MainTriplist from "../TripList/MainTripList";
import TripCreate from "../TripCreate/TripCreate";
import BillingForm from "../Billing/BillingForm";
import AccountForm from "../Account/AccountForm";
import GetArchived from "../Archived/GetArchived";
import TripOpen from "../TripOpen/TripOpen";
import BadUrl404 from "../404/BadUrl404";
import { testTrip } from "../TripOpen/testData";
import TripNotFound404 from "../404/TripNotFound404";
import API_URL from "../../API_URL";
import Snackbar from "../Snackbar/Snackbar";
import WithSnackbar from "../Snackbar/SnackbarHOC";

const RestrictedRoute = ({
  component: Component,
  isLoggedIn,
  unauthorizedRedirect,
  ...rest
}) =>
  isLoggedIn ? (
    <Route {...rest} render={props => <Component {...props} {...rest} />} />
  ) : (
    <div>
      {unauthorizedRedirect()}
      <Redirect to="/" />
    </div>
  );

class User extends React.Component {
  state = {
    noUser: false,
    emailFromUser: "",
    trips: [],
    hasTrips: false,
    tripSavedModal: false,
    isTripSaved: true,
    navRedirect: "",
    mobileOpen: false
  };

  componentDidMount() {
    const { match } = this.props;
    this.setState({ emailFromUser: match.params.user });
    if (match.params.user === "aaron@backwood.app") {
      console.log("Test User");
      this.setState({
        hasTrips: true,
        trips: testTrip,
        noUser: false
      });
    } else {
      axios
        .get(`${API_URL}/${match.params.user}`)
        .then(res => {
          this.setState({ hasTrips: true, trips: res.data.trips });
        })
        .catch(error => {
          if (error.response.status === 423) {
            this.setState({ noUser: true });
          } else if (error.response.status === 422) {
            this.setState({ hasTrips: false });
          }

          console.log(error);
        });
    }
  }

  getUsersAgain = () => {
    const { match, isLoggedIn } = this.props;
    axios
      .get(`${API_URL}/${match.params.user}`)
      .then(res => {
        if (!res.data) {
          this.setState({ hasTrips: false });
          return;
        }
        this.setState({ hasTrips: true, trips: res.data.trips });
      })
      .catch(err => {
        if (!isLoggedIn) {
          this.setState({ noUser: true });
        }
        console.log(err);
      });
  };

  setSaveTripTrue = () => {
    this.setState({ isTripSaved: true });
  };

  setSaveTripFalse = () => {
    this.setState({ isTripSaved: false });
  };

  modalContinue = () => {
    this.setState({
      tripSavedModal: false,
      isTripSaved: true,
      mobileOpen: false
    });
  };

  checkIfTripSaved = (e, navLink) => {
    const { isTripSaved } = this.state;
    this.setState({ navRedirect: navLink });
    if (!isTripSaved) {
      e.preventDefault();
      this.tripModalTrue();
    } else {
      this._checkIfMobileOpen();
    }
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  _checkIfMobileOpen = () => {
    const { mobileOpen } = this.state;
    if (!mobileOpen) {
      return;
    }
    this.setState({ mobileOpen: false });
  };

  tripModalTrue = () => {
    this.setState({ tripSavedModal: true });
  };

  tripModalFalse = () => {
    this.setState({ tripSavedModal: false, mobileOpen: false });
  };

  archiveTrip = (TripId, index) => {
    const { trips } = this.state;
    const { match, handleSnackbarOpen } = this.props;
    const token = localStorage.getItem("token");
    const id = TripId;
    axios
      .put(
        `${API_URL}/${match.params.user}/archiveTrip`,
        { id, archived: true },
        { headers: { authorization: token } }
      )
      .then(res => {
        trips.splice(index, 1);
        this.setState(
          { trips },
          handleSnackbarOpen("success", "Trip Archived Successfully!")
        );
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        handleSnackbarOpen("error", "Server Cannot Archive Trip!");
      });
  };

  render() {
    const {
      noUser,
      emailFromUser,
      mobileOpen,
      tripSavedModal,
      navRedirect,
      hasTrips,
      trips
    } = this.state;
    const {
      snackbarOpen,
      snackbarMessage,
      snackbarVariant,
      handleSnackbarClose,
      match,
      email,
      isLoggedIn,
      firstName,
      lastName,
      handleTabChange,
      handleLogOut,
      tabState,
      handleChange,
      handleSignUp,
      handleSignIn,
      password,
      validatePassword,
      handleClose,
      handleOpen,
      open,
      unauthorizedRedirect
    } = this.props;
    return (
      <React.Fragment>
        {noUser ? (
          <Redirect push to={`/${match.params.user}/user-not-found`} />
        ) : (
          <Nav
            // //////////NAV////////// //
            emailFromUser={emailFromUser}
            user={email}
            mobileOpen={mobileOpen}
            handleDrawerToggle={this.handleDrawerToggle}
            isLoggedIn={isLoggedIn}
            checkIfTripSaved={this.checkIfTripSaved}
            // //////////SIGN IN/OUT///////// //
            handleTabChange={handleTabChange}
            handleLogOut={handleLogOut}
            tabState={tabState}
            handleChange={handleChange}
            handleSignUp={handleSignUp}
            handleSignIn={handleSignIn}
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            validatePassword={validatePassword}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            // /////////////MODAL//////////// //
            tripModalFalse={this.tripModalFalse}
            tripSavedModal={tripSavedModal}
            navRedirect={navRedirect}
            modalContinue={this.modalContinue}
          >
            <Switch>
              <Route
                path="/:user"
                render={props => (
                  <MainTriplist
                    {...props}
                    hasTrips={hasTrips}
                    trips={trips}
                    user={email}
                    archiveTrip={this.archiveTrip}
                    isLoggedIn={isLoggedIn}
                    setSaveTripFalse={this.setSaveTripFalse}
                  />
                )}
                exact
              />
              <RestrictedRoute
                path="/:user/create"
                component={TripCreate}
                unauthorizedRedirect={unauthorizedRedirect}
                isLoggedIn={isLoggedIn}
                setSaveTripTrue={this.setSaveTripTrue}
                email={email}
                user={email}
                getUsersAgain={this.getUsersAgain}
                tripsFromUser={trips}
              />
              <RestrictedRoute
                path="/:user/archived"
                component={GetArchived}
                isLoggedIn={isLoggedIn}
                unauthorizedRedirect={unauthorizedRedirect}
                getUsersAgain={this.getUsersAgain}
              />
              <RestrictedRoute
                path="/:user/billing"
                component={BillingForm}
                isLoggedIn={isLoggedIn}
                unauthorizedRedirect={unauthorizedRedirect}
              />
              <RestrictedRoute
                path="/:user/settings"
                component={AccountForm}
                isLoggedIn={isLoggedIn}
                unauthorizedRedirect={unauthorizedRedirect}
              />
              <Route path="/:user/trip/:slug" component={TripOpen} />
              <Route
                path="/:user/trip-not-found"
                component={TripNotFound404}
                exact
              />
              <Route component={BadUrl404} />
            </Switch>
          </Nav>
        )}
        <Snackbar
          snackbarVariant={snackbarVariant}
          snackbarMessage={snackbarMessage}
          handleSnackbarClose={handleSnackbarClose}
          snackbarOpen={snackbarOpen}
        />
      </React.Fragment>
    );
  }
}

export default WithSnackbar(User);
