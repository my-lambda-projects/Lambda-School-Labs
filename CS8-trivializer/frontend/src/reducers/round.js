import { FETCHING_THREE, FETCHED_THREE, ERROR, ADDING_ROUND, ADDED_ROUND, FETCHING_ROUND, FETCHED_ROUND, FETCHED_QUESTIONS, FETCHING_THREE_UPDATE, FETCHED_THREE_UPDATE, UPDATING_ROUND, UPDATED_ROUND, DELETING_ROUND, DELETED_ROUND } from '../actions/types';

const INITIAL_STATE = {
    round: null,
    storedRound: [],
    storedQuestions: [],
    fetchingRound: false,
    addingRound: false,
    updatingRound: false,
    deletingRound: false,
    errorMessage: '',
};

export default function(state=INITIAL_STATE, action) {

    switch(action.type) {
        case FETCHED_QUESTIONS:
            return {...state, storedQuestions: action.payload.rounds.map(round => { if (round._id === action.payload.questionId){return round.questions}  }).filter(item=> item !== undefined)}
        case FETCHING_ROUND:
            return { ...state, fetchingRound: true };
        case FETCHED_ROUND:
            return { ...state, storedRound:  action.payload.rounds.filter(round => round.gameId === action.payload.gameId ) };
        case ADDING_ROUND:
            return { ...state, addingRound: true };
        case ADDED_ROUND:
            return { ...state, storedRound: [...state.storedRound, action.payload] };
        case UPDATING_ROUND:
            return { ...state, updatingRound: true };
        case UPDATED_ROUND:
            return { ...state, storedRound: state.storedRound.map(r => r._id === action.payload._id ? r = action.payload : r) };
        case DELETING_ROUND:
            return { ...state, deletingRound: true };
        case DELETED_ROUND:
            return { ...state, storedRound: state.storedRound.filter(r => r._id !== action.payload._id) };    
        case FETCHING_THREE_UPDATE:
            return { ...state, fetchingRound: true };
        case FETCHED_THREE_UPDATE:
            return {...state, round: action.payload  };
        case FETCHING_THREE:
            return { ...state, fetchingRound: true };
        case FETCHED_THREE:
            return {...state, round: action.payload  };
        case ERROR:
            return {...state, errorMessage: action.payload };
        default:
            return state;
    }
}