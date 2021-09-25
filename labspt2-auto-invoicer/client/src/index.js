import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalState from './context/GlobalState';

import theme from './theme';

ReactDOM.render(
  <GlobalState>
    <Router>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </GlobalState>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
