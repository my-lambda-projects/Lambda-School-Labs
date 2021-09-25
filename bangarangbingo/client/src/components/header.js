/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';

class Header extends Component {
  getLinks() {
    if (this.props.authenticated) {
      return (
        <div className="navlinks__auth">
          <Link to="/cards"><img src="/images/logo-teal.gif" alt="Bangarang Bingo" /></Link>
          <Link to="/" onClick={this.props.logout} className="navlinks__button">Sign Out</Link>
          <style jsx scoped>
            {`
            .navlinks__auth {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-bottom: 15px;
            }          
          `}
          </style>
        </div>
      );
    }
    return (
      <div className="navlinks">
        <Link to="/login" className="navlinks__button">Sign In</Link>
        <Link to="/register" className="navlinks__button">Sign Up</Link>
        <style jsx scoped>
          {`
          .navlinks {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            margin-bottom: 15px;
          }    
        .navlinks__auth img{
          width: 80%;
          max-width: 200px;
          display: block;
          text-align: center;
          margin: 0 auto;
      }
          `}
        </style>
      </div>
    );
  }

  render() {
    console.log('this.props.match.url', this.props);
    return (
      <div className="root">
        {this.getLinks()}
        <style jsx scoped>
          {`
          .root {
            background: transparent;
            z-index: 1;
            position: relative;
          }
          .root :global(.navlinks__button) {
            background-color: #239999;
            color: white;
            padding: 10px 10px;
            margin: 0px 5px 0px 5px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
        }

        `}
        </style>
      </div>
    );
  }
}


export default connect(null, { logout })(Header);
