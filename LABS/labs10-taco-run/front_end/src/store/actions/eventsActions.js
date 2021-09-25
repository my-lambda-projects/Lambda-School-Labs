import axios from "axios";

export const EVENTS_GET_START = "EVENTS_GET_START";
export const EVENTS_GET_COMPLETE = "EVENTS_GET_COMPLETE";
export const EVENTS_GET_ERROR = "EVENTS_GET_ERROR";

export const EVENT_GET_START = "EVENT_GET_START";
export const EVENT_GET_COMPLETE = "EVENT_GET_COMPLETE";
export const EVENT_GET_ERROR = "EVENT_GET_ERROR";

export const EVENT_DELETE_START = "EVENT_DELETE_START";
export const EVENT_DELETE_COMPLETE = "EVENT_DELETE_COMPLETE";
export const EVENT_DELETE_ERROR = "EVENT_DELETE_ERROR";

export const EVENT_UPDATE_START = "EVENT_UPDATE_START";
export const EVENT_UPDATE_COMPLETE = "EVENT_UPDATE_COMPLETE";
export const EVENT_UPDATE_ERROR = "EVENT_UPDATE_ERROR";

export const EVENTS_CREATE_START = "EVENTS_CREATE_START";
export const EVENTS_CREATE_COMPLETE = "EVENTS_CREATE_COMPLETE";
export const EVENTS_CREATE_ERROR = "EVENTS_CREATE_ERROR";

export const EVENTS_INVITE_START = "EVENTS_INVITE_START";
export const EVENTS_INVITE_COMPLETE = "EVENTS_INVITE_COMPLETE";
export const EVENTS_INVITE_ERROR = "EVENTS_INVITE_ERROR";

const BASE_URL = "https://production-taco.herokuapp.com";

export const getEvents = id => dispatch => {
  dispatch({ type: EVENTS_GET_START });
  axios
    .get(`https://production-taco.herokuapp.com/users_events/${id}`)
    .then(res => {
      dispatch({
        type: EVENTS_GET_COMPLETE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: EVENTS_GET_ERROR, payload: err });
    });
};

export const getEvent = id => dispatch => {
  dispatch({ type: EVENT_GET_START });

  axios
    .get(`${BASE_URL}/events/${id}`)
    .then(res => {
      dispatch({ type: EVENT_GET_COMPLETE, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: EVENT_GET_ERROR, payload: err });
    });
};

export const createEvent = (event, id) => {
  return dispatch => {
    dispatch({ type: EVENTS_CREATE_START });
    console.log('about to post event')
    axios
      .post(`https://production-taco.herokuapp.com/events`, event)
      .then(() => {
        axios
          .get(
            `https://production-taco.herokuapp.com/users_events/${localStorage.getItem(
              "user_id"
            )}`
          )
          .then(res => {
            console.log('finished posting event \n')
            console.log(res.data)
            dispatch({
              type: EVENTS_CREATE_COMPLETE,
              payload: res.data
            });
          });
      })
      .catch(err => {
        dispatch({ type: EVENTS_CREATE_ERROR, payload: err });
      });
  };
};

export const deleteEvent = id => {
  return dispatch => {
    dispatch({ type: EVENT_DELETE_START });
    axios
      .delete(`https://production-taco.herokuapp.com/events/${id}`)
      .then(() => {
        axios
          .get(
            `https://production-taco.herokuapp.com/users_events/${localStorage.getItem(
              "user_id"
            )}`
          )
          .then(res => {
            dispatch({
              type: EVENTS_CREATE_COMPLETE,
              payload: res.data
            });
          });
      })
      .catch(err => {
        dispatch({ type: EVENT_DELETE_ERROR, payload: err });
      });
  };
};

export const updateEvent = (event, id, cb) => {
  return dispatch => {
    dispatch({ type: EVENT_UPDATE_START });
    axios
      .put(`https://production-taco.herokuapp.com/events/${id}`, event)
      .then(() => {
        axios.get("https://production-taco.herokuapp.com/events").then(res2 => {
          dispatch({ type: EVENT_UPDATE_COMPLETE, payload: res2.data });
        }, () => {cb()});
      })
      .catch(err => {
        dispatch({
          type: EVENT_UPDATE_ERROR,
          payload: err
        });
      });
  };
};

export const acceptEvent = obj => {
  return dispatch => {
    axios.put('https://production-taco.herokuapp.com/users_events/accept', obj)
    .then(() => {
      axios.get(`https://production-taco.herokuapp.com/users_events/${obj.user_id}`)
      .then(res => {
        
        dispatch({type: EVENTS_GET_COMPLETE, payload: res.data})
      })
    })
    .catch(error => {
      dispatch({ type: EVENTS_GET_ERROR, payload: error });
    })
  }
}

export const declineEvent = obj => {
  return dispatch => {
    axios.delete('https://production-taco.herokuapp.com/users_events/decline',
      {data: obj}
    )
    .then(() => {
      axios.get(`https://production-taco.herokuapp.com/users_events/${obj.user_id}`)
      .then(res => {
        
        dispatch({type: EVENTS_GET_COMPLETE, payload: res.data})
      })
    })
    .catch(error => {
      
      dispatch({ type: EVENTS_GET_ERROR, payload: error });
    })
  }
}

export const inviteEvent = inviteObject => dispatch => {
  dispatch({ type: EVENTS_INVITE_START });
  axios
    .post(`https://production-taco.herokuapp.com/users_events/`, inviteObject)
    .then(response => {
      
      dispatch({ type: EVENTS_INVITE_COMPLETE, payload: response.data });
    })
    .catch(err => {
      
      dispatch({ type: EVENTS_INVITE_ERROR, payload: err });
    });
};




