export const UPDATE_LOGIN_TRUE = "UPDATE_LOGIN_TRUE";
export const UPDATE_LOGIN_FALSE = "UPDATE_LOGIN_FALSE";

export const updateIsLoggedInTrue = () => {
  return dispatch => {
    dispatch({ type: UPDATE_LOGIN_TRUE });
  };
};

export const updateIsLoggedInFalse = () => {
  return dispatch => {
    dispatch({ type: UPDATE_LOGIN_FALSE });
  };
};
