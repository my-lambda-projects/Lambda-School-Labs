import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./styles/Rounds.css";
import { connect } from "react-redux";
import {
  deleteRoundReq,
  editRoundReq,
  getQuestionsReq,
  resetRoundStateReq,
  getNewQuestionsReq
} from "../actions";

let categoryOptions = {
  any: "any",
  "General Knowledge": "9",
  "Entertainment: Books": "10",
  "Entertainment: Film": "11",
  "Entertainment: Music": "12",
  "Entertainment: Musicals & Theatres": "13",
  "Entertainment: Television": "14",
  "Entertainment: Video Games": "15",
  "Entertainment: Board Games": "16",
  "Science & Nature": "17",
  "Science: Computers": "18",
  "Science: Mathematics": "19",
  Mythology: "20",
  Sports: "21",
  Geography: "22",
  History: "23",
  Politics: "24",
  Art: "25",
  Celebrities: "26",
  Animals: "27",
  Vehicles: "28",
  "Entertainment: Comics": "29",
  "Science: Gadgets": "30",
  "Entertainment: Japanese Anime & Manga": "31",
  "Entertainment: Cartoon & Animations": "32"
};

let difficultyOptions = {
  any: "any",
  easy: "easy",
  medium: "medium",
  hard: "hard"
};

let typeOptions = {
  any: "any",
  multiple: "Multiple choice",
  boolean: "True / False"
};

class Rounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: this.props.round,
      maxQuestions: 5,
      roundName: this.props.round.roundName || "",
      numQs: this.props.round.numQs || 1,
      category: this.props.round.category || "any",
      difficulty: this.props.round.difficulty || "any",
      type: this.props.round.type || "any",
      original_roundName: this.props.round.roundName || "New Round",
      original_numQs: this.props.round.numQs || 1,
      original_category: this.props.round.category || "any",
      original_difficulty: this.props.round.difficulty || "any",
      original_type: this.props.round.type || "any",
      changed: true,
      savingRound: false
    };
  }

  componentDidMount() {
    this.props.resetRoundStateReq();
    if (sessionStorage.getItem("status") === "1") {
      this.setState({ maxQuestions: 10 });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    // After fetching saved question from DB in (enterRound, getQuestionsReq),
    // the round ID will be set to whichever round it got the questions for.
    // Check to see if this is that round, and that we have fetched the_saved_rounds
    // indicating that we have received the questions for this round from the
    // backend
    if (this.props.roundId === this.props.round.roundId) {
      if (this.props.fetched_saved_questions) {
        if (
          !this.props.history.location.pathname.split("/").includes("round")
        ) {
          this.props.history.push(
            `${this.props.gameId}/round/${this.props.round.roundId}`
          );
        }
      }
    }

    if (
      prevProps.saving_questions !== this.props.saving_questions &&
      this.state.savingRound === true
    ) {
      this.setState({ savingRound: false });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveRound = () => {
    if (!this.props.gameId) {
      console.log("No game ID!!");
      return;
    }
    // For our button animation when saving round
    this.setState({ savingRound: true });

    // Assemble backend info
    let formattedBackendRound = {
      gameId: this.props.gameId,
      roundName: this.state.roundName,
      category: this.state.category,
      type: this.state.type,
      difficulty: this.state.difficulty,
      questions: this.state.numQs
    };

    // Modify the existing round in the database
    this.props.editRoundReq(formattedBackendRound, this.props.round.roundId);
    // Get the updated questions from the questionsAPI
    let formattedQuestionsAPICall = this.formatQuestionsCall();
    this.props.getNewQuestionsReq(formattedQuestionsAPICall);
  };

  delete = () => {
    this.props.deleteRoundReq(this.props.round.roundId);
  };

  enterRound = () => {
    // First, save the round
    // this.saveRound();

    // Get all of our info in the right format to call the questions API
    let formattedQuestionsRound = this.formatQuestionsCall();

    this.props.getQuestionsReq(
      formattedQuestionsRound,
      this.props.round.roundId
    );
  };

  // Format our current state to be set to Redux store
  // These values should be exactly what we send to the questions
  // API, so all "any" values should be "", all category options
  // Should be their numeric equivalent
  formatQuestionsCall = () => {
    let formattedQuestionsRound = {
      gameName: this.props.gameName !== null ? this.props.gameName : "Game",
      gameId: this.props.gameId,
      roundId: this.props.round.roundId,
      roundName:
        this.state.roundName !== "" ? this.state.roundName : "New Round",
      numberOfQuestions: this.state.numQs > 0 ? this.state.numQs : 1,
      category:
        categoryOptions[this.state.category] !== "any"
          ? categoryOptions[this.state.category]
          : "",
      difficulty: this.state.difficulty !== "any" ? this.state.difficulty : "",
      type: this.state.type !== "any" ? this.state.type : "",
      questions: []
    };

    return formattedQuestionsRound;
  };

  render() {
    return (
      <div className="rounds">
        <input
          type="text"
          onChange={this.handleChange}
          name="roundName"
          placeholder="Ex. Marvel Round"
          value={this.state.roundName}
          className="roundsTitle"
        />
        {/* Number of Questions */}
        <div className="dropdown">
          <label htmlFor="numQs">Number of Questions</label>
          <select
            name="numQs"
            value={this.state.numQs}
            onChange={this.handleChange}
            id="numQs"
            className="amount"
          >
            {[...Array(this.state.maxQuestions).keys()].map((number, i) => {
              number = number + 1;

              return (
                <option key={i} value={number}>
                  {number}
                </option>
              );
            })}
          </select>
        </div>
        {/* Categories */}
        <div className="dropdown">
          <label htmlFor="categories">Category</label>
          <select
            id="categories"
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
            className="category"
          >
            {Object.keys(categoryOptions).map((option, i) => {
              return (
                <option key={i} className="roundsOption">
                  {option}
                </option>
              );
            })}
          </select>
        </div>
        {/* Difficulty */}
        <div className="dropdown">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={this.state.difficulty}
            onChange={this.handleChange}
            className="difficulty"
          >
            {Object.keys(difficultyOptions).map((option, i) => {
              return (
                <option key={i} value={option}>
                  {difficultyOptions[option]}
                </option>
              );
            })}
          </select>
        </div>
        {/* Type */}
        <div className="dropdown">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={this.state.type}
            onChange={this.handleChange}
            className="type"
          >
            {Object.keys(typeOptions).map((option, i) => {
              return (
                <option key={i} value={option}>
                  {typeOptions[option]}
                </option>
              );
            })}
          </select>
        </div>
        <div className="roundsButtons">
          <button onClick={this.saveRound} className="roundsButton save">
            Save
          </button>
          {this.state.savingRound ? (
            <div>Saving...</div>
          ) : (
            <button
              className="roundsButton goto-questions"
              onClick={this.enterRound}
            >
              Questions
            </button>
          )}

          <button className="roundsButton delete" onClick={this.delete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ gamesList }) => {
  return {
    saving_questions: gamesList.saving_questions,
    fetched_saved_questions: gamesList.fetched_saved_questions,
    gameId: gamesList.gameId,
    gameName: gamesList.gameName,
    savingRound: gamesList.saving_round,
    savedRound: gamesList.saved_round,
    editedRound: gamesList.edited_round,
    error: gamesList.error,
    rounds: gamesList.rounds,
    roundId: gamesList.roundId,
    roundName: gamesList.roundName,
    numberOfQuestions: gamesList.numberOfQuestions,
    category: gamesList.category,
    difficulty: gamesList.difficulty,
    type: gamesList.type,
    questions: gamesList.questions
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      deleteRoundReq,
      editRoundReq,
      getQuestionsReq,
      resetRoundStateReq,
      getNewQuestionsReq
    }
  )(Rounds)
);
