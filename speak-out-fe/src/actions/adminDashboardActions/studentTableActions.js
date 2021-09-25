import axiosWithAuth from '../../utils/axiosWithAuth';

export const FETCH_STUDENTS_START = 'FETCH_STUDENTS_START';
export const FETCH_STUDENTS_SUCCESS =
  'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE =
  'FETCH_STUDENTS_FAILURE';

export const getStudentTable = () => dispatch => {
  dispatch({ type: FETCH_STUDENTS_START });
  axiosWithAuth()
    .get(`/students`)
    .then(res => {
      dispatch({
        type: FETCH_STUDENTS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_STUDENTS_FAILURE,
        payload: err.payload
      });
    });
};

export const SET_FILTER_STUDENT = 'SET_FILTER_STUDENT';

export const filterStudentTable = searchTerm => dispatch => {
  dispatch({
    type: SET_FILTER_STUDENT,
    payload: searchTerm
  });
  dispatch({ type: FETCH_STUDENTS_START });
  axiosWithAuth()
    .get(`/students`)
    .then(res => {
      searchTerm = searchTerm.toLowerCase();
      let studentList = res.data;
      studentList = studentList.filter(student => {
        if (
          student.first_name &&
          student.first_name.toLowerCase().match(searchTerm)
        ) {
          return true;
        }
        if (
          student.student_id &&
          student.student_id.toString().match(searchTerm)
        ) {
          return true;
        }
        if (
          student.cpr &&
          student.cpr.toString().match(searchTerm)
        ) {
          return true;
        }
        if (
          student.additional_names &&
          student.additional_names
            .toLowerCase()
            .match(searchTerm)
        ) {
          return true;
        }
        if (
          student.mobile_telephone &&
          student.mobile_telephone
            .toString()
            .match(searchTerm)
        ) {
          return true;
        }
        return false;
      });
      dispatch({
        type: FETCH_STUDENTS_SUCCESS,
        payload: studentList
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_STUDENTS_FAILURE,
        payload: err.payload
      });
    });
};

export const CREATE_NEW_STUDENT_START =
  'CREATE_NEW_STUDENT_START';
export const CREATE_NEW_STUDENT_SUCCESS =
  'CREATE_NEW_STUDENT_SUCCESS';
export const CREATE_NEW_STUDENT_FAILURE =
  'CREATE_NEW_STUDENT_FAILURE';

export const createNewStudent = student => dispatch => {
  
  dispatch({ type: CREATE_NEW_STUDENT_START });

  axiosWithAuth()
    .post(`/student`, student)
    .then(res => {
      dispatch({
        type: CREATE_NEW_STUDENT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {

      dispatch({
        type: CREATE_NEW_STUDENT_FAILURE,
        payload: err.data
      });
    });
};

export const FETCH_DROPDOWN_START = 'FETCH_DROPDOWN_START';
export const FETCH_DROPDOWN_SUCCESS =
  'FETCH_DROPDOWN_SUCCESS';
export const FETCH_DROPDOWN_FAILURE =
  'FETCH_DROPDOWN_FAILURE';

export const getDropDown = () => dispatch => {
  dispatch({ type: FETCH_DROPDOWN_START });
  axiosWithAuth()
    .get(`/student/dropdowns`)
    .then(res => {
      dispatch({
        type: FETCH_DROPDOWN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_DROPDOWN_FAILURE,
        payload: err.payload
      });
    });
};

//helper
export const resetForm = () => {
  return { type: 'RESET_FORM' };
};
