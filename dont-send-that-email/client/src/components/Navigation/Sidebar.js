import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pushRotate as Menu } from "react-burger-menu";
import classnames from 'classnames';
import "./sideBar.css";
import "./hamburger.css";

export default class Sidebar extends Component {
  logoutUrl = process.env.REACT_APP_BACKEND_URL + "/auth/logout";
  state = {
    menuOpen: false,
  };

// Allows us to control state by linking isOpen to menuOpen
  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

// If we want to close menu when clicking on menu buttons
  // closeMenu = () => {
  //   this.setState({ menuOpen: false });
  // }

// Lets us use external element to toggle hamburger  
  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    let isActive = this.state.menuOpen;
    // Goes to Hamburger Menu at the bottom
    let classes = classnames("hamburger", "hamburger--squeeze", isActive ? "is-active": "");
    return (
      <div>
        <Menu
          customBurgerIcon={ false }
          customCrossIcon={ false }
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          right
          pageWrapId={"page-wrap"}
        >
          <Link onClick={() => this.closeMenu.closeMenu()} to="/">
            <Button color="danger">
              <FontAwesomeIcon icon="home" />
              <span>Home</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button color="danger">
              <FontAwesomeIcon icon="user" />
              <span className="middle-button">Profile</span>
            </Button>
          </Link>
          <a href={this.logoutUrl}>
            <Button color="danger">
              <FontAwesomeIcon icon="sign-out-alt" />
              <span>Sign Out</span>
            </Button>
          </a>
        </Menu>
        {/* Hamburger */}
        <button className={classes} onClick={this.toggleMenu} type="button">
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>
    );
  }
}
