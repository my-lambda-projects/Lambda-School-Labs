import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";

import App from "./App";

import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

// hot module replacement
// if (module.hot) {
//   module.hot.accept();
// }
// //////////////////////

ReactDOM.render(
  <Router>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
