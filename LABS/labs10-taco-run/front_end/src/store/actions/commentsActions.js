import axios from "axios";

export const COMMENTS_GET_START = "COMMENTS_GET_START";
export const COMMENTS_GET_COMPLETE = "COMMENTS_GET_COMPLETE";
export const COMMENTS_GET_ERROR = "COMMENTS_GET_ERROR";

export const MAKE_COMMENT_START = "MAKE_COMMENT_START";
export const MAKE_COMMENT_COMPLETE = "MAKE_COMMENT_COMPLETE";
export const MAKE_COMMENT_ERROR = "MAKE_COMMENT_ERROR";

export const UPDATE_COMMENT_START = "UPDATE_COMMENT_START";
export const UPDATE_COMMENT_COMPLETE = "UPDATE_COMMENT_COMPLETE";
export const UPDATE_COMMENT_ERROR = "UPDATE_COMMENT_ERROR";

export const DELETE_COMMENT_START = "DELETE_COMMENT_START";
export const DELETE_COMMENT_COMPLETE = "DELETE_COMMENT_COMPLETE";
export const DELETE_COMMENT_ERROR = "DELETE_COMMENT_ERROR";

export const getComments = id => {
  return dispatch => {
    dispatch({ type: COMMENTS_GET_START });
    axios
      .get(`https://production-taco.herokuapp.com/events/${id}/comments`)
      .then(res => {
        
        dispatch({
          type: COMMENTS_GET_COMPLETE,
          payload: res.data.comments_info
        });
      })
      .catch(err => {
        
        dispatch({ type: COMMENTS_GET_ERROR, payload: err });
      });
  };
};

export const makeComment = (comment, event_id) => {
  return dispatch => {
    dispatch({ type: MAKE_COMMENT_START });
    axios
      .post(`https://production-taco.herokuapp.com/comments`, comment)
      .then(() => {
        axios.get(`https://production-taco.herokuapp.com/events/${event_id}/comments`)
        .then(res => {
          dispatch({
            type: MAKE_COMMENT_COMPLETE,
            payload: res.data.comments_info
          });
        })
      })
      .catch(err => {
        dispatch({ type: MAKE_COMMENT_ERROR, payload: err });
      });
  };
};

export const updateComment = changes => {
  return dispatch => {
    dispatch({ type: UPDATE_COMMENT_START });
    axios
      .put(`https://production-taco.herokuapp.com/comments`, changes)
      .then(res => {
        
        axios
          .get(
            `https://production-taco.herokuapp.com/events/${
              changes.event_id
            }/comments`
          )
          .then(res => {
            dispatch({
              type: UPDATE_COMMENT_COMPLETE,
              payload: res.data.comments_info
            });
          });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: UPDATE_COMMENT_ERROR, payload: err });
      });
  };
};

export const deleteComment = (ids, cid) => {
  return dispatch => {
    dispatch({ type: DELETE_COMMENT_START });
    axios
      .delete(`https://production-taco.herokuapp.com/comments`, ids)
      .then(res => {
        
        dispatch({
          type: DELETE_COMMENT_COMPLETE,
          payload: res.data,
          id: cid
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: DELETE_COMMENT_ERROR, payload: err });
      });
  };
};
