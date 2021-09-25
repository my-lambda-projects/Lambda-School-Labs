import axios from "axios";
import jwt from "jsonwebtoken";

export const ADMIN_REGISTER = "ADMIN_REGISTER";
export const ADMIN_REGISTER_ERRORS = "ADMIN_REGISTER_ERRORS";
export const ADMIN_LOGIN = "ADMIN_LOGIN";
export const ADMIN_LOGIN_ERRORS = "ADMIN_LOGIN_ERRORS";
export const ADMIN_LOGOUT = "ADMIN_LOGOUT";
export const GET_ADMIN_ORGANIZATIONS = "GET_ADMIN_ORGANIZATIONS";
export const ADD_ADMIN_ORGANIZATIONS = "ADD_ADMIN_ORGANIZATIONS";
export const ADD_ADMIN_ORGANIZATIONS_ERRORS = "ADD_ADMIN_ORGANIZATIONS_ERRORS";
export const UPDATE_ADMIN = "UPDATE_ADMIN";
export const ERRORS = "ERRORS";
const ADMIN_URL = process.env.REACT_APP_ADMIN_URL;

const dataEncrypt = data => jwt.sign(data, process.env.REACT_APP_ACCESS_KEY);

export const registerAdminAction = obj => {
  return dispatch => {
    axios
      .post(`${ADMIN_URL}register`, { token: dataEncrypt(obj) })
      .then(res => {
        dispatch({
          type: ADMIN_REGISTER,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: ADMIN_REGISTER_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const loginAdminAction = obj => {
  return dispatch => {
    axios
      .post(`${ADMIN_URL}login`, { token: dataEncrypt(obj) })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: ADMIN_LOGIN,
          successfulLogin: true,
          payload: res.data.token
        });
      })
      .catch(err => {
        dispatch({ type: ADMIN_LOGIN_ERRORS, payload: err.response.data });
      });
  };
};
export const updateAdminAction = (adminObject) => {
    return dispatch => {
        axios
            .put(`${ADMIN_URL}update`, {token: dataEncrypt(adminObject)})
            .then(res => {
                dispatch({
                    type: UPDATE_ADMIN,
                    payload: res.admin, //Student data object returned
                });
            })
            .catch(err => {
                dispatch({
                    type: ERRORS,
                    payload: err.response.data
                });
            });
    }
}
export const logoutAdminAction = () => {
  localStorage.removeItem("token");
  return dispatch => {
    dispatch({ type: ADMIN_LOGOUT });
  };
};

export const getAdminOrganizations = ({ id }) => {
  return dispatch => {
    axios
      .get(`${ADMIN_URL}${id}/organizations`, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.token
        }
      })
      .then(res => {
        dispatch({
          type: GET_ADMIN_ORGANIZATIONS,
          payload: res.data,
          newOrganization: null
        });
      })
      .catch(err => {
        dispatch({
          type: "ERRORS",
          payload: err.response
        });
      });
  };
};

export const addAdminOrganization = obj => {
  const token = localStorage.token;
  return dispatch => {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: token },
      data: { token: dataEncrypt(obj) },
      url: `${ADMIN_URL}${obj.id}/organizations/create`
    };
    axios(options)
      .then(res => {
        dispatch({
          type: ADD_ADMIN_ORGANIZATIONS,
          payload: res.data,
          newOrganization: true,
          getSubscriptionInfo: null,
          getSubscriptionStatus: null,
          stripeCustomerID: null
        });
      })
      .catch(err => {
        dispatch({
          type: ADD_ADMIN_ORGANIZATIONS_ERRORS,
          payload: err.response.data
        });
      });
  };
};
