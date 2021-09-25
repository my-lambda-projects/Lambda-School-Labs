import * as actionType from "./actionType";
import Api from "../../../api";
import { toast } from "react-toastify";

const userImgUpdateHandler = currentUser => ({
  type: "UPDATE__USER",
  currentUser
});

const profileErrorHandler = error => ({
  type: actionType.ERROR_UPDATE_PROFILE,
  error
});

export const updateProfileImg = (userType, userId, data) => dispatch => {
  dispatch({ type: actionType.UPDATE_PROFILE_IMG });
  Api.endpoints
    .updateUser(userType, userId, data)
    .then(result => {
      toast.success("Image updated");
      dispatch(userImgUpdateHandler(result.data));
    })
    .catch(error => {
      toast.error("Image update fail");
      error.response
        ? dispatch(profileErrorHandler(error.response.data))
        : dispatch(profileErrorHandler(error));
    });
};
