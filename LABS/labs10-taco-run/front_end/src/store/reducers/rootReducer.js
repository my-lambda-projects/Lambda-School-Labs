import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import eventsReducer from "./eventsReducer";
import commentsReducer from "./commentsReducer";
import favoritesReducer from "./favoritesReducer";
import friendsReducer from "./friendsReducer";

import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  userReducer,
  eventsReducer,
  commentsReducer,
  favoritesReducer,
  friendsReducer
});

export default rootReducer;
