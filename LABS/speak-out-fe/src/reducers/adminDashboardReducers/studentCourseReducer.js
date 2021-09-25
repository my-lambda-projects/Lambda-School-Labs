import {
    FETCH_STUDENTCOURSES_START,
    FETCH_STUDENTCOURSES_SUCCESS,
    FETCH_STUDENTCOURSES_FAILURE
} from '../../actions';


const initialState = {
    courseByStudentId: [],
    isLoading: false,
    error: null
}


export const studentCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case  FETCH_STUDENTCOURSES_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_STUDENTCOURSES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                courseByStudentId: action.payload
            };
        case FETCH_STUDENTCOURSES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

            default: return state;

        }
    }