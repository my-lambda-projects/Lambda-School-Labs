import { UPDATE_LOGIN_TRUE } from "../actions/isLoggedInAction";
import { UPDATE_LOGIN_FALSE } from "../actions/isLoggedInAction";

const initialState = {
  isLoggedIn: false
};

export const updateLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN_TRUE:
      return { ...state, isLoggedIn: true };
    case UPDATE_LOGIN_FALSE:
      return {... state, isLoggedIn: false}
    default:
      return state;
  }
};

//Returning a true logged in while removing facebook
