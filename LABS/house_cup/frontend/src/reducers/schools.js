import {
  ADDSCHOOL,
  GETSCHOOLS,
  SEARCHSCHOOLS,
} from '../actions/index';

const schoolsReducer = (schools = [], action) => {
  switch (action.type) {
    // When user is created send signedUpusername in props so that username field
    // can be auto populate at first instance of signin
    case ADDSCHOOL:
      return [...schools, action.payload.data];
    case GETSCHOOLS:
      return [...action.payload.data];
    case SEARCHSCHOOLS:
      return [...action.payload.data];
    default:
      return schools;
  }
};

export default schoolsReducer;
