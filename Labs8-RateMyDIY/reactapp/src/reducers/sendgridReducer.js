import { SEND_EMAIL, SEND_EMAIL_SUCCESS, SEND_EMAIL_ERROR } from "../actions";

const initialState = { to: "", sendingEmail: false, error: "" };

const sendgridReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_EMAIL:
      return { ...state, sendingEmail: true };
    case SEND_EMAIL_SUCCESS:
      return { ...state, sendingEmail: false };
    case SEND_EMAIL_ERROR:
      return { ...state, error: `${action.payload}` };
    default:
      return state;
  }
};

export default sendgridReducer;
