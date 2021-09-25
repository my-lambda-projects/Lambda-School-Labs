
const intialState = {
    FETCHING_GET_PROFILE: false,
	data: null
};
export default (state = intialState, action) => {
	switch (action.type) {
        case "GET_RANDOM_USER":
            return {...state, FETCHING_GET_PROFILE: true};
		case "GET_RANDOM":
			return {...state, FETCHING_GET_PROFILE: false, data: action.user};
		default:
			return { ...state };
	}
};
