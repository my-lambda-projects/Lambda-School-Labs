import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { timestampReducer } from './timestampReducer';
import { invoiceReducer } from './invoiceReducer';

const rootReducer = combineReducers({
  userReducer,
  timestampReducer,
  invoiceReducer
});

export default rootReducer;
