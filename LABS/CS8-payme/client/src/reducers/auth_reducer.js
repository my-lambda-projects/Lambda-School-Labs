import {
  AUTHENTICATION_ERROR,
  DE_AUTH, AUTH_SUCCESS, USER,
} from '../actions/auth';

// const initialState = {
//   message: '',
//   success: '',
//   invoices: [],
//   invoiceIdx: 0,
//   currentInvoice: '',
// };

const initialState = {
  admin: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER:
      return { ...state, admin: action.payload };
    case DE_AUTH:
      return { ...state, invoices: [] };
    case AUTHENTICATION_ERROR:
      return { ...state, message: action.payload };
    case AUTH_SUCCESS:
      return { ...state, success: action.payload };
    default:
      return state;
  }
}
