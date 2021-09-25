import { notification } from 'antd';
import axiosWithAuth from '../../utils/axiosWithAuth';

export const FETCH_STUDENTBYID_START =
  'FETCH_STUDENTBYID_START';
export const FETCH_STUDENTBYID_SUCCESS =
  'FETCH_STUDENTBYID_SUCCESS';
export const FETCH_STUDENTBYID_FAILURE =
  'FETCH_STUDENTBYID_FAILURE';
export const getStudentById = student_id => dispatch => {
  dispatch({ type: FETCH_STUDENTBYID_START });
  axiosWithAuth()
    .get(`/student/${student_id}`)
    .then(res => {
      dispatch({
        type: FETCH_STUDENTBYID_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_STUDENTBYID_FAILURE,
        payload: err.data
      });
    });
};

export const ENROLL_STUDENT_START = 'ENROLL_STUDENT_START';
export const ENROLL_STUDENT_SUCCESS =
  'ENROLL_STUDENT_SUCCESS';
export const ENROLL_STUDENT_CANCELLED =
  'ENROLL_STUDENT_CANCELLED';
export const ENROLL_STUDENT_FAILURE =
  'ENROLL_STUDENT_FAILURE';

export const enrollStudent = (
  student_id,
  course_id,
  state
) => dispatch => {
  const StudentEnrolledSuccessNotification = type => {
    notification[type]({
      message: `Student Enrolled`,
      description: 'Student Enrolled Successfully!',
      duration: 6
    });
  };
  const StudentEnrolledFailedNotification = type => {
    notification[type]({
      message: `Student Enrolled`,
      description: 'Student Enrolled Failed.',
      duration: 6
    });
  };

  dispatch({ type: ENROLL_STUDENT_START });
  axiosWithAuth()
    .post(
      `/student/${student_id}/course/${course_id}`,
      state
    )
    .then(res => {
      StudentEnrolledSuccessNotification('success');
      dispatch({
        type: ENROLL_STUDENT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      StudentEnrolledFailedNotification('error');
      dispatch({
        type: ENROLL_STUDENT_FAILURE,
        payload: 'Error enrolling the student'
      });
    });
};

export const EDIT_ENROLL_STUDENT_START =
  'EDIT_ENROLL_STUDENT_START';
export const EDIT_ENROLL_STUDENT_SUCCESS =
  'EDIT_ENROLL_STUDENT_SUCCESS';
export const EDIT_ENROLL_STUDENT_CANCELLED =
  'EDIT_ENROLL_STUDENT_CANCELLED';
export const EDIT_ENROLL_STUDENT_FAILURE =
  'EDIT_ENROLL_STUDENT_FAILURE';
export const editEnrollStudent = (
  student_id,
  course_id,
  state
) => dispatch => {
  dispatch({ type: EDIT_ENROLL_STUDENT_START });
  axiosWithAuth()
    .put(
      `/student/${student_id}/course/${course_id}`,
      state
    )
    .then(res => {
      dispatch({
        type: EDIT_ENROLL_STUDENT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: EDIT_ENROLL_STUDENT_FAILURE,
        payload: 'Error enrolling the student'
      });
    });
};

export const UNENROLL_STUDENT_START =
  'UNENROLL_STUDENT_START';
export const UNENROLL_STUDENT_SUCCESS =
  'UNENROLL_STUDENT_SUCCESS';
export const UNENROLL_STUDENT_CANCELLED =
  'UNENROLL_STUDENT_CANCELLED';
export const UNENROLL_STUDENT_FAILURE =
  'UNENROLL_STUDENT_FAILURE';
export const unenrollEnrollStudent = (
  student_id,
  course_id
) => dispatch => {
  const StudentUnenrolledSuccessNotification = type => {
    notification[type]({
      message: `Student Unnrolled`,
      description: 'Student Unenrolled Successfully!',
      duration: 6
    });
  };
  const StudentUnenrolledFailedNotification = type => {
    notification[type]({
      message: `Student Unnrolled`,
      description: 'Student Unenrolled Failed.',
      duration: 6
    });
  };

  dispatch({ type: UNENROLL_STUDENT_START });
  axiosWithAuth()
    .delete(
      `/student/${student_id}/course/${course_id}`
    )
    .then(res => {
      StudentUnenrolledSuccessNotification('success');
      dispatch({
        type: UNENROLL_STUDENT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      StudentUnenrolledFailedNotification('error');
      dispatch({
        type: UNENROLL_STUDENT_FAILURE,
        payload: 'Error unenrolling the student'
      });
    });
};

export const EDIT_STUDENTBYID_START =
  'EDIT_STUDENTBYID_START';
export const EDIT_STUDENTBYID_CANCELLED =
  'EDIT_STUDENTBYID_CANCELLED';
export const EDIT_STUDENTBYID_SUCCESS =
  'EDIT_STUDENTBYID_SUCCESS';
export const EDIT_STUDENTBYID_FAILURE =
  'EDIT_STUDENTBYID_FAILURE';
export const toggleEditComponent = (
  isEditing,
  isEdited
) => dispatch => {
  if (isEditing === 'true') {
    return dispatch({ type: EDIT_STUDENTBYID_START });
  }
  if (isEditing === 'false' && isEdited === 'false') {
    return dispatch({ type: EDIT_STUDENTBYID_CANCELLED });
  }
};
export const editStudentById = (
  student_id,
  state
) => dispatch => {
  axiosWithAuth()
    .put(`/student/${student_id}`, state)
    .then(res => {
      dispatch({
        type: EDIT_STUDENTBYID_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: EDIT_STUDENTBYID_FAILURE,
        payload: 'Error saving changed student information'
      });
    });
};
export const DELETE_STUDENTBYID_START =
  'DELETE_STUDENTBYID_START';
export const DELETE_STUDENTBYID_SUCCESS =
  'DELETE_STUDENTBYID_SUCCESS';
export const DELETE_STUDENTBYID_FAILURE =
  'DELETE_STUDENTBYID_FAILURE';

export const deleteStudentById = id => dispatch => {
  dispatch({ type: DELETE_STUDENTBYID_START });
  axiosWithAuth()
    .delete(`/student/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_STUDENTBYID_SUCCESS,
        payload: res.student_id
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_STUDENTBYID_FAILURE,
        payload: err.data
      });
    });
};
export const EDIT_DROPDOWN_START = 'EDIT_DROPDOWN_START';
export const EDIT_DROPDOWN_SUCCESS =
  'EDIT_DROPDOWN_SUCCESS';
export const EDIT_DROPDOWN_FAILURE =
  'EDIT_DROPDOWN_FAILURE';

export const editStudentDropDown = () => dispatch => {
  dispatch({ type: EDIT_DROPDOWN_START });
  axiosWithAuth()
    .get(`/student/dropdowns`)
    .then(res => {
      dispatch({
        type: EDIT_DROPDOWN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: EDIT_DROPDOWN_FAILURE,
        payload: err.payload
      });
    });
};
