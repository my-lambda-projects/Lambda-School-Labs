import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from './Firebase';
// import { connect } from 'react-redux';
import SideBarNav from './SideBarNav';
// import { getUserLoginDetails } from '../Actions';
// import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../CSS/Navbar.css';

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        sessionStorage.clear();
        window.location = '/';
      })
      .catch((error) => {
        throw error;
      });
  };

  login = () => {
    window.location = '/login_user';
  }

  signin = () => {
    window.location = '/new_account';
  }

  render() {
    const token = this.state.tokenId;
    if (token === null || token === undefined || token === '') {
      return (
        <div className="navbarA navbar-inverseA navbar-fixed-topA">
          <div className="container-fluidA">
            <div className="navbar-headerA">
              <Link to="/">
                <h1 className="Nav-title-item">Loanie</h1>
              </Link>
            </div>
            <ul className="Nav-signin-container">
              <Button outline color="info" className="Nav-signup-item" onClick={this.login}>
                Login
              </Button>
              <Button outline color="info" className="Nav-signup-item" onClick={this.signin}>
                Sign Up
              </Button>
            </ul>
          </div>
          <SideBarNav />
        </div>
      );
    }
    return (
      <div className="navbarA navbar-inverseA navbar-fixed-topA">
        <div className="container-fluidA">
          <div className="navbar-headerA">
            <Link to="/">
              <h1 className="Nav-title-signedin">Loanie</h1>
            </Link>
          </div>
          <ul className="Nav-signin-container">
            <Button
              outline
              color="info"
              className="Nav-signup-item"
              onClick={this.logout}
              to="/login_user"
            >
              Sign Out
            </Button>
          </ul>
        </div>
        <SideBarNav />
      </div>
    );
  }
}

// connect()(Navbar);
