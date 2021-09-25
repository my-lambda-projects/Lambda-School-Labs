import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
  
  render() {
    const { pathname } = this.props.history.location;
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
    const isProtectedRoute = protectedRoutes.includes(pathname);
    const year = new Date().getFullYear();

    return (
      (!isProtectedRoute) ?
        <div className="Footer">
          <div className="wrapper">
            <div className="Footer__note">&copy; { year } - House Cup</div>
            <div className="Footer__links">
              <ul>
                <a 
                  href="https://github.com/Lambda-School-Labs/house_cup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <li>Contribute</li>
                </a>
                <NavLink to="/terms">
                  <li>Terms</li>
                </NavLink>
                <NavLink to="/attribution">
                  <li>Attribution</li>
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      : null
    );
  }

}

export default withRouter(Footer);
