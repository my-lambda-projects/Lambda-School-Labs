import * as actionType from "./actionType";

const initialState = {
  MATCHES_REQUEST: false,
  MATCHES_SUCCESS: false,
  MATCHES_ERROR: null,
  matches: [],
  error: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCHING_MATCHES:
      return { ...state, MATCHES_REQUEST: true };
    case actionType.FETCHING_MATCHES_SUCCESS:
      return { ...state, MATCHES_SUCCESS: true, MATCHES_REQUEST: false };
    case actionType.FETCHING_MATCHES_JOBS:
      return { ...state, matches: action.data };
    case actionType.FETCHING_MATCHES_ERROR:
      return { ...state, error: action.error, MATCHES_REQUEST: false };
    default:
      return { ...state };
  }
};
