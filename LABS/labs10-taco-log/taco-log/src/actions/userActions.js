import axios from "axios";
// import { firebase, provider } from '../firebase/firebase';

export const GET_USER = "GET_USER";
export const CREATE_USER = "CREATE_USER";
export const ASSIGN_ACHIEVEMENT = "ASSIGN_ACHIEVEMENT";
export const UPDATE_STATS = "UPDATE_STATS";
export const DELETE_TACO = "DELETE_TACO";
export const LOCATION_CHANGE = "LOCATION_CHANGE";
export const LOG_TACO = "LOG_TACO";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_USER = "UPDATE_USER";

// const local = "http://localhost:5000/";
const heroku = "https://tacobe.herokuapp.com/";
const url = heroku;

export const loginUser = user => dispatch => {
  axios
    .get(`${url}api/users`)
    .then(res => {
      let post = true;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].ext_user_id === user.ext_user_id) {
          axios
            .get(`${url}api/users/${res.data[i].internal_id}`)
            .then(res => {
              dispatch({ type: GET_USER, payload: res.data });
            })
            .catch(err => {
              console.log(err);
            });
          localStorage.setItem("user_id", res.data[i].internal_id);
          post = false;
        }
      }
      if (post) {
        axios
          .post(`${url}api/users`, user)
          .then(res => {
            const stats = { user_id: res.data.internal_id };
            axios
              .post(`${url}api/user_stats`, stats)
              .then(res => {
                dispatch({ type: CREATE_USER, payload: res.data });
              })
              .catch(err => {
                console.log(err);
              });
            localStorage.setItem("user_id", res.data.internal_id);
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const logTaco = (taco, header) => dispatch => {
  axios
    .post(`${url}api/tacos`, taco, header)
    .then(res => {
      dispatch({ type: LOG_TACO, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const assignAchievement = (achievement, header) => dispatch => {
  axios
    .post(`${url}api/user_achievements`, achievement, header)
    .then(res => {
      dispatch({ type: ASSIGN_ACHIEVEMENT, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateStats = (id, stats, header) => dispatch => {
  axios
    .put(`${url}api/user_stats/${id}`, stats, header)
    .then(res => {
      dispatch({ type: UPDATE_STATS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteTaco = (id, user) => dispatch => {
  axios
    .delete(`${url}api/tacos/${id}`, { data: { user } })
    .then(res => {
      dispatch({ type: DELETE_TACO, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const locationChange = () => dispatch => {
  dispatch({ type: LOCATION_CHANGE });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: LOG_OUT });
};

export const updateUser = (id, changes) => dispatch => {
  axios
    .put(`${url}api/users/${id}`, changes)
    .then(res => {
      axios
      .get(`${url}api/users/${id}`)
      .then(res => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchUser = id => dispatch => {
  axios
    .get(`${url}api/users/${id}`)
    .then(res => {
      dispatch({ type: GET_USER, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};
