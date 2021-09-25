import { ERROR, ADDING_GAME, ADDED_GAME, FETCHED_GAMES, FETCHING_GAMES, SAVING_GAME, SAVED_GAME, FETCHING_GAME, FETCHED_GAME, DELETING_GAME, DELETED_GAME } from '../actions/types';

const INITIAL_STATE = {
    storedGames: [],
    fetchingGames: false,
    creatingGame: false,
    deletingGame: false,
    errorMessage: ''
};

export default function(state=INITIAL_STATE, action) {
    switch(action.type) {
        case FETCHING_GAMES:
            return {...state, fetchingGames: true };
        case FETCHED_GAMES:
            return {...state, storedGames: action.payload.games.filter(game => game.userId === action.payload.userId )  };
        case FETCHING_GAME:
            return {...state, fetchingGames: true };
        case FETCHED_GAME:
            return {...state, storedGames: state.storedGames.filter(game => game._id === action.payload ) };   
        case ADDING_GAME:
            return {...state, creatingGame: true };
        case ADDED_GAME:
            return {...state, storedGames: [...state.storedGames, action.payload]  };
        case SAVING_GAME:
            return {...state, creatingGame: true };
        case SAVED_GAME:
            return {...state, storedGames: state.storedGames.map(g => g._id === action.payload._id ? g = action.payload : g)  };
        case DELETING_GAME:
            return { ...state, deletingGame: true };
        case DELETED_GAME:
            return { ...state, storedGames: state.storedGames.filter(g => g._id !== action.payload._id) };            
        case ERROR:
            return {...state, errorMessage: action.payload };
        default:
            return state;
    }
}