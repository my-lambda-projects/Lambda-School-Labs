import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import CardsReducer from './cardsReducer';
import CardReducer from './cardReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  cards: CardsReducer,
  card: CardReducer,
  router: routerReducer,
});

export default rootReducer;
