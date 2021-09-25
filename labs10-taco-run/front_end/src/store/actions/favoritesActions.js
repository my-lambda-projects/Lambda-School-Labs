import axios from "axios";

export const FAVORITES_FETCH_START = "FAVORITES_FETCH_START";
export const FAVORITES_FETCH_COMPLETE = "FAVORITES_FETCH_COMPLETE";
export const FAVORITES_FETCH_ERROR = "FAVORITES_FETCH_ERROR";

export const FAVORITES_SEARCH_START = "FAVORITES_SEARCH_START";
export const FAVORITES_SEARCH_COMPLETE = "FAVORITES_SEARCH_COMPLETE";
export const FAVORITES_SEARCH_ERROR = "FAVORITES_SEARCH_ERROR";

export const FAVORITE_ADD_START = "FAVORITE_ADD_START";
export const FAVORITE_ADD_COMPLETE = "FAVORITE_ADD_COMPLETE";
export const FAVORITE_ADD_ERROR = "FAVORITE_ADD_ERROR";

export const FAVORITES_DELETE_START = "FAVORITES_DELETE_START";
export const FAVORITES_DELETE_COMPLETE = "FAVORITES_DELETE_COMPLETE";
export const FAVORITES_DELETE_ERROR = "FAVORITES_DELETE_ERROR";

export const fetchFavorites = id => {
  return dispatch => {
    dispatch({ type: FAVORITES_FETCH_START });
    axios
      .get(`https://production-taco.herokuapp.com/favorites/${id}`)
      .then(res => {
        dispatch({ type: FAVORITES_FETCH_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FAVORITES_FETCH_ERROR });
      });
  };
};

export const searchFavorites = term => {
  return dispatch => {
    dispatch({ type: FAVORITES_SEARCH_START });
    axios
      .get(`https://production-taco.herokuapp.com/favorites/search/${term}`)
      .then(res => {
        dispatch({ type: FAVORITES_SEARCH_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FAVORITES_SEARCH_ERROR, payload: err });
      });
  };
};

export const addFavorite = favorite => {
  return dispatch => {
    dispatch({ type: FAVORITE_ADD_START });
    axios
      .post(`https://production-taco.herokuapp.com/favorites`, favorite)
      .then(() => {
        axios
          .get(
            `https://production-taco.herokuapp.com/favorites/${localStorage.getItem(
              "user_id"
            )}`
          )
          .then(res => {
            dispatch({
              type: FAVORITE_ADD_COMPLETE,
              payload: res.data
            });
          });
      })
      .catch(err => {
        dispatch({ type: FAVORITE_ADD_ERROR, payload: err });
      });
  };
};

export const deleteFavorite = id => dispatch => {
  dispatch({ type: FAVORITES_DELETE_START });
  axios
    .delete(`https://production-taco.herokuapp.com/favorites/${id}`)
    .then(res => {
      dispatch({
        type: FAVORITES_DELETE_COMPLETE,
        payload: res.data,
        id: parseInt(id)
      });
    })
    .catch(err => dispatch({ type: FAVORITES_DELETE_ERROR, payload: err }));
};
