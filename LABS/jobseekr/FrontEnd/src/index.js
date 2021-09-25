
/* eslint-env browser */ // fix linter complaining about undefined document variable
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
