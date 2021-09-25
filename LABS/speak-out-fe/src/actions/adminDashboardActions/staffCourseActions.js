import axiosWithAuth from '../../utils/axiosWithAuth';

export const FETCH_STAFFCOURSES_START = 'FETCH_STAFFCOURSES_START';
export const FETCH_STAFFCOURSES_SUCCESS = 'FETCH_STAFFCOURSES_SUCCESS';
export const FETCH_STAFFCOURSES_FAILURE = 'FETCH_STAFFCOURSES_FAILURE';

export const FETCH_STUDENTSBYCOURSEID_START = 'FETCH_STUDENTSBYCOURSEID_START';
export const FETCH_STUDENTSBYCOURSEID_SUCCESS =
	'FETCH_STUDENTSBYCOURSEID_SUCCESS';
export const FETCH_STUDENTSBYCOURSEID_FAILURE =
	'FETCH_STUDENTSBYCOURSEID_FAILURE';

export const getStaffCourses = staff_id => dispatch => {
	dispatch({ type: FETCH_STAFFCOURSES_START });
	axiosWithAuth()
		.get(`/staff/${staff_id}/courses`)
		.then(res => {
			dispatch({
				type: FETCH_STAFFCOURSES_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: FETCH_STAFFCOURSES_FAILURE,
				payload: err.data
			});
		});
};

export const getStudentsByCourseID = course_id => dispatch => {
	dispatch({ type: FETCH_STUDENTSBYCOURSEID_START });
	axiosWithAuth()
		.get(`/course/${course_id}/students`)
		.then(res => {
			dispatch({
				type: FETCH_STUDENTSBYCOURSEID_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: FETCH_STUDENTSBYCOURSEID_FAILURE,
				payload: err.data
			});
		});
};
