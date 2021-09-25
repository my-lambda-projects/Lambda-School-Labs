import { GET_USERS, GET_USER, EDIT_USER, CLEAR_USERS } from '../actions';

export default (users = [], action) => {
  switch (action.type) {
    case GET_USERS:
    case GET_USER:
    case EDIT_USER:
      return action.payload;
    case CLEAR_USERS:
      return [];
    default:
      return users;
  }
};
