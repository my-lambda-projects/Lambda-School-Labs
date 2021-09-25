import { QUIZINFOADDED, QUESTIONADDED, STARTRACE, ERROR} from '../Actions/createRace';

let initialState = {
    quizAdded: false,
    quiz: null,
    questionsAdded: false,
    questions: null,
    startRace: false,
    race: null,
    error: null
}


const CreateRaceReducer = (state = initialState, action) => {
    switch(action.type) {
        case QUIZINFOADDED:
            return {...state, quizAdded: true, quiz: action.payload};
        case QUESTIONADDED:
            return {...state, questionsAdded: true, questions: action.payload};
        case STARTRACE:
            return {...state, startRace: true, race: action.payload};
        case ERROR: 
            return {...state, error: action.payload};
        default:
            return state
    }
}

export default CreateRaceReducer;