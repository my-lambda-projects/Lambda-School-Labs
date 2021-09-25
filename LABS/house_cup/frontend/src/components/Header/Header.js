/* eslint-disable */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../../actions';
import './Header.css';

class Header extends Component {

  signout = () => {
    const { history } = this.props;
    this.props.signout(history);
  }

  render() {
    const publicAuthRoute = [
      '/signin',
      '/signup',
      '/forgotpassword',
    ];
    const protectedRoutes = [
      '/dashboard',
      '/schools',
      '/houses',
      '/houses/create',
      '/teachers',
      '/teachers/create',
      '/scoreboard',
      '/settings',
    ];
    const protectedRoutesTitle = [
      '',
      'Create Schools',
      'Manage Houses',
      'Manage Houses',
      'Manage Teachers',
      'Manage Teachers',
      'Current Scores',
      'Settings',
    ];

    const { pathname } = this.props.history.location;
    const token = localStorage.getItem('token');

    const isAuthorized = !!token;
    const isProtectedRoute = protectedRoutes.includes(pathname);
    const isPublicAuthRoute = publicAuthRoute.includes(pathname);

    return (
      <div>

        <div className="Header__dupe" />
        <div
          className="Header"
          data-protected-route={isProtectedRoute}
          data-public-auth-route={isPublicAuthRoute}
          data-user-authorized={isAuthorized}
        >
          <div className="wrapper">
            <NavLink to="/">
              <div className="Header__logo">
                <div className="Header__logo__image">
                  <div className="img" />
                </div>
                <div className="Header__logo__text">
                  House Cup
                </div>
              </div>
            </NavLink>
            <nav className="Header__nav">
              <ul>
                {
                  (!isProtectedRoute) ? (
                    // Main Navigation
                    <div className="Header__nav__links--non-dashboard">
                      <div className="Header__nav__links">
                        <NavLink to="/features">
                          <li data-selected={pathname === '/features'}>Features</li>
                        </NavLink>
                        <NavLink to="/pricing">
                          <li data-selected={pathname === '/pricing'}>Pricing</li>
                        </NavLink>
                        <NavLink to="/search-schools">
                          <li data-selected={pathname === '/search-schools'}>Schools</li>
                        </NavLink>
                      </div>
                      <div className="Header__nav__links">
                        {
                          (isAuthorized) ? (
                            <NavLink to="/dashboard">
                              <li className="Header__nav__links-dashboard">Go to Dashboard</li>
                            </NavLink>
                          ) : null
                        }
                      </div>
                    </div>
                  ) : (
                    <div className="Header__nav__links--non-dashboard" />
                  )
                }
                <div className="Header__nav__buttons">
                  {
                    (!isPublicAuthRoute && !isAuthorized) ? (
                      <NavLink to="/signin">
                        <button>Log In</button>
                      </NavLink>
                    ) : null
                  }
                  {
                    (!isPublicAuthRoute && !isAuthorized) ? (
                      <NavLink to="/signup">
                        <button>Sign Up</button>
                      </NavLink>
                    ) : null
                  }
                  {
                    (isProtectedRoute && isAuthorized) ? (
                      <button className="signout" onClick={this.signout}>Sign Out</button>
                    ) : null
                  }
                </div>
              </ul>
            </nav>

          </div>
        </div>
        
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, { signout })(Header));
