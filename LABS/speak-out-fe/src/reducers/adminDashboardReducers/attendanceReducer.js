import {
    CREATE_ATTENDANCE_START,
    CREATE_ATTENDANCE_SUCCESS,
    CREATE_ATTENDANCE_FAILURE,
    FETCH_STUDENTATTENDANCE_START,
    FETCH_STUDENTATTENDANCE_SUCCESS,
    FETCH_STUDENTATTENDANCE_FAILURE
} from '../../actions';

const initialState = {
    studentByCourseId: [],
    attendanceList: [],
    attendanceResponse: '',
    isLoading: false,
    error: null,
};

export const attendanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case  CREATE_ATTENDANCE_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case  CREATE_ATTENDANCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                studentByCourseId: action.payload
            }
        case CREATE_ATTENDANCE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case  FETCH_STUDENTATTENDANCE_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case  FETCH_STUDENTATTENDANCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                attendanceList: action.payload,
            }
        case FETCH_STUDENTATTENDANCE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
            default: 
            return state
        }
    };
