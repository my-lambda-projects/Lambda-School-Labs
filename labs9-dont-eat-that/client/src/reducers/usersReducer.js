import * as actionTypes from '../actions';

const initialState = {
  users: [],
  user: { allergies: [] },
  error: null
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return { ...state, user: action.payload };
    case actionTypes.ADD_USER:
      return {
        ...state,
        users: [
          ...state.users,
          { id: action.payload.id, firebaseid: action.payload.firebaseid }
        ]
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: { allergies: [] }
      };
    case actionTypes.GET_UALLERGIES:
      return {
        ...state,
        user: {
          ...state.user,
          allergies: action.payload
        }
      };
    case actionTypes.ADD_ALLERGY:
      return {
        ...state,
        user: {
          ...state.user,
          allergies: [...state.user.allergies, action.payload]
        }
      };
    case actionTypes.DELETE_ALLERGY:
      return {
        ...state,
        user: {
          ...state.user,
          allergies: action.payload
        }
      };
    case actionTypes.CANCEL_SUB:
      return { ...state, user: { ...state.user, subscriptionid: null } };
    case actionTypes.ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
