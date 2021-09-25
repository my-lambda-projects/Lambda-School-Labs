import * as Actions from "./actionDefinitions";
const axios = require("axios");

const ROOT_URL = "http://localhost:8080";

let requestOptions = {};
// requestOptions is updated upon receipt of a token to include that
// token as a header in axios requests. In practice, all you need
// to do to interact with an access-controlled route is include this
// requestOptions object as the final parameter in your Axios call.

// Landing Page
export const register = (data, history, modal) => {
  return dispatch => {
    dispatch({
      type: Actions.REGISTERING,
      payload: "Registering..."
    });
    axios
      .post(`${ROOT_URL}/register`, data)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        requestOptions = { headers: { "x-access-token": res.data.token } };
        dispatch({
          type: Actions.REGISTER_SUCCESS,
          payload: res
        });
        modal();
        history.push("/workouts");
      })
      .catch(err => {
        dispatch({
          type: Actions.REGISTER_FAILURE,
          payload: err
        });
        dispatch({
          type: Actions.GET_VAL_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const login = (data, history, modal) => {
  return dispatch => {
    dispatch({
      type: Actions.LOGGING_IN,
      payload: "Logging in..."
    });
    axios
      .post(`${ROOT_URL}/login`, data)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        requestOptions = { headers: { "x-access-token": res.data.token } };
        dispatch({
          type: Actions.LOGIN_SUCCESS,
          payload: res
        });

        axios
        .get(`${ROOT_URL}/routines`, requestOptions)
        .then(res => {
          dispatch({
            type: Actions.FETCH_ROUTINES_SUCCESS,
            payload: res
          });

          axios
            .get(`${ROOT_URL}/progress`, requestOptions)
            .then(res => {
              dispatch({
                type: Actions.FETCH_PROGRESS_SUCCESS,
                payload: res.data.progress
              });
              modal();
              history.push("/workouts");
            })
            .catch(err => {
              dispatch({
                type: Actions.ADD_PROGRESS_FAILURE,
                payload: err
              });
            });
        })
        .catch(err =>
          dispatch({ type: Actions.FETCH_ROUTINES_FAILURE, payload: err })
        );
      })
      .catch(err => {
        dispatch({
          type: Actions.LOGIN_FAILURE,
          payload: err
        });
        dispatch({
          type: Actions.GET_VAL_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const loginWithToken = token => {
  return dispatch => {
    dispatch({
      type: Actions.LOGGING_IN,
      payload: "Logging in with token..."
    });
    requestOptions = { headers: { "x-access-token": token } };
    axios
      .get(`${ROOT_URL}/auto-login`, requestOptions)
      .then(res => {
        dispatch({
          type: Actions.LOGIN_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.LOGIN_FAILURE,
          payload: err
        });
      });
  };
};

export const logout = () => {
  localStorage.clear();
  return {
    type: Actions.LOGOUT
  };
};

export const forgotPassword = data => {
  return dispatch => {
    dispatch({
      type: Actions.SENDING_RECOVERY_EMAIL,
      payload: "Sending recovery email..."
    });
    axios
      .post(`${ROOT_URL}/forgot_password`, data)
      .then(res => {
        dispatch({
          type: Actions.SEND_EMAIL_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.SEND_EMAIL_FAILURE,
          payload: err
        });
        dispatch({
          type: Actions.GET_VAL_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const resetPassword = (data, history) => {
  return dispatch => {
    dispatch({
      type: Actions.RESETTING_PASSWORD,
      payload: "Resetting password..."
    });
    axios
      .post(`${ROOT_URL}/reset_password`, data)
      .then(res => {
        dispatch({
          type: Actions.RESET_SUCCESS,
          payload: res
        });
        history.push("/");
      })
      .catch(err => {
        dispatch({
          type: Actions.RESET_FAILURE,
          payload: err
        });
        dispatch({
          type: Actions.GET_VAL_ERRORS,
          payload: err.response.data
        });
      });
  };
};

// Settings Page
export const changeEmail = data => {
  let token = localStorage.getItem("token");
  return dispatch => {
    dispatch({
      type: Actions.CHANGING_EMAIL,
      payload: "Changing email..."
    });
    requestOptions = { headers: { "x-access-token": token } };
    axios
      .post(`${ROOT_URL}/settings_email`, data, requestOptions)
      .then(res => {
        dispatch({
          type: Actions.CHANGE_EMAIL_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.CHANGE_EMAIL_FAILURE,
          payload: err
        });
        dispatch({
          type: Actions.GET_VAL_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const changePassword = data => {
  let token = localStorage.getItem("token");
  return dispatch => {
    dispatch({
      type: Actions.CHANGING_PASSWORD,
      payload: "Changing password..."
    });
    requestOptions = { headers: { "x-access-token": token } };
    axios
      .post(`${ROOT_URL}/settings_password`, data, requestOptions)
      .then(res => {
        dispatch({
          type: Actions.CHANGE_PW_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.CHANGE_PW_FAILURE,
          payload: err
        });
        dispatch({
          type: Actions.GET_VAL_ERRORS,
          payload: err.response.data
        });
      });
  };
};

// Progress Page
export const addProgress = data => {
  let token = localStorage.getItem("token");
  return dispatch => {
    dispatch({
      type: Actions.ADDING_PROGRESS,
      payload: "Adding progress record..."
    });
    requestOptions = { headers: { "x-access-token": token } };
    axios
      .post(`${ROOT_URL}/progress`, data, requestOptions)
      .then(res => {
        dispatch({
          type: Actions.ADD_PROGRESS_SUCCESS,
          payload: res.data.progress
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.ADD_PROGRESS_FAILURE,
          payload: err
        });
      });
  };
};

export const fetchProgress = () => {
  let token = localStorage.getItem("token");
  return dispatch => {
    dispatch({
      type: Actions.FETCHING_PROGRESS,
      payload: "Fetching progress..."
    });
    requestOptions = { headers: { "x-access-token": token } };
    axios
      .get(`${ROOT_URL}/progress`, requestOptions)
      .then(res => {
        dispatch({
          type: Actions.FETCH_PROGRESS_SUCCESS,
          payload: res.data.progress
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.ADD_PROGRESS_FAILURE,
          payload: err
        });
      });
  };
};

export const updateProgress = (id, data) => {
  let token = localStorage.getItem("token");
  return dispatch => {
    dispatch({
      type: Actions.UPDATING_PROGRESS,
      payload: "Updating progress..."
    });
    requestOptions = { headers: { "x-access-token": token } };
    axios
      .put(`${ROOT_URL}/progress/${id}`, data, requestOptions)
      .then(res => {
        dispatch({
          type: Actions.UPDATE_PROGRESS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.UPDATE_PROGRESS_FAILURE,
          payload: err
        });
      });
  };
};

export const deleteProgress = id => {
  let token = localStorage.getItem("token");
  return dispatch => {
    requestOptions = { headers: { "x-access-token": token } };
    axios
      .delete(`${ROOT_URL}/progress/${id}`, requestOptions)
      .then(res => {
        dispatch({
          type: Actions.DELETE_PROGRESS,
          payload: id
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// Workouts Page
export const fetchRoutines = () => {
  let token = localStorage.getItem("token");
  return dispatch => {
    dispatch({
      type: Actions.FETCHING_ROUTINES,
      payload: "Fetching routines..."
    });
    requestOptions = { headers: { "x-access-token": token } };
    axios
      .get(`${ROOT_URL}/routines`, requestOptions)
      .then(res => {
        dispatch({
          type: Actions.FETCH_ROUTINES_SUCCESS,
          payload: res
        });
      })
      .catch(err =>
        dispatch({ type: Actions.FETCH_ROUTINES_FAILURE, payload: err })
      );
  };
};

export const selectRoutine = routineId => {
  return dispatch => {
    dispatch({
      type: Actions.FETCHING_ROUTINE_HISTORY
    });
    axios
      .post(`${ROOT_URL}/routine-rich`, { routineId }, requestOptions)
      .then(res => {
        dispatch({
          type: Actions.FETCH_ROUTINE_HISTORY_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.FETCH_ROUTINE_HISTORY_FAILURE,
          payload: err
        });
      });
  };
};

export const postNewRoutine = title => {
  return dispatch => {
    dispatch({
      type: Actions.POSTING_NEW_ROUTINE
    });
    axios
      .post(`${ROOT_URL}/new-routine`, { title }, requestOptions)
      .then(res => {
        dispatch({
          type: Actions.POST_NEW_ROUTINE_SUCCESS,
          payload: res.data.routine,
          currentR: res.data.routine.title
        });
      })
      .catch(err =>
        dispatch({
          type: Actions.POST_NEW_ROUTINE_FAILURE,
          payload: err
        })
      );
  };
};

export const postNewExerciseInRoutine = (routineId, exerciseObj) => {
  return dispatch => {
    dispatch({
      type: Actions.POSTING_NEW_EXERCISE_IN_ROUTINE
    });
    axios
      .post(`${ROOT_URL}/new-exercise`, exerciseObj, requestOptions)
      .then(exerciseDoc => {
        axios
          .post(
            `${ROOT_URL}/add-exercise`,
            {
              exerciseId: exerciseDoc.data.exercise._id,
              routineId
            },
            requestOptions
          )
          .then(updatedRoutine => {
            dispatch({
              type: Actions.POST_NEW_EXERCISE_IN_ROUTINE_SUCCESS,
              payload: {
                exercise: exerciseDoc.data.exercise,
                routine: updatedRoutine.data.routine
              }
            });
          })
          .catch(err =>
            dispatch({
              type: Actions.POST_NEW_EXERCISE_IN_ROUTINE_FAILURE,
              payload: err
            })
          );
      })
      .catch(err =>
        dispatch({
          type: Actions.POST_NEW_EXERCISE_IN_ROUTINE_FAILURE,
          payload: err
        })
      );
  };
};

export const updateExercise = (
  exerciseId,
  name,
  currentWeight,
  currentReps,
  currentSets
) => {
  return dispatch => {
    dispatch({
      type: Actions.UPDATING_EXERCISE
    });
    axios
      .put(
        `${ROOT_URL}/exercise`,
        { name, exerciseId, currentWeight, currentReps, currentSets },
        requestOptions
      )
      .then(updatedExerciseDoc => {
        dispatch({
          type: Actions.UPDATE_EXERCISE_SUCCESS,
          payload: updatedExerciseDoc
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.UPDATE_EXERCISE_FAILURE,
          payload: err
        });
      });
  };
};

export const deleteExercise = exerciseId => {
  return dispatch => {
    let token = localStorage.getItem("token");
    requestOptions = {
      headers: { "x-access-token": token },
      data: {
        exerciseId
      }
    };
    dispatch({
      type: Actions.DELETING_EXCERCISE,
      payload: "Deleting exercise"
    });
    axios
      .delete(`${ROOT_URL}/exercise`, requestOptions)
      .then(deletedExercise => {
        dispatch({
          type: Actions.DELETE_EXERCISE_SUCCESS,
          payload: exerciseId
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.DELETE_EXERCISE_FAILURE,
          payload: "Fail to delete exercise"
        });
      });
  };
};

export const updateRoutine = (routineId, title) => {
  return dispatch => {
    dispatch({
      type: Actions.UPDATING_ROUTINE
    });
    axios
      .put(`${ROOT_URL}/routine`, { title, routineId }, requestOptions)
      .then(updatedRoutineDoc => {
        dispatch({
          type: Actions.UPDATE_ROUTINE_SUCCESS,
          payload: updatedRoutineDoc
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.UPDATE_ROUTINE_FAILURE,
          payload: err
        });
      });
  };
};

export const deleteRoutine = routineId => {
  let token = localStorage.getItem("token");
  requestOptions = {
    headers: { "x-access-token": token },
    data: {
      routineId
    }
  };
  return dispatch => {
    dispatch({
      type: Actions.DELETING_ROUTINE,
      payload: "Deleting routine"
    });
    axios
      .delete(`${ROOT_URL}/routine`, requestOptions)
      .then(deletedRoutine => {
        dispatch({
          type: Actions.DELETE_ROUTINE_SUCCESS,
          payload: routineId
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.DELETE_ROUTINE_FAILURE,
          payload: "Error deleting routine"
        });
      });
  };
};

export const clearCurrentRoutine = () => {
  return {
    type: Actions.CLEAR_CURRENT_ROUTINE,
    payload: null
  };
};

// Calendar Page
export const scheduleWorkout = (routineId, date) => {
  return dispatch => {
    dispatch({
      type: Actions.SCHEDULING_WORKOUT
    });
    axios
      .post(`${ROOT_URL}/schedule-workout`, { routineId, date }, requestOptions)
      .then(response => {
        dispatch({
          type: Actions.SCHEDULE_WORKOUT_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.SCHEDULE_WORKOUT_FAILURE,
          payload: err
        });
      });
  };
};

export const copyWorkouts = (
  copyFromStartDate,
  copyFromEndDate,
  copyToStartDate
) => {
  const shiftDistance =
    Date.parse(copyToStartDate) - Date.parse(copyFromStartDate);
  return dispatch => {
    dispatch({
      type: Actions.COPYING_WORKOUTS,
      payload: "About to copy workouts..."
    });
    axios
      .post(
        `${ROOT_URL}/workouts-copy`,
        {
          startDate: copyFromStartDate,
          endDate: copyFromEndDate,
          shiftDistance
        },
        requestOptions
      )
      .then(response => {
        dispatch({
          type: Actions.COPY_WORKOUTS_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.COPY_WORKOUTS_FAILURE,
          payload: err
        });
      });
  };
};

export const fetchAllWorkouts = () => {
  return dispatch => {
    dispatch({
      type: Actions.FETCHING_WORKOUTS,
      payload: "Fetching user's workouts"
    });
    axios
      .get(`${ROOT_URL}/workouts`, requestOptions)
      .then(response => {
        dispatch({
          type: Actions.FETCH_WORKOUTS_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.FETCH_WORKOUTS_FAILURE,
          payload: err
        });
      });
  };
};

export const deleteWorkout = id => {
  return dispatch => {
    axios
      .delete(`${ROOT_URL}/workouts/${id}`, requestOptions)
      .then(res => {
        dispatch({
          type: Actions.DELETE_WORKOUT,
          payload: id
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// Not being used at this moment
// --may delete at a later time if no use found
export const fetchAllPerformanceDocs = () => {
  return dispatch => {
    dispatch({
      type: Actions.FETCHING_PERFORMANCES,
      payload: "Fetching user's performances"
    });
    axios
      .get(`${ROOT_URL}/performances`, requestOptions)
      .then(response => {
        dispatch({
          type: Actions.FETCH_PERFORMANCES_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.FETCH_PERFORMANCES_FAILURE,
          payload: err
        });
      });
  };
};

// Billing Page
export const processPayment = data => {
  let token = localStorage.getItem("token");
  return dispatch => {
    dispatch({
      type: Actions.PROCESSING_PAYMENT,
      payload: "Processing payment..."
    });
    requestOptions = { headers: { "x-access-token": token } };
    axios
      .post(`${ROOT_URL}/charge`, data, requestOptions)
      .then(res => {
        dispatch({
          type: Actions.PAYMENT_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.PAYMENT_FAILURE,
          payload: err
        });
      });
  };
};

// For validation on many pages
export const clearErrors = () => {
  return {
    type: Actions.CLEAR_VAL_ERRORS,
    payload: {}
  };
};
