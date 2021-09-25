import {
  FETCH_MYPROJECT,
  FETCH_MYPROJECT_SUCCESS,
  FETCH_MYPROJECT_ERROR,
  FETCH_MYREVIEWS,
  FETCH_MYREVIEWS_SUCCESS,
  FETCH_MYREVIEWS_ERROR
} from "../actions";

const initialState = {
  myProjects: [],
  // myReviews: [],
  error: null
};

const myProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    // example action
    case FETCH_MYPROJECT:
      return { ...state };
    case FETCH_MYPROJECT_SUCCESS:
      return { ...state, myProjects: action.payload };
    case FETCH_MYPROJECT_ERROR:
      return { ...state, error: "Error fetching data" };
    case FETCH_MYREVIEWS:
      return { ...state };
    case FETCH_MYREVIEWS_SUCCESS:
      return { ...state, myReviews: action.payload };
    case FETCH_MYREVIEWS_ERROR:
      return { ...state, error: "Error fetching data" };

    default:
      return state;
  }
};

export default myProjectReducer;
