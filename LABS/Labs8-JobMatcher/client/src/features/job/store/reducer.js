import * as actionType from "./actionType";

const initialState = {
  JOB_REQUEST: false,
  JOB_SUCCESS: false,
  JOB_ERROR: null,
  jobs: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.JOB_REQUEST:
      return { ...state, JOB_REQUEST: true, JOB_ERROR: false };
    case actionType.JOB_REQUEST_SUCCESS:
      return {
        ...state,
        JOB_REQUEST: false,
        JOB_SUCCESS: true,
        JOB_ERROR: false
      };
    case actionType.JOBS:
      return {
        ...state,
        JOB_REQUEST: false,
        JOB_SUCCESS: true,
        jobs: action.data,
        JOB_ERROR: false
      };
    case actionType.JOB_REQUEST_ERROR:
      return {
        ...state,
        JOB_REQUEST: false,
        JOB_SUCCESS: false,
        error: action.error,
        JOB_ERROR: true
      };
    default:
      return { ...state };
  }
};
