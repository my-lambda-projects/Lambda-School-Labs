import { GET_EVENT } from '../actions';

export default (event = {}, action) => {
  switch (action.type) {
    case GET_EVENT:
      return action.payload;
    default:
      return event;
  }
};
