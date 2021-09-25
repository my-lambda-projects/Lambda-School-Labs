// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// Middleware
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Reducers
import rootReducer from './reducers';
// Components
import { App } from './components';

import 'bootstrap/dist/css/bootstrap.min.css';
// Styles
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
