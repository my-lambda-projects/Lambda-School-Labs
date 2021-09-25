export const ADD_TIMESTAMP = 'ADD_TIMESTAMP';

export const addToInvoice = timestamp => {
  return dispatch => {
    dispatch({ type: ADD_TIMESTAMP, payload: timestamp });
  };
};
