import {
    FETCH_PARENTS_START,
    FETCH_PARENTS_SUCCESS,
    FETCH_PARENTS_FAILURE,

    FETCH_PARENTBYID_START,
    FETCH_PARENTBYID_SUCCESS,
    FETCH_PARENTBYID_FAILURE,

    EDIT_PARENTBYID_START,
    EDIT_PARENTBYID_SUCCESS,
    EDIT_PARENTBYID_FAILURE,

    FETCH_STUDENTBYFAMILYID_START,
    FETCH_STUDENTBYFAMILYID_SUCCESS,
    FETCH_STUDENTBYFAMILYID_FAILURE,

    ADD_PARENT_START,
    ADD_PARENT_SUCCESS,
    ADD_PARENT_FAILURE,
    SET_FILTER_PARENT,
  } from '../../actions';
  
  const initialState = {
        isLoading: false,
        error: null,
        parentList: [],
        parentById: [],
        studentByFamilyId: [],
        isEditing: false,
        isEdited: false,
        isPosting: false,
        searchTerm:""
  }
  
  export const parentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PARENTS_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_PARENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                parentList: action.payload
            };
        case FETCH_PARENTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        /// get by ID 
        case FETCH_PARENTBYID_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_PARENTBYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                parentById: action.payload
            };
        case FETCH_PARENTBYID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
            // edit by id
        case EDIT_PARENTBYID_START:
            return {
                ...state,
                isEditing: !state.isEditing,
                error: null,
            }
        case  EDIT_PARENTBYID_SUCCESS:
            return {
                ...state,
                isEditing: !state.isEditing,
                isEdited: true,
                parentById: action.payload
            }
        case EDIT_PARENTBYID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
            //get by familyId
            case FETCH_STUDENTBYFAMILYID_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_STUDENTBYFAMILYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                studentByFamilyId: action.payload
            };
        case FETCH_STUDENTBYFAMILYID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
            //add Parent
            case ADD_PARENT_START:
                return {
                    ...state,
                    isLoading: true,
                    isPosting: false,
                    error: null
                };
            case ADD_PARENT_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    error: null,
                    isPosting: false,
                    isPosted: true,
                    parentList: [...state.parentList, action.payload]
                };
            case ADD_PARENT_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }

        // search 
        case SET_FILTER_PARENT:
        return {
            ...state,
            searchTerm: action.payload
        }
        default: return state;
  
    }
  }