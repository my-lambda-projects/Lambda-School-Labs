import axios from 'axios';
import { ROOT_URL } from '../actions';
// const ROOT_URL = 'http://localhost:5000/api';
/* eslint-disable consistent-return, no-unexpected-multiline  */
const runAxios = (o, f) => {
  const {
    verb, url, body = {}, idOption = 'none',
  } = o;
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    return f(new Error('missing token or id'), null);
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  let curl = `${ROOT_URL}${url}`;
  if (idOption === 'param') curl += `/userId/${id}`;
  if (idOption === 'body') {
    body.userId = id;
  }
  axios
    [verb](curl, body, config)
    .then((response) => {
      f(null, response);
    })
    .catch((err) => {
      f(err, null);
    });
};
export default runAxios;
