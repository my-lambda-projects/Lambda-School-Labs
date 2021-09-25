import { ADD_TIMESTAMP } from '../action/invoiceActions';
import { LOGOUT } from '../action/userActions';

const initialState = {
  timestamps: []
};

export const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TIMESTAMP:
      return {
        ...state,
        timestamps: [...state.timestamps, action.payload]
      };
    case LOGOUT:
      return {
        timestamps: []
      };
    default:
      return state;
  }
};
