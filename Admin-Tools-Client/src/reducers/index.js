import { combineReducers } from 'redux';

import {
  FETCH_PRS,
  PR_ERROR,
  DELETE_PR,
  CLEAR_PRS,
  RETURN_REM_STATE,
} from '../actions';


const prReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRS:
      return action.payload;
    default:
      return state;
  }
};

const prRemoveReducer = (state = false, action) => {
  switch (action.type) {
    case DELETE_PR:
      return true;
    case CLEAR_PRS:
      return true;
    case RETURN_REM_STATE:
      return false;
    default:
      return state;
  }
};

const prErrorReducer = (state = false, action) => {
  switch (action.type) {
    case PR_ERROR:
      return action.hasError;
    default:
      return state;
  }
};

export default combineReducers({ prs: prReducer,
  prRemoved: prRemoveReducer,
  prError: prErrorReducer,
});

