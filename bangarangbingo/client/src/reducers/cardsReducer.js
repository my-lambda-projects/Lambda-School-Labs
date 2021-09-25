import { GET_CARDS, ADD_CARD, EDIT_CARD } from '../actions';

export default (cards = [], action) => {
  switch (action.type) {
    case GET_CARDS:
      return action.payload.data;
    case ADD_CARD:
      return action.payload.data;
    case EDIT_CARD:
      return action.payload.data;
    default:
      return cards;
  }
};
