import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Reducer } from './reducers'
import logger from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.min.css';
import thunk from 'redux-thunk';

// Redux Thunk:
// const store = createStore(Reducer, applyMiddleware(logger, thunk));
// ====== Redux Thunk ONLY

// Redux DevTools (https://github.com/zalmoxisus/redux-devtools-extension):
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// ====== END Redux DevTools

const store = createStore(Reducer, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);