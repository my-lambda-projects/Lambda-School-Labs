// imports go here

// All variables go here
export const REGISTERING = "REGISTERING";
export const SIGNING_IN = "SIGNING_IN";
export const FETCHED = "FETCHED";
export const ERROR = "ERROR";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const WELCOME_EMAIL = "WELCOME_EMAIL";

export const authUser = user => {
  return dispatch => {
    /*
      dispatch an event immediately to let user know we are doing something
      after they submit sigin form
    */
    dispatch({ type: SIGNING_IN, payload: "Authenticating User..." });

    /*
      axios statement to connect to server will go here
      - the success/error created here will be visible to client through snackbar popups
      - FETCHED when success
      - ERROR when error
      - Payload will contain a user object and a message to be accessed by reducer
     */
  };
};

export const registerUser = user => {
  return dispatch => {
    /*
      dispatch an event immediately to let user know we are doing something
      after they submit register form
    */
    dispatch({ type: REGISTERING, payload: "Creating New User Account..." });
    dispatch({ type: WELCOME_EMAIL, payload: user });
    /*
      axios statement to connect to server will go here
      - the success/error created here will be visible to client through snackbar popups
      - FETCHED when success
      - ERROR when error
      - Payload will contain a user object and a message to be accessed by reducer
     */
  };
};

export const passwordReset = email => {
  return dispatch => {
    /*
      dispatch an event immediately to let user know we are doing something
      after they submit password reset form
    */
    dispatch({
      type: FORGOT_PASSWORD,
      payload: "Reset Email being created..."
    });

    /*
      axios statement to connect to server will go here
      - the success/error created here will be visible to client through snackbar popups
      - FETCHED when success
      - ERROR when error
      - Payload will contain an object from external API and a message to be accessed by reducer
     */
  };
};
