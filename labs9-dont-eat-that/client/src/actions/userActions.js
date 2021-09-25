import axios from 'axios';

export const ADD_USER = 'ADD_USER';
export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const ERROR = "ERROR";


const URL = 'https://donteatthat.herokuapp.com';


export const getUser = () => dispatch => {
    let firebaseid = localStorage.getItem('uid');
    axios
      .get(`${URL}/api/users/one/${firebaseid}`)
      .then(res => dispatch({ type: GET_USER, payload: res.data }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
  
  export const addUser = firebaseid => dispatch => {
    axios
      .post(`${URL}/api/users/create`, { firebaseid })
      .then(res =>
        dispatch({ type: ADD_USER, payload: { id: res.data, firebaseid } })
      )
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };

  export const removeUser = () => dispatch => {
    dispatch({ type: REMOVE_USER, payload: null })
  }
  