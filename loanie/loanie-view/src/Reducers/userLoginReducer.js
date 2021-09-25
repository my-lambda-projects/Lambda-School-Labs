import { 
	GET_USER_LOGIN_DETAILS,
 } from '../Actions';

export default function userLoginReducer(state = '', action) {
  console.log("action.type in userLoginReducer: ", action.type);
  switch (action.type) {
    case GET_USER_LOGIN_DETAILS:
    	console.log("action.payload when ", action.type, ": ", action.payload);
    	let userLoginDetails = action.userLoginDetails;
    	userLoginDetails.userId = action.payload.data;
    	console.log("userLoginDetails from reducer: ", userLoginDetails);
    	return userLoginDetails;

    default:
      return state;
  }
}
