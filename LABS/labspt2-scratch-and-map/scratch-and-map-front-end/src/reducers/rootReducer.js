import { combineReducers } from "redux";
import { getUserDataReducer } from "./mapReducer";
import { updateLoginReducer } from "./loggedInReducer";

export default combineReducers({
  getUserDataReducer,
  updateLoginReducer
});
