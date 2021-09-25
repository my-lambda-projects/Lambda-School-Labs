const initialState = {
  HoOLoading: true,
  errors: {},
  allHoOs: [],
};

export default (state = initialState, action) => {
  // return shallow copy of hoos
  const oldHoO = state.allHoOs.slice();

  switch (action.type) {
    case "LOADING_HOO":
      return { ...state, HoOLoading: true };

    case "READ_HOO":
      return { ...state, allHoOs: action.data, HoOLoading: false };

    case "CREATE_HOO":
      oldHoO.push(action.data);
      return { ...state, allHoOs: oldHoO, HoOLoading: false };

    case "UPDATE_HOO":
      const updatedHoO = action.data;
      const indexToUpdate = oldHoO.indexOf(
        oldHoO.filter(shift => shift.id === updatedHoO.id)[0]
      );
      oldHoO.splice(indexToUpdate, 1, updatedHoO);
      return { ...state, allHoOs: oldHoO, HoOLoading: false };

    case "DELETE_HOO":
      const new_hoO = oldHoO.filter(HoO => HoO.id !== action.data);
      return { ...state, allHoOs: new_hoO, HoOLoading: false };

    // TODO: double check this
    case "ERROR":
      return { ...state, error: action.errorMessage };

    default:
      return state;
  }
};
