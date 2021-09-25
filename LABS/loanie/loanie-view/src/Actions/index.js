import axios from 'axios';

export const GET_USER_LOGIN_DETAILS = 'GET_USER_LOGIN_DETAILS';
export const GET_MANAGER_LOANS = 'GET_MANAGER_LOANS';

export const getUserLoginDetails = (userLoginDetails) => {
	const getUserByEmailEndpoint = 'http://localhost:3030/userbyemail';
	console.log("sendind email: ", userLoginDetails.email);
	const getUserByEmailResponse = axios.post(getUserByEmailEndpoint, {"email": userLoginDetails.email});
	return {
	  type: GET_USER_LOGIN_DETAILS,
	  payload: getUserByEmailResponse,
	  userLoginDetails
	};
};

export const getManagerLoans = (managerId) => {
	const getManagerLoansEndpoint = 'http://localhost:3030/getmanagerloans';
	const getManagerLoansResponse = axios.post(getManagerLoansEndpoint, {"loanManagerId": managerId});
	return {
		type: GET_MANAGER_LOANS,
		payload: getManagerLoansResponse
	};
}
