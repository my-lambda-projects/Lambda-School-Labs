import axiosWithAuth from '../../utils/axiosWithAuth';

export const FETCH_COURSES_START = 'FETCH_COURSES_START';
export const FETCH_COURSES_SUCCESS =
  'FETCH_COURSES_SUCCESS';
export const FETCH_COURSES_FAILURE =
  'FETCH_COURSES_FAILURE';

export const getCourseTable = () => dispatch => {
  dispatch({ type: FETCH_COURSES_START });
  axiosWithAuth()
    .get(`/course`)
    .then(res => {
      dispatch({
        type: FETCH_COURSES_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_COURSES_FAILURE,
        payload: err.payload
      });
    });
};

export const FETCH_COURSEBYID_START =
  'FETCH_COURSEBYID_START';
export const FETCH_COURSEBYID_SUCCESS =
  'FETCH_COURSEBYID_SUCCESS';
export const FETCH_COURSEBYID_FAILURE =
  'FETCH_COURSEBYID_FAILURE';

export const getCourseById = id => dispatch => {
  dispatch({ type: FETCH_COURSEBYID_START });
  axiosWithAuth()
    .get(`/course/${id}`)
    .then(res => {
      dispatch({
        type: FETCH_COURSEBYID_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_COURSEBYID_FAILURE,
        payload: err.data
      });
    });
};

export const FETCH_DROPDOWNCOURSES_START =
  'FETCH_DROPDOWNCOURSES_START';
export const FETCH_DROPDOWNCOURSES_SUCCESS =
  'FETCH_DROPDOWNCOURSES_SUCCESS';
export const FETCH_DROPDOWNCOURSES_FAILURE =
  'FETCH_DROPDOWNCOURSES_FAILURE';

export const getDropDownCourses = () => dispatch => {
  dispatch({ type: FETCH_DROPDOWNCOURSES_START });
  axiosWithAuth()
    .get(`/course/dropdowns`)
    .then(res => {
      dispatch({
        type: FETCH_DROPDOWNCOURSES_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_DROPDOWNCOURSES_FAILURE,
        payload: err.payload
      });
    });
};

export const ADD_COURSE_START = 'ADD_COURSE_START';
export const ADD_COURSE_SUCCESS = 'ADD_COURSE_SUCCESS';
export const ADD_COURSE_FAILURE = 'ADD_COURSE_FAILURE';

export const addCourse = course => dispatch => {
 
  dispatch({ type: ADD_COURSE_START });
  axiosWithAuth()
    .post(`/course`, course)
    .then(res => {
      dispatch({
        type: ADD_COURSE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: ADD_COURSE_FAILURE, payload: err });
    });
};

export const EDIT_COURSEBYID_START =
  'EDIT_COURSEBYID_START';
export const EDIT_COURSEBYID_CANCELLED =
  'EDIT_COURSEBYID_CANCELLED';
export const EDIT_COURSEBYID_SUCCESS =
  'EDIT_COURSEBYID_SUCCESS';
export const EDIT_COURSEBYID_FAILURE =
  'EDIT_COURSEBYID_FAILURE';

export const toggleEditCourse = (
  isEditing,
  isEdited
) => dispatch => {
  if (isEditing === 'true') {
    return dispatch({ type: EDIT_COURSEBYID_START });
  }
  if (isEditing === 'false' && isEdited === 'false') {
    return dispatch({ type: EDIT_COURSEBYID_CANCELLED });
  }
};

export const editCourseById = (
  course_id,
  state
) => dispatch => {
  axiosWithAuth()
    .put(`/course/${course_id}`, state)
    .then(res => {
      dispatch({
        type: EDIT_COURSEBYID_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: EDIT_COURSEBYID_FAILURE,
        payload: 'Error saving changed course information.'
      });
    });
};

export const DELETE_COURSEBYID_START =
  'EDIT_COURSEBYID_START';
export const DELETE_COURSEBYID_SUCCESS =
  'EDIT_COURSEBYID_SUCCESS';
export const DELETE_COURSEBYID_FAILURE =
  'EDIT_COURSEBYID_FAILURE';

export const deleteCourseById = course_id => dispatch => {
  dispatch({
    type: DELETE_COURSEBYID_START
  });
  axiosWithAuth()
    .delete(`/course/${course_id}`)
    .then(res => {
      dispatch({
        type: DELETE_COURSEBYID_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_COURSEBYID_FAILURE,
        payload: 'Error deleting course information.'
      });
    });
};

export const DISPLAY_STUDENTSBYCOURSEID_START =
  'DISPLAY_STUDENTSBYCOURSEID_START';
export const DISPLAY_STUDENTSBYCOURSEID_SUCCESS =
  'DISPLAY_STUDENTSBYCOURSEID_SUCCESS';
export const DISPLAY_STUDENTSBYCOURSEID_FAILURE =
  'DISPLAY_STUDENTSBYCOURSEID_FAILURE';

export const getStudentTableByCourseID = course_id => dispatch => {
  dispatch({ type: DISPLAY_STUDENTSBYCOURSEID_START });
  axiosWithAuth()
    .get(`/course/${course_id}/students`)
    .then(res => {
      dispatch({
        type: DISPLAY_STUDENTSBYCOURSEID_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: DISPLAY_STUDENTSBYCOURSEID_FAILURE,
        payload: err.payload
      });
    });
};

export const SET_FILTER_COURSES = 'SET_FILTER_COURSES';
export const filterCourseTable = searchTerm => dispatch => {
  dispatch({
    type: SET_FILTER_COURSES,
    payload: searchTerm
  });
  dispatch({ type: FETCH_COURSES_START });
  axiosWithAuth()
    .get(`/course`)
    .then(res => {
      searchTerm = searchTerm.toLowerCase();
      let courseList = res.data;
      courseList = courseList.filter(course => {
        if (
          course.course_id &&
          course.course_id.toString().match(searchTerm)
        ) {
          return true;
        }
        if (
          course.term &&
          course.term.toLowerCase().match(searchTerm)
        ) {
          return true;
        }
        if (
          course.course_type &&
          course.course_type.toLowerCase().match(searchTerm)
        ) {
          return true;
        }
        if (
          course.group_type &&
          course.group_type.toLowerCase().match(searchTerm)
        ) {
          return true;
        }
        if (
          course.school_grade &&
          course.school_grade
            .toLowerCase()
            .match(searchTerm)
        ) {
          return true;
        }
        if (
          course.level &&
          course.level.toLowerCase().match(searchTerm)
        ) {
          return true;
        }
        if (
          course.course_schedule &&
          course.course_schedule
            .toLowerCase()
            .match(searchTerm)
        ) {
          return true;
        }
        if (
          course.teacher &&
          course.teacher.toLowerCase().match(searchTerm)
        ) {
          return true;
        }
        return false;
      });
      dispatch({
        type: FETCH_COURSES_SUCCESS,
        payload: courseList
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_COURSES_FAILURE,
        payload: err.payload
      });
    });
};
