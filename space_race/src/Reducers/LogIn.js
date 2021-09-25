import {
  LOGGINGIN,
  LOGGEDIN,
  ERROR,
  SIGNINGUP,
  SIGNEDOUT,
  SIGNINGOUT
} from "../Actions/LogIn";

const initialState = {
  loggedIn: false,
  loggingIn: false,
  signingUp: false,
  user: null,
  error: null,
  signingOut: false,
  signedOut: false
};

const LogInReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGINGIN:
      return { ...state, loggingIn: true };
    case LOGGEDIN:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        signingUp: false,
        user: action.payload
      };
    case SIGNINGUP:
      return { ...state, signingUp: true };
    case SIGNINGOUT:
      return {...state, signingOut: true};
    case SIGNEDOUT:
      return {...state, signedOut: true, loggedIn: false, signingOut: false};
    case ERROR:
      return { ...state, loggingIn: false, error: action.payload };
    default:
      return state;
  }
};

export default LogInReducer;
