import axios from "axios";

export const getShifts = () => (dispatch, getState) => {
  dispatch({ type: "LOADING_SHIFTS" });
  const token = getState().user.token;
  // TODO: Get a smaller block of shifts for efficiency ?
  // Send query with datetime to get current week, next week, and previous week
  if (token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/shifts/`, { headers })
      .then(res => {
        if (res.status === 200) {
          return dispatch({ type: "READ_SHIFT", data: res.data });
        }
      })
      .catch(err => {
        if (err.status < 500) {
          console.log("Server Error!");
          return { status: err.status, data: err.data };
        } else {
          dispatch({ type: "ERROR", data: err.data });
          throw err.data;
        }
      });
  }
};

export const postShift = (
  start_datetime,
  end_datetime,
  profile,
  is_open,
  notes
) => (dispatch, getState) => {
  dispatch({ type: "LOADING_SHIFTS" });

  const token = getState().user.token;
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const body = JSON.stringify({
    start_datetime,
    end_datetime,
    is_open,
    notes,
    account: getState().user.currentUser.account.id,
    profile,
  });

  axios({
    method: "post",
    url: `${process.env.REACT_APP_ROOT_URL}/api/shifts/`,
    headers: headers,
    data: body,
  })
    .then(res => {
      if (res.status === 201) {
        return dispatch({ type: "CREATE_SHIFT", data: res.data });
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

export const updateShift = (
  id,
  profile,
  start_datetime,
  end_datetime,
  is_open,
  notes
) => (dispatch, getState) => {
  dispatch({ type: "LOADING_SHIFTS" });
  const token = getState().user.token;
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const body = JSON.stringify({
    profile,
    start_datetime,
    end_datetime,
    account: getState().user.currentUser.account.id,
    is_open,
    notes,
  });

  axios({
    method: "put",
    url: `${process.env.REACT_APP_ROOT_URL}/api/shifts/${id}/`,
    headers: headers,
    data: body,
  })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        return dispatch({ type: "UPDATE_SHIFT", data: res.data });
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

export const deleteShift = id => (dispatch, getState) => {
  const token = getState().user.token;
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  axios({
    method: "delete",
    url: `${process.env.REACT_APP_ROOT_URL}/api/shifts/${id}/`,
    headers: headers,
  })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        return dispatch({ type: "DELETE_SHIFT", data: id });
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
