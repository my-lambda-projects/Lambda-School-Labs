import { axiosWithAuth } from '../../utilities/axiosWithAuth';

export const GET_PICTURE_OBJECT_START = "GET_PICTURE_OBJECT_START";
export const GET_PICTURE_OBJECT_SUCCESS = "GET_PICTURE_OBJECT_SUCCESS";
export const GET_PICTURE_OBJECT_FAIL = "GET_PICTURE_OBJECT_FAIL";

// const hostURL = `//geograpics-staging.herokuapp.com`;
const hostURL = process.env.REACT_APP_URL || '//localhost:8000'

export const getPictureObject = () => dispatch => {
  console.log('GET_PICTURE_OBJECT_START')
  dispatch({ type: GET_PICTURE_OBJECT_START });
  axiosWithAuth()
    .get(`${hostURL}/map/update`)
        .then(res => {
          dispatch({ type: GET_PICTURE_OBJECT_SUCCESS, payload: res.data });
          console.log('GET_PICTURE_OBJECT_SUCCESS', res.data)
        })
        .catch( err => {
          dispatch({ type: GET_PICTURE_OBJECT_FAIL, payload: err });
          console.log('GET_PICTURE_OBJECT_FAIL', err)
        });
}
