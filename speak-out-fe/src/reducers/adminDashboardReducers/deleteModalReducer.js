import { TOGGLE_DELETE_MODAL } from '../../actions';

const initialState = {
  isVisible: false
};

export const deleteModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DELETE_MODAL:
      return {
        ...state,
        isVisible: action.payload
      };
    default:
      return state;
  }
};
