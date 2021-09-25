import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import "./styles/index.css";
import "semantic-ui-css/semantic.min.css";
import "react-dates/lib/css/_datepicker.css";

import { Provider } from "react-redux";
import configureStore from "./store/store.js";
import { Elements, StripeProvider } from "react-stripe-elements";
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="REACT_APP_publishable">
      <Elements>
        <App />
      </Elements>
    </StripeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
