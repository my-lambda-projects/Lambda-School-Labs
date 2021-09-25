import {
	GETTING_PROJECT,
	GOT_PROJECT,
	GET_PROJECT_ERROR,
	ADDING_PROJECT,
	ADDED_PROJECT,
	ADD_PROJECT_ERROR,
	UPDATING_PROJECT,
	UPDATED_PROJECT,
	UPDATE_PROJECT_ERROR,
	DELETING_PROJECT,
	DELETED_PROJECT,
	DELETE_PROJECT_ERROR,
	UPDATING_PROJECT_IMAGE,
	UPDATED_PROJECT_IMAGE,
	UPDATE_PROJECT_IMAGE_ERROR,
	GETTING_PROJECT_REVIEWS,
	GOT_PROJECT_REVIEWS,
	GET_PROJECT_REVIEWS_ERROR,
	LIKED_PROJECT_REVIEW
} from '../actions';

const initialState = {
	project: {},
	reviews: []

	// gettingProjects: false,
	// gettingProjectsError: null,

	// gettingProject: false,
	// gettingProjectError: null,

	// addingProject: false,
	// addingProjectError: null,

	// updatingProject: false,
	// updatingProjectError: null,

	// deletingProject: false,
	// DeletingProjectError: null,

	// redirect: null
};

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		// getProject
		case GETTING_PROJECT:
			return { ...state, gettingProject: true };

		case GOT_PROJECT:
			return {
				...state,
				project: action.payload,
				gettingProject: false
			};

		case GET_PROJECT_ERROR:
			return {
				...state,
				gettingProject: false,
				gettingProjectError: `${action.payload}`
			};

		// addProject
		case ADDING_PROJECT:
			return { ...state, addingProject: true };

		case ADDED_PROJECT:
			return {
				...state,
				addingProject: false
			};

		case ADD_PROJECT_ERROR:
			return {
				...state,
				addingProject: false,
				addingProjectError: `${action.payload}`
			};

		// updateProject
		case UPDATING_PROJECT:
			return { ...state, updatingProject: true };

		case UPDATED_PROJECT:
			return {
				...state,
				updatingProject: false
			};

		case UPDATE_PROJECT_ERROR:
			return {
				...state,
				updatingProject: false,
				updatingProjectError: `${action.payload}`
			};

		// deleteProject
		case DELETING_PROJECT:
			return { ...state, deletingProject: true };

		case DELETED_PROJECT:
			return {
				...state,
				deletingProject: false
			};

		case DELETE_PROJECT_ERROR:
			return {
				...state,
				deletingProject: false,
				DeletingProjectError: `${action.payload}`
			};

		// updateProjectImage
		case UPDATING_PROJECT_IMAGE:
			return { ...state, updatingProjectImage: true };

		case UPDATED_PROJECT_IMAGE:
			return {
				...state,
				updatingProjectImage: false
			};

		case UPDATE_PROJECT_IMAGE_ERROR:
			return {
				...state,
				updatingProjectImage: false,
				updatingProjectImageError: `${action.payload}`
			};

		// getProjectReviews
		case GETTING_PROJECT_REVIEWS:
			return { ...state, gettingProjectReviews: true };

		case GOT_PROJECT_REVIEWS:
			return {
				...state,
				reviews: action.payload,
				gettingProjectReviews: false
			};

		case GET_PROJECT_REVIEWS_ERROR:
			return {
				...state,
				gettingProjectReviews: false,
				gettingProjectReviewsError: `${action.payload}`
			};

		case LIKED_PROJECT_REVIEW:
			return {
				...state,
				reviews: state.reviews[0]
					? state.reviews.map(review =>
						review.review_id === action.payload.review_id
							? { ...review, like: action.payload.like }
							: review
					)
					: []
			};

		default:
			return state;
	}
};

export default projectReducer;
