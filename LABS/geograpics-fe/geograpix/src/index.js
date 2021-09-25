import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import reducer from './store/reducers';
import './scss/index.scss';
import App from './App';

Sentry.init({dsn: "https://3b2ee787f89b4257bc12a2abe6c13737@sentry.io/1730029"});

const store = createStore(reducer, applyMiddleware(logger, thunk))
// const store = createStore(reducer, applyMiddleware(thunk))

/**
 *  Setup router and redux store for the App
 */

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>, 
    document.getElementById('root')
);

