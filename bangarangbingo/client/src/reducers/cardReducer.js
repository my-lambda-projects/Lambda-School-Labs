import { GET_CARD } from '../actions';

const defaultState = {
  card: {},
  id: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'REMOVE_CARD':
      return { ...defaultState };
    case 'SET_CARD':
      return { ...state, ...action.payload };
    case GET_CARD:
      return action.payload.data;
    default:
      return state;
  }
};
