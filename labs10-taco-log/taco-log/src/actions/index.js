//start dispatching actions here

//async dispatch example
// export const fetchData = () => dispatch => {
//     axios
//       .get('http://localhost:5000/api/friends')
//       .then(res => dispatch({ type: FETCH_DATA, payload: res.data }))
//       .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
//   };
//synchronus data example
// export const addTodo = todoObj => {
//     return {
//         type: ADD_TODO,
//         payload: todoObj
//       };
//     };

import {
  FETCH_TACOS,
  GET_TACO,
  ADDDATABASE_TACOS,
  storeLandingTaco,
  STORE_LANDING_TACO,
  clearLandingTaco,
  CLEAR_LANDING_TACO
} from "./tacoActions";
import { FETCH_ACHIEVEMENTS, fetchAchievements } from "./achievementActions";
import {
  GET_USER,
  CREATE_USER,
  loginUser,
  ASSIGN_ACHIEVEMENT,
  UPDATE_STATS,
  logTaco,
  DELETE_TACO,
  deleteTaco,
  assignAchievement,
  LOCATION_CHANGE,
  locationChange,
  LOG_TACO,
  updateStats,
  LOG_OUT,
  logoutUser,
  UPDATE_USER,
  updateUser,
  fetchUser
} from "./userActions";

export {
  FETCH_TACOS,
  ADDDATABASE_TACOS,
  GET_USER,
  CREATE_USER,
  loginUser,
  ASSIGN_ACHIEVEMENT,
  UPDATE_STATS,
  logTaco,
  DELETE_TACO,
  deleteTaco,
  assignAchievement,
  LOCATION_CHANGE,
  locationChange,
  LOG_TACO,
  GET_TACO,
  updateStats,
  LOG_OUT,
  logoutUser,
  UPDATE_USER,
  updateUser,
  FETCH_ACHIEVEMENTS,
  fetchAchievements,
  fetchUser,
  storeLandingTaco,
  STORE_LANDING_TACO,
  clearLandingTaco,
  CLEAR_LANDING_TACO
};
