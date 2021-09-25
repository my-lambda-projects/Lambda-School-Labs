import axios from 'axios';

// getReview
export const GETTING_REVIEW = 'GETTING_REVIEW';
export const GOT_REVIEW = 'GOT_REVIEW';
export const GET_REVIEW_ERROR = 'GET_REVIEW_ERROR';
// getReviewId
export const GETTING_REVIEW_ID = 'GETTING_REVIEW_ID';
export const GOT_REVIEW_ID = 'GOT_REVIEW_ID';
export const GET_REVIEW_ID_ERROR = 'GET_REVIEW_ID_ERROR';
// addReview
export const ADDING_REVIEW = 'ADDING_REVIEW';
export const ADDED_REVIEW = 'ADDED_REVIEW';
export const ADD_REVIEW_ERROR = 'ADD_REVIEW_ERROR';
// updateReview
export const UPDATING_REVIEW = 'UPDATING_REVIEW';
export const UPDATED_REVIEW = 'UPDATED_REVIEW';
export const UPDATE_REVIEW_ERROR = 'UPDATE_REVIEW_ERROR';
// deleteReview
export const DELETING_REVIEW = 'DELETING_REVIEW';
export const DELETED_REVIEW = 'DELETED_REVIEW';
export const DELETE_REVIEW_ERROR = 'DELETE_REVIEW_ERROR';
// likeReview
export const LIKING_REVIEW = 'LIKING_REVIEW';
export const LIKED_REVIEW = 'LIKED_REVIEW';
export const LIKE_REVIEW_ERROR = 'LIKE_REVIEW_ERROR';
// Update projectReducer.reviews
export const LIKED_PROJECT_REVIEW = 'LIKED_PROJECT_REVIEW';

// Loading message tester
// function sleep(ms) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
// }

// get review by review_id
export const getReview = (review_id, user_id) => {
	return dispatch => {
		dispatch({ type: GETTING_REVIEW });

		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
				`/api/reviews/${review_id}/${user_id || 0}`
			)

			.then(({ data }) => {
				dispatch({ type: GOT_REVIEW, payload: { review: data, review_id } });
			})

			.catch(error => dispatch({ type: GET_REVIEW_ERROR, payload: error }));
	};
};

// get review_id by project_id & user_id
export const getReviewId = (project_id, user_id) => {
	return dispatch => {
		dispatch({ type: GETTING_REVIEW_ID });

		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
				`/api/reviews/getid/${user_id}/${project_id}`
			)

			.then(({ data }) => {
				dispatch({ type: GOT_REVIEW_ID, payload: data });
			})

			.catch(error => dispatch({ type: GET_REVIEW_ID_ERROR, payload: error }));
	};
};

// add review
export const addReview = review => {
	console.log('Adding review', review);
	return dispatch => {
		dispatch({ type: ADDING_REVIEW });

		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
				`/api/reviews/`,
				review
			)

			.then(async ({ data }) => {
				// await sleep(500);
				dispatch({ type: ADDED_REVIEW, payload: data });
				return data;
			})

			.then(review_id => {
				if (review_id) dispatch(getReview(review_id));
			})

			.catch(error => dispatch({ type: ADD_REVIEW_ERROR, payload: error }));
	};
};

// update review
export const updateReview = (review_id, changes, callback) => {
	return dispatch => {
		dispatch({ type: UPDATING_REVIEW });

		axios
			.put(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
				`/api/reviews/${review_id}`,
				changes
			)

			.then(async () => {
				// await sleep(500);
				dispatch({ type: UPDATED_REVIEW });
			})

			.then(() => {
				dispatch(getReview(review_id));
				callback();
			})

			.catch(error => dispatch({ type: UPDATE_REVIEW_ERROR, payload: error }));
	};
};

// delete review
export const deleteReview = (user_id, review_id, callback) => {
	return dispatch => {
		dispatch({ type: DELETING_REVIEW });

		axios
			.delete(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
				`/api/reviews/${review_id}`,
				{ data: { user_id } } // Have to use { data: body } for DELETE
			)

			.then(async () => {
				// await sleep(500);
				dispatch({ type: DELETED_REVIEW });
				callback();
			})

			.catch(error => dispatch({ type: DELETE_REVIEW_ERROR, payload: error }));
	};
};

// like review
export const likeReview = ({ user_id, review_id, like }) => {
	return dispatch => {
		dispatch({ type: LIKING_REVIEW });

		axios
			.put(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
				`/api/reviews/${review_id}/like`,
				{ user_id, like }
			)

			.then(async ({ data }) => {
				// await sleep(500);
				dispatch({ type: LIKED_REVIEW, payload: data });
				dispatch({
					type: LIKED_PROJECT_REVIEW,
					payload: { review_id, like: data }
				});
			})

			.catch(error => dispatch({ type: LIKE_REVIEW_ERROR, payload: error }));
	};
};
