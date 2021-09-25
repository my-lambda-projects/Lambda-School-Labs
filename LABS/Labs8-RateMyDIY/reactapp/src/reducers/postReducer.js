import {
	ADDING_POST,
	ADDED_POST,
	ADD_POST_ERROR,
	UPDATING_POST,
	UPDATED_POST,
	UPDATE_POST_ERROR,
	DELETING_POST,
	DELETED_POST,
	DELETE_POST_ERROR
} from '../actions';

const initialState = {
	post: {}

	// addingPost: false,
	// addingPostError: false,

	// updatingPost: false,
	// updatingPostError: false,

	// deletingPost: false,
	// deletingPostError: false
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		// addPost
		case ADDING_POST:
			return { ...state, addingPost: true };

		case ADDED_POST:
			return {
				...state,
				addingPost: false
			};

		case ADD_POST_ERROR:
			return {
				...state,
				addingPost: false,
				addingPostError: `${action.payload}`
			};

		// updatePost
		case UPDATING_POST:
			return { ...state, updatingPost: true };

		case UPDATED_POST:
			return {
				...state,
				updatingPost: false
			};

		case UPDATE_POST_ERROR:
			return {
				...state,
				updatingPost: false,
				updatingPostError: `${action.payload}`
			};

		// deletePost
		case DELETING_POST:
			return { ...state, deletingPost: true };

		case DELETED_POST:
			return {
				...state,
				deletingPost: false
			};

		case DELETE_POST_ERROR:
			return {
				...state,
				deletingPost: false,
				deletingPostError: `${action.payload}`
			};

		default:
			return state;
	}
};

export default postReducer;
