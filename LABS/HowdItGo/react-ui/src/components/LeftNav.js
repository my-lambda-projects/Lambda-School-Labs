import React from 'react';
import { Link } from 'react-router-dom';
import './leftNav.css';
import 'font-awesome/css/font-awesome.min.css';
import PropTypes from 'prop-types';

import * as routes from '../constants/routes';

const LeftNavigation = (props, { authUser }) => (
  <div className="lnavcontainer">
    <div>
      <li className="lmenu">
        <i className="fa fa-code fa-lg fa-spin" />
      </li>
    </div>
    <div>
      <li className="lmenu">HowdItGo</li>
    </div>
    <div>
      <li className="lmenu">
        <Link to={routes.INVITE}>Invite</Link>
      </li>
    </div>
    <div>
      <li className="lmenu">
        <Link to={routes.STATS}>Stats</Link>
      </li>
    </div>
    <div>
      <li className="lmenu">
        <Link to={routes.SETTINGS}>Settings</Link>
      </li>{' '}
    </div>
    <div>
      <li className="lmenu">
        <Link to={routes.ACCOUNT}>Account</Link>
      </li>
    </div>
  </div>
);
LeftNavigation.contextTypes = {
  authUser: PropTypes.object
};

export default LeftNavigation;
