import {
  // User Fetch
  USER_FETCH_START,
  USER_FETCH_COMPLETE,
  USER_FETCH_ERROR,

  // Other User Fetch
  OTHER_USER_FETCH_START,
  OTHER_USER_FETCH_COMPLETE,
  OTHER_USER_FETCH_ERROR,

  // Users search
  USERS_SEARCH_START,
  USERS_SEARCH_COMPLETE,
  USERS_SEARCH_ERROR,

  // User Update
  USER_UPDATE_START,
  USER_UPDATE_COMPLETE,
  USER_UPDATE_ERROR
} from "../actions/userActions";

const initialState = {
  user: {},
  fetchingUser: false,
  fetchedUser: false,

  otherUser: {},
  fetchingOtherUser: false,
  fetchedOtherUser: false,

  users: [],
  searchingUsers: false,
  searchedUsers: false,

  updatingUser: false,
  updatedUser: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FETCH_START:
      return {
        ...state,
        fetchingUser: true
      };

    case USER_FETCH_COMPLETE:
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
        fetchedUser: true
      };

    case USER_FETCH_ERROR:
      return {
        ...state,
        error: "Error fetching user"
      };

    case OTHER_USER_FETCH_START:
      return {
        ...state,
        fetchingUser: true
      };

    case OTHER_USER_FETCH_COMPLETE:
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
        fetchedUser: true
      };

    case OTHER_USER_FETCH_ERROR:
      return {
        ...state,
        error: "Error fetching other user"
      };

    case USERS_SEARCH_START:
      return {
        ...state,
        searchingUsers: true
      };

    case USERS_SEARCH_COMPLETE:
      return {
        ...state,
        users: action.payload,
        searchingUsers: false,
        searchedUsers: true
      };

    case USERS_SEARCH_ERROR:
      return {
        ...state,
        error: "Error searching users"
      };
    case USER_UPDATE_START:
      return {
        ...state,
        updatingUser: true,
        updatedUser: false
      };

    case USER_UPDATE_COMPLETE:
      return {
        ...state,
        user: action.payload,
        updatingUser: false,
        updatedUser: true
      };

    case USER_UPDATE_ERROR:
      return {
        ...state,
        error: "Error updating user info"
      };

    default:
      return state;
  }
};

export default userReducer;
