import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import round from './round';
import game from './game';
import settings from './settings';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  round,
  settings,
  game,
});

export default rootReducer;