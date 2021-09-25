import { combineReducers } from 'redux';
import { recipesReducer } from './recipesReducer';
import { usersReducer } from './usersReducer';
import { paymentReducer } from './paymentReducer';
import { nutritionReducer } from './nutritionReducer';

export default combineReducers({
  recipesReducer,
  usersReducer,
  paymentReducer,
  nutritionReducer
});
