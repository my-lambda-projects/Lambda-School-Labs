import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Elements, StripeProvider } from "react-stripe-elements";
import * as serviceWorker from "./serviceWorker";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import rootReducer from "./reducers";
import Register from "./components/register";
import Login from "./components/login";
import App from "./components/App.js";
import Classes from "./components/Classes.js";
import Settings from "./components/Settings.js";
import CreateRocket from "./components/CreateRocket.js";
import Rocket from "./components/Rocket.js";
import BillingForm from "./components/Billing";
import Quiz2D from "./components/Quiz2D";
import Quiz2W from "./components/Quiz2W";
import Quiz2M from "./components/Quiz2M";
import CreateClass from "./components/CreateClass.js";
import SendEmail from "./components/SendEmail.js";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// subscribe app to reducer/ store
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk, logger))
);

const elementFontSize = window.innerWidth < 450 ? "14px" : "18px";

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_ZnGFt3f2iYBAtIv4xyKVQoOr">
      <Router>
        <div className="page-container">
          <Route exact path="/" component={App} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/settings" component={Settings} />
          <Route path="/rockets" component={Rocket} />
          <Route path="/createRocket" component={CreateRocket} />
          <Route exact path="/classes" component={Classes} />
          <Route path="/createClass" component={CreateClass} />
          <Route path="/createEmail" component={SendEmail} />
          <Elements>
            <Route
              path="/billing"
              render={props => (
                <BillingForm {...props} fontSize={elementFontSize} />
              )}
            />
          </Elements>
          <Route path="/quiz2D/:className/:rocketName" component={Quiz2D} />
          <Route path="/quiz2W/:className/:rocketName" component={Quiz2W} />
          <Route path="/quiz2M/:className/:rocketName" component={Quiz2M} />
        </div>
      </Router>
    </StripeProvider>
  </Provider>,
  document.getElementById("root")
);

// keep as unregistered to work off of a port
serviceWorker.unregister();
