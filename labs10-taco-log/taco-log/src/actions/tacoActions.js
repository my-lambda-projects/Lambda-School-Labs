import axios from 'axios';
export const FETCH_TACOS = 'FETCH_TACOS';
export const ADDDATABASE_TACOS = 'ADDDATABASE_TACOS';
export const STORE_LANDING_TACO = 'STORE_LANDING_TACO';
export const CLEAR_LANDING_TACO = 'CLEAR_LANDING_TACO';

// const local = 'http://localhost:5000/';
const heroku = 'https://tacobe.herokuapp.com/';
const link = heroku;

export const GET_TACO = () => dispatch => {
  axios
    .get(`${link}api/tacos/special`)
    .then(res => dispatch({ type: FETCH_TACOS, payload: res.data }, console.log('test')));
};

export const ADD_TACO = taco => dispatch => {
  axios
    .post(`${link}api/friends`, taco)
    .then(res => dispatch({ type: ADDDATABASE_TACOS, payload: res.data }));
};
export const storeLandingTaco = taco => dispatch =>{
  dispatch({ type: STORE_LANDING_TACO, payload: taco })
}
export const clearLandingTaco = taco => dispatch =>{
  dispatch({ type: CLEAR_LANDING_TACO })
}