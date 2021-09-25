import React from "react";
import { Container, Row } from "reactstrap";
import { Route, Switch } from "react-router-dom";
import Auth from "../features/auth/container/Auth";
import ProtectedPages from "../features/auth/container/ProtectedPages";
import Testing from "../features/testing/container";
import NavBar from "../features/nav/component/NavBar";
import Landing from "../layouts/landingPage/Landing";
// import Landing2 from "../layouts/landingPage/Landing2";
import Billing from "../features/billing/component";
import ProfileContainer from "../features/forms/containers";
import View from "../features/view/container";
import BrowseContainer from "../features/profile/container";
import Job from "../features/job/component/Job";
import MatchContainer from "../features/matches/container/";

import Admin from "../layouts/Admin/Admin";
export default class Layout extends React.Component {
  render() {
    return (
      <div>
        {/* <NavBar />
        <Route path="/" exact component={Landing} /> */}
        {/*<Route path="/landing2" exact component={Landing2} />*/}
        <Container>
          <Row>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/billing" component={ProtectedPages(Billing)} />
              <Route path="/rand" component={BrowseContainer} />
              <Route
                path="/matches"
                component={ProtectedPages(MatchContainer)}
              />

              {/* <Route
								path="/forms"
								component={ProtectedPages(ProfileContainer)}
							/> */}
              <Route
                path="/profile"
                component={ProtectedPages(ProfileContainer)}
              />
              <Route path="/job" component={ProtectedPages(Job)} />
              <Route path="/view" component={ProtectedPages(View)} />
              <Route path="/testing" exact component={Testing} />
              {/* <Route path="/admin" component={Admin} /> */}
            </Switch>
          </Row>
        </Container>
      </div>
    );
  }
}
