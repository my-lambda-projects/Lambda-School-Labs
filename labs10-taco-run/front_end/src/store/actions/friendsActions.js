import axios from "axios";

export const FRIENDS_FETCH_START = "FRIENDS_FETCH_START";
export const FRIENDS_FETCH_COMPLETE = "FRIENDS_FETCH_COMPLETE";
export const FRIENDS_FETCH_ERROR = "FRIENDS_FETCH_ERROR";

export const FRIEND_ADD_START = "FRIEND_ADD_START";
export const FRIEND_ADD_COMPLETE = "FRIEND_ADD_COMPLETE";
export const FRIEND_ADD_ERROR = "FRIEND_ADD_ERROR";

export const FRIEND_DELETE_START = "FRIEND_DELETE_START";
export const FRIEND_DELETE_COMPLETE = "FRIEND_DELETE_COMPLETE";
export const FRIEND_DELETE_ERROR = "FRIEND_DELETE_ERROR";

export const fetchFriends = id => {
  return dispatch => {
    dispatch({ type: FRIENDS_FETCH_START });
    axios
      .get(`https://production-taco.herokuapp.com/users_friends/${id}`)
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].friends_id === parseInt(localStorage.getItem("user_id"))
          ) {
            return dispatch({
              type: FRIENDS_FETCH_COMPLETE,
              payload: res.data,
              friendFlag: true
            });
          } else {
            dispatch({
              type: FRIENDS_FETCH_COMPLETE,
              payload: res.data,
              friendFlag: false
            });
          }
        }
      })
      .catch(err => {
        dispatch({ type: FRIENDS_FETCH_ERROR });
      });
  };
};

export const addFriend = friend => {
  return dispatch => {
    dispatch({ type: FRIEND_ADD_START });
    axios
      .post(`https://production-taco.herokuapp.com/users_friends`, friend)
      .then(res => {
        axios
          .get(
            `https://production-taco.herokuapp.com/users_friends/${localStorage.getItem(
              "user_id"
            )}`
          )
          .then(res => {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].friends_id === friend.data.friends_id) {
                return dispatch({
                  type: FRIEND_ADD_COMPLETE,
                  payload: res.data,
                  friendFlag: true
                });
              } else {
                dispatch({
                  type: FRIEND_ADD_COMPLETE,
                  payload: res.data,
                  friendFlag: false
                });
              }
            }
          });
      })
      .catch(err => {
        dispatch({ type: FRIEND_ADD_ERROR, payload: err });
      });
  };
};

export const deleteFriend = ids => {
  return dispatch => {
    dispatch({ type: FRIEND_DELETE_START });
    axios
      .delete(`https://production-taco.herokuapp.com/users_friends`, {
        data: ids
      })
      .then(res => {
        axios
          .get(
            `https://production-taco.herokuapp.com/users_friends/${localStorage.getItem(
              "user_id"
            )}`
          )
          .then(res => {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].friends_id === ids.friends_id) {
                return dispatch({
                  type: FRIEND_DELETE_COMPLETE,
                  payload: res.data,
                  friendFlag: true
                });
              } else {
                dispatch({
                  type: FRIEND_DELETE_COMPLETE,
                  payload: res.data,
                  friendFlag: false
                });
              }
            }
          });
      })
      .catch(error => {
        dispatch({ type: FRIEND_DELETE_ERROR, payload: error.data });
      });
  };
};
