import axios from 'axios';

axios.defaults.withCredentials = true;

// get userInfo
export const GETTING_USER_INFO = 'GETTING_USER_INFO';
export const GOT_USER_INFO = 'GOT_USER_INFO';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';

/*
 * Takes in nextAction and args as parameter. Retrieves user info from backend
 */
export const loggedIn = (nextAction, args) => {
	return dispatch => {
		dispatch({ type: GETTING_USER_INFO });

		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/loggedIn`
			)

			.then(({ data }) => {
				dispatch({ type: GOT_USER_INFO, payload: data });
				return data;
			})
			.then(userInfo => {
				if (nextAction) {
					dispatch(nextAction(userInfo.user_id, args));
				}
			})

			.catch(error => dispatch({ type: GET_USER_INFO_ERROR, payload: error }));
	};
};
