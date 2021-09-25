import {
  REGISTERING,
  SIGNING_IN,
  ERROR,
  FETCHED,
  FORGOT_PASSWORD,
  WELCOME_EMAIL
} from "../../actions/authActions";

const initialState = {
  registering: false,
  signing_in: false,
  loggedIn: false,
  forgot_password: false,
  fetched: false,
  message: "",
  user: {},
  token: ""
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTERING:
      return Object.assign({}, state, {
        registering: true,
        signing_in: false,
        loggedIn: false,
        forgot_password: false,
        fetched: false,
        message: action.payload,
        user: {},
        token: ""
      });
    case SIGNING_IN:
      return Object.assign({}, state, {
        registering: false,
        signing_in: true,
        loggedIn: false,
        forgot_password: false,
        fetched: false,
        message: action.payload,
        user: {},
        token: ""
      });
    case FORGOT_PASSWORD:
      return Object.assign({}, state, {
        registering: false,
        signing_in: false,
        forgot_password: true,
        loggedIn: false,
        fetched: false,
        message: action.payload,
        user: {},
        token: ""
      });
    case ERROR:
      return Object.assign({}, state, {
        registering: false,
        signing_in: false,
        loggedIn: false,
        forgot_password: false,
        fetched: false,
        message: action.payload,
        user: {},
        token: ""
      });
    case FETCHED:
      return Object.assign({}, state, {
        registering: false,
        signing_in: false,
        loggedIn: false,
        forgot_password: false,
        fetched: true,
        message: action.payload.message,
        user: action.payload.user,
        token: ""
      });
    case WELCOME_EMAIL:
      return Object.assign({}, state, {
        registering: false,
        signing_in: false,
        loggedIn: false,
        forgot_password: false,
        fetched: true,
        message: action.payload,
        user: "",
        token: ""
      });
    default:
      return state;
  }
};
