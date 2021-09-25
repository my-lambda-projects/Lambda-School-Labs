import { FETCH_TACOS, 
  // ADDDATABASETACOS, 
  STORE_LANDING_TACO, CLEAR_LANDING_TACO } from '../actions';

const initialState = {
  tacos: [],
  landingTaco: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TACOS:
      return {
        ...state,
        tacos: action.payload
      };
    case STORE_LANDING_TACO:
      return {
        ...state,
        landingTaco: action.payload
      }
    case CLEAR_LANDING_TACO:
      return {
        ...state,
        landingTaco: []
      }
    default:
      return state;
  }
};
