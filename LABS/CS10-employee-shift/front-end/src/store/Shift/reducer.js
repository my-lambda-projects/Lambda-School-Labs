const initialState = {
  shiftsLoading: true,
  errors: {},
  allShifts: [],
};

export default (state = initialState, action) => {
  const shifts = state.allShifts.slice();

  switch (action.type) {
    case "LOADING_SHIFTS":
      return { ...state, shiftsLoading: true };

    case "READ_SHIFT":
      return { ...state, allShifts: action.data, shiftsLoading: false };

    case "CREATE_SHIFT":
      shifts.push(action.data);
      return { ...state, allShifts: shifts, shiftsLoading: false };

    case "UPDATE_SHIFT":
      const updatedShift = action.data;
      const indexToUpdate = shifts.indexOf(
        shifts.filter(shift => shift.id === updatedShift.id)[0]
      );
      shifts.splice(indexToUpdate, 1, updatedShift);
      return { ...state, allShifts: shifts, shiftsLoading: false };

    case "DELETE_SHIFT":
      const new_shifts = shifts.filter(shift => shift.id !== action.data);
      return { ...state, allShifts: new_shifts, shiftsLoading: false };

    // TODO: double check this
    case "ERROR":
      return { ...state, error: action.errorMessage };

    default:
      return state;
  }
};
