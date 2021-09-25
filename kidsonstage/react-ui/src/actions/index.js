import axios from 'axios';

export * from './events';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';
export const EDIT_USER = 'EDIT_USER';
export const CLEAR_USERS = 'CLEAR_USERS';

/* eslint-disable no-console, semi-style */

axios.defaults.withCredentials = true;

export const ROOT_URL =
  (process.env.NODE_ENV === 'production') ?
    'https://www.whenismykidonstage.com/api'
    : 'http://localhost:5000/api'
  ;

export const authError = error => ({
  type: AUTHENTICATION_ERROR,
  payload: error,
});

export const register = (user, history) => (dispatch) => {
  if (user.password !== user.confirmPassword) {
    dispatch(authError('Passwords do not match'));
    return;
  }
  console.log(`in "register" for ${JSON.stringify(user, null, 2)}`);
  axios
    .post(`${ROOT_URL}/users/newUser`, user)
    .then(() => {
      dispatch({
        type: USER_REGISTERED,
      });
      console.log(`pushing /signin for user ${user.username}`);
      history.push('/signin');
    })
    .catch((err) => {
      console.log(`"register" ${err}`);
      dispatch(authError('Failed to register user'));
    });
};

export const login = (user, history) => (dispatch) => {
  const { username, password } = user;
  console.log(`username: ${username} password: ${password}`);
  axios
    .post(`${ROOT_URL}/users/login`, user)
    .then((response) => {
      // console.log(`token: ${response.data.token}  id: ${response.data.id}`);
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('id', response.data.id);
      dispatch({
        type: USER_AUTHENTICATED,
      });
      dispatch({
        type: GET_USER,
        payload: [response.data.user.record],
      });
      history.push('/events');
      // console.log(`history keys ${Object.keys(history)}`);
    })
    .catch((err) => {
      console.log(`login ${err}`);
      dispatch(authError('Incorrect email/password combo'));
    });
};

export const logout = () => (dispatch) => {
  sessionStorage.clear();
  window.location = '/';
  dispatch({
    type: USER_UNAUTHENTICATED,
  });
  dispatch({
    type: CLEAR_USERS,
  });
};

export const getUser = () => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  // console.log(`getUser for id ${id}`);
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .get(`${ROOT_URL}/users/${id}`, config)
    .then((response) => {
      // console.log(`getUser response.data.keys: ${Object.keys(response.data)}
      //     isArray ${Array.isArray(response.data)} `);
      // console.log(`getUser username ${response.data[0].username}`);
      // console.log(`getUser response.data ${JSON.stringify(response.data, null, 2)}`);
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(`getUser failed ${err}`);
      dispatch(authError('Failed to fetch users'));
    });
};


export const updateUser = (user, history) => (dispatch) => {
  console.log(`in "updateUser" for phoneNumber ${user.phoneNumber} email ${user.email}`);
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .put(`${ROOT_URL}/users/update`, { id, ...user }, config)
    .then(() => {
      dispatch({
        type: USER_REGISTERED,
      });
      dispatch({
        type: EDIT_USER,
        payload: { id, ...user },
      });
      console.log(`pushing /events for user id ${id}`);
      // window.location = '/events';
      history.push('/events');
    })
    .catch((err) => {
      console.log(`"updateUser" ${err}`);
      dispatch(authError('Failed to update user'));
    });
};

export const getUsers = () => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .get(`${ROOT_URL}/restricted/users`, config)
    .then((response) => {
      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(authError('Failed to fetch users'));
    });
};
