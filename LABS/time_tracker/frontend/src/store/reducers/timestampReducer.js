import { START_TIMER, STOP_TIMER } from '../action/timestampActions';
import { LOGOUT } from '../action/userActions';

const initialState = {
  activeTimerId: '',
  startTime: '',
  activeTimer: false
};

export const timestampReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        activeTimerId: action.payload._id,
        startTime: action.payload.startTime,
        activeTimer: true
      };
    case STOP_TIMER:
      return {
        ...state,
        activeTimerId: '',
        startTime: '',
        activeTimer: false
      };
    case LOGOUT:
      return {
        activeTimerId: '',
        startTime: '',
        activeTimer: false
      };
    default:
      return state;
  }
};
