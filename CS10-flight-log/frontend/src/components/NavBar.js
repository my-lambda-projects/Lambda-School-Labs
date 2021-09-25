import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const dev = process.env.REACT_APP_DEV;
class NavBar extends Component {
  state = {};

  render() {
    return (
      <div className="NavBar">
      {dev ? <div>{process.env.REACT_APP_URL}</div> : <div></div>}
        <Link className="NavBar-link" to="/home">
          <span className="Navbar-icon-large">Home</span>
          <i className="fas fa-home fa-lg Navbar-icon-small" aria-hidden="true" />
        </Link>

        <Link className="NavBar-link" to="/flights">
          <span className="Navbar-icon-large">Flights</span>
          <i className="fas fa-plane-departure fa-lg Navbar-icon-small" aria-hidden="true" />
        </Link>

        <Link className="NavBar-link" to="/aircrafts">
          <span className="Navbar-icon-large">Aircraft</span>
          <i className="fas fa-plane fa-lg Navbar-icon-small" aria-hidden="true" />
        </Link>

        <Link className="NavBar-link" to="/instructors">
          <span className="Navbar-icon-large">Instructors</span>
          <i className="fas fa-chalkboard-teacher fa-lg Navbar-icon-small" aria-hidden="true" />
        </Link>

        <Link className="NavBar-link" to="/billing">
          <span className="Navbar-icon-large">Billing</span>
          <i className="fas fa-file-invoice-dollar fa-lg Navbar-icon-small" aria-hidden="true" />
        </Link>

        <Link className="NavBar-link" to="/settings">
          <span className="Navbar-icon-large">Settings</span>
          <i className="fas fa-cog fa-lg Navbar-icon-small" aria-hidden="true" />
        </Link>
      </div>
    );
  }
}

export default NavBar;
