import {
    SET_FILTER_STUDENT,
    FETCH_STUDENTS_START,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,

    CREATE_NEW_STUDENT_START,
    CREATE_NEW_STUDENT_SUCCESS,
    CREATE_NEW_STUDENT_FAILURE,

    FETCH_DROPDOWN_START,
    FETCH_DROPDOWN_SUCCESS,
    FETCH_DROPDOWN_FAILURE,

} from '../../actions';

const initialState = {
    listIsLoading: false,
    isLoading: false,
    listError: null,
    error: null,
    studentList: [],
    searchTerm: "",
    studentById: [],
    cardIsLoading: false,
    cardFetching: false,
    cardError: null,
    cardIsEditting: false,
    cardIsEditted: false,
    locationsTable: [],
    contactTypesTable: [],
    blocksTable: [],
    schoolGradeTable: [],
    createNewStudentIsLoading: false,
    createNewStudentError: null,
    createNewStudentSuccessMessage: '',
    needToUpdateStudentList: false
}

export const studentTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENTS_START:
            return {
                ...state,
                listIsLoading: true,
                listError: null
            };
        case FETCH_STUDENTS_SUCCESS:
            return {
                ...state,
                listIsLoading: false,
                listError: null,
                studentList: action.payload
            };
        case FETCH_STUDENTS_FAILURE:
            return {
                ...state,
                listIsLoading: false,
                listError: action.payload
            }
            case SET_FILTER_STUDENT:
                return {
                    ...state,
                    searchTerm: action.payload
                }
        //add student
        case CREATE_NEW_STUDENT_START:
            return {
                ...state,
                needToUpdateStudentList: false,
                createNewStudentIsLoading: true
            }
        case CREATE_NEW_STUDENT_SUCCESS:
            return {
                ...state,
                createNewStudentIsLoading: false,
                createNewStudentSuccessMessage: 'Student has been successfully added',
                needToUpdateStudentList: true,
                studentList: [action.payload, ...state.studentList]
            }
        case CREATE_NEW_STUDENT_FAILURE:
            return {
                ...state,
                needToUpdateStudentList: false,
                createNewStudentError: 'Something went wrong'
            }
            case 'RESET_FORM':
                return {
                  ...state,
                  studentById: []
                }
        //dropdown
        case FETCH_DROPDOWN_START:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case FETCH_DROPDOWN_SUCCESS:
            let grade = action.payload.school_grades.map(each => {
                let obj= {value: each.id, label: each.name}
                return obj;
            })
            let block = action.payload.blocks.map(each => {
                let obj = {value: each.block_code, label: each.block_code}
                return obj;
            })
            let contact = action.payload.contact_types.map(each => {
                let obj = {value : each.id, label: each.method}
                return obj;
            })
            let location = action.payload.locations.map(each => {
                let obj = {value: each.id, label: each.name}
                return obj;
            })
            return {
                ...state,
                isLoading: false,
                locationsTable: location,
                contactTypesTable: contact,
                blocksTable: block,
                schoolGradeTable: grade,
                error: null,
            }
        case FETCH_DROPDOWN_FAILURE:
            return {
                ...state,
                IsLoading: false,
                error: action.payload
            }
        default: return state;

    }
}