import { REFRESH_USER, CHARGE_SUCCESS, SIGNIN_SUCCESS } from '../actions';

const intialState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  nicknames: '',
  credits: 0,
}

export default (state = intialState, action) => {
  switch(action.type) {
    case CHARGE_SUCCESS:
      return { ...state, credits: action.payload.credits };
    case SIGNIN_SUCCESS:
      return { ...state, ...action.payload };
    case REFRESH_USER:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
