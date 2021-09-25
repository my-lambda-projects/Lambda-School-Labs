import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/info-navbar.css';

// should I change to const
class InfoNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAboutMenu: false
    };
  }

  handleHover = () => {
    this.setState({ showAboutMenu: true });
  };

  handleLeave = () => {
    this.setState({ showAboutMenu: false });
  };
  render() {
    return (
      <div className="navbar">
        <nav className="nav flex-item">
          <ul className="nav__menu">
            <li className="nav__menu-item" onMouseLeave={this.handleLeave}>
              <a onMouseEnter={this.handleHover}>
                <span>&#9776;</span>
              </a>
              {this.state.showAboutMenu && (
                <ul className="nav__submenu">
                  <li className="nav__submenu-item ">
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className="nav__submenu-item ">
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li className="nav__submenu-item ">
                    <NavLink to="/newuser">Sign Up</NavLink>
                  </li>
                  <li className="nav__submenu-item ">
                    <NavLink to="/pledge">Pledge</NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <div>
          <img
            className="navLogo"
            src={require('./static/logo.png')}
            alt="Numberless"
          />
        </div>
      </div>
    );
  }
}

export default InfoNavBar;
