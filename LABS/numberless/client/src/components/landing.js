import React, { Component } from 'react';
import './styles/landing.css';
import { Link } from 'react-router-dom';
import Info from './info.js';
// i removed the handleChange function because it's superfluous.
// The buttons will just directly link to the appropriate components instead.
// I need to come back and add links to the log in and learn more buttons once the auth and info pages are complete.

class Landing extends Component {
  constructor() {
    super();
  }
  render() {
    // above all of this, there will be a navbar. reference the instagram post container and overall
    // app structure to figure out how to attach the navbar to this component
    // worse comes to worse i'll just hard code the navbar in here.
    // not best practice but i can refactor later
    return (
      <div className="landing">
        <div className="header">
          <img src={require('./static/logo.png')} placeholder="Logo Image" />
          <Link to="/login">
            <input className="login-button" value="LOG IN" type="submit" />
          </Link>
        </div>
        <div className="horizontal title">
          <p>Take </p>
          <div className="divider" />
          <p className="light-grey"> the Pledge</p>
        </div>
        <p>
          Giving monthly to a pool that will stand ready to proactively give
          targeted donations in-time and in-full. No waiting.
        </p>
        <div className="horizontal">
          <Link to="/pledge">
            <input className="landing-button" value="DONATE" type="submit" />
          </Link>
          <div className="divider" />
          <Link to="/info">
            <input
              className="landing-button"
              value="LEARN MORE"
              type="submit"
            />
          </Link>
        </div>
        <div className="LandingImage">
          <img
            src={require('./static/landing_img.png')}
            placeholder="Landing Image"
          />
        </div>
      </div>
    );
  }

  handleChange(event) {
    // for now these buttons should just navigate to the first info page and the
  }
}

export default Landing;
