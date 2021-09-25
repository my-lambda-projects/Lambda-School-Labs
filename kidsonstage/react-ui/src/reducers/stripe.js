import { SET_STRIPE_ERROR, CLEAR_STRIPE_ERROR } from '../actions';

export default (stripeError = null, action) => {
  switch (action.type) {
    case SET_STRIPE_ERROR:
      return action.payload;
    case CLEAR_STRIPE_ERROR:
      return null;
    default:
      return stripeError;
  }
};
