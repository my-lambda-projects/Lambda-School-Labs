import * as Actions from "../actions/actionDefinitions";

const initialState = {
  authed: false,
  message: "Welcome to the app!",
  currentUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.REGISTERING:
      return {
        ...state,
        message: action.payload
      };
    case Actions.REGISTER_SUCCESS:
      return {
        ...state,
        authed: true,
        message: "Registered successfully!",
        currentUser: action.payload.data
      };
    case Actions.REGISTER_FAILURE:
      return {
        ...state,
        message: "Registration failed..."
      };
    case Actions.LOGGING_IN:
      return {
        ...state,
        message: action.payload
      };
    case Actions.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        authed: true,
        message: "Logged in successfully!",
        currentUser: action.payload.data
      };
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        message: "Log-in failed..."
      };
    case Actions.LOGOUT:
      return {
        ...state,
        authed: false,
        message: "Logged out successfully!",
        currentUser: null,
        valError: {}
      };
    default:
      return state;
  }
};
