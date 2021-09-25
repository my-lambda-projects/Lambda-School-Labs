// import all action types
import * as action from "./actionTypes";
import { addErrorHandler } from "./error";
import * as actionType from "../../forms/store/actionType";
import Api from "../../../api";
import { toast } from "react-toastify";
const signUpHandler = data => ({
  type: action.SIGNUP__USER,
  data
});
const loginHandler = data => ({
  type: action.LOGIN__USER,
  data
});
const updateUserHandler = currentUser => ({
  type: action.UPDATE__USER,
  currentUser
});

const getProfileHandler = user => ({
  type: actionType.GET_PROFILE,
  user
});

export const getProfile = () => dispatch => {
  dispatch({ type: actionType.FETCHING_GET_PROFILE });
  Api.endpoints
    .me()
    .then(result => {
      dispatch(getProfileHandler(result.data));
    })
    .catch(error => {
      error.response
        ? dispatch(addErrorHandler(error.response.data))
        : dispatch(addErrorHandler(error));
    });
};

export const logOut = () => ({
  type: action.LOGOUT__USER
});
export const signUpUser = (userType, data) => {
  return function(dispatch) {
    dispatch({ type: action.FETCHING });

    Api.endpoints
      .signUp(userType, data)
      .then(result => {
        toast.success("Welcome");
        dispatch(signUpHandler(result.data));
      })
      .catch(error => {
        toast.error("Signup failed, Please try again!");
        error.response
          ? dispatch(addErrorHandler(error.response.data))
          : dispatch(addErrorHandler(error.message));
      });
  };
};

export const login = data => {
  return function(dispatch) {
    dispatch({ type: action.FETCHING });

    Api.endpoints
      .signIn(data)
      .then(result => {
        toast.success(`Welcome  back ${result.data.profile.first_name}`);
        dispatch(loginHandler(result.data));
      })
      .catch(error => {
        toast.error("login failed, Please try again!");
        error.response
          ? dispatch(addErrorHandler(error.response.data))
          : dispatch(addErrorHandler(error.message));
      });
  };
};

export const updateUser = (userType, userId, data) => {
  return function(dispatch) {
    dispatch({ type: action.FETCHING });
    Api.endpoints
      .updateUser(userType, userId, data)
      .then(result => {
        toast.success("Profile updated");
        dispatch(updateUserHandler(result.data));
      })
      .catch(error => {
        toast.error("updateUser failed!");
        error.response
          ? dispatch(addErrorHandler(error.response.data))
          : dispatch(addErrorHandler(error.message));
      });
  };
};
