import axios from "axios";

export const getProfile = () => (dispatch, getState) => {
  dispatch({ type: "LOADING_PROFILE" });
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  const { token } = getState().user.token;

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/profiles/`, headers)
    .then(res => {
      if (res.status === 200) {
        return dispatch({ type: "READ_PROFILE", data: res.data });
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

export const getAllProfiles = () => (dispatch, getState) => {
  dispatch({ type: "LOADING_PROFILE" });
  const headers = { "Content-Type": "application/json" };
  const token = getState().user.token;

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/profiles/`, { headers })
    .then(res => {
      if (res.status === 200) {
        return dispatch({ type: "READ_PROFILES", data: res.data });
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

export const postProfile = data => (dispatch, getState) => {
  dispatch({ type: "LOADING_PROFILE" });
  const token = getState().user.token;
  const account = getState().user.currentUser.account.id;

  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const body = {
    user: {
      username: data.email,
      password: "password.123",
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      groups: [1],
    },
    re_password: "password.123",
    account,
    phone_number: data.phone_number,
    notes: data.notes,
    email_enabled: true,
    text_enabled: false,
  };

  axios({
    method: "post",
    url: `${process.env.REACT_APP_ROOT_URL}/api/profiles/`,
    headers: headers,
    data: body,
  })
    .then(res => {
      if (res.status === 201) {
        return dispatch({ type: "CREATE_PROFILE", data: res.data });
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

export const updateProfile = data => (dispatch, getState) => {
  dispatch({ type: "LOADING_PROFILE" });
  const { token } = getState().user.token;
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const body = JSON.stringify({ data });

  axios({
    method: "update",
    url: `${process.env.REACT_APP_ROOT_URL}/api/profiles/`,
    headers: headers,
    data: body,
  })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        return dispatch({ type: "UPDATE_PROFILE", data: res.data });
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

export const deleteProfile = data => (dispatch, getState) => {
  dispatch({ type: "LOADING_PROFILE" });
  const token = getState().user.token;
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  axios({
    method: "delete",
    url: `${process.env.REACT_APP_ROOT_URL}/api/profiles/${data}/`,
    headers: headers,
  })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        return dispatch({ type: "DELETE_PROFILE", data: data });
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
