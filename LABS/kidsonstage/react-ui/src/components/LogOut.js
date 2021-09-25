import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions';

import { Navbar, NavbarBrand } from 'mdbreact';

import './css/logout.css';

class SignOut extends Component {
  componentWillMount() {
    this.props.logout();
  }

  render() {
    return (
      <div className="logout--container">
        <div className="logout--form_container">
          <Navbar className="logout--box_navbar" dark>
            <NavbarBrand tag="span">Log Out</NavbarBrand>
          </Navbar>
          <div className="logout--text_container">
            You have successfully logged out. You will be redirected to the home
            page!
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { logout })(SignOut);
