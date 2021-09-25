import axios from 'axios';

export const GETTINGRACES = 'GETTINGRACES';
export const GOTRACES = 'GOTRACES';
export const ERROR = 'ERROR';


// TODO: Change url for deployment
const url = 'http://127.0.0.1:8000/db/'

export const getRaces = () => {
  return dispatch => {
    dispatch({type: GETTINGRACES})
    let token = window.localStorage.getItem('Authorization')
    axios.get(url, {headers: {Authorization: token}})
      .then(response => {
        dispatch({type: GOTRACES, payload: response.data})
      })
      .catch(error => {
        dispatch({type: ERROR, payload: error})
      })
  }
}

