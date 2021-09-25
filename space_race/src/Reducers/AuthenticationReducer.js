import {
    LOGGINGIN,
    USER_AUTHENTICATED,
    USER_UNAUTHENTICATED,
    AUTHENTICATION_ERROR,
    CHECK_IF_AUTHENTICATED,
  } from '../Actions';
  
  export default (auth = {}, action, state) => {
    switch (action.type) {
      case LOGGINGIN:
      return {...state, loggingIn: true}
      case USER_AUTHENTICATED:
        return { ...auth, authenticated: action.payload.authenticated, access_token:action.payload.access_token, registered:action.payload.registered};
      case USER_UNAUTHENTICATED:
        return { ...auth, authenticated: false };
      case AUTHENTICATION_ERROR:
        return { ...auth, error: action.payload };
      case CHECK_IF_AUTHENTICATED:
        return { ...auth };
      default:
        return auth;
    }
  };