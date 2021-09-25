import axios from 'axios';

export const LOGGINGIN = 'LOGGINGIN';
export const LOGGEDIN = 'LOGGEDIN';
export const ERROR = 'ERROR';
export const SIGNINGUP = 'SIGNINGUP';
export const SIGNINGOUT = 'SIGNINGOUT';
export const SIGNEDOUT = 'SIGNEDOUT';


// TODO: change urls for deployment
const url = 'http://127.0.0.1:8000/api/v1/rest-auth/login/'

const signUpUrl = 'http://127.0.0.1:8000/api/v1/rest-auth/registration/';

const redirectURL = 'http://localhost:3000/'


export const loggingIn = (data) => {
  return dispatch => {
    dispatch({type: LOGGINGIN})
    axios.post(url, data)
      .then(response => {
        let token = `JWT ${response.data.token}`
        window.localStorage.setItem('Authorization', token)
        dispatch({type: LOGGEDIN, payload: response.data.user})
      })
      .catch(error => {
        dispatch({type: ERROR, payload: error})
      })
  }
}

export const signingUp = (data) => {
  return dispatch => {
    dispatch({type: SIGNINGUP})
    axios.post(signUpUrl, data)
      .then(response => {
        let token = `JWT ${response.data.token}`
        window.localStorage.setItem('Authorization', token)
        dispatch({type: LOGGEDIN, payload: response.data.user})
      })
      .catch(error => {
        dispatch({type: ERROR, payload: error})
      })
  }
}


export const signOut = () => {
  return dispatch => {
    dispatch({type: SIGNINGOUT})
    window.localStorage.clear();
    dispatch({type: SIGNEDOUT})
    document.location.replace(redirectURL)   
  }
}