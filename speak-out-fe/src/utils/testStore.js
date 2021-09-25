import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { reducer } from '../reducers/index';

const createAStore = () => {
  const returnStore = createStore(reducer, applyMiddleware(thunk));
  return returnStore;
};
export default createAStore;
