import {
	//
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_ERROR,
	AUTH_LOGIN_FINISH,
	//
	AUTH_SIGNUP_START,
	AUTH_SIGNUP_SUCCESS,
	AUTH_SIGNUP_ERROR,
	AUTH_SIGNUP_FINISH,
	//
	AUTH_LOGOUT_START,
	AUTH_LOGOUT_SUCCESS,
	AUTH_ERROR_RESET,
	AUTH_LOGIN_START,

	//
	AUTH_RESET_ATTEMPTED,
	//
	AUTH_ERROR,
	FORGOTPASSWORD,
	RESETPASSWORD,
	CHANGE_SETTINGS_SUCCESS,
	CHANGE_SETTINGS_START,
	CHANGE_SETTINGS_ERROR,
	ACCOUNT_DELETE,
	//
	GET_USER_ERROR,
} from '../actions';

const initialState = {
	user: '',
	authenticated: false,
	error: '',
	message: '',
	attempted: false,
};

export default (auth = initialState, action) => {
	switch (action.type) {
		case AUTH_SIGNUP_START:
			return {
				...auth,
				authenticated: true,
			};

		case AUTH_SIGNUP_SUCCESS:
			return {
				...auth,
				user: action.payload,
				authenticated: true,
			};

		case AUTH_SIGNUP_ERROR:
			return {
				...auth,
				error: action.payload,
			};

		case AUTH_SIGNUP_FINISH:
			return {
				...auth,
				authenticated: true,
			};

		//

		case AUTH_LOGIN_START:
			return {
				...auth,
				authenticated: false,
			};
		case AUTH_LOGIN_SUCCESS:
			return {
				...auth,
				user: action.payload,
				authenticated: true,
				error: '',
			};

		case AUTH_LOGIN_ERROR:
			return {
				...auth,
				error: action.payload,
				authenticated: false,
				attempted: true,
			};

		case AUTH_LOGIN_FINISH:
			return {
				...auth,
				authenticated: true,
			};

		//
		case AUTH_LOGOUT_START:
			return {
				...auth,
				authenticated: false,
			};

		case AUTH_LOGOUT_SUCCESS:
			return {
				...auth,
				authenticated: false,
				user: '',
			};

		case AUTH_ERROR_RESET:
			return {
				...auth,
				error: '',
				message: '',
			};

		case AUTH_RESET_ATTEMPTED:
			return {
				...auth,
				attempted: false,
			};

		case AUTH_ERROR:
			return {
				...auth,
				error: action.payload,
			};

		case FORGOTPASSWORD:
			return {
				...auth,
				emailSent: true,
			};
		case RESETPASSWORD:
			return {
				...auth,
				resetPassword: true,
			};

		case CHANGE_SETTINGS_START:
			return {
				...auth,
				error: ``,
				message: ``,
				// authenticated: true
			};

		case CHANGE_SETTINGS_SUCCESS:
			return {
				...auth,
				authenticated: true,
				user: action.payload,
				message: action.message,
			};

		case CHANGE_SETTINGS_ERROR:
			return {
				...auth,
				error: action.payload,
			};

		case ACCOUNT_DELETE:
			return {
				...auth,
				authenticated: false,
				user: ``,
			};

		case GET_USER_ERROR:
			return {
				...auth,
				error: action.payload,
			};

		default:
			return auth;
	}
};
