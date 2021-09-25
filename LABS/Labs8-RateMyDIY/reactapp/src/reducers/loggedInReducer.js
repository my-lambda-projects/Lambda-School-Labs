import {
	GETTING_USER_INFO,
	GOT_USER_INFO,
	GET_USER_INFO_ERROR
} from '../actions';

const initialState = {
	userInfo: {},
	gettingUserInfo: false,
	gettingUserInfoError: null,
	loggedIn: false
};

const loggedInReducer = (state = initialState, action) => {
	switch (action.type) {
		// get userInfo
		case GETTING_USER_INFO:
			return { ...state, gettingUserInfo: true };

		case GOT_USER_INFO:
			return {
				...state,
				userInfo: action.payload,
				gettingUserInfo: false
			};

		case GET_USER_INFO_ERROR:
			return {
				...state,
				gettingUserInfo: false,
				gettingUserInfoError: `${action.payload}`
			};

		default:
			return state;
	}
};

export default loggedInReducer;
