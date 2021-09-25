/**
   ProfilePage.js
   ====================================================
   CREATED: 2018-05-15
   UPDATED: 2018-05-15
   VERSION: 0.2.0
   TEAM: Jason Campbell, Manisha Lal, Wesley Harvey
   ABOUT: Profile Page Component
   NOTES:
   ----------------------------------------------------
 */

import React from "react";
import { withAuth } from "@okta/okta-react";
import { SecureRoute, ImplicitCallback } from "@okta/okta-react";
import Conversations from "../Conversations";
import CreateConversation from "../CreateConversation";
import SideBar from "../home/SideBar";
import { Switch, Route } from "react-router-dom";
import Preferences from "../Preferences";
import Billing from "../Billing";

export default withAuth(
  class ProfilePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = { user: null };
      this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    async getCurrentUser() {
      this.props.auth.getUser().then(user => this.setState({ user }));
    }

    componentDidMount() {
      this.getCurrentUser();
    }

    render() {
      if (!this.state.user) return null;
      return <div className="Page">
          <div className="Sidebar">
            <SideBar />
          </div>
          <div className="Data">
            <Switch>
              <Route path="/profile/createconversation" component={CreateConversation} />
              <Route path="/profile/conversations" component={Conversations} />
              <Route path="/profile/preferences" component={Preferences} />
              <Route path="/profile/billing" component={Billing} />
            </Switch>
          </div>
        </div>;
    }
  }
);
