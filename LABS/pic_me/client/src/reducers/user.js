import { GET_USER_INFO } from '../actions';

const initialState = {
	email: '',
	firstName: '',
	lastName: '',
	nickNames: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_INFO:
			const user = action.payload;

			return {
				...state,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				nickNames: user.nickNames.join(', ') || '',
				balance: user.balance,
			};

		default:
			return state;
	}
};
