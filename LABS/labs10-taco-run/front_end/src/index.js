import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer.js';
import config from './firebase.js'
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { createStore, applyMiddleware, compose } from 'redux';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
}

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
)


const store = createStore(rootReducer, 
	compose(
		applyMiddleware(
			thunk.withExtraArgument({getFirebase})
		),
		reactReduxFirebase(config, { useFirebaseForProfile: true, userProfile: 'users', attachAuthIsReady: true })
	)
)
store.firebaseAuthIsReady.then(() => {
   ReactDOM.render(
	   <Provider store={store}><Router><Root /></Router></Provider>
	   , document.getElementById('root'));
});
