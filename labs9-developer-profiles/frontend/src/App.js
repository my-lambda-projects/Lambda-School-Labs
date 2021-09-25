import React, { Component, Fragment } from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import Auth from "./auth/Auth";
import Nav from "./components/navigation/Nav";
import LandingPage from "./pages/landing-page/landingPage";
import PageUnauthorized from "./pages/404/PageUnauthorized";
import PageNotFound from "./pages/404/PageNotFound";
import UserDashboardContainer from "./pages/user-dashboard/UserDashboardContainer";
import PublicFacingPage from "./pages/main-page/PublicFacingPage";
import Callback from "./auth/Callback";

import { GlobalStyle } from "./global-styles/GlobalStyles";


const auth = new Auth();

class App extends Component {
  state = {
    auth
  };

  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <Nav {...this.props} {...this.state} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <LandingPage {...props} {...this.state} />}
          />
          <Route
            path="/dashboard"
            render={props =>
              this.state.auth.isAuthenticated() ? (
                <UserDashboardContainer {...props} {...this.state} />
              ) : (
                <PageUnauthorized {...props} {...this.state} />
              )
            }
          />
          <Route
            path="/callback"
            render={props => <Callback {...props} {...this.state} />}
          />
          <Route
            path="/public"
            render={props => <PublicFacingPage {...props} {...this.state} />}
          />
          
          <Route component={PageNotFound} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
