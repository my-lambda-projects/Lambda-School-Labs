import {
    FETCH_STUDENTSBYCOURSEID_START,
    FETCH_STUDENTSBYCOURSEID_SUCCESS,
    FETCH_STUDENTSBYCOURSEID_FAILURE,
} from '../../actions';



const initialState = {
    studentByCourseId: [],
    isLoading: false,
    error: null 
};



export const studentsByCourseIDReducer = (state = initialState, action) => {
    switch (action.type) {
        case  FETCH_STUDENTSBYCOURSEID_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case  FETCH_STUDENTSBYCOURSEID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                studentByCourseId: action.payload
            }
        case FETCH_STUDENTSBYCOURSEID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
            default: 
            return state
        }
    }