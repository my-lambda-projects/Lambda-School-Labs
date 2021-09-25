import { FETCH_USER, NEW_USER } from './types';
import axios from 'axios';

export function fetchUser () {
    return (dispatch) => {
        //.then((res) => {
            let inUser = dispatch({type: FETCH_USER, inUser})
        //}).catch((err) => {
            //console.log(err)
        //})
    }
};

export function newUser (userObject) {
    return (dispatch) => {
        //.then((res) => {
            let newUser = dispatch({type: 'NEW_USER', newUser})
        //}).catch((err) => {
            //console.log(err)
        //})
    }
};
