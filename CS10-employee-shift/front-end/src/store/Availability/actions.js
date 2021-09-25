import axios from "axios";

export const getAvailabilities = () => (dispatch, getState) => {
  dispatch({ type: "LOADING_AVAILABILITIES" });
  const headers = { "Content-Type": "application/json" };
  const token = getState().user.token;

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/availabilities/`, { headers })
    .then(res => {
      if (res.status === 200) {
        return dispatch({ type: "READ_AVAILABILITIES", data: res.data });
      }
    })
    .catch(err => {
      if (err.status === 401 || err.status === 403) {
        dispatch({ type: "AUTHENTICATION_ERROR", data: err.data });
        throw err.data;
      } else {
        dispatch({ type: "ERROR", data: err.data });
        throw err.data;
      }
    });
};

export const postAvailabilities = (profile, day, start_time, end_time) => (
  dispatch,
  getState
) => {
  dispatch({ type: "LOADING_AVAILABILITIES" });
  const token = getState().user.token;
  const headers = { "Content-Type": "application/JSON" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const body = JSON.stringify({
    profile,
    day,
    start_time,
    end_time,
  });

  axios({
    method: "post",
    url: `${process.env.REACT_APP_ROOT_URL}/api/availabilities/`,
    headers: headers,
    data: body,
  })
    .then(res => {
      if (res.status === 201) {
        return dispatch({ type: "CREATE_AVAILABILITIES", data: res.data });
      }
    })
    .catch(err => {
      if (err.status < 500) {
        console.log("Server Error!");
        return { status: err.status, data: err.data };
      } else if (err.status === 403 || err.status === 401) {
        dispatch({ type: "ERROR", data: err.data });
        throw err.data;
      }
    });
};

export const updateAvailabilities = (
  id,
  profile,
  day,
  start_time,
  end_time
) => (dispatch, getState) => {
  dispatch({ type: "LOADING_AVAILABILITIES" });
  const token = getState().user.token;
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const body = JSON.stringify({
    profile,
    day,
    start_time,
    end_time,
  });

  axios({
    method: "put",
    url: `${process.env.REACT_APP_ROOT_URL}/api/availabilities/${id}/`,
    headers: headers,
    data: body,
  })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        return dispatch({ type: "UPDATE_AVAILABILITIES", data: res.data });
      }
    })
    .catch(err => {
      if (err.status < 500) {
        console.log("Server Error!");
        return { status: err.status, data: err.data };
      } else if (err.status === 403 || err.status === 401) {
        dispatch({ type: "ERROR", data: err.data });
        throw err.data;
      }
    });
};

export const deleteAvailabilities = id => (dispatch, getState) => {
  dispatch({ type: "LOADING_AVAILABILITIES" });
  const token = getState().user.token;
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  axios({
    method: "delete",
    url: `${process.env.REACT_APP_ROOT_URL}/api/availabilities/${id}/`,
    headers: headers,
  })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        return dispatch({ type: "DELETE_AVAILABILITIES", data: id });
      }
    })
    .catch(err => {
      if (err.status < 500) {
        console.log("Server Error!");
        return { status: err.status, data: err.data };
      } else if (err.status === 403 || err.status === 401) {
        dispatch({ type: "ERROR", data: err.data });
        throw err.data;
      }
    });
};
