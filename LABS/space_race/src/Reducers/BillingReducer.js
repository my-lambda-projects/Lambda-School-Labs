import { SIGN_UP_TOGGLE } from '../Actions';

export default (state = false, action) => {
    switch (action.type) {
      case SIGN_UP_TOGGLE:
        return action.payload;
      default:
        return state;
    }
}