import axios from "axios";
import URL from "../URLs";
export const FETCHING_GAMES = "FETCHING_GAMES";
export const FETCHED_GAMES = "FETCHED_GAMES";
export const FETCHING_GAME = "FETCHING_GAME";
export const FETCHED_GAME = "FETCHED_GAME";
export const SAVING_GAME = "SAVING_GAME";
export const SAVED_GAME = "SAVED_GAME";
export const DELETING_GAME = "DELETING_GAME";
export const DELETED_GAME = "DELETED_GAME";
export const UPDATING_GAME = "UPDATING_GAME";
export const UPDATED_GAME = "UPDATED_GAME";
export const FETCHING_ROUNDS = "FETCHING_ROUNDS";
export const FETCHED_ROUNDS = "FETCHED_ROUNDS";
export const FETCHING_ALL_ROUNDS = "FETCHING_ALL_ROUNDS";
export const FETCHED_ALL_ROUNDS = "FETCHED_ALL_ROUNDS";
export const SAVING_ROUND = "SAVING_ROUND";
export const SAVED_ROUND = "SAVED_ROUND";
export const DELETING_ROUND = "DELETING_ROUND";
export const DELETED_ROUND = "DELETED_ROUND";
export const EDITING_ROUND = "EDITING_ROUND";
export const EDITED_ROUND = "EDITED_ROUND";
export const FETCHING_SAVED_QUESTIONS = "FETCHING_SAVED_QUESTIONS";
export const FETCHED_SAVED_QUESTIONS = "FETCHED_SAVED_QUESTIONS";
export const FETCHING_NEW_QUESTIONS = "FETCHING_NEW_QUESTIONS";
export const FETCHED_NEW_QUESTIONS = "FETCHED_NEW_QUESTIONS";
export const FETCHING_ALL_QUESTIONS = "FETCHING_ALL_QUESTIONS";
export const FETCHED_ALL_QUESTIONS = "FETCHED_ALL_QUESTIONS";
export const SAVING_QUESTIONS = "SAVING_QUESTIONS";
export const SAVED_QUESTIONS = "SAVED_QUESTIONS";
export const RESET_ROUNDS = "RESET_ROUNDS";
export const RESET_NEW_QUESTIONS = "RESET_NEW_QUESTIONS";
export const RESET_ALL_QUESTIONS_ALL_ROUNDS = "RESET_ALL_QUESTIONS_ALL_ROUNDS";
export const ERROR = "ERROR";
export const SET_USER_STATUS = "SET_USER_STATUS";

const questionsApiURL = "https://opentdb.com/api.php?";
const BE_URL = process.env.REACT_APP_BE_URL || URL.current_URL; // See ../URLs/index.js to change local vs served URL

// sample games fetch with params
// {
//     username: "username"
// }

export const fetchGamesReq = () => {
  const newGames = {
    username: `${sessionStorage.getItem("user")}`
  };

  return dispatch => {
    dispatch({ type: FETCHING_GAMES });
    axios
      .post(`${BE_URL}/games`, newGames, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        // return if null properties
        if (!data[0]["gameId"]) {
          return;
        }

        dispatch({ type: FETCHED_GAMES, payload: data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const fetchGameReq = id => {
  const newGames = {
    username: `${sessionStorage.getItem("user")}`
  };

  return dispatch => {
    dispatch({ type: FETCHING_GAME });
    axios
      .post(`${BE_URL}/games`, newGames, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        // filter game by id
        const result = data.filter(item => item.gameId === id);

        dispatch({ type: FETCHED_GAME, payload: result });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

// sample game submit
// {
//     "username": "user",
//     "gameName": "game one",
//     "created": 1542422323472,
//     "description": "This is a game"
//     "played": 1542422323472
// }

export const submitGameReq = game => {
  const newGame = {
    username: game.username,
    gameName: game.gameTitle,
    created: game.gameCreatedMS,
    description: game.gameDescription,
    played: game.gameScheduledMS
  };

  return dispatch => {
    dispatch({ type: SAVING_GAME });
    axios
      .post(`${BE_URL}/creategame`, newGame, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        dispatch({ type: SAVED_GAME, payload: data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const deleteGameReq = id => {
  return dispatch => {
    dispatch({ type: DELETING_GAME });
    axios
      .delete(`${BE_URL}/game/${id}`, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        dispatch({ type: DELETED_GAME, payload: data });
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ERROR, payload: err });
      });
  };
};

// sample game update
// {
//     "username": "user",
//     "gameName": "game one",
//     "created": 1542422323472,
//     "description": "This is a game",
//     "played": 1542422323472,
//     "rounds": []
// }

export const updateGameReq = (id, game) => {
  const newGame = {
    username: game.username,
    gameName: game.gameTitle,
    dateCreated: game.gameCreatedMS,
    description: game.gameDescription,
    datePlayed: game.gameScheduledMS,
    rounds: []
  };

  return dispatch => {
    dispatch({ type: UPDATING_GAME });
    axios
      .put(`${BE_URL}/editgame/${id}`, newGame, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        // console.log(data);
        // format result
        // const result = {
        //   gameId: data.gameId,
        //   gamename: data.gamename,
        //   description: data.description,
        //   dateCreated: data.dateCreated,
        //   datePlayed: data.datePlayed
        // };
        // dispatch({ type: UPDATED_GAME, payload: result });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ERROR, payload: err });
      });
    // fetchGameReq(id);
  };
};

export const fetchRoundsReq = id => {
  return dispatch => {
    dispatch({ type: FETCHING_ROUNDS });
    axios
      .get(`${BE_URL}/rounds/${id}`, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        if (!data[0]["roundId"]) {
          data = [];
        }
        dispatch({ type: FETCHED_ROUNDS, payload: data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const saveRoundReq = round => {
  return dispatch => {
    dispatch({ type: SAVING_ROUND });
    axios
      .post(`${BE_URL}/round`, round, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        dispatch({ type: SAVED_ROUND, payload: data });
      })
      .catch(err => {
        console.log("err.message saveRoundReq", err.message);
        dispatch({ type: ERROR, payload: err });
      });
  };
};

// Takes in a round Id and returns that same Id to
// delete the round from Redux store in Reducers/index.js
export const deleteRoundReq = roundId => {
  return dispatch => {
    dispatch({ type: DELETING_ROUND });
    axios
      .delete(`${BE_URL}/round/${roundId}`, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        dispatch({ type: DELETED_ROUND, payload: roundId });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const editRoundReq = (round, roundId) => {
  return dispatch => {
    dispatch({ type: EDITING_ROUND });
    axios
      .put(`${BE_URL}/round/${roundId}`, round, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        dispatch({ type: EDITED_ROUND, payload: data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const getQuestionsReq = (info, roundId) => {
  return dispatch => {
    dispatch({ type: FETCHING_SAVED_QUESTIONS });
    axios
      .get(`${BE_URL}/questions/${roundId}`, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        // If we have results from the Users API, assign questions to our info packet
        if (data[0] && data[0].questionId !== null) {
          info.questions = data;
        }
        // Send info packet, either with new questions or original (should be empty array)
        dispatch({ type: FETCHED_SAVED_QUESTIONS, payload: info });
      })
      .catch(err => {
        console.log("err.message getQuestionsReq: ", err.message);
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const resetRoundStateReq = () => {
  return dispatch => {
    dispatch({ type: RESET_ROUNDS });
  };
};

export const resetFetchedNewQuestions = () => {
  return dispatch => {
    dispatch({ type: RESET_NEW_QUESTIONS });
  };
};

export const resetAllRoundsAllQuestionsReq = () => {
  return dispatch => {
    dispatch({ type: RESET_ALL_QUESTIONS_ALL_ROUNDS });
  };
};

// questionsPackage needs rounds_id, category, difficulty, type, question, correct_answer, incorrect_answers
export const saveQuestionsReq = questionsPackage => {
  questionsPackage = questionsPackage.map(question => {
    return {
      rounds_id: question.rounds_id,
      category: question.category,
      difficulty: question.difficulty,
      type: question.type,
      question: question.question,
      correct_answer: question.correct_answer,
      incorrect_answers: question.incorrect_answers.join("--"),
      answers: question.answers.join("--")
    };
  });

  return async dispatch => {
    dispatch({ type: SAVING_QUESTIONS });

    // First, delete all existing questions in our round
    // Get the roundId from the first question
    await axios
      .delete(`${BE_URL}/questions/${questionsPackage[0].rounds_id}`, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(response => {
        if (!response) {
          throw new Error({ message: "Error deleting questions" });
        }
      })
      .catch(err => {
        console.log("err.message: ", err.message);
      });

    await axios
      .post(`${BE_URL}/questions`, questionsPackage, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        // Send info packet, either with new questions or original (should be empty array)
        dispatch({ type: SAVED_QUESTIONS, payload: data });
      })
      .catch(err => {
        console.log("err.message saveQuestionsReq: ", err.response);
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const getNewQuestionsReq = questionsPackage => {
  return dispatch => {
    dispatch({ type: FETCHING_NEW_QUESTIONS });
    let concatenatedURL = buildApiCall(questionsPackage);
    axios
      .get(`${concatenatedURL}`)
      .then(({ data }) => {
        // questions API returns 0 on success, check for errors from API
        if (data.response_code !== 0) {
          dispatch({ type: ERROR });
        }
        if (data && data.results.length > 0) {
          data.results = data.results.map(question => {
            question.answers = assembleAnswers(
              question.correct_answer,
              question.incorrect_answers
            );
            return question;
          });
        }
        // Send info packet, either with new questions or original (should be empty array)
        dispatch({ type: FETCHED_NEW_QUESTIONS, payload: data });
      })
      .catch(err => {
        console.log("err.message getQuestionsReq: ", err.message);
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const getAllRoundsReq = () => {
  return dispatch => {
    dispatch({ type: FETCHING_ALL_ROUNDS });
    axios
      .get(`${BE_URL}/rounds`, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        dispatch({ type: FETCHED_ALL_ROUNDS, payload: data });
      })
      .catch(err => {
        console.log("err.message getQuestionsReq: ", err.message);
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const getAllQuestionsReq = () => {
  return dispatch => {
    dispatch({ type: FETCHING_ALL_QUESTIONS });
    axios
      .get(`${BE_URL}/questions`, {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      })
      .then(({ data }) => {
        // Convert all arrays (stored as strings) back into arrays
        data = data.map(question => {
          question.incorrect_answers = question.incorrect_answers.split("--");
          question.answers = question.answers.split("--");
          return question;
        });

        dispatch({ type: FETCHED_ALL_QUESTIONS, payload: data });
      })
      .catch(err => {
        console.log("err.message getQuestionsReq: ", err.message);
        dispatch({ type: ERROR, payload: err });
      });
  };
};
export const setUserStatus = status => {
  return dispatch => {
    dispatch({ type: SET_USER_STATUS, payload: status });
  };
};

// *********************   Accessory helper functions ******************//
// Builds a call to the questions API based on which parameters in state are set
const buildApiCall = callPackage => {
  let amount = `amount=${callPackage.numberOfQuestions || 1}`;
  let category = `${
    callPackage.category ? `&category=${callPackage.category}` : ""
  }`;

  let difficulty = `${
    callPackage.difficulty ? `&difficulty=${callPackage.difficulty}` : ""
  }`;

  let type = `${callPackage.type ? `&type=${callPackage.type}` : ""}`;

  let concatenatedURL = `${questionsApiURL}${amount}${category}${difficulty}${type}`;

  return concatenatedURL;
};

// Assembles all answers into one array, then joins it into a string to save to the DB.
const assembleAnswers = (correct_answer, incorrect_answers) => {
  // Get a random number, this will be where we insert
  // the correct answer into the incorrect answers
  let index = Math.floor(Math.random() * (incorrect_answers.length + 1));
  let answers = incorrect_answers.slice();
  answers.splice(index, 0, correct_answer);

  return answers;
};
