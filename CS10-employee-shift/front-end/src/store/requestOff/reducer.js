const initialState = {
  requestOffsLoading: true,
  errors: {},
  allRequestOffs: [],
};

export default (state = initialState, action) => {
  // return shallow copy of allRequestOffs
  const newRequestOffs = state.allRequestOffs.slice();

  switch (action.type) {
    case "LOADING_REQUESTOFF":
      return { ...state, requestOffsLoading: true };

    case "READ_REQUESTOFF":
      return {
        ...state,
        allRequestOffs: action.data,
        requestOffsLoading: false,
      };

    case "CREATE_REQUESTOFF":
      newRequestOffs.push(action.data);
      return {
        ...state,
        allRequestOffs: newRequestOffs,
        requestOffsLoading: false,
      };

    case "UPDATE_REQUESTOFF":
      const updatedRequestsOff = action.data;
      const indexToUpdate = newRequestOffs.indexOf(
        newRequestOffs.filter(
          requestOff => requestOff.id === updatedRequestsOff.id
        )[0]
      );
      newRequestOffs.splice(indexToUpdate, 1, updatedRequestsOff);
      return {
        ...state,
        allRequestOffs: newRequestOffs,
        requestOffsLoading: false,
      };

    case "DELETE_REQUESTOFF":
      const deletedRequestOff = newRequestOffs.filter(
        requestOff => requestOff.id !== action.data
      );
      return {
        ...state,
        allRequestOffs: deletedRequestOff,
        requestOffsLoading: false,
      };

    // TODO: double check this
    case "ERROR":
      return { ...state, error: action.errorMessage };

    default:
      return state;
  }
};
