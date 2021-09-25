import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/index';

const initialState = {
  error: null,
  user: [],
  isRegistering: false
}

export const register = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_START:
      return {
        ...state,
        error: null,
        isRegistering: true,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isRegistering: false
      }
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        isRegistering: false
      }
    default:
      return state;
  }
}