import { combineReducers } from 'redux';
import AuthReducer from './authentication';
import PhotoReducer from './photo';
import UserReducer from './user';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
	auth: AuthReducer,
	form: FormReducer,
	photo: PhotoReducer,
	user: UserReducer,
});

export default rootReducer;
