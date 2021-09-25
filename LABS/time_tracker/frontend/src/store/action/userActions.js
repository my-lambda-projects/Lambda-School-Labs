import axios from 'axios';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const ADD_CLIENT = 'ADD_CLIENT';
export const CHANGE_USER = 'CHANGE_USER';
export const USER_CHANGED = 'USER_CHANGED';
export const GETTING_USER_INFO = 'GETTING_USER_INFO';
export const GOT_USER_INFO = 'GOT_USER_INFO';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const ADD_CLIENT_ERR = 'ADD_CLIENT_ERR';
export const ADDED_CLIENT = 'ADDED_CLIENT';

// const backend = process.env.BASE_URL || 'http://localhost:5000';
const backend =
  process.env.NODE_ENV === 'production'
    ? `https://ls-time-tracker.herokuapp.com`
    : `http://localhost:5000`;

export const signUp = ({ name, email, password, type }) => {
  return dispatch => {
    if (type === 'client') {
      axios
        .post(`${backend}/client/signup`, { name, email, password })
        .then(({ data }) => {
          dispatch({ type: SIGNUP, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post(`${backend}/vendor/signup`, { name, email, password })
        .then(({ data }) => {
          dispatch({ type: SIGNUP, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};

export const logIn = ({ email, password, type }) => {
  return dispatch => {
    if (type === 'client') {
      axios
        .post(`${backend}/client/login`, { email, password })
        .then(({ data }) => {
          window.localStorage.setItem('Authorization', data.token);
          window.localStorage.setItem('UserType', 'client');
          dispatch({ type: LOGIN, payload: data, userType: 'client' });
        })
        .catch(err => {
          dispatch({ type: LOGIN_ERROR });
          console.log(err);
        });
    } else {
      axios
        .post(`${backend}/vendor/login`, { email, password })
        .then(({ data }) => {
          window.localStorage.setItem('Authorization', data.token);
          window.localStorage.setItem('UserType', 'vendor');
          dispatch({ type: LOGIN, payload: data, userType: 'vendor' });
        })
        .catch(err => {
          dispatch({ type: LOGIN_ERROR });
          console.log(err);
        });
    }
  };
};

export const authenticate = (token, userType, history) => {
  return dispatch => {
    axios
      .post(
        `${backend}/${userType}/authenticate`,
        { token },
        {
          headers: {
            token: window.localStorage.getItem('Authorization'),
            userType: window.localStorage.getItem('UserType')
          }
        }
      )
      .then(({ data }) => {
        dispatch({ type: LOGIN, payload: data, userType: userType });
      })
      .catch(err => {
        window.localStorage.removeItem('Authorization');
        window.localStorage.removeItem('UserType');
        history.push('/login');
      });
    dispatch({ type: '' });
  };
};

export const addClient = (email, _id) => {
  return dispatch => {
    axios
      .put(
        `${backend}/vendor/client/add`,
        { email, _id },
        {
          headers: {
            token: window.localStorage.getItem('Authorization'),
            userType: window.localStorage.getItem('UserType')
          }
        }
      )
      .then(({ data }) => {
        dispatch({ type: ADD_CLIENT, payload: data });
      })
      .catch(err => {
        dispatch({ type: ADD_CLIENT_ERR });
        console.log(err);
      });
  };
};

export const changeUserDetails = (
  password,
  newPassword,
  newEmail,
  userType,
  id
) => {
  return dispatch => {
    if (userType === 'client') {
      if (newPassword && !newEmail) {
        // Just changing password
        axios
          .put(
            `${backend}/client/settings/${id}`,
            { password, newPassword },
            {
              headers: {
                token: window.localStorage.getItem('Authorization'),
                userType: window.localStorage.getItem('UserType')
              }
            }
          )
          .then(({ data }) => {
            window.localStorage.setItem('Authorization', data.token);
            dispatch({ type: CHANGE_USER, payload: data });
            dispatch({ type: USER_CHANGED });
          })
          .catch(err => {
            console.log(err);
          });
      } else if (!newPassword && newEmail) {
        // Just changing email
        axios
          .put(
            `${backend}/client/settings/${id}`,
            { password, newEmail },
            {
              headers: {
                token: window.localStorage.getItem('Authorization'),
                userType: window.localStorage.getItem('UserType')
              }
            }
          )
          .then(({ data }) => {
            window.localStorage.setItem('Authorization', data.token);
            dispatch({ type: CHANGE_USER, payload: data });
            dispatch({ type: USER_CHANGED });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // Changing both password and email
        axios
          .put(
            `${backend}/client/settings/${id}`,
            {
              password,
              newPassword,
              newEmail
            },
            {
              headers: {
                token: window.localStorage.getItem('Authorization'),
                userType: window.localStorage.getItem('UserType')
              }
            }
          )
          .then(({ data }) => {
            window.localStorage.setItem('Authorization', data.token);
            dispatch({ type: CHANGE_USER, payload: data });
            dispatch({ type: USER_CHANGED });
          })
          .catch(err => {
            console.log(err);
          });
      }
    } else {
      if (newPassword && !newEmail) {
        // Just changing password
        axios
          .put(
            `${backend}/vendor/settings/${id}`,
            { password, newPassword },
            {
              headers: {
                token: window.localStorage.getItem('Authorization'),
                userType: window.localStorage.getItem('UserType')
              }
            }
          )
          .then(({ data }) => {
            window.localStorage.setItem('Authorization', data.token);
            dispatch({ type: CHANGE_USER, payload: data });
            dispatch({ type: USER_CHANGED });
          })
          .catch(err => {
            console.log(err);
          });
      } else if (!newPassword && newEmail) {
        // Just changing email
        axios
          .put(
            `${backend}/vendor/settings/${id}`,
            { password, newEmail },
            {
              headers: {
                token: window.localStorage.getItem('Authorization'),
                userType: window.localStorage.getItem('UserType')
              }
            }
          )
          .then(({ data }) => {
            window.localStorage.setItem('Authorization', data.token);
            dispatch({ type: CHANGE_USER, payload: data });
            dispatch({ type: USER_CHANGED });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // Changing both password and email
        axios
          .put(
            `${backend}/vendor/settings/${id}`,
            {
              password,
              newPassword,
              newEmail
            },
            {
              headers: {
                token: window.localStorage.getItem('Authorization'),
                userType: window.localStorage.getItem('UserType')
              }
            }
          )
          .then(({ data }) => {
            window.localStorage.setItem('Authorization', data.token);
            dispatch({ type: CHANGE_USER, payload: data });
            dispatch({ type: USER_CHANGED });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
};

export const getUserInfo = (id, type) => {
  return dispatch => {
    if (type === 'client') {
      dispatch({ type: GETTING_USER_INFO });
      axios
        .get(`${backend}/client/${id}`, {
          headers: {
            token: window.localStorage.getItem('Authorization'),
            userType: window.localStorage.getItem('UserType')
          }
        })
        .then(({ data }) => {
          dispatch({
            type: GOT_USER_INFO,
            payload: data,
            clients: data.vendors
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      dispatch({ type: GETTING_USER_INFO });
      axios
        .get(`${backend}/vendor/${id}`, {
          headers: {
            token: window.localStorage.getItem('Authorization'),
            userType: window.localStorage.getItem('UserType')
          }
        })
        .then(({ data }) => {
          dispatch({
            type: GOT_USER_INFO,
            payload: data,
            clients: data.clients
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};

export const paymentSuccess = () => {
  return dispatch => {
    dispatch({ type: PAYMENT_SUCCESS });
  };
};

export const logOut = history => {
  return dispatch => {
    window.localStorage.removeItem('Authorization');
    window.localStorage.removeItem('UserType');
    history.push('/login');
    dispatch({ type: LOGOUT });
  };
};
