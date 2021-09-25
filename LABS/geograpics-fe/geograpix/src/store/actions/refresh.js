import { axiosWithAuth } from '../../utilities/axiosWithAuth';

import {
  GET_PICTURE_OBJECT_START,
  GET_PICTURE_OBJECT_SUCCESS,
  GET_PICTURE_OBJECT_FAIL
} from './markers';

// const hostURL = `//geograpics-staging.herokuapp.com`;
const hostURL = process.env.REACT_APP_URL || '//localhost:8000'

export const refreshPictureObject = () => dispatch => {
  console.log('REFRESH PICTURE CLICKED')
  dispatch({ type: GET_PICTURE_OBJECT_START });
  axiosWithAuth()
    .delete(`${hostURL}/map/refresh`)
        .then(res => {
          dispatch({ type: GET_PICTURE_OBJECT_SUCCESS, payload: res.data });
          console.log('GET_PICTURE_OBJECT_SUCCESS', res.data)
        })
        .catch( err => {
          dispatch({ type: GET_PICTURE_OBJECT_FAIL, payload: err });
          console.log('GET_PICTURE_OBJECT_FAIL', err)
        });
}