import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { firebase } from './firebase/firebase';
import { Provider } from 'react-redux';
import RootReducer from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore, applyMiddleware, compose  } from 'redux';
import { logout, login } from './actions/auth';


import createHistory from 'history/createBrowserHistory';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));
const history = createHistory();

const jsx = (
  <Router history= {history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
); 
//ReactDOM.render(jsx, document.getElementById('root'));

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// tests if auth firebase function is being called
firebase.auth().onAuthStateChanged(user => {
  let visted= false;
  console.log("visited:", visted);
  if (user) {
    //console.log('uId:', user.uid);
    store.dispatch(login(user.uid));
    renderApp();    
    if(history.location.pathname ==='/' && visted===false) {
      history.push('/home');
      visted= true;
      console.log("visited:", visted);
    }
    console.log(user, 'logged in');
  } else if (user===null) {
    store.dispatch(logout());
    renderApp();
    history.push('/')        
    console.log('logged out');
  }
});
