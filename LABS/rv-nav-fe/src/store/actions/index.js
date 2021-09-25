import axios from "axios";
import firebase from "firebase";
import { useStore } from "react-redux";

export const LOADING = "LOADING";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const ADD_VEHICLE_SUCCESS = "ADD_VEHICLE_SUCCESS";
export const GET_VEHICLE = "GET_VEHICLE";
export const GET_WALMARTS = "GET_WALMARTS";
export const DELETE_VEHICLE = "DELETE_VEHICLE";
export const AUTH_ERROR = "AUTH_ERROR";
export const INVALID_CREDENTIALS = "INVALID_CREDENTIALS";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const DUPLICATE_USER = "DUPLICATE_USER";
export const DUPLICATE_EMAIL = "DUPLICATE_EMAIL";
export const LOGOUT = "LOGOUT";
export const CLOSE_SIDE_BAR = "CLOSE_SIDE_BAR ";
export const ADD_VEHICLE_REQUEST = "ADD_VEHICLE_REQUEST";

export function authError(error) {
  return { type: "AUTH_ERROR", payload: error };
}

export function clearError() {
  return { type: CLEAR_ERROR };
}

export function closeSideBar() {
  return { type: CLOSE_SIDE_BAR };
}

export const register = creds => {
  return dispatch => {
    dispatch({ type: LOADING });
    return axios
      .post(
        // `${process.env.REACT_APP_BASE_URL}/users/register`
        "https://labs15rvlife.herokuapp.com/users/register"
        , creds)
      .then(response => {
        dispatch({ type: REGISTER, payload: response.data });
        console.log("RESPONSE FROM ACTION", response.data);

        return response.data;
      })
      .catch(err => {
        if (
          authError(err).payload.response.data.constraint ===
          "users_username_unique"
        ) {
          dispatch({ type: DUPLICATE_USER });
          setTimeout(() => {
            dispatch({ type: CLEAR_ERROR });
          }, 5000);
        }
        if (
          authError(err).payload.response.data.constraint ===
          "users_email_unique"
        ) {
          dispatch({ type: DUPLICATE_EMAIL });
          setTimeout(() => {
            dispatch({ type: CLEAR_ERROR });
          }, 5000);
        }
      });
  };
};
export const login = (values, id) => {
  return dispatch => {
    dispatch({ type: LOADING });
    return axios
      .post(
        // `${process.env.REACT_APP_BASE_URL}/users/login`
        "https://labs15rvlife.herokuapp.com/users/login"
        , values)
      .then(res => {
        // console.log(res, '####### FROM LOGIN #######'); // data was created successfully and logs to console
        console.log("id from login action", res);
        localStorage.setItem("token", res.data.token);
        dispatch({ type: LOGIN, payload: res.data });
        return true;
      })
      .catch(err => {
        console.error(err);
        if (authError(err).payload.response.status === 401) {
          dispatch({ type: INVALID_CREDENTIALS });
          setTimeout(() => {
            dispatch({ type: CLEAR_ERROR });
          }, 5000);
        }
      });
  };
};

export const logout = () => {
  //Google analytics tracking
  window.gtag("event", "logout", {
    event_category: "access",
    event_label: "logout"
  });

  const token = localStorage.getItem("token");

  if (token) {
    localStorage.removeItem(token);
  } else if (firebase.auth().currentUser !== null) {
    firebase.auth().signOut();
    // console.log('%cLogged out from Firebase User', 'font-size: 16px; color: green;')
  }
  return { type: LOGOUT };
};

export const addVehicle = value => {
  console.log("value step2", value)
  return dispatch => {
    dispatch({ type: ADD_VEHICLE_REQUEST });
    return axios
      .post(
        // `${process.env.REACT_APP_BASE_URL}/vehicle`
        "https://labs15rvlife.herokuapp.com/vehicle"
        , value, {
        headers: { Authorization: localStorage.getItem("token") },
        "Content-Type": "application/json"
      })
      .then(res => {
        console.log("add vehicle res ST3", res); // data was created successfully and logs to console

        dispatch({ type: ADD_VEHICLE_SUCCESS, payload: res.data });
        return true;
      })
      .catch(err => {
        console.log("add vehicle err", err); // there was an error creating the data and logs to console
        dispatch({ type: ERROR_MESSAGE, errorMessage: "request failed" });
      });
  };
};

export const getVehicles = () => {
  return dispatch => {
    dispatch({ type: LOADING });
    return axios
      .get(
        // `${process.env.REACT_APP_BASE_URL}/vehicle`
        "https://labs15rvlife.herokuapp.com/vehicle"
        , {
        headers: { Authorization: localStorage.getItem("token") },
        "Content-Type": "application/json"
      })
      .then(res => {
        console.log("get vehicle res", res); // data was created successfully and logs to console

        dispatch({ type: GET_VEHICLE, payload: res.data });
        return true;
      })
      .catch(err => {
        console.log("get vehicle err", err); // there was an error creating the data and logs to console
        dispatch({ type: ERROR_MESSAGE, errorMessage: "request failed" });
      });
  };
};

export const updateVehicle = (value, id) => {
  console.log("value",value)
  console.log("id in update actions",id)
  //Google analytics tracking
  window.gtag("event", "update vehicle", {
    event_category: "update",
    event_label: "update vehicle"
  });
  return dispatch => {
    dispatch({ type: LOADING });
    return axios
      .put(
        // `${process.env.REACT_APP_BASE_URL}/vehicle/${id}`
        `https://labs15rvlife.herokuapp.com/vehicle/${id}`
        , value, {
        headers: { Authorization: localStorage.getItem("token") },
        "Content-Type": "application/json"
      })
      .then(res => {
        console.log("update res", res); // data was created successfully and logs to console

        // dispatch({ type: UPDATE_VEHICLE, payload: {value, id} });
        dispatch({ type: LOADING });
        return axios
          .get(
            // `${process.env.REACT_APP_BASE_URL}/vehicle`
            "https://labs15rvlife.herokuapp.com/vehicle"
            , {
            headers: { Authorization: localStorage.getItem("token") },
            "Content-Type": "application/json"
          })
          .then(res => {
            console.log("get vehicle res", res); // data was created successfully and logs to console

            dispatch({ type: GET_VEHICLE, payload: res.data });
            return true;
          })
          .catch(err => {
            console.log("get vehicle err", err); // there was an error creating the data and logs to console
            dispatch({ type: ERROR_MESSAGE, errorMessage: "request failed" });
          });
        // return true;
      })
      .catch(err => {
        console.log("update vehicle err:", err); // there was an error creating the data and logs to console
        dispatch({ type: ERROR_MESSAGE, errorMessage: "request failed" });
      });
  };
};

export const deleteVehicles = id => {
  //Google analytics tracking
  window.gtag("event", "delete vehicle", {
    event_category: "delete",
    event_label: "delete vehicle"
  });

  
  return dispatch => {
    dispatch({ type: LOADING });
    return axios
      .delete(
        // `${process.env.REACT_APP_BASE_URL}/vehicle/${id}`
        `https://labs15rvlife.herokuapp.com/vehicle/${id}`
        , {
        headers: { Authorization: localStorage.getItem("token") },
        "Content-Type": "application/json"
      })
      .then(res => {
        console.log("de;lete res", res); // data was created successfully and logs to console

        dispatch({ type: DELETE_VEHICLE, payload: id });
        return true;
      })
      .catch(err => {
        console.log("delete vehicle err:", err); // there was an error creating the data and logs to console
        dispatch({ type: ERROR_MESSAGE, errorMessage: "request failed" });
      });
  };
};
