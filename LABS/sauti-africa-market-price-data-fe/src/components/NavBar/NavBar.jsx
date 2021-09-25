import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Event } from '../Tracking/Tracking'

import {
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import { useAuth0 } from '../../contexts'

import './NavBar.scss'
import 'semantic-ui-css/semantic.min.css'

const NavBar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const logoutWithRedirect = () => {
    // Clear local storage
    localStorage.clear()
    logout({
      returnTo: window.location.origin
    })
  }

  return (
    <div className="navbar">
      <div className="logo">
        <NavLink
          tag={RouterNavLink}
          to="/"
          exact
          activeClassName="router-link-exact-active"
        >
          Sauti<span className="logo-dot">.</span>
        </NavLink>
      </div>
      <nav className="nav">
        <div className="links">
          <NavLink
            tag={RouterNavLink}
            to="/"
            exact
            activeClassName="router-link-exact-active"
          >
            HOME
          </NavLink>
          <NavLink
            tag={RouterNavLink}
            to="/docs"
            exact
            activeClassName="router-link-exact-active"
          >
            API
          </NavLink>
          <NavLink
            tag={RouterNavLink}
            to="/data"
            exact
            activeClassName="router-link-exact-active"
          >
            GET DATA
          </NavLink>
          <a
            href="https://www.facebook.com/sautiorg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="facebook f icon"></i>
          </a>
          <a
            href="https://twitter.com/sautiorg?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="twitter icon"></i>
          </a>
        </div>

        <div>
          {!isAuthenticated && (
            <button
              className="ui button login-btn"
              onClick={() => {
                //google analytics event tracking
                Event('Users', 'Login')
                loginWithRedirect({})
              }}
            >
              Log In
            </button>
          )}
          {isAuthenticated && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret id="profileDropDown">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="nav-user-profile rounded-circle"
                  width="50"
                />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  tag={RouterNavLink}
                  to="/profile"
                  className="dropdown-profile"
                  activeClassName="router-link-exact-active"
                >
                  <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                </DropdownItem>
                <DropdownItem
                  id="qsLogoutBtn"
                  onClick={() => logoutWithRedirect()}
                >
                  <FontAwesomeIcon icon="power-off" className="mr-3" /> Log out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
