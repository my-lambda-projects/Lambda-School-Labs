import * as actionType from "./actionType";
import Api from "../../../api";
import { toast } from "react-toastify";

const errorHandler = error => ({
  type: actionType.JOB_REQUEST_ERROR,
  error
});
const getJobHandler = data => ({
  type: actionType.JOBS,
  data
});
export const getMyJobs = () => dispatch => {
  dispatch({ type: actionType.JOB_REQUEST });

  Api.endpoints
    .jobs()
    .then(result => {
      dispatch({ type: actionType.JOB_REQUEST_SUCCESS });
      dispatch(getJobHandler(result.data));
    })
    .catch(error => {
      toast.error("get jobs failed");
      error.response
        ? dispatch(errorHandler(error.response.data))
        : dispatch(errorHandler(error.message));
    });
};
