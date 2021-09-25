import {
    FETCH_STAFFCOURSES_START,
    FETCH_STAFFCOURSES_SUCCESS,
    FETCH_STAFFCOURSES_FAILURE
} from '../../actions'


const initialState = {
    isLoading: false,
    error: null,
    coursesByStaffId: [],
}

export const staffCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STAFFCOURSES_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_STAFFCOURSES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                coursesByStaffId: action.payload
            };
        case FETCH_STAFFCOURSES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default: return state;
  
    }
  }