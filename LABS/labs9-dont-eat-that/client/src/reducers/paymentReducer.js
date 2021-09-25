import * as actionTypes from '../actions';

const initialState = {
  paymentComplete: false,
  plan: '',
  error: null
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHARGE_USER:
      return { ...state, paymentComplete: true, plan: action.payload };
    case actionTypes.CANCEL_SUB:
      return {
        ...state,
        subscriptionCanceled: action.payload,
        paymentComplete: false
      };
    case actionTypes.GET_PLAN:
      return { ...state, plan: action.payload };
    case actionTypes.ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
