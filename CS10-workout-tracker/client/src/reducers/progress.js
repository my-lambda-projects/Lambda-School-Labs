import * as Actions from "../actions/actionDefinitions";

const initialState = {
  progressRecords: [],
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADDING_PROGRESS:
      return {
        ...state,
        message: action.payload
      };
    case Actions.ADD_PROGRESS_SUCCESS:
      return {
        ...state,
        message: "Progress submitted successfully!",
        progressRecords: [...state.progressRecords, action.payload]
      };
    case Actions.ADD_PROGRESS_FAILURE:
      return {
        ...state,
        message: "Progress submission failed..."
      };
    case Actions.FETCHING_PROGRESS:
      return {
        ...state,
        message: action.payload
      };
    case Actions.FETCH_PROGRESS_SUCCESS:
      return {
        ...state,
        progressRecords: action.payload,
        message: "Progress fetched successfully!"
      };
    case Actions.FETCH_PROGRESS_FAILURE:
      return {
        ...state,
        message: "Progress fetching failed..."
      };
    case Actions.DELETE_PROGRESS:
      return {
        ...state,
        progressRecords: state.progressRecords.filter(record => {
          return record._id !== action.payload;
        })
      };
    case Actions.UPDATING_PROGRESS:
      return {
        ...state,
        message: action.payload
      };
    case Actions.UPDATE_PROGRESS_SUCCESS:
      return {
        ...state,
        message: "Progress updated successfully!",
        progressRecords: state.progressRecords.map(
          record =>
            record._id === action.payload._id ? action.payload : record
        )
      };
    case Actions.UPDATE_PROGRESS_FAILURE:
      return {
        ...state,
        message: "Progress updating failed..."
      };
    default:
      return state;
  }
};
