import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import DocumentList from "../DocumentList";
import NewEmail from "../emailcreate";
import Profile from "../Profile";

class MainContent extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          name="Home"
          render={(props) => <DocumentList user={this.props.user} />}
        />
        <Route exact path="/email" component={NewEmail} />
        <Route exact path="/email/:id" component={NewEmail} />
        <Route
          exact
          path="/profile"
          name="Profile"
          render={(props) => <Profile user={this.props.user} />}
        />
        />
      </Switch>
    );
  }
}

export default withRouter(MainContent);
