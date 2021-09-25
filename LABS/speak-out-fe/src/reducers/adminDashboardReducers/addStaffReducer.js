import {
  ADD_STAFF_START,
  ADD_STAFF_SUCCESS,
  ADD_STAFF_FAILURE,
} from '../../actions'


const initialState = {
    staffById: [],
    isLoading: false,
    error: null,
    isPosting: false,
    isPosted: false,
}

export const addStaffReducer = (state = initialState, action) => {
    switch (action.type) {
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
                    isPosted: true,
                    staffById: action.payload
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