import axios from 'axios';

export const QUIZINFOADDED = 'QUIZINFOADDED';
export const QUESTIONADDED = 'QUESTIONADDED';
export const STARTRACE = 'STARTRACE';
export const ERROR = 'ERROR';

// TODO: Change URL for deployment
const url = 'http://127.0.0.1:8000/db/'

export const QuizInfo = data => {
    return dispatch => {
        let quiz = localStorage.setItem('quiz', JSON.stringify(data));
        let getQuiz = JSON.parse(localStorage.getItem('quiz'));
        let getQuestions = JSON.parse(localStorage.getItem('questions'));
        if (getQuestions) {
            dispatch({type: QUESTIONADDED, payload: getQuestions})
        }
        dispatch({type: QUIZINFOADDED, payload: getQuiz});
    }
}

export const getQuizInfo = () => {
    return dispatch => {
        let getQuiz = JSON.parse(localStorage.getItem('quiz'));
        if (getQuiz) {
            dispatch({type: QUIZINFOADDED, payload: getQuiz});
        }
    }
}
export const questionAdded = data => {
    return dispatch => {
        let questions = localStorage.setItem('questions', JSON.stringify(data));
        let getQuestions = JSON.parse(localStorage.getItem('questions'));
        dispatch({type: QUESTIONADDED, payload: getQuestions})
    
    }
}

export const StartRace = data => {
    return dispatch => {
        if (data) {
            let questions = localStorage.setItem('questions', JSON.stringify(data));
        }
        let getQuestions = JSON.parse(localStorage.getItem('questions'));
        let getQuiz = JSON.parse(localStorage.getItem('quiz'));
        let final = {...getQuiz, questions: getQuestions};

        let token = window.localStorage.getItem('Authorization');

        axios.post(url, final, { headers: {Authorization: token}})
            .then(response => {
                dispatch({type: STARTRACE, payload: response.data})
            })
            .catch(err => {
                dispatch({type: ERROR, payload: err})
            })     
    }
} 

