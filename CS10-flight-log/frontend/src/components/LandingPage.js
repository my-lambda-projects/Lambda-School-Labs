import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import NavBar from './NavBar';
// import TopHeader from './TopHeader';
// import HomePage from './HomePage';
import { isLoggedIn } from '../utils/helper/helperFuncions';
import Auth from './Authenication/Auth';

import './LandingPage.css';
import logo from '../utils/Images/Logo.svg';

class LandingPage extends Component {
  componentDidMount() {
    if (isLoggedIn()) {
      this.props.history.push('/home');
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="LandingPage">
        {this.props.loggedIn ? (
          <div className="LandingPage-card">
            <img src={logo} className="Falcano-Logo" alt="logo" />
            <h3 className="card-slogan">Time flies</h3>

            <p className="card-mission-statement">

              Gone are the days of untracked flights. Here at
              <span className="bold">Falcano</span>
              {' '}

              we make it easy for you to track your flights. Simply click and trips, instructors,
              hours and much more are easily managed. We've even made it easy for you to visually
              track your trips with a SkyVector map. Take us on your next flight and see what all
              the fuss is about.
            </p>
            <div className="card-registration">
              <Link className="registration-signin" to="/home">

                Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="LandingPage-card">
            <img src={logo} className="Falcano-Logo" alt="logo" />
            <h3 className="card-slogan">Time flies</h3>
            <p className="card-mission-statement">

              Gone are the days of untracked flights. Here at
              {' '}
              <span className="bold">Falcano</span>
              {' '}
              we make it easy for you to track your flights.
              Simply click and trips, instructors, hours and much more are easily managed. We've
              even made it easy for you to visually track your trips with a SkyVector map. Take us
              on your next flight and see what all the fuss is about.
            </p>
            <div className="card-registration">
              <Link className="registration-signin" to="/signin">

                LogIn
              </Link>
              <Link className="registration-signup" to="/signup">

                SignUp
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Auth(LandingPage);
