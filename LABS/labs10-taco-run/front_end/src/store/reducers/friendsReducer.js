import {
  FRIENDS_FETCH_START,
  FRIENDS_FETCH_COMPLETE,
  FRIENDS_FETCH_ERROR,
  FRIEND_ADD_START,
  FRIEND_ADD_COMPLETE,
  FRIEND_ADD_ERROR,
  FRIEND_DELETE_START,
  FRIEND_DELETE_COMPLETE,
  FRIEND_DELETE_ERROR
} from "../actions/friendsActions";

const initialState = {
  friends: [],
  friendFlag: null,
  fetchingFriends: false,
  fetchedFriends: false,

  addingFriend: false,
  addedFriend: false,

  deletingFriend: false,
  deletedFriend: false,

  error: null
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIENDS_FETCH_START:
      return {
        ...state,
        fetchingFriends: true,
        fetchedFriends: false
      };

    case FRIENDS_FETCH_COMPLETE:
      return {
        ...state,
        friends: action.payload,
        friendFlag: action.friendFlag,
        fetchingFriends: false,
        fetchedFriends: true
      };

    case FRIENDS_FETCH_ERROR:
      return {
        ...state,
        error: "Error fetching friends"
      };

    case FRIEND_ADD_START:
      return {
        ...state,
        addingFriend: true,
        addedFriend: false
      };
    case FRIEND_ADD_COMPLETE:
      return {
        ...state,
        friendFlag: action.friendFlag,
        friends: action.payload,
        addingFriend: false,
        addedFriend: true,
        error: null
      };

    case FRIEND_ADD_ERROR:
      return {
        ...state,
        error: "Error adding friend"
      };

    case FRIEND_DELETE_START:
      return {
        ...state,
        deletingFriend: true,
        deletedFriend: false
      };
    case FRIEND_DELETE_COMPLETE:
      return {
        ...state,
        friendFlag: action.friendFlag,
        friends: action.payload,
        deletingFriend: false,
        deletedFriend: true,
        error: null
      };

    case FRIEND_DELETE_ERROR:
      return {
        ...state,
        error: "Error deleting friend"
      };
    default:
      return state;
  }
};

export default friendsReducer;
