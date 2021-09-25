import * as actionType from "./actionType";
const intialState = {
  FETCHING_UPDATE_PROFILE: false,
  FETCHING_GET_PROFILE: false,
  user: null,
  error: null
};
export default (reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionType.FETCHING_GET_PROFILE:
      return { ...state, FETCHING_GET_PROFILE: true, user: action.user };
    case actionType.GET_PROFILE:
      return { ...state, FETCHING_GET_PROFILE: false, user: action.user };
    case actionType.FETCHING_UPDATE_PROFILE:
      return { ...state, FETCHING_UPDATE_PROFILE: true };
    case actionType.UPDATE_PROFILE:
      return { ...state, FETCHING_UPDATE_PROFILE: false };
    case actionType.UPDATE_PROFILE_IMG:
      return { ...state, FETCHING_UPDATE_PROFILE: false };
    case actionType.UPDATE_PROFILE_PASSWORD:
      return { ...state, FETCHING_UPDATE_PROFILE: false };
    case actionType.ERROR_UPDATE_PROFILE:
      return {
        ...state,
        FETCHING_UPDATE_PROFILE: false,
        error: action.error
      };
    default:
      return { ...state };
  }
});
