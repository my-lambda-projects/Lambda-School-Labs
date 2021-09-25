import {UPDATE_SETTINGS, UPDATING_SETTINGS, ERROR } from '../actions/types';

const INITIAL_STATE = {
    settings: {},
    updatingSettings: false,
    errorMessage: '',
};

export default function(state=INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATING_SETTINGS:
            return {...state, updatingSettings: true };
        case UPDATE_SETTINGS:
            return {...state, settings: action.payload, updatingSettings: false, errorMessage: null}
        case ERROR:
            return {...state, errorMessage: action.payload };
        default:
            return state;
    }
}