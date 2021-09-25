import {
  GET_CHILD_QUESTIONS,
  START_TEST,
  SET_SCORE,
  TEST_COMPLETED,
  NEXT_PAGE,
  SET_PAGE,
  START_TEST_TIMER,
  TEST_TIME_OUT,
} from '../../actions/userDashboardActions/placementActions';
const initialState = {
  timerActive: false,
  questions: [],
  currentQuestion: {},
  page: 0,
  userAwnsers: [],
  score: 0,
};
export const placementTestingReducer = (state = initialState, { type, payload }) => {
  const currentQuestion = () => {
    return state.questions.filter(question => question.key === state.page + 1); // page starts at 2 for test
  };
  switch (type) {
    case GET_CHILD_QUESTIONS:
      return {
        ...state,
        questions: payload,
      };
    case START_TEST:
      return {
        ...state,
        page: state.page + 1,
        currentQuestion: currentQuestion(),
      };
    case SET_SCORE:
      return {
        ...state,
        score: payload,
      };
    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
        userAwnsers: [...state.userAwnsers, payload],
        currentQuestion: currentQuestion(),
      };
    case SET_PAGE:
      return {
        ...state,
        page: payload,
        userAwnsers: [...state.userAwnsers],
        currentQuestion: currentQuestion(),
      };
    case START_TEST_TIMER:
      return {
        ...state,
        timerActive: true,
      };
    case TEST_TIME_OUT:
      return {
        ...state,
        timerActive: false,
      };
    default:
      return state;
  }
};
