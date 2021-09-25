import * as actionTypes from '../actions/index';

const initialState = {
  autoComIng: null,
  nutrition: null,
  error: null
};

export const nutritionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NUTRITION:
      return { ...state, nutrition: action.payload };
    case actionTypes.REMOVE_NUTRITION:
      return { ...state, nutrition: action.payload };
    case actionTypes.AUTOCOM_ING:
      return { ...state, autoComIng: action.payload };
    case actionTypes.RESET_AUTOCOM:
      return { ...state, autoComIng: action.payload };
    default:
      return state;
  }
};
