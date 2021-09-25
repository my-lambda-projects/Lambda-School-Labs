import { STUDENTCREATED, CREATINGSTUDENT, ERROR } from '../Actions/studentPage';

let initialState = {
  studentCreated: false,
  creatingStudent: false,
  error: null
}




const StudentReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATINGSTUDENT:
      return {...state, creatingStudent: true};
    case STUDENTCREATED:
      return {...state, creatingStudent: false, studentCreated: true};
    case ERROR:
      return {...state, creatingStudent: false, studentCreated: false, error: action.payload}
    default:
      return state
  }
}

export default StudentReducer