import axios from 'axios';

export const SORT_PROJECTS_BY_RATING = 'SORT_PROJECTS_BY_RATING';
export const SORT_PROJECTS_BY_DATE = 'SORT_PROJECTS_BY_DATE';
export const SORT_PROJECTS_BY_REVIEWS = 'SORT_PROJECTS_BY_REVIEWS';

export const FETCH_MYPROJECT = 'FETCH_MYPROJECT';
export const FETCH_MYPROJECT_SUCCESS = 'FETCH_MYPROJECT_SUCCESS';
export const FETCH_MYPROJECT_ERROR = 'FETCH_MYPROJECT_ERROR';

export const FETCH_MYREVIEWS = 'FETCH_MYREVIEWS';
export const FETCH_MYREVIEWS_SUCCESS = 'FETCH_MYREVIEWS_SUCCESS';
export const FETCH_MYREVIEWS_ERROR = 'FETCH_MYREVIEWS_ERROR';

export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
export const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS';
export const FETCH_SEARCH_RESULTS_ERROR = 'FETCH_SEARCH_RESULTS_ERROR';

export const FETCH_CATEGORY_RESULTS = 'FETCH_CATEGORY_RESULTS';
export const FETCH_CATEGORY_RESULTS_SUCCESS = 'FETCH_CATEGORY_RESULTS_SUCCESS';
export const FETCH_CATEGORY_RESULTS_ERROR = 'FETCH_CATEGORY_RESULTS_ERROR';

export const FETCH_PROJECTS_BY_REVIEWER = 'FETCH_PROJECTS_BY_REVIEWER';
export const FETCH_PROJECTS_BY_REVIEWER_SUCCESS =
	'FETCH_PROJECTS_BY_REVIEWER_SUCCESS';
export const FETCH_PROJECTS_BY_REVIEWER_ERROR =
	'FETCH_PROJECTS_BY_REVIEWER_ERROR';

export const fetchMyProjects = user_id => {
	return dispatch => {
		dispatch({ type: FETCH_MYPROJECT });
		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					'/api/users/myprojects',
				{ user_id: user_id }
			)
			.then(response => {
				dispatch({ type: FETCH_MYPROJECT_SUCCESS, payload: response.data });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: FETCH_MYPROJECT_ERROR });
			});
	};
};

export const fetchMyReviews = user_id => {
	return dispatch => {
		dispatch({ type: FETCH_MYREVIEWS });
		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					'/api/users/myreviews',
				{ user_id: user_id }
			)
			.then(response => {
				dispatch({ type: FETCH_MYREVIEWS_SUCCESS, payload: response.data });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: FETCH_MYREVIEWS_ERROR });
			});
	};
};

export const fetchSearchResults = query => {
	return dispatch => {
		const url =
			(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
			`/api/search?query=${query}`;
		dispatch({ type: FETCH_SEARCH_RESULTS });
		axios
			.get(url)
			.then(response => {
				dispatch({
					type: FETCH_SEARCH_RESULTS_SUCCESS,
					payload: response.data
				});
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: FETCH_SEARCH_RESULTS_ERROR });
			});
	};
};

export const fetchProjectsByReviewer = username => {
	return dispatch => {
		console.log('username: ' + username);
		const url =
			(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
			'/api/search?username=' +
			username;
		dispatch({ type: FETCH_PROJECTS_BY_REVIEWER });
		axios
			.get(url)
			.then(response => {
				dispatch({
					type: FETCH_PROJECTS_BY_REVIEWER_SUCCESS,
					payload: response.data
				});
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: FETCH_PROJECTS_BY_REVIEWER_ERROR });
			});
	};
};

export const fetchCategoryResults = query => {
	return dispatch => {
		console.log('query: ' + query);
		const url =
			(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
			'/api/filter?query=' +
			query;
		dispatch({ type: FETCH_CATEGORY_RESULTS });
		axios
			.get(url)
			.then(response => {
				dispatch({
					type: FETCH_CATEGORY_RESULTS_SUCCESS,
					payload: response.data
				});
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: FETCH_CATEGORY_RESULTS_ERROR });
			});
	};
};

export const sortProjects = type => {
	return dispatch => {
		if ('rating' === type.toLowerCase()) {
			dispatch({ type: SORT_PROJECTS_BY_RATING });
		} else if ('new' === type.toLowerCase()) {
			dispatch({ type: SORT_PROJECTS_BY_DATE });
		}
	};
};
