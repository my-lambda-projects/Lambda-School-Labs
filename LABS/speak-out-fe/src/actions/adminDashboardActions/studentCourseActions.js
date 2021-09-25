import axiosWithAuth from '../../utils/axiosWithAuth';

export const FETCH_STUDENTCOURSES_START =
  'FETCH_STUDENTCOURSES_START';
export const FETCH_STUDENTCOURSES_SUCCESS =
  'FETCH_STUDENTCOURSES_SUCCESS';
export const FETCH_STUDENTCOURSES_FAILURE =
  'FETCH_STUDENTCOURSES_FAILURE';

export const getStudentCourses = student_id => dispatch => {
  //most students are missing the course info so this is the test student that is working
  dispatch({ type: FETCH_STUDENTCOURSES_START });
  axiosWithAuth()
    .get(`/student/${student_id}/courses`)
    .then(res => {
      dispatch({
        type: FETCH_STUDENTCOURSES_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_STUDENTCOURSES_FAILURE,
        payload: err.data
      });
    });
};
