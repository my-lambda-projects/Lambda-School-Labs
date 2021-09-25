import {
  GET_PICTURE_OBJECT_START, GET_PICTURE_OBJECT_SUCCESS, GET_PICTURE_OBJECT_FAIL
} from '../actions/index';


const initialState = {
  pictureInfo: {},
  isGetting: false,
  error: null
}

export const maps = (state = initialState, action) => {
  switch(action.type){
    case GET_PICTURE_OBJECT_START:
      return{
        ...state,
        isGetting: true
      }
    case GET_PICTURE_OBJECT_SUCCESS:
      return{
        pictureInfo: action.payload,
        isGetting: false
      }
    case GET_PICTURE_OBJECT_FAIL:
      return{
        pictureInfo: action.payload,
        isGetting: false
      }
    default:
      return state;
  }
}