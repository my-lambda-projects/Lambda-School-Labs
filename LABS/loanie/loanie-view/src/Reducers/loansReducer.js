import {
	GET_MANAGER_LOANS,
} from '../Actions';

export function loansReducer(state = [], action) {
  switch (action.type) {
    case GET_MANAGER_LOANS:
    	console.log("action.payload: ", action.payload);
      return action.payload.data;

    default:
      return state;
  }
}