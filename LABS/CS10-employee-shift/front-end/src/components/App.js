import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { getUser } from "../store/User/actions.js";

import {
  Billing,
  Calendar,
  Dashboard,
  Employees,
  Landing,
  Settings,
  Signin,
  Signup,
  Admin,
} from "./Pages";

import Template from "./Templates/main.js";

import { LoadingContainer } from "../styles/Template.js";
import { Dimmer, Loader } from "semantic-ui-react";

// NOTE: This component handles our App's routing.
// It checks authentication (getUser) and reroutes accordingly.

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  PrivateRoute = ({ component: ChildComponent, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() => {
          if (this.props.user.isLoading) {
            // TODO: better loading screen in a separate component
            return (
              <LoadingContainer>
                <Dimmer active>
                  <Loader size="huge">Loading</Loader>
                </Dimmer>
              </LoadingContainer>
            );
          } else if (!this.props.user.isAuthenticated) {
            return <Redirect to="/signin" />;
          } else {
            return <Template component={ChildComponent} />;
          }
        }}
      />
    );
  };

  render() {
    const { PrivateRoute } = this;
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/calendar" component={Calendar} />
          <PrivateRoute exact path="/billing" component={Billing} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/employees" component={Employees} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      return dispatch(getUser());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
