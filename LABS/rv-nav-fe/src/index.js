import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./store/reducers/index";
import { BrowserRouter as Router } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";

//Sentry.io
import * as Sentry from "@sentry/browser";
Sentry.init({
  dsn: "https://760fe88e7d52460ab26a32f284a54343@sentry.io/1538830"
});

require("dotenv").config();

function saveToLocalStorage(state){
  try{
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state", serializedState)
  }catch(e){
    console.log(e)
  }
};

function loadFromLocalStorage(){
  try{
    const serializedState = localStorage.getItem("state")
    if(serializedState === null) return undefined
    return JSON.parse(serializedState)
  }catch(e){
    console.log(e)
    return undefined
  }
};

// console.log(JSON.stringify(this.state))
// console.log(JSON.parse(JSON.stringify(this.state)))
const persistedState = loadFromLocalStorage()
export const store = createStore(
  
  reducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);
console.log("state in index",store.getState())
console.log("stringified state",JSON.stringify(store.getState()))
console.log("pared state",JSON.parse(JSON.stringify(store.getState())))

store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
