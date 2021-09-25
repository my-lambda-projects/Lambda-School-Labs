import axios from 'axios';
export const FETCH_ACHIEVEMENTS = 'FETCH_ACHIEVEMENTS';


// const local = 'http://localhost:5000/';
const heroku = 'https://tacobe.herokuapp.com/';
const link = heroku;

export const fetchAchievements = () => dispatch => {
    axios
      .get(`${link}api/achievements`)
      .then(res => dispatch({ type: FETCH_ACHIEVEMENTS, payload: res.data }, ));
  };