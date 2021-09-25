import axios from 'axios';

import { getProjectLite } from '../actions';

// addPost
export const ADDING_POST = 'ADDING_POST';
export const ADDED_POST = 'ADDED_POST';
export const ADD_POST_ERROR = 'ADD_POST_ERROR';
// updatePost
export const UPDATING_POST = 'UPDATING_POST';
export const UPDATED_POST = 'UPDATED_POST';
export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR';
// deletePost
export const DELETING_POST = 'DELETING_POST';
export const DELETED_POST = 'DELETED_POST';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';

// Loading message tester
// function sleep(ms) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
// }

// add post
export const addPost = (post, callback) => {
	return dispatch => {
		dispatch({ type: ADDING_POST });

		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/posts/`,
				post
			)

			.then(() => {
				dispatch({ type: ADDED_POST });
			})

			.then(() => dispatch(getProjectLite(post.project_id, callback)))

			.catch(error => dispatch({ type: ADD_POST_ERROR, payload: error }));
	};
};

// update post
export const updatePost = (post_id, changes, callback) => {
	return dispatch => {
		dispatch({ type: UPDATING_POST });

		axios
			.put(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/posts/${post_id}`,
				changes
			)

			.then(() => {
				dispatch({ type: UPDATED_POST });
			})

			.then(() => dispatch(getProjectLite(changes.project_id, callback)))

			.catch(error => dispatch({ type: UPDATE_POST_ERROR, payload: error }));
	};
};

// delete post
export const deletePost = (post_id, project_id, user_id, callback) => {
	return dispatch => {
		dispatch({ type: DELETING_POST });

		axios
			.delete(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/posts/${post_id}`,
				{ data: { project_id, user_id } } // Have to use { data: body } for DELETE
			)

			.then(() => {
				dispatch({ type: DELETED_POST, payload: {} });
			})

			.then(() => dispatch(getProjectLite(project_id, callback)))

			.catch(error => dispatch({ type: DELETE_POST_ERROR, payload: error }));
	};
};
