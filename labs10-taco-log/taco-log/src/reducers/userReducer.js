import {
  GET_USER,
  CREATE_USER,
  ASSIGN_ACHIEVEMENT,
  UPDATE_STATS,
  DELETE_TACO,
  LOCATION_CHANGE,
  LOG_TACO,
  LOG_OUT,
  UPDATE_USER
} from "../actions";

const initialState = {
  user: [],
  location: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case CREATE_USER:
      return {
        ...state,
        user: action.payload
      };
    case ASSIGN_ACHIEVEMENT:
      return {
        ...state,
        user: action.payload
      };
    case UPDATE_STATS:
      return {
        ...state,
        user: action.payload
      };
    case DELETE_TACO:
      return {
        ...state,
        user: action.payload
      };
    case LOCATION_CHANGE:
      return {
        ...state,
        location: !state.location
      };
    case LOG_TACO:
      return {
        ...state,
        user: action.payload
      };
    case LOG_OUT:
      return {
        ...state,
        user: []
      };
    case UPDATE_USER:
      return {
        ...state
        // user: action.payload
      };
    default:
      return state;
  }
};
