import * as Actions from "../actions/actionDefinitions";

const initialState = {
  workouts: [],
  performances: [],
  msg: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.FETCHING_WORKOUTS:
      return {
        ...state,
        msg: action.payload
      };
    case Actions.FETCH_WORKOUTS_SUCCESS:
      return {
        ...state,
        msg: "Fetched the user's scheduled workouts",
        workouts: action.payload
      };
    case Actions.FETCH_WORKOUTS_FAILURE:
      return {
        ...state,
        msg: "Couldn't fetch the user's scheduled workouts"
      };
    case Actions.SCHEDULING_WORKOUT:
      return {
        ...state,
        msg: action.payload
      };
    case Actions.SCHEDULE_WORKOUT_SUCCESS:
      return {
        ...state,
        msg: "Scheduled user's workout",
        workouts: [...state.workouts, action.payload.hydratedWorkout],
        performances: state.performances.concat(
          action.payload.hydratedWorkout.performances
        )
      };
    case Actions.SCHEDULE_WORKOUT_FAILURE:
      return {
        ...state,
        msg: "Couldn't schedule the user's workout"
      };
    case Actions.COPYING_WORKOUTS:
      return {
        ...state,
        msg: action.payload
      };
    case Actions.COPY_WORKOUTS_SUCCESS:
      const newWorkouts = action.payload.map(subResponse => {
        return subResponse.hydratedWorkout || subResponse.workoutDoc;
      });
      const newPerformances = newWorkouts.map(workout => {
        return workout.performances;
      });
      const flattenedPerformances = newPerformances.flat();
      return {
        ...state,
        msg: "Successfully copied workouts",
        workouts: state.workouts.concat(newWorkouts),
        performances: state.performances.concat(flattenedPerformances)
      };
    case Actions.COPY_WORKOUTS_FAILURE:
      return {
        ...state,
        msg: "Failed to duplicate workouts."
      };

    case Actions.DELETE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.filter(workout => {
          return workout._id !== action.payload;
        })
      };
    case Actions.FETCHING_PERFORMANCES:
      return {
        ...state,
        msg: action.payload
      };
    case Actions.FETCH_PERFORMANCES_SUCCESS:
      return {
        ...state,
        msg: "Fetched the user's performances",
        performances: action.payload
      };
    case Actions.FETCH_PERFORMANCES_FAILURE:
      return {
        ...state,
        msg: "Couldn't fetch the user's performances"
      };
    case Actions.LOGOUT:
      return {
        ...state,
        workouts: [],
        performances: [],
        msg: "Cleared calendars after logout"
      }
    default:
      return state;
  }
};
