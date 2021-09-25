import axios from 'axios';
import auth from '../Auth';

// ---------DEPLOYED PATH-------------
// Uncomment the code on line 7 to run app on the deployed server.
// ALL OTHER PATHS MUST BE COMMENTED OUT TO AVOID ERRORS
const PATH = 'https://workout-tracker-pt2.herokuapp.com';

//----------LOCAL PATH----------------
// Uncomment the code on line 12 to run app on the local server.
// ALL OTHER PATHS MUST BE COMMENTED OUT TO AVOID ERRORS
// const PATH = 'http://localhost:3333';

export const FETCHED = 'FETCHED';
export const FETCHING = 'FETCHING';
export const FETCHED_USERDATA = 'FETCHED_USERDATA';
export const FETCHING_USERDATA = 'FETCHING_USERDATA';
export const FETCHED_USERID = 'FETCHED_USERID';
export const FETCHING_USERID = 'FETCHING_USERID';
export const FETCHED_USERINFO = 'FETCHED_USERINFO';
export const FETCHING_USERINFO = 'FETCHING_USERINFO';
export const FETCHED_NOTES = 'FETCHED_NOTES';
export const FETCHING_NOTES = 'FETCHING_NOTES';
export const FETCHED_CATEGORIES = 'FETCHED_CATEGORIES';
export const FETCHING_CATEGORIES = 'FETCHING_CATEGORIES';
export const FETCHED_EXERCISES = 'FETCHED_EXERCISES';
export const FETCHING_EXERCISES = 'FETCHING_EXERCISES';
export const FETCHING_ERROR = 'FETCHING_ERROR';
export const DATE_CLICKED = 'DATE_CLICKED';
export const EVENTSFORM_CLOSED = 'EVENTSFORM_CLOSED';
export const EVENT_SCHEDULED = 'EVENT_SCHEDULED';
export const EVENT_OBJECT = 'EVENT_OBJECT';
export const EVENT_DELETE = 'EVENT_DELETE';
export const EVENT_UPDATE = 'EVENT_UPDATE';
export const FETCHED_PREMIUM = 'FETCHED_PREMIUM';



export const getData = () => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.get(`${PATH}/api/users`, { headers });
  return dispatch => {
    dispatch({ type: FETCHING });
    promise
      .then(response => {
        dispatch({ type: FETCHED, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};

export const getUserId = () => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.get(`${PATH}/api/userid`, { headers });
  return dispatch => {
    dispatch({ type: FETCHING });
    promise
      .then(response => {
        dispatch({ type: FETCHED_USERID, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: FETCHING_USERID, payload: err });
      });
  };
};

export const postUser = () => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.post(
    `${PATH}/api/users`,
    {},
    {
      headers
    }
  );
  return dispatch => {
    dispatch({ type: FETCHING });
    promise
      .then(response => {
        dispatch({ type: FETCHED_USERDATA, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: FETCHING_USERDATA, payload: err });
      });
  };
};

export const postCategory = categoryName => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.post(`${PATH}/api/categories`, categoryName, {
    headers
  });
  return dispatch => {
    dispatch({ type: FETCHING_CATEGORIES });
    return promise
      .then(response => {
        dispatch({ type: FETCHED_CATEGORIES, payload: response.data });
        return response.data;
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};

export const postExercise = exerciseBody => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.post(`${PATH}/api/exercises`, exerciseBody, {
    headers
  });
  return dispatch => {
    dispatch({ type: FETCHED_EXERCISES });
    return promise
      .then(response => {
        dispatch({ type: FETCHED_EXERCISES, payload: response.data });
        return response.data;
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};

export const postNote = noteBody => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.post(`${PATH}/api/notes`, noteBody, {
    headers
  });
  return dispatch => {
    dispatch({ type: FETCHING_NOTES });
    promise
      .then(response => {
        dispatch({ type: FETCHED_NOTES, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};

export const editNote = noteBody => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.put(`${PATH}/api/notes`, noteBody, {
    headers
  });
  return dispatch => {
    dispatch({ type: FETCHING_NOTES });
    promise
      .then(response => {
        dispatch(getNotes());
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};

export const getNotes = () => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.get(`${PATH}/api/notes`, { headers });
  return dispatch => {
    dispatch({ type: FETCHING_NOTES });
    promise
      .then(response => {
        dispatch({ type: FETCHED_NOTES, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};

export const deleteNote = noteId => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.delete(`${PATH}/api/notes`, {
    data: noteId,
    headers
  });
  return dispatch => {
    dispatch({ type: FETCHING_NOTES });
    return promise
      .then(() => {
        getNotes();
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};

export const getCategories = () => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.get(`${PATH}/api/categories`, { headers });
  return dispatch => {
    dispatch({ type: FETCHING_CATEGORIES });
    promise
      .then(response => {
        dispatch({ type: FETCHED_CATEGORIES, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};

export const getExercises = () => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.get(`${PATH}/api/exercises`, { headers });
  return dispatch => {
    dispatch({ type: FETCHING_EXERCISES });
    promise
      .then(response => {
        dispatch({ type: FETCHED_EXERCISES, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};

export const updateUser = userUpdates => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.patch(`${PATH}/userupdate`, userUpdates, {
    headers
  });
  return dispatch => {
    dispatch({ type: FETCHING_USERINFO });
    return promise
      .then(response => {
        dispatch({
          type: FETCHED_USERINFO,
          payload: JSON.parse(response.data.text)
        });
        return response.data.text;
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};

export const getUserInfo = () => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.get(`${PATH}/userinfo`, { headers });
  return dispatch => {
    dispatch({ type: FETCHING_USERINFO });
    return promise
      .then(response => {
        dispatch({
          type: FETCHED_USERINFO,
          payload: JSON.parse(response.data.text)
        });
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};

export const clickedDate = date => {
  return dispatch => {
    dispatch({
      type: DATE_CLICKED,
      payload: date
    });
  };
};

export const closedEventForm = () => {
  return dispatch => {
    dispatch({
      type: EVENTSFORM_CLOSED,
      payload: null
    });
  };
};

export const eventScheduled = events => {
  return dispatch => {
    dispatch({
      type: EVENT_SCHEDULED,
      payload: events
    });
  };
};

export const objCreate = obj => {
  return dispatch => {
    dispatch({
      type: EVENT_OBJECT,
      payload: obj
    });
  };
};

export const deleteEvent = arr => {
  return dispatch => {
    dispatch({
      type: EVENT_DELETE,
      payload: arr
    });
  };
};

export const updateEvent = arr => {
  return dispatch => {
    dispatch({
      type: EVENT_UPDATE,
      payload: arr
    });
  };
};

export const getPremium = () => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.get(`${PATH}/api/users/premium`, {
    headers
  });
  return dispatch => {
    dispatch({ type: FETCHING });
    promise
      .then(response => {
        dispatch({ type: FETCHED_PREMIUM });
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};

export const checkPremium = () => {
  const { getAccessToken } = auth;
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  const promise = axios.get(`${PATH}/api/user/ispremium`, {
    headers
  });
  return dispatch => {
    dispatch({ type: FETCHING });
    promise
      .then(response => {
        if (response.data.premium) {
          dispatch({ type: FETCHED_PREMIUM });
        } else {
          dispatch({ type: FETCHING_ERROR, payload: response.data });
        }
      })
      .catch(err => {
        dispatch({ type: FETCHING_ERROR, payload: err });
      });
  };
};
