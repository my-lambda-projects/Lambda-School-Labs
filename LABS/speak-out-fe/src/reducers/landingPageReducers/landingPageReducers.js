import '../../actions/landingPageActions/landingPageActions';

const initialState = {
  reset: false
}

export const landingPageReducer = (state = initialState, action) => {
switch (action.type) {
    case 'RESET_NAV':
    return {
        ...state,
        reset: action.payload
    };
    default: return state;

  }
}