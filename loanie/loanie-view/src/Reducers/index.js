import { combineReducers } from 'redux';
import userLoginReducer from './userLoginReducer';
import { loansReducer } from './loansReducer'

const rootReducer = combineReducers({
  userLoginDetails: userLoginReducer,
  loans: loansReducer,
});

export default rootReducer;
