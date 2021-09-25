import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";

// --> Components List
import LandingPage from "./components/landing/LandingPage";
import UserSettings from "./components/user/UserSettings";
import UserProfile from "./components/user/UserProfile";
import UsersProfile from "./components/users/UsersProfile";
import EventList from "./components/events2/EventList";
import CreateEvent from "./components/events2/CreateEvent";
import EventSingle from "./components/events2/EventSingle";
import Redirected from "./components/events2/Redirected";
import Redirected2 from "./components/events2/Redirected2"

// CSS IMPORT
import "./index.css";

// Imports for create event button
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

class App extends Component {
  render() {
    return (
      <div>
        {this.props.auth.isEmpty ? (
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Redirected2/>
          </Switch>
        ) : (
          <div className="app">
            <Switch>
              <Route exact path="/events" component={EventList} />
              <Route exact path="/events_create" component={CreateEvent} />
              <Route exact path="/events/:id" component={EventSingle} />
              <Route exact path="/user-settings" component={UserSettings} />
              <Route exact path="/user-profile" component={UserProfile} />
              <Route exact path="/user/:id" component={UsersProfile} />
              <Redirected/>
            </Switch>
            <Fab
              aria-label="Add"
              style={{
                bottom: "20px",
                right: "20px",
                overflow: "hidden",
                position: "fixed",
                backgroundColor: "#9f0808"
              }}
              onClick={() => {
                window.location.reload();
                this.props.history.push("/events_create");
              }}
            >
              <AddIcon />
            </Fab>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
