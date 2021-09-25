import {
  DELETE_STUDENTBYID_FAILURE,
  DELETE_STUDENTBYID_START,
  DELETE_STUDENTBYID_SUCCESS,
  EDIT_DROPDOWN_FAILURE,
  EDIT_DROPDOWN_START,
  EDIT_DROPDOWN_SUCCESS,
  EDIT_ENROLL_STUDENT_CANCELLED,
  EDIT_ENROLL_STUDENT_FAILURE,
  EDIT_ENROLL_STUDENT_START,
  EDIT_ENROLL_STUDENT_SUCCESS,
  EDIT_STUDENTBYID_CANCELLED,
  EDIT_STUDENTBYID_FAILURE,
  EDIT_STUDENTBYID_START,
  EDIT_STUDENTBYID_SUCCESS,
  ENROLL_STUDENT_CANCELLED,
  ENROLL_STUDENT_FAILURE,
  ENROLL_STUDENT_START,
  ENROLL_STUDENT_SUCCESS,
  FETCH_STUDENTBYID_FAILURE,
  FETCH_STUDENTBYID_START,
  FETCH_STUDENTBYID_SUCCESS,
  UNENROLL_STUDENT_CANCELLED,
  UNENROLL_STUDENT_FAILURE,
  UNENROLL_STUDENT_START,
  UNENROLL_STUDENT_SUCCESS
} from '../../actions';

const initialState = {
  studentById: [],
  isLoading: false,
  error: null,
  isEditing: false,
  isEdited: false,
  isEnrolling: false,
  isEnrolled: false,
  locationsTable: [],
  contactTypesTable: [],
  blocksTable: [],
  schoolGradeTable: [],
  locationID: {},
  contactMethodID: {},
  blockID: {},
  gradeID: {},
  editedStudentSuccessMessage: '',
  editedStudentErrorMessage: ''
};

export const studentByIdReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_STUDENTBYID_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_STUDENTBYID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fetching: true,
        studentById: action.payload
      };
    case FETCH_STUDENTBYID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    // Edit by ID
    case EDIT_STUDENTBYID_START:
      return {
        ...state,
        isEditing: true,
        error: null
      };
    case EDIT_STUDENTBYID_CANCELLED:
      return {
        ...state,
        isEditing: false,
        isEdited: false
      };
    case EDIT_STUDENTBYID_SUCCESS:
      return {
        ...state,
        isEditing: false,
        isEdited: true,
        editedStudentSuccessMessage: 'Student has been successfully edited',
        studentById: action.payload
      };
    case EDIT_STUDENTBYID_FAILURE:
      return {
        ...state,
        isLoading: false,
        isEditing: true,
        isEdited: false,
        editedStudentErrorMessage: 'Something went wrong',
        error: action.payload
      };
    //edit dropdown
    case EDIT_DROPDOWN_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case EDIT_DROPDOWN_SUCCESS:
      let grade = action.payload.school_grades.map(each => {
        let obj = { value: each.id, label: each.name };
        return obj;
      });
      let block = action.payload.blocks.map(each => {
        let obj = {
          value: each.block_code,
          label: each.block_code
        };
        return obj;
      });
      let contact = action.payload.contact_types.map(
        each => {
          let obj = { value: each.id, label: each.method };
          return obj;
        }
      );
      let location = action.payload.locations.map(each => {
        let obj = { value: each.id, label: each.name };
        return obj;
      });
      return {
        ...state,
        isLoading: false,
        locationsTable: location,
        contactTypesTable: contact,
        blocksTable: block,
        schoolGradeTable: grade,
        error: null
      };
    case EDIT_DROPDOWN_FAILURE:
      return {
        ...state,
        IsLoading: false,
        error: action.payload
      };

    // Delete by ID
    case DELETE_STUDENTBYID_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case DELETE_STUDENTBYID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentById: action.payload
      };
    case DELETE_STUDENTBYID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case ENROLL_STUDENT_START: {
      return {
        ...state,
        isEditing: false,
        isEdited: false
      };
    }
    case ENROLL_STUDENT_SUCCESS: {
      return {
        ...state,
        isEditing: false,
        isEdited: true
      };
    }
    case ENROLL_STUDENT_CANCELLED: {
      return {
        ...state,
        isEditing: false,
        isEdited: false
      };
    }
    case ENROLL_STUDENT_FAILURE: {
      return {
        ...state,
        isEditing: false,
        isEdited: false,
        error: action.payload
      };
    }
    case UNENROLL_STUDENT_START: {
      return {
        ...state,
        isEditing: false,
        isEdited: false
      };
    }
    case UNENROLL_STUDENT_SUCCESS: {
      return {
        ...state,
        isEditing: false,
        isEdited: true
      };
    }
    case UNENROLL_STUDENT_CANCELLED: {
      return {
        ...state,
        isEditing: false,
        isEdited: false
      };
    }
    case UNENROLL_STUDENT_FAILURE: {
      return {
        ...state,
        isEditing: false,
        isEdited: false,
        error: action.payload
      };
    }
    case EDIT_ENROLL_STUDENT_START: {
      return {
        ...state,
        isEditing: false,
        isEdited: false
      };
    }
    case EDIT_ENROLL_STUDENT_SUCCESS: {
      return {
        ...state,
        isEditing: false,
        isEdited: true
      };
    }
    case EDIT_ENROLL_STUDENT_CANCELLED: {
      return {
        ...state,
        isEditing: false,
        isEdited: false
      };
    }
    case EDIT_ENROLL_STUDENT_FAILURE: {
      return {
        ...state,
        isEditing: false,
        isEdited: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};
