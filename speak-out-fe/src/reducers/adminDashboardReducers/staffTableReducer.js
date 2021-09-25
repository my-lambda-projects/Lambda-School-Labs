import {
    FETCH_STAFF_START,
    FETCH_STAFF_SUCCESS,
    FETCH_STAFF_FAILURE,
    SET_FILTER_STAFF,
    FETCH_NEXTAVAILABLEID,
    ADD_STAFF_START,
    ADD_STAFF_SUCCESS,
    ADD_STAFF_FAILURE,
} from '../../actions'


const initialState = {
    isLoading: false,
    error: null,
    staffList: [],
    searchTerm: "",
    availableID: '',
    isPosting: false,
    isPosted: false,
}

export const staffTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STAFF_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                staffList: action.payload
            };
        case FETCH_NEXTAVAILABLEID:
            return {
                ...state,
                isLoading: false,
                error: null,
                availableID: action.payload
            }
        case FETCH_STAFF_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        // search 
        case SET_FILTER_STAFF:
        return {
            ...state,
            searchTerm: action.payload
        }
        case ADD_STAFF_START:
                return {
                    ...state,
                    isLoading: true,
                    isPosting: false,
                    error: null
                };
            case ADD_STAFF_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    error: null,
                    isPosting: false,
                    isPosted:true,
                    staffList: [action.payload, ...state.staffList]
                };
            case ADD_STAFF_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
        default: return state;
  
    }
  }