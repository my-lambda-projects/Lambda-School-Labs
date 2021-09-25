import axios from "axios";

export const getRequestOffs = () => (dispatch, getState) => {
  dispatch({ type: "LOADING_REQUESTOFF" });
  const headers = { "Content-Type": "application/json" };
  const token = getState().user.token;

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/requestoff/`, { headers })
    .then(res => {
      if (res.status === 200) {
        return dispatch({ type: "READ_REQUESTOFF", data: res.data });
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

export const postRequestOff = (
  profile,
  start_datetime,
  end_datetime,
  reason
) => (dispatch, getState) => {
  dispatch({ type: "LOADING_REQUESTOFF" });
  const token = getState().user.token;
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const body = JSON.stringify({
    profile,
    start_datetime,
    end_datetime,
    reason,
  });
  axios({
    method: "post",
    url: `${process.env.REACT_APP_ROOT_URL}/api/requestoff/`,
    headers: headers,
    data: body,
  })
    .then(res => {
      if (res.status === 201) {
        return dispatch({ type: "CREATE_REQUESTOFF", data: res.data });
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
};

export const updateRequestOff = (
  id,
  profile,
  status,
  start_datetime,
  end_datetime,
  reason
) => (dispatch, getState) => {
  dispatch({ type: "LOADING_REQUESTOFF" });
  const token = getState().user.token;
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const body = JSON.stringify({
    profile,
    status,
    start_datetime,
    end_datetime,
    reason,
  });

  axios({
    method: "put",
    url: `${process.env.REACT_APP_ROOT_URL}/api/requestoff/${id}/`,
    headers: headers,
    data: body,
  })
    .then(res => {
      if (res.status === 200) {
        return dispatch({ type: "UPDATE_REQUESTOFF", data: res.data });
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
};

export const deleteRequestOff = id => (dispatch, getState) => {
  dispatch({ type: "LOADING_REQUESTOFF" });
  const token = getState().user.token;
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const body = JSON.stringify({ id: id });

  axios({
    method: "delete",
    url: `${process.env.REACT_APP_ROOT_URL}/api/requestoff/`,
    headers: headers,
    data: body,
  })
    .then(res => {
      if (res.status === 200) {
        return dispatch({ type: "DELETE_REQUESTOFF", data: id });
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
};
