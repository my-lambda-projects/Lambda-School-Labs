const initialState = {
  profileLoading: true,
  errors: {},
  currentProfile: null,
  allProfiles: [],
};

export default (state = initialState, action) => {
  // return shallow copy of allProfiles
  const newProfiles = state.allProfiles.slice();

  switch (action.type) {
    case "LOADING_PROFILE":
      return { ...state, profileLoading: true };

    case "READ_PROFILE":
      return { ...state, currentProfile: action.data, profileLoading: false };

    case "READ_PROFILES":
      return { ...state, allProfiles: action.data, profileLoading: false };

    case "CREATE_PROFILE":
      newProfiles.push(action.data);
      return { ...state, allProfiles: newProfiles, profileLoading: false };

    case "UPDATE_PROFILE":
      const updatedProfile = action.data;
      const indexToUpdate = newProfiles.indexOf(
        newProfiles.filter(profile => profile.id === updatedProfile.id)[0]
      );
      newProfiles.splice(indexToUpdate, 1, updatedProfile);
      return { ...state, allProfiles: newProfiles, profileLoading: false };

    case "DELETE_PROFILE":
      const new_profiles = newProfiles.filter(
        profile => profile.id !== action.data
      );
      return { ...state, allProfiles: new_profiles, profileLoading: false };

    // TODO: double check this
    case "ERROR":
      return { ...state, error: action.errorMessage };

    default:
      return state;
  }
};
