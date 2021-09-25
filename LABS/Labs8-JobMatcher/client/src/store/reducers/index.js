import userReducer from "../../features/auth/store/reducer";
import billingReducer from "../../features/billing/store/reducer";
import matchesReducer from "../../features/matches/store/reducer";
import viewReducer from "../../features/view/store/reducer";
import jobReducer from "../../features/job/store/reducer";
import { combineReducers } from "redux";

export default combineReducers({
  user: userReducer,
  randomUser: viewReducer,
  matches: matchesReducer,
  billing: billingReducer,
  jobs: jobReducer
});
