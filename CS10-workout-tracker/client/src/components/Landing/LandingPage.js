import React, { Component } from "react";
import JumboTron from "./JumboTron";
import AboutApp from "./AboutApp";
import Quote from "./Quote";
import HowToStart from "./HowToStart";
import "animate.css/animate.min.css";

class LandingPage extends Component {
  render() {
    return (
      <div className="main__landing__page">
        <JumboTron />
        <AboutApp />
        <Quote />
        <HowToStart />
      </div>
    );
  }
}

export default LandingPage;
