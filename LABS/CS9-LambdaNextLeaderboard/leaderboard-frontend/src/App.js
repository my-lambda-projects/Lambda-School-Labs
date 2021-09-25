//________MODULES________
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt from "jsonwebtoken";
import "./App.css";

//________REACT COMPONENTS________
import NAVBAR from "./components/Navbar/Nav";
import LANDINGPAGE from "./components/LandingPage/LandingPage";
import LeaderBoard from "./components/Leaderboard/LeaderBoard";
import Dashboard from "./components/Dashboard/Dashboard";
import PRICING from "./components/Pricing/Pricing";
import SETTINGS from "./components/SettingsComponent/Settings";

//________STYLING________

class App extends Component {
  checkTokenExpiry = () => {
    if (localStorage.token) {
      let currentTime = new Date();
      let decoded = jwt.decode(localStorage.token.split(" ")[1]);
      if (currentTime.getTime() >= decoded.exp * 1000) {
        this.nav.sessionHasExpired();
      }
    }
  };

  handleOpenModal = () => {
    this.nav.handleOpenModal(null, { content: "Register" });
  };

  componentDidMount = () => {
    this.checkTokenExpiry();
    this.interval = setInterval(this.checkTokenExpiry, 5000);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    return (
      <Router>
        <div className="APP">
          {/* onRef gives App access to Navbar methods   Ex: this.nav.sessionHasExpired() */}
          <NAVBAR
            onRef={ref => (this.nav = ref)}
            checkTokenExpiry={this.checkTokenExpiry}
          />
          <div className="APP__BODY">
            <Route
              exact
              path="/"
              render={props => (
                <LANDINGPAGE {...props} handleCTAClick={this.handleOpenModal} />
              )}
              // component={LANDINGPAGE}
            />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/settings" component={SETTINGS} />
            <Route exact path="/leaderboard" component={LeaderBoard} />
            <Route
              exact
              path="/pricing"
              render={props => (
                <PRICING {...props} handleCTAClick={this.handleOpenModal} />
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
