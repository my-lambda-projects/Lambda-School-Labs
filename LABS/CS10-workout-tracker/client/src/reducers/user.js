import * as Actions from "../actions/actionDefinitions";

const initialState = {
  message: "",
  premiumUser: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.SENDING_RECOVERY_EMAIL:
      return {
        ...state,
        message: action.payload
      };
    case Actions.SEND_EMAIL_SUCCESS:
      return {
        ...state,
        message: "Email sent successfully"
      };
    case Actions.SEND_EMAIL_FAILURE:
      return {
        ...state,
        message: "Email failed to send"
      };
    case Actions.RESETTING_PASSWORD:
      return {
        ...state,
        message: action.payload
      };
    case Actions.RESET_SUCCESS:
      return {
        ...state,
        message: "Password reset successfully"
      };
    case Actions.RESET_FAILURE:
      return {
        ...state,
        message: "Failed to reset password"
      };
    case Actions.CHANGING_EMAIL:
      return {
        ...state,
        message: action.payload
      };
    case Actions.CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        message: "Email changed successfully"
      };
    case Actions.CHANGE_EMAIL_FAILURE:
      return {
        ...state,
        message: "Failed to change email"
      };
    case Actions.CHANGING_PASSWORD:
      return {
        ...state,
        message: action.payload
      };
    case Actions.CHANGE_PW_SUCCESS:
      return {
        ...state,
        message: "Password changed successfully"
      };
    case Actions.CHANGE_PW_FAILURE:
      return {
        ...state,
        message: "Failed to change password"
      };
    case Actions.PROCESSING_PAYMENT:
      return {
        ...state,
        message: action.payload
      };
    case Actions.PAYMENT_SUCCESS:
      return {
        ...state,
        message: "Payment was successful",
        premiumUser: true
      };
    case Actions.PAYMENT_FAILURE:
      return {
        ...state,
        message: "Failed to process payment"
      };

    default:
      return state;
  }
};
