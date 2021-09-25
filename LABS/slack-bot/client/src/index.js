/**
   client/src/index.js
   ====================================================
   CREATED: 2018-05-15
   VERSION: 0.2.0
   TEAM: Jason Campbell, Manisha Lal, Wesley Harvey
   ABOUT: Root file rendering the React client
   NOTES:
   ----------------------------------------------------
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import './index.css';
import config from './client.config';

function onAuthRequired({ history }) {
  history.push('/login');
}

ReactDOM.render(
  <Router>
    <Security
      issuer={config.issuer}
      client_id={config.client_id}
      redirect_uri={config.redirect_uri}
      onAuthRequired={onAuthRequired}
    >
      <App />
    </Security>
  </Router>
  , document.getElementById('root')
);

registerServiceWorker();
