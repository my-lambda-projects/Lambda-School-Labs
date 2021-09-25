import * as Actions from "../actions/actionDefinitions";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_VAL_ERRORS:
      return action.payload;
    case Actions.CLEAR_VAL_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
