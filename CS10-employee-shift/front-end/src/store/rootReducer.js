import { combineReducers } from "redux";

import account from "./Account/reducer.js";
import availability from "./Availability/reducer.js";
import hourOfOperation from "./hourOfOperation/reducer.js";
import profile from "./Profile/reducer.js";
import requestOff from "./requestOff/reducer.js";
import shift from "./Shift/reducer.js";
import user from "./User/reducer.js";

export const rootReducer = combineReducers({
  account,
  availability,
  hourOfOperation,
  profile,
  requestOff,
  shift,
  user,
});
