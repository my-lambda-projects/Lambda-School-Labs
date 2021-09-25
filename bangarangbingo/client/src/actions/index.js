/* eslint-disable */
import axios from 'axios';
axios.defaults.withCredentials = true;
const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://www.bangarangbingo.com' : 'http://localhost:8080';
import { push } from 'react-router-redux';
import { authenticate } from './auth';
export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_CARDS = 'GET_CARDS';
export const GET_CARD = 'GET_CARD';
export const ADD_CARD = 'ADD_CARD';
export const EDIT_CARD = 'EDIT_CARD';
// export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

// updateUser needs work
export const updateUserPassword = (username, password, confirmPassword, newPassword, confirmNewPassword, history) => {
  const authToken = window.localStorage.getItem('token');
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Old passwords do not match'));
      return;
    }
    if (newPassword !== confirmNewPassword) {
      dispatch(authError('New passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/auth/reset`, { username, password, confirmPassword, newPassword, confirmNewPassword }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then(() => {
        dispatch({
          type: USER_REGISTERED
        });
        history.push('/cards');
      })
      .catch(() => {
        dispatch(authError('Failed to update user password'));
      });
  };
};

export const updateUserEmail = (username, newUsername, password, confirmPassword, history) => {
  const authToken = window.localStorage.getItem('token');
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/auth/update`, { username, newUsername, password, confirmPassword }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then(() => {
        dispatch({
          type: USER_REGISTERED
        });
        history.push('/cards');
      })
      .catch(() => {
        dispatch(authError('Failed to update user email'));
      });
  };
};

export const downloadCards = () => {
  return dispatch => {
    window.location.href = `${ROOT_URL}/cards/download`;
  }
}

export const getCards = () => {
  const authToken = window.localStorage.getItem('token');
  return dispatch => {
    axios
      .get(`${ROOT_URL}/cards`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then((res) => {
        dispatch({
          type: GET_CARDS,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to get cards'));
      });
  };
};


export const getCard = id => async (dispatch) => {
  try {
    const authToken = window.localStorage.getItem('token');
    const { data } = await axios.get(`${ROOT_URL}/card/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    });
    const { card } = data;
    //we have card, now we have to set the card to edit;
    console.log('get card: ', data);
  } catch (e) {
    console.log('get card: ', e);
  }
}


// export const getCard = (id) => {
//   const authToken = window.localStorage.getItem('token');
//   return dispatch => {
//     axios
//       .get(`${ROOT_URL}/card/${id}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         }
//       })
//       .then((res) => {
//         dispatch({
//           type: GET_CARD,
//           payload: res
//         });
//       })
//       .catch(() => {
//         dispatch(authError('Failed to get card by that id'));
//       });
//   };
// };

export const addCard = (card) => {
  const authToken = window.localStorage.getItem('token');
  return dispatch => {
    axios
      .post(`${ROOT_URL}/card/create`, card, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then((res) => {
        dispatch({
          type: ADD_CARD,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to add new card'));
      });
  };
};

export const editCard = (id, card) => {
  const authToken = window.localStorage.getItem('token');
  return dispatch => {
    axios
      .post(`${ROOT_URL}/card/edit/{$id}`, card, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then((res) => {
        dispatch({
          type: EDIT_CARD,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to edit card'));
      });
  };
};

export const processPayment = (token, options) => {
  const authToken = window.localStorage.getItem('token');
  return dispatch => {
    axios.post(`${ROOT_URL}/payments`, { options, token }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    }).then(res => {
      const { user } = res.data;
      if (user) {
        console.log('USER WE GOT BACK', user);
        dispatch(authenticate(user, authToken));
      }
      if (options.id) {
        dispatch(push(`/card/download/${options.id}`))
      } else {
        dispatch(push(`/cards`))
      }
      
    });
    console.log('send to server', token, options);
  }
}

export const removeCard = () => (dispatch) => {
  dispatch({
    type: 'REMOVE_CARD'
  })
};