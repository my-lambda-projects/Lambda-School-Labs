import {
  AUTHENTICATE_USER,
  UNAUTHENTICATE_USER,
} from '../actions/auth';

const defaultState = {
  authenticated: false,
  user: {
    id: '',
    email: '',
    subscriber: false,
  },
  token: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER: {
      const { user, token } = action.payload;
      return {
        ...state,
        authenticated: true,
        user,
        token,
      };
    }
    case UNAUTHENTICATE_USER: {
      return { ...defaultState };
    }
    default:
      return { ...state };
  }
};
