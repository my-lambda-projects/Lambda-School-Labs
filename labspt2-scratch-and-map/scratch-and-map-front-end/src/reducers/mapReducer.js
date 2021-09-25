import { FETCHING, SUCCESS, ERROR, UPDATING } from "../actions/mapActions";

const initialState = {
  userData: [],
  userCountryData: [],
  loading: true,
  error: "",
  displayedUser: ""
};

export const getUserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return { ...state, loading: true };
    case SUCCESS:
      return {
        ...state,
        userData: action.payload,
        userCountryData: action.payload.user_countries,
        displayedUser: action.payload.fb_user_id,
        loading: false
      };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    case UPDATING:
      return { ...state, displayedUser: action.payload };
    default:
      return state;
  }
};
