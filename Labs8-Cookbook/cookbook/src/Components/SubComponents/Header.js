import React, { Component } from "react";
import Logo from "../../designs/Logo/CookBookLogo.svg";
import { Link } from "react-router-dom";
import auth from "../../Auth/Auth.js";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class Header extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  logout() {
    auth.logout();
  }

  render() {
    const { isAuthenticated } = auth;

    return (
      <div className="header">
        <Link className="link" to="/home/recipes">
          <img className="logo" src={Logo} alt="COOKBOOK logo" />
        </Link>
        <span className="title">COOKBOOK</span>
        {isAuthenticated() && (
          <div className="signout" onClick={this.logout.bind(this)}>
            logout
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Header);
