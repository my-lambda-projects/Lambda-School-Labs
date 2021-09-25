import {
	GETTING_REVIEW,
	GOT_REVIEW,
	GET_REVIEW_ERROR,
	GETTING_REVIEW_ID,
	GOT_REVIEW_ID,
	GET_REVIEW_ID_ERROR,
	ADDING_REVIEW,
	ADDED_REVIEW,
	ADD_REVIEW_ERROR,
	UPDATING_REVIEW,
	UPDATED_REVIEW,
	UPDATE_REVIEW_ERROR,
	DELETING_REVIEW,
	DELETED_REVIEW,
	DELETE_REVIEW_ERROR,
	LIKING_REVIEW,
	LIKED_REVIEW,
	LIKE_REVIEW_ERROR
} from '../actions';

const initialState = {
	review: {}
	// reviewId: null,

	// gettingReviews: false,
	// gettingReviewsError: null,

	// gettingReview: false,
	// gettingReviewError: null,

	// addingReview: false,
	// addingReviewError: null,

	// updatingReview: false,
	// updatingReviewError: null,

	// deletingReview: false,
	// deletingReviewError: null,
};

const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		// getReview
		case GETTING_REVIEW:
			return {
				...state,
				gettingReview: true,
				likingReviewError: undefined,
				gettingReviewError: undefined
			};

		case GOT_REVIEW:
			return {
				...state,
				review: action.payload.review,
				reviewId: action.payload.review_id,
				gettingReview: false
			};

		case GET_REVIEW_ERROR:
			return {
				...state,
				gettingReview: false,
				gettingReviewError: `${action.payload}`
			};

		// getReviewId
		case GETTING_REVIEW_ID:
			return { ...state, gettingReviewId: true };

		case GOT_REVIEW_ID:
			return {
				...state,
				reviewId: action.payload,
				gettingReviewId: false
			};

		case GET_REVIEW_ID_ERROR:
			return {
				...state,
				gettingReviewId: false,
				gettingReviewError: `${action.payload}`
			};

		// addReview
		case ADDING_REVIEW:
			return { ...state, addingReview: true };

		case ADDED_REVIEW:
			return {
				...state,
				addingReview: false
			};

		case ADD_REVIEW_ERROR:
			return {
				...state,
				addingReview: false,
				addingReviewError: `${action.payload}`
			};

		// updateReview
		case UPDATING_REVIEW:
			return { ...state, updatingReview: true };

		case UPDATED_REVIEW:
			return {
				...state,
				updatingReview: false
			};

		case UPDATE_REVIEW_ERROR:
			return {
				...state,
				updatingReview: false,
				updatingReviewError: `${action.payload}`
			};

		// deleteReview
		case DELETING_REVIEW:
			return { ...state, deletingReview: true };

		case DELETED_REVIEW:
			return {
				...state,
				deletingReview: false,
				reviewModal: false,
				reviewId: null
			};

		case DELETE_REVIEW_ERROR:
			return {
				...state,
				deletingReview: false,
				deletingReviewError: `${action.payload}`
			};

		// likeReview
		case LIKING_REVIEW:
			return { ...state, likingReview: true };

		case LIKED_REVIEW:
			return {
				...state,
				likingReview: false,
				review: { ...state.review, like: action.payload }
			};

		case LIKE_REVIEW_ERROR:
			return {
				...state,
				likingReview: false,
				likingReviewError: `${action.payload}`
			};

		default:
			return state;
	}
};

export default reviewReducer;
