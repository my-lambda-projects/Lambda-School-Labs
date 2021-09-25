// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-alert';
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: "top center"
};

ReactDOM.render(
  <Router>
   <Provider template={AlertTemplate}{...options} >
    <App />
    </Provider>
  </Router>,
document.getElementById('root'))