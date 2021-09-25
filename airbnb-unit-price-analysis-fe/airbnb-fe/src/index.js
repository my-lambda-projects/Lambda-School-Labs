import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "./react-auth0-wrapper";
import config from "./auth_config.json";
import {applyMiddleware, createStore, compose} from 'redux';
import { Provider } from "react-redux";
import { reducer } from "./store/reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
import "./index.css";

// import "bootstrap/dist/css/bootstrap.min.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, logger)));

// const store = createStore(reducer, applyMiddleware(thunk));

// A function that routes the user to the right place after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    audience={config.audience}
    onRedirectCallback={onRedirectCallback}
>
<Provider store={store}>
      <App />
  </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);
