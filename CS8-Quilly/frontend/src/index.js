import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import history from './history';
import './index.css';

ReactDOM.render(<App history={history}/>,
  document.getElementById('root')
);
