import { notification } from 'antd';
import axiosWithAuth from '../../utils/axiosWithAuth';

export const CREATE_ATTENDANCE_START =
  'CREATE_ATTENDANCE_START';
export const CREATE_ATTENDANCE_SUCCESS =
  'CREATE_ATTENDANCE_SUCCESS';
export const CREATE_ATTENDANCE_FAILURE =
  'CREATE_ATTENDANCE_FAILURE';

export const postStudentAttendance = state => dispatch => {
  const openSuccessNotification = type => {
    notification[type]({
      message: `Attendance Submission`,
      description: 'Student Attendance Saved Successfully!',
      duration: 6
    });
  };

  const openEditNotification = type => {
    notification[type]({
      message: `Attendance Submission`,
      description:
        'Student Attendance Edited Successfully!',
      duration: 6
    });
  };

  const openErrorNotification = type => {
    notification[type]({
      message: `Attendance Submission`,
      description: 'Student Attendance Submission Failed!',
      duration: 6
    });
  };

  dispatch({ type: CREATE_ATTENDANCE_START });
  axiosWithAuth()
    .post(`/attendance`, state)
    .then(res => {
      if (res.status === 201) {
        openSuccessNotification('success');
        dispatch({
          type: CREATE_ATTENDANCE_SUCCESS,
          payload: 'Student Attendance Saved Successfully!'
        });
      } else if (res.status === 200) {
        openEditNotification('success');
        dispatch({
          type: CREATE_ATTENDANCE_SUCCESS,
          payload: 'Student Attendance Edited Successfully!'
        });
      }
    })
    .catch(err => {
      openErrorNotification('error');
      dispatch({
        type: CREATE_ATTENDANCE_FAILURE,
        payload: err.data
      });
    });
};
