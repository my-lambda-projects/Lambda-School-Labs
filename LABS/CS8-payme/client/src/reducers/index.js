import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import invoiceReducer from './invoice_reducer';
import smsReducer from './sms_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  invoice: invoiceReducer,
  form: formReducer,
  reminder: smsReducer,
});

export default rootReducer;
