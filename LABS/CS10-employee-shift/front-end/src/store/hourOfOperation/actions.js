import axios from "axios";

export const getHoursOfOperation = () => (dispatch, getState) => {
  dispatch({ type: "LOADING_HOO" });
  const token = getState().user.token;

  if (token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/hoo/`, { headers })
      .then(res => {
        if (res.status === 200) {
          return dispatch({ type: "READ_HOO", data: res.data });
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
  }
};

export const postHoursOfOperation = (day, open_time, close_time) => (
  dispatch,
  getState
) => {
  dispatch({ type: "LOADING_HOO" });

  const token = getState().user.token;
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // TODO: Handle is_open in component

  const body = JSON.stringify({
    account: getState().user.currentUser.account.id,
    day: day,
    open_time: open_time,
    close_time: close_time,
    is_open: "true",
  });

  axios({
    method: "post",
    url: `${process.env.REACT_APP_ROOT_URL}/api/hoo/`,
    headers: headers,
    data: body,
  })
    .then(res => {
      if (res.status === 201) {
        return dispatch({ type: "CREATE_HOO", data: res.data });
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

export const updateHoursOfOperation = (id, day, open_time, close_time) => (
  dispatch,
  getState
) => {
  dispatch({ type: "LOADING_HOO" });
  const token = getState().user.token;
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // TODO: Handle is_open in component

  const body = JSON.stringify({
    account: getState().user.currentUser.account.id,
    day,
    open_time,
    close_time,
    is_open: true,
  });

  axios({
    method: "put",
    url: `${process.env.REACT_APP_ROOT_URL}/api/hoo/${id}/`,
    headers: headers,
    data: body,
  })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        return dispatch({ type: "UPDATE_HOO", data: res.data });
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

export const deleteHoursOfOperation = id => (dispatch, getState) => {
  dispatch({ type: "LOADING_HOO" });
  const token = getState().user.token;
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  axios({
    method: "delete",
    url: `${process.env.REACT_APP_ROOT_URL}/api/hoo/${id}`,
    headers: headers,
  })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        return dispatch({ type: "DELETE_HOO", data: id });
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
