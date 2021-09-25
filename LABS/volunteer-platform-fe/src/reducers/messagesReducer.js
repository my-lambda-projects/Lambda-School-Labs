import {
  USER_HAS_NO_MESSAGES,
  COLLECTED_USER_MESSAGES,
  COLLECTING_USER_MESSAGES_INIT,
} from '../actions/messaging';

export const messageReducer = (state, action) => {
  
  switch (action.type){
    case COLLECTING_USER_MESSAGES_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case USER_HAS_NO_MESSAGES:
      delete (state.messages[ action.payload ]);
      return {
        ...state,
        messages: {...state.messages},
        error: 'The user has no messages at this time.',
        isLoading: false,
      };
    case COLLECTED_USER_MESSAGES:
      return {
        ...state,
        messages: {...state.messages, ...action.payload},
        isLoading: false,
        error: '',
      };
    default:
      return state;
  }
};
