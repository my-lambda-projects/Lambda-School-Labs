import { FETCH_ACHIEVEMENTS } from '../actions';

const initialState = {
  achievements: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACHIEVEMENTS:
      return {
        ...state,
        achievements: action.payload
      };
    default:
      return state;
  }
};
