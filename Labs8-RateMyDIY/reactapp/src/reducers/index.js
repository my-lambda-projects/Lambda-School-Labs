import { combineReducers } from 'redux';
import loggedInReducer from './loggedInReducer';
import landingPageReducer from './landingPageReducer';
import projectReducer from './projectReducer';
import postReducer from './postReducer';
import reviewReducer from './reviewReducer';
import searchReducer from './searchReducer';
import settingsReducer from './settingsReducer';
import sendgridReducer from './sendgridReducer';
import myProjectReducer from './myProjectReducer';

export default combineReducers({
	loggedInReducer,
	landingPageReducer,
	projectReducer,
	postReducer,
	reviewReducer,
	searchReducer,
	settingsReducer,
	sendgridReducer,
	myProjectReducer
});
