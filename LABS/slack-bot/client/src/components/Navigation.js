import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Navbar>
        <Nav>
          <LinkContainer to={'/homepage'}>
            <NavItem>Home</NavItem>
          </LinkContainer>

          <LinkContainer to={'/about'}>
            <NavItem>About</NavItem>
          </LinkContainer>

          <LinkContainer to={'/signup'}>
            <NavItem>Sign Up</NavItem>
          </LinkContainer>

          <LinkContainer to={'/login'}>
            <NavItem>Log In</NavItem>
          </LinkContainer>

          <LinkContainer to={'/'}>
            <NavItem onClick={this.handleLogOut}>Logout</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    )
  }
}

export default Navigation;