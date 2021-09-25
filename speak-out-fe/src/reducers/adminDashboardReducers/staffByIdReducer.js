import {
  FETCH_STAFFBYID_START,
  FETCH_STAFFBYID_SUCCESS,
  FETCH_STAFFBYID_FAILURE,
  EDIT_TOGGLE_STAFFBYID,
  EDIT_STAFFBYID_START,
  EDIT_STAFFBYID_SUCCESS,
  EDIT_STAFFBYID_FAILURE,
  DELETE_STAFF_START,
  DELETE_STAFF_SUCCESS,
  DELETE_STAFF_FAILURE
} from '../../actions';

const initialState = {
  staffById: {},
  isLoading: false,
  error: null,
  isEditing: false,
  isEdited: false
};

export const staffByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STAFFBYID_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_STAFFBYID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffById: action.payload
      };
    case FETCH_STAFFBYID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
      case EDIT_TOGGLE_STAFFBYID:
      return {
        ...state,
        isEditing: !state.isEditing,
        error: null
      };
    case EDIT_STAFFBYID_START:
      return {
        ...state,
        isEditing: true,
        error: null
      };
    case EDIT_STAFFBYID_SUCCESS:
      return {
        ...state,
        isEditing: false,
        isEdited: true,
        staffById: action.payload
      };
    case EDIT_STAFFBYID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_STAFF_START:
      return {
        ...state,
        isEditing: false,
        isLoading: true,
        error: null
      };
    case DELETE_STAFF_SUCCESS:
      return {
        ...state,
        isEditing: false,
        staffById: null
      };
    case DELETE_STAFF_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
