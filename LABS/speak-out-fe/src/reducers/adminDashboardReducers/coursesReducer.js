import {
  ADD_COURSE_FAILURE,
  ADD_COURSE_START,
  ADD_COURSE_SUCCESS,
  DELETE_COURSEBYID_FAILURE,
  DELETE_COURSEBYID_START,
  DELETE_COURSEBYID_SUCCESS,
  DISPLAY_STUDENTSBYCOURSEID_FAILURE,
  DISPLAY_STUDENTSBYCOURSEID_START,
  DISPLAY_STUDENTSBYCOURSEID_SUCCESS,
  EDIT_COURSEBYID_CANCELLED,
  EDIT_COURSEBYID_FAILURE,
  EDIT_COURSEBYID_START,
  EDIT_COURSEBYID_SUCCESS,
  FETCH_COURSEBYID_FAILURE,
  FETCH_COURSEBYID_START,
  FETCH_COURSEBYID_SUCCESS,
  FETCH_COURSES_FAILURE,
  FETCH_COURSES_START,
  FETCH_COURSES_SUCCESS,
  FETCH_DROPDOWNCOURSES_FAILURE,
  FETCH_DROPDOWNCOURSES_START,
  FETCH_DROPDOWNCOURSES_SUCCESS,
  SET_FILTER_COURSES
} from '../../actions';

const initialState = {
  isLoading: false,
  error: null,
  courseList: [],
  courseById: [],
  studentsById: [],
  termTable: [],
  courseTypeTable: [],
  groupTypeTable: [],
  schoolGradeTable: [],
  levelTable: [],
  courseScheduleTable: [],
  roomTable: [],
  teacherTable: [],
  isEdited: false,
  isEditing: false,
  isPosting: false,
  isPosted: false,
  searchTerm: ''
};

export const coursesTableReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    //populate course table
    case FETCH_COURSES_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        courseList: action.payload
      };
    case FETCH_COURSES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    // get by course by id
    case FETCH_COURSEBYID_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_COURSEBYID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        courseById: action.payload
      };
    case FETCH_COURSEBYID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    // get dropdowns from back-end for add course
    case FETCH_DROPDOWNCOURSES_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_DROPDOWNCOURSES_SUCCESS:
      // let term = action.payload.terms.map(each => {
      //   let obj = { value: each.id, label: each.name };
      //   return obj;
      // });
      // let courseType = action.payload.course_types.map(
      //   each => {
      //     let obj = {
      //       value: each.id,
      //       label: each.description
      //     };
      //     return obj;
      //   }
      // );
      // let groupType = action.payload.group_types.map(
      //   each => {
      //     let obj = {
      //       value: each.id,
      //       label: each.short_description
      //     };
      //     return obj;
      //   }
      // );
      // let schoolGrade = action.payload.school_grades.map(
      //   each => {
      //     let obj = { value: each.id, label: each.name };
      //     return obj;
      //   }
      // );
      // let level = action.payload.levels.map(each => {
      //   let obj = {
      //     value: each.id,
      //     label: each.description
      //   };
      //   return obj;
      // });
      // let courseSchedule = action.payload.course_schedules.map(
      //   each => {
      //     let obj = {
      //       value: each.id,
      //       label: each.short_description
      //     };
      //     return obj;
      //   }
      // );
      // let room = action.payload.rooms.map(each => {
      //   let obj = { value: each.id, label: each.id };
      //   return obj;
      // });
      let teacher = action.payload.staff.map(each => {
        let obj = { value: each.id, label: each.name };
        return obj;
      });
      return {
        ...state,
        isLoading: false,
        // termTable: term,
        // courseTypeTable: courseType,
        // groupTypeTable: groupType,
        // schoolGradeTable: schoolGrade,
        // levelTable: level,
        // roomTable: room,
        // courseScheduleTable: courseSchedule,
        teacherTable: teacher,
        error: null
      };
    case FETCH_DROPDOWNCOURSES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //add course
    case ADD_COURSE_START:
      return {
        ...state,
        isLoading: true,
        isPosting: true,
        isPosted: false,
        error: null
      };
    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        isPosting: false,
        isPosted: true,
        courseList: [action.payload, ...state.courseList]
      };
    case ADD_COURSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isPosting: false,
        isPosted: false,
        error: action.payload
      };
    // edit by id
    case EDIT_COURSEBYID_START:
      return {
        ...state,
        isEditing: true,
        error: null
      };
    case EDIT_COURSEBYID_CANCELLED:
      return {
        ...state,
        isEditing: false,
        isEdited: false
      };
    case EDIT_COURSEBYID_SUCCESS:
      return {
        ...state,
        isEditing: false,
        isEdited: true,
        courseById: action.payload
      };
    case EDIT_COURSEBYID_FAILURE:
      return {
        ...state,
        isLoading: false,
        isEditing: false,
        isEdited: false,
        error: action.payload
      };
    case DELETE_COURSEBYID_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case DELETE_COURSEBYID_SUCCESS:
      return {
        ...state,
        error: null,
        courseById: []
      };
    case DELETE_COURSEBYID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //get students by course id
    case DISPLAY_STUDENTSBYCOURSEID_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case DISPLAY_STUDENTSBYCOURSEID_SUCCESS:
      return {
        ...state,
        studentsById: action.payload,
        isLoading: false,
        error: null
      };
    case DISPLAY_STUDENTSBYCOURSEID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    // search
    case SET_FILTER_COURSES:
      return {
        ...state,
        searchTerm: action.payload
      };
    default:
      return state;
  }
};
