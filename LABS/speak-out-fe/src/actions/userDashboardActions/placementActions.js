import testObject from '../../views/userDashboard/components/placementTest/Child/TestObject';
import { editStudentById } from '../adminDashboardActions/studentByIdAction';
import axiosWithAuth from '../../utils/axiosWithAuth';
export const GET_CHILD_QUESTIONS = 'GET_CHILD_QUESTIONS';
export const START_TEST = 'START_TEST';
export const SET_SCORE = 'SET_SCORE';
export const TEST_COMPLETED = 'TEST_COMPLETED';
export const NEXT_PAGE = 'NEXT_PAGE';
export const SET_PAGE = 'SET_PAGE';
export const TEST_TIME_OUT = 'TEST_TIME_OUT';
export const START_TEST_TIMER = 'START_TEST_TIMER';
// Initialise Child Placemment Test
export const getChildQuestions = () => ({
  type: GET_CHILD_QUESTIONS,
  payload: testObject,
});
export const startTest = (studentID, state) => dispatch =>
  dispatch(editStudentById(studentID, state), dispatch({ type: START_TEST }));
export const startTestTimer = () => ({
  type: TEST_TIME_OUT,
});
export const timeOut = payload => dispatch => ({
  type: TEST_TIME_OUT,
  payload,
});
export const setScore = payload => ({
  type: SET_SCORE,
  payload,
});

export const completeTest = payload => dispatch => {
  axiosWithAuth()
    .post(`/placementExam/student`, payload)
    .then(res => {
      return null;
    })
    .catch(err => console.log(err))
};

export const nextPage = data => ({
  type: NEXT_PAGE,
  payload: data,
});
export const setPage = data => ({
  type: SET_PAGE,
  payload: data,
});
