import Api from "../../../api";
import { toast } from "react-toastify";
export const GET_RANDOM = "GET_RANDOM";
export const VIEW_SUCCESS = "VIEW_SUCCESS";
export const VIEW_ERROR = "VIEW_ERROR";

const getRandomHandler = user => ({
  type: "GET_RANDOM_USER_SUCCESS",
  user
});

const geterrorHandler = error => ({
  type: "GET_RANDOM_USER_FAIL",
  error
});

export const getRandomUser = userType => dispatch => {
  dispatch({ type: "GET_RANDOM_USER" });

  Api.endpoints
    .random(userType)
    .then(result => {
      dispatch(getRandomHandler(result.data));
    })
    .catch(error => {
      toast.error("Random user fetch failed, Please try again");
      error.response
        ? dispatch(geterrorHandler(error.response.data))
        : dispatch(geterrorHandler(error.message));
    });
};
export const postSuperAction = data => dispatch => {
  dispatch({ type: "POST_SUPER_ACTION" });
  Api.endpoints
    .postMatches(data)
    .then(() => {
      dispatch({ type: VIEW_SUCCESS });
    })
    .catch(error => {
      toast.error("Post match action failed");
      dispatch({ type: VIEW_ERROR });
      error.response
        ? dispatch({ type: "GET_RANDOM_USER_FAIL", error: error.response.data })
        : dispatch({ type: "GET_RANDOM_USER_FAIL", error: error.message });
    });
};
