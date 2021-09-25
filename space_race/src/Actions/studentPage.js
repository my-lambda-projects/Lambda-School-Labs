import axios from 'axios';

export const CREATINGSTUDENT = 'CREATINGSTUDENT';
export const STUDENTCREATED = 'STUDENTCREATED';
export const ERROR = 'ERROR';



// TODO: Change URL for deployment
const url = 'http://127.0.0.1:8000/db/students';

export const createStudent = (data, slug, history) => {
  return dispatch => {
    dispatch({type: CREATINGSTUDENT})
    axios.post(url, data)
      .then(response => {
        let student = JSON.stringify(response.data)
        localStorage.setItem('student', student)
        dispatch({type: STUDENTCREATED})
        history.push(`/race/${slug}`)
      })
      .catch(error => {
        dispatch({type: ERROR, payload: error})
      })
  }
}
