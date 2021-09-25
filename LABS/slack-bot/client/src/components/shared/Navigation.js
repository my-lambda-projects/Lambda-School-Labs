/**
   Navigation.js
   ====================================================
   CREATED: 2018-05-15
   UPDATED: 2018-05-15
   VERSION: 0.2.0
   TEAM: Jason Campbell, Manisha Lal, Wesley Harvey
   ABOUT: Navigation Component to be shared across all
          components
   NOTES: 
   ----------------------------------------------------
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { withAuth } from '@okta/okta-react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
// import '../Navigation.css';
import logo from '../img/logotest.jpg';

export default withAuth(class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;
    const authNav = this.state.authenticated ?<ul className="auth-nav">
      <li>
        <a href="javascript:void(0)" onClick={this.props.auth.logout}>
          Logout
        </a>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      {/* <li>
        <Link to="/profile/conversations">Conversations</Link>
      </li>
      <li>
        <Link to="/profile/conversations/conversationlist">Conversationlist</Link>
      </li> */}
    </ul> : <ul className="auth-nav">
      <li>
        <a href="javascript:void(0)" onClick={this.props.auth.login}>
          Login
        </a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>;
    return (
      
      <Navbar inverse collapseOnSelect className="navbar">
        <Navbar.Header>
        
          <Navbar.Brand className="navbar-custom-color">
            {/* <Nav> */}
            {/* <LinkContainer to={'/'}>
              <img src={logo} height='100%' width='100%' alt='logo' />
            </LinkContainer> */}
            <a href={'/'}>Slack Bot</a>

          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>  
          <NavDropdown title="Navigate" id="basic-nav-dropdown">
          
            <MenuItem to={'/'}>Home
            </MenuItem>
          
          
          {authNav}

          {/* <li><Link to="/">Home</Link></li> */}
          </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        
      </Navbar>
    )
  }
});
