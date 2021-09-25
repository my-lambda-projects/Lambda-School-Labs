import React from 'react';
import { Link } from 'react-router-dom';
import './MenuBar.css';

export default () => (
  <div className="menu-header">
    <ul className="menu-row">
      <li className="menu-item">
        <Link to="/">
          <img
            className="lambda-icon"
            src="lambdawhite2.png"
            alt="lambda icon"
          />
        </Link>
      </li>
      <li className="menu-item">
        <Link to="/pull-requests">
          <p className="menu-text">Pull Requests</p>
        </Link>
      </li>
    </ul>
  </div>
);
