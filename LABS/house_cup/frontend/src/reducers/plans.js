import {
  GETPLANS,
} from '../actions/index';

const plansReducer = (plans = [], action) => {
  switch (action.type) {
    case GETPLANS:
      return [...action.payload.data];
    default:
      return plans;
  }
};

export default plansReducer;
