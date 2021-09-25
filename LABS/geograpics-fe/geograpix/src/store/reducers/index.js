import { combineReducers } from 'redux';

import { maps } from './map';
import { register } from './registration';

export default combineReducers({
  maps,
  register
});