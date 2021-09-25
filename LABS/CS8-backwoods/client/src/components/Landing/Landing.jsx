import React from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import BuyNow from "./BuyNow";
import "./Landing.css";
import logo from "./logo.svg";
import bullets from "./bullets.svg";
import SignInOut from "../SignInOut/SignInOut";

const Landing = props => (
  <React.Fragment>
    <SignInOut
      buttonColor
      styleName="signInOutlanding"
      buttonVariant="contained"
      {...props}
    />

    <div className="landingWrapper">
      <div className="header">
        <h1 className="backwoodsHeader">
          <img src={logo} className="logo" alt="logo" />
          Backwoods
        </h1>
        <h2 className="subtitleText">Wander safely.</h2>
      </div>
      <Paper className="paper">
        <ul className="wholeList">
          <li className="listItem">
            <img src={bullets} className="bullets" alt="bullet" /> Create trips
            by placing markers on the map
          </li>
          <li className="listItem">
            <img src={bullets} className="bullets" alt="bullet" /> Save your
            trips and share them with friends and family with your own personal
            URL so they know you&apos;re safe.
          </li>
          <li className="listItem">
            <img src={bullets} className="bullets" alt="bullet" /> Customize
            your own ETAs down to the minute for every marker you place
          </li>
          <li className="listItem">
            <img src={bullets} className="bullets" alt="bullet" /> Add trips to
            the archive when you&apos;re done and build up a log of all your
            travels
          </li>
          <li className="listItem">
            <img src={bullets} className="bullets" alt="bullet" />
            Check out our up coming hike on the{" "}
            <Link to="/aaron@backwood.app/trip/Crystal-Mountain-Loop">
              Crystal Mountain Loop
            </Link>{" "}
            in Washington State.
          </li>
        </ul>
        <h3>Subscribe for only $19.99/yr</h3>
        <BuyNow />
      </Paper>
    </div>
  </React.Fragment>
);

export default Landing;
