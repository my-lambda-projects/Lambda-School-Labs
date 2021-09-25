import axios from "axios";

export const USER_FETCH_START = "USER_FETCH_START";
export const USER_FETCH_COMPLETE = "USER_FETCH_COMPLETE";
export const USER_FETCH_ERROR = "USER_FETCH_ERROR";

export const OTHER_USER_FETCH_START = "OTHER_USER_FETCH_START";
export const OTHER_USER_FETCH_COMPLETE = "OTHER_USER_FETCH_COMPLETE";
export const OTHER_USER_FETCH_ERROR = "OTHER_USER_FETCH_ERROR";

export const USERS_SEARCH_START = "USERS_SEARCH_START";
export const USERS_SEARCH_COMPLETE = "USERS_SEARCH_COMPLETE";
export const USERS_SEARCH_ERROR = "USERS_SEARCH_ERROR";

export const USER_UPDATE_START = "USER_UPDATE_START";
export const USER_UPDATE_COMPLETE = "USER_UPDATE_COMPLETE";
export const USER_UPDATE_ERROR = "USER_UPDATE_ERROR";

export const fetchUser = id => {
  return dispatch => {
    dispatch({ type: USER_FETCH_START });
    axios
      .get(`https://production-taco.herokuapp.com/users/${id}/info`)
      .then(res => {
        dispatch({ type: USER_FETCH_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: USER_FETCH_ERROR });
      });
  };
};

export const fetchOtherUser = id => {
  return dispatch => {
    dispatch({ type: OTHER_USER_FETCH_START });
    axios
      .get(`https://production-taco.herokuapp.com/users/${id}/info`)
      .then(res => {
        dispatch({ type: OTHER_USER_FETCH_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: OTHER_USER_FETCH_ERROR });
      });
  };
};

export const searchUsers = term => {
  return dispatch => {
    dispatch({ type: USERS_SEARCH_START });
    axios
      .get(`https://production-taco.herokuapp.com/users/search/${term}`)
      .then(res => {
        dispatch({ type: USERS_SEARCH_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: USERS_SEARCH_ERROR });
      });
  };
};

export const updateUser = (edited_user, id) => {
  return dispatch => {
    dispatch({ type: USER_UPDATE_START });
    axios
      .put(`https://production-taco.herokuapp.com/users/${id}`, edited_user)
      .then(() => {
        axios
          .get(`https://production-taco.herokuapp.com/users/${id}/info`)
          .then(res => {
            dispatch({ type: USER_UPDATE_COMPLETE, payload: res.data });
          });
      })
      .catch(err => {
        dispatch({ type: USER_UPDATE_ERROR });
      });
  };
};
