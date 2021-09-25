import axios from "axios";
import jwt_decode from "jwt-decode";
import { 
    ERROR, 

    REGISTER_USER, 
    AUTH_USER, 
    SIGNING_IN,
    SIGNING_UP,

    UPDATING_SETTINGS, 
    UPDATE_SETTINGS,

    FETCHING_THREE,
    FETCHED_THREE,
    FETCHED_THREE_UPDATE,
    FETCHING_THREE_UPDATE,
  

    ADDING_ROUND,
    ADDED_ROUND,
    UPDATING_ROUND,
    UPDATED_ROUND,
    FETCHING_ROUND,
    FETCHED_ROUND,
    DELETING_ROUND,
    DELETED_ROUND,

    ADDING_GAME,
    ADDED_GAME,
    SAVING_GAME,
    SAVED_GAME,
    FETCHING_GAMES, 
    FETCHED_GAMES,
    FETCHED_QUESTIONS,
    FETCHING_GAME,
    FETCHED_GAME,
    DELETED_GAME

  } from "./types";

// axios.defaults.withCredentials = true;
export const signUp = (formProps, callback) => dispatch => {
  dispatch({ type: SIGNING_UP }); 

  axios
      .post ("http://localhost:5000/signup", //MUST be http for localhost: not https
      formProps
      )
      .then(response => {
          dispatch({ type: AUTH_USER, payload: response.data.token })
          localStorage.setItem("token", response.data.token)
          callback();
      })
      
      .catch(err => {
          dispatch({ type: ERROR, errorMessage: 'Error signing in user', err})
      });
};

export const signIn = (formProps, callback) => dispatch => {
  dispatch({ type: SIGNING_IN }); 

  axios
      .post ("http://localhost:5000/signin", //https://trivializer.herokuapp.com/signin
      formProps
      )
      .then(response => {
          dispatch({ type: AUTH_USER, payload: response.data.token })
          localStorage.setItem("token", response.data.token)
          callback();
      })
      .catch(err => {
          dispatch({ type: ERROR, errorMessage: 'Error signing in user', err})
      });

};



export const signOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: ""
  };
};

export const getRounds = gameId => dispatch => {
    dispatch({ type: FETCHING_ROUND });
    
    axios
        .get('http://localhost:5000/api/round/get')
        .then( response => {
            dispatch({type: FETCHED_ROUND, payload: {gameId: gameId, rounds:response.data} })

        })
        .catch(err => {
            dispatch({type: ERROR, errorMessage: "error adding round", err})
        })
}

export const updateSettings = (formProps, callback) => dispatch => {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  const hashedPassword = decoded.password;
  const id = decoded.sub;

  dispatch({ type: UPDATING_SETTINGS });

  axios
    .put(  "http://localhost:5000/api/user/update",{ formProps, id, hashedPassword })  //https://trivializer.herokuapp.com/settings
    .then(response => {
      dispatch({ type: UPDATE_SETTINGS, payload: response.data })
      callback();
    })
    .catch(err => {
      dispatch({ type: ERROR, errorMessage: 'Error updating user settings', err})
  });
} 


export const addRound = (gameId, round, callback) => dispatch => {
    dispatch({ type: ADDING_ROUND });
    console.log("ACTION ROUND", round)
    axios
        .post('http://localhost:5000/api/round/create-round', {gameId, round})
        .then( response => {
            dispatch({type: ADDED_ROUND, payload: response.data })
            callback(gameId)
        })
        .catch(err => {
            dispatch({type: ERROR, errorMessage: "error adding round", err})
        })
}

export const getThree = (formProps, callback) => dispatch => {
  dispatch({ type: FETCHING_THREE });
  let questions = formProps.numberOfQuestions; 
  let { roundName, numberOfQuestions, category, difficulty, type } = formProps;
  console.log("INSIDE THREE", roundName)
  axios
      .get(`https://opentdb.com/api.php?amount=${questions}&category=${formProps.category}&difficulty=${formProps.difficulty}&type=${formProps.type}`)
      .then(response => {
          dispatch({ type: FETCHED_THREE, payload: { roundName, numberOfQuestions, category, difficulty, type, questions: response.data.results }})
          callback();
      })
      .catch(err => {
          dispatch({ type: ERROR, errorMessage: 'Error Fetching the data', err})
      });

};

export const getThreeUpdate = (formProps, callback) => dispatch => {
    dispatch({ type: FETCHING_THREE_UPDATE });
    let questions = formProps.numberOfQuestions; 
    let { roundName, numberOfQuestions, category, difficulty, type } = formProps;

    console.log("formProps GTU", formProps)

    axios
        .get(`https://opentdb.com/api.php?amount=${questions}&category=${formProps.category}&difficulty=${formProps.difficulty}&type=${formProps.type}`)
        .then(response => {
            console.log('response', response.data.results)
            dispatch({ type: FETCHED_THREE_UPDATE, payload: { roundName, numberOfQuestions, category, difficulty, type, questions: response.data.results }})
            
            callback()
        })
        .catch(err => {
            dispatch({ type: ERROR, errorMessage: 'Error Fetching the data', err})
        });
  
  };

export const updateRoundCard = (roundId, round) => dispatch => {
    dispatch({ type: UPDATING_ROUND }); 

    axios
        .put('http://localhost:5000/api/round/update-round', {roundId, round})
        .then( response => {
            dispatch({type: UPDATED_ROUND, payload: response.data })
        })
        .catch(err => {
            dispatch({type: ERROR, errorMessage: "error updating round", err})
        })
}



export const addGame = (userId, callback) => dispatch => {
    dispatch({ type: ADDING_GAME });

    axios
        .post('http://localhost:5000/api/game/create-game', {userId})
        .then(response => {
            console.log("CREATEGAME ID", response.data._id)
            dispatch({ type: ADDED_GAME, payload: response.data});
            callback(response.data._id);//returning the game's id into the callback
        })
        .catch(err => {
            dispatch({ type: ERROR, errorMessage: 'Error creating game'});
            
        });
};

export const saveGame = (gameId, game) => dispatch => {
    dispatch({ type: SAVING_GAME })
    axios
        .put('http://localhost:5000/api/game/update-game', {gameId, game})
        .then( response => {
            dispatch({type: SAVED_GAME, payload: response.data })
            console.log(response.data)
        })
        .catch(err => {
            dispatch({type: ERROR, errorMessage: "error updating game", err})
        })
}

export const getGames = userId => dispatch => {
    dispatch({ type: FETCHING_GAMES });
        
    axios
        .get('http://localhost:5000/api/game/get')
        .then(response => {
            console.log("getgames action",response)
            dispatch({ type: FETCHED_GAMES, payload: { userId: userId, games:response.data }});
        })
        .catch(err => {
            dispatch({ type: ERROR, errorMessage: 'Error fetching stored games array'});
        });
}

export const getGame = gameId => dispatch => {
    dispatch({ type: FETCHING_GAME });
    return { 
        type: FETCHED_GAME, 
        payload: gameId
     };
    
}

export const getQuestions = questionId => dispatch => {
    
    axios
    .get('http://localhost:5000/api/round/get')
    .then( response => {
        dispatch({type: FETCHED_QUESTIONS, payload: {questionId: questionId, rounds:response.data} })

    })
    .catch(err => {
        dispatch({type: ERROR, errorMessage: "error adding round", err})
    })
}

export const deleteRound = id => dispatch => {
    dispatch({ type: DELETING_ROUND });

    axios
    .delete(`http://localhost:5000/api/round/delete-round/${id}`)
    .then(response => {
        console.log(response)
        dispatch({type: DELETED_ROUND, payload: response.data})
    })
    .catch(err => {
        dispatch({type: ERROR, errorMessage: "error deleting round", err})
    }) 
}


export const deleteGame = (id, callback) => dispatch => {
    dispatch({ type: DELETING_ROUND });

    axios
    .delete(`http://localhost:5000/api/game/delete-game/${id}`)
    .then(response => {
        console.log(response)
        dispatch({type: DELETED_GAME, payload: response.data})
    })
    .catch(err => {
        dispatch({type: ERROR, errorMessage: "error deleting round", err})
    }) 
}

export const reToken = (token) =>  {
  return {
      type: AUTH_USER,
      payload: token
  }
      
  };

