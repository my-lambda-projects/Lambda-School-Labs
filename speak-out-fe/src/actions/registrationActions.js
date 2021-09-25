import axios from 'axios';
import API_URL from '../config/apiUrl';

export const FAMILY_REGISTER_START = 'FAMILY_REGISTER_START';
export const FAMILY_REGISTER_SUCCESS = 'FAMILY_REGISTER_SUCCESS';
export const FAMILY_REGISTER_FAILURE = 'FAMILY_REGISTER_FAILURE';
export const familyRegister = (register, history) => {
	return dispatch => {
		dispatch({ type: FAMILY_REGISTER_START });
		axios
			.post(`${API_URL}/api/auth/register`, register)
			.then(res => {
				dispatch({ type: FAMILY_REGISTER_SUCCESS, payload: res.data });
				history.push('/login');
			})
			.catch(err => {
				dispatch({ type: FAMILY_REGISTER_FAILURE, payload: err });
			});
	};
};
