import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Grommet } from 'grommet';

const appTheme = {
  global: {
    colors: {
      brand: 'coral',
    },
  },
  textInput: {
      extend: {
        'font-family': "'Roboto', sans-serif",
      }
  }
};

ReactDOM.render(
  <Router>
    <Grommet theme={appTheme}>
    <App />
    </Grommet>
  </Router>,
  document.getElementById("root")
);