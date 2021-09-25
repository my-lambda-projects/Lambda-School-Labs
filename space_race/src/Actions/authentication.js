/*** im not quite sure how to get this to work with the loggingIn action file separate from this but I tried to tie it in to Signin part, but it looks like we had two different methods going on. */
import axios from 'axios';
const url = 'http://127.0.0.1:8000/api/v1/rest-auth/login/'

export const LOGGINGIN = 'LOGGINGIN'
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const SIGN_UP_TOGGLE = 'SIGN_UP_TOGGLE';
export const CHECK_IF_REGISTERED = 'CHECK_IF_REGISTERED'; 
export const USER_REGISTERED = 'USER_REGISTERED';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const REGISTRATION_EXPIRED = 'REGISTRATION_EXPIRED';

export const authError = error => {
    return {
        type: AUTHENTICATION_ERROR,
        payload: error
    };
};

export const registrationError = error => {
    return {
        type: REGISTRATION_ERROR,
        payload: error
    };
};

export const signUpToggle = (state) => {
    return dispatch => {
        dispatch({
            type: SIGN_UP_TOGGLE,
            payload:!state
        });
    };
};


export const signin = (data, history) => {
    dispatch({type: LOGGINGIN})
    axios.post(url, data)
      .then(response => {
        let token = `JWT ${response.data.token}`
        window.localStorage.setItem('Authorization', token)
            dispatch({
                type: USER_AUTHENTICATED,
                payload:response.data
            });
            history.push('/'); //this should be the first page the user sees and it might depend on whether or not it is administrative or student 
        })
        .catch((error) => {
            dispatch(authError(error));
        });
    };

export const signup = (access_token, email, history) => {
    return dispatch => {
      axios
        .post(API_URL + `/users/signup`, {access_token, email})  //not sure what endpoint goes here
        .then((response) => {
            dispatch({
                type: USER_REGISTERED,
                payload:response.data
            });
            history.push('/');           //this should be the same enpoint as whatever shows up after signin.
        })
        .catch((error) => {
            dispatch(registrationError(error));
        });
    };
};


export const signout = () => {
    return dispatch => {
          dispatch({
            type: USER_UNAUTHENTICATED,
            payload: {}
          });
    };
};

