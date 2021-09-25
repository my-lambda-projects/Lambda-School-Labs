import React from 'react';
import { Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap';

const handleLogout = () => {
  localStorage.removeItem('token');
};

const Header = () => (
  <div className="Header">
    <Navbar inverse collapseOnSelect className="js-navbar">
      <Navbar.Header>
        <Navbar.Brand>
          <a className="navBrand" href="/">JobSeekr</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav >
          <NavItem eventKey={1} href="/jobs">
            Jobs List
          </NavItem>
          <NavItem eventKey={2} href="/meetups">
            Meet Ups
          </NavItem>
          <NavItem eventKey={3} href="/contributions">
            Contributions
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={4} title="Account" id="basic-nav-dropdown">
            <MenuItem eventKey={4.1} href="/settings">
              Settings
            </MenuItem>
            <MenuItem eventKey={4.2} href="/billing">
              Billing
            </MenuItem>
            <MenuItem divider />
            {localStorage.getItem('token') ? (
              <MenuItem eventKey={3.3} href="/" onClick={() => handleLogout()}>
                Logout
              </MenuItem>
            ) : (
              <MenuItem eventKey={3.4} href="/login">
                Login
              </MenuItem>
            )}
            {localStorage.getItem('token') ? null : (
              <MenuItem eventKey={3.5} href="/signup">
                Sign Up
              </MenuItem>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Header;
