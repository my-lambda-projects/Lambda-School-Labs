export const SORT_PROJECTS = 'SORT_PROJECTS';
export const SORT_PROJECTS_SUCCESS = 'SORT_PROJECTS_SUCCESS';
export const SORT_PROJECTS_ERROR = 'SORT_PROJECTS_ERROR';

export const sortProjects = sort_by => {
	return dispatch => {
		dispatch({ type: SORT_PROJECTS });
	};
};
