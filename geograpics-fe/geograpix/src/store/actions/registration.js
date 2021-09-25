import { axiosWithAuth } from '../../utilities/axiosWithAuth';

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

// const hostURL = `//geograpics-staging.herokuapp.com`;
const hostURL = process.env.REACT_APP_URL || '//localhost:8000'

export const registration = (id, values, history, username) => dispatch => {
  console.log('got to action')
  dispatch({ type: REGISTER_START });
  axiosWithAuth()
    .put(`${hostURL}/users/${id}`, values)
        .then(res => {
          dispatch({ type: REGISTER_SUCCESS, payload: res.data });
          history.push(`/dashboard/${username}`);
        })
        .catch( err => {
          dispatch({ type: REGISTER_FAIL, payload: err });
        });
}
