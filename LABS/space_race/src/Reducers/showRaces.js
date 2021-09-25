import { GOTRACES, GETTINGRACES, ERROR } from '../Actions/showRaces';

const initialState = {
  races: [],
  error: null,
  gettingRaces: false,
  gotRaces: false
}


const showRacesReducer = (state=initialState, action) => {
  switch(action.type) {
    case GETTINGRACES:
      return {...state, gettingRaces: true}
    case GOTRACES:
      return {...state, gotRaces: true, gettingRaces: false, races: [...state.races, ...action.payload]};
    case ERROR:
      return {...state, gettingRaces: false, error: action.payload}
    default:
      return state;
  }
}

export default showRacesReducer