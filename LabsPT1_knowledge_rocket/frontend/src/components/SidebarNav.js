import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import "../css/SidebarNav.css";

class Sidebar_Nav extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md" className="sidebar">
          <NavbarBrand className="nav-header" href="/">Knowledge Rocket</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="rockets">Rockets</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="classes">Classes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="billing">Billing</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="createEmail">Email</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="settings">Settings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" onClick={this.logoutUser}>
                  Log Out
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Sidebar_Nav);
