const initialState = {
  availabilityLoading: true,
  errors: {},
  allAvailabilities: [],
};

export default (state = initialState, action) => {
  // return shallow copy of allAvailabilities
  const newAvailabilities = state.allAvailabilities.slice();

  switch (action.type) {
    case "LOADING_AVAILABILITIES":
      return { ...state, availabilityLoading: true };

    case "READ_AVAILABILITIES":
      return {
        ...state,
        allAvailabilities: action.data,
        availabilityLoading: false,
      };

    case "CREATE_AVAILABILITIES":
      newAvailabilities.push(action.data);
      return {
        ...state,
        allAvailabilities: newAvailabilities,
        availabilityLoading: false,
      };

    case "UPDATE_AVAILABILITIES":
      const updatedAvailability = action.data;
      const indexToUpdate = newAvailabilities.indexOf(
        newAvailabilities.filter(
          avail => avail.id === updatedAvailability.id
        )[0]
      );
      newAvailabilities.splice(indexToUpdate, 1, updatedAvailability);
      return {
        ...state,
        allAvailabilities: newAvailabilities,
        availabilityLoading: false,
      };

    case "DELETE_AVAILABILITIES":
      const new_avail = newAvailabilities.filter(
        avail => avail.id !== action.data
      );
      return {
        ...state,
        allAvailabilities: new_avail,
        availabilityLoading: false,
      };

    // TODO: double check this
    case "ERROR":
      return { ...state, error: action.data };

    default:
      return state;
  }
};
