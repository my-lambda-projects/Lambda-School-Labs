import React from "react";
import AnotherButton from "../reusableComponents/AnotherButton";
import AddToCalendar from "../AddToCalendar";

import {
  CLIENT_ID as clientId,
  DISCOVERY_DOCS as discoveryDocs,
  SCOPES as scope
} from "./constants";

class index extends React.Component {
  state = {
    isSignedIn: false
  };

  componentDidMount() {
    // Init gapi
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({ clientId, discoveryDocs, scope }).then(() => {
        // Listen for sign-in state changes
        window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(this.updateSigninStatus);
        this.updateSigninStatus(
          window.gapi.auth2.getAuthInstance().isSignedIn.get()
        );
      });
    });
  }

  handleLogin = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  handleLogout = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  updateSigninStatus = async isSignedIn => {
    if (isSignedIn) {
      this.setState({
        isSignedIn: true
      });
    } else {
      this.setState({
        isSignedIn: false
      });
    }
  };

  render() {
    const { isSignedIn } = this.state;

    return isSignedIn ? (
      <React.Fragment>
        <AnotherButton
          label="Go back to Invoice Form"
          onClick={this.handleLogout}
        />
        <AddToCalendar />
      </React.Fragment>
    ) : (
      <AnotherButton
        label="Premium Members Login Here"
        onClick={this.handleLogin}
      />
    );
  }
}

export default index;
