import React, { Component } from "react";
import RoundAnswers from "./RoundAnswers";
import { connect } from "react-redux";
import {
  fetchRoundsReq,
  getAllRoundsReq,
  getAllQuestionsReq,
  resetAllRoundsAllQuestionsReq
} from "../actions";

class PrintAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: true,
      rounds: [],
      questions: [],
      userSheets: this.props.userSheets
    };
  }

  componentDidMount = () => {
    // Start by getting all rounds for this game, and all the questions
    // in DB
    this.props.fetchRoundsReq(this.props.gameId);
    this.props.getAllQuestionsReq();
  };

  componentDidUpdate = (prevProps, prevState) => {
    // Check to see if our rounds on state match that on props
    if (
      JSON.stringify(this.props.rounds) !== JSON.stringify(this.state.rounds) &&
      this.props.rounds
    ) {
      this.setState({ rounds: this.props.rounds });
    }

    // Check to see if our questions on state match those on props
    if (
      JSON.stringify(this.props.all_questions) !==
        JSON.stringify(this.state.questions) &&
      this.props.all_questions
    ) {
      this.setState({
        questions: this.props.all_questions
      });
    }

    // If The Redux store indicates that we have saved new questions
    // get questions from the database.
    // Additional parameters below are to
    // limit the number of database calls we make
    if (
      this.props.saved_questions &&
      (!this.props.fetching_rounds &&
        !this.props.fetching_all_questions &&
        !this.props.saving_questions &&
        !this.props.saving_round)
    ) {
      this.props.fetchRoundsReq(this.props.gameId);
      this.props.getAllQuestionsReq();
      this.props.resetAllRoundsAllQuestionsReq();
    }

    // If we deleted a round, get all questions and rounds
    if (this.props.deleted_round) {
      this.props.fetchRoundsReq(this.props.gameId);
      this.props.getAllQuestionsReq();
      this.props.resetAllRoundsAllQuestionsReq();
    }
  };
  render() {
    return (
      <div>
        {/* Map over questions and display questions with highlighted correct answer*/}
        {/* Filter questions by roundId */}
        {this.state.rounds.map((round, index) => {
          let questions = this.state.questions.filter(
            question => question.rounds_id === round.roundId
          );
          return (
            <div key={index}>
              {index !== 0 ? <div className="page-break" /> : null}
              <div className="hiddenAnswers-info">
                <div>
                  {this.props.game ? this.props.game.gamename : "No Game Name"}
                </div>
                <div>{round.name}</div>
                <div>
                  <img
                    className="logo-rounds"
                    src={require("../img/trivializer_cropped.png")}
                    alt="trivializer logo"
                  />
                </div>
              </div>

              <div className="instructions-round">
                ***Please Circle the Correct Answer***
              </div>

              <RoundAnswers
                questions={questions}
                userSheets={this.props.userSheets}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ gamesList }) => {
  return {
    gameId: gamesList.gameId,
    rounds: gamesList.rounds,
    all_rounds: gamesList.all_rounds,
    all_questions: gamesList.all_questions,
    saving_round: gamesList.saving_round,
    saved_round: gamesList.saved_round,
    saving_questions: gamesList.saving_questions,
    saved_questions: gamesList.saved_questions,
    deleted_round: gamesList.deleted_round,
    fetching_all_rounds: gamesList.fetching_all_rounds,
    fetching_all_questions: gamesList.fetching_all_questions,
    fetching_rounds: gamesList.fetching_rounds
  };
};

export default connect(
  mapStateToProps,
  {
    fetchRoundsReq,
    getAllRoundsReq,
    getAllQuestionsReq,
    resetAllRoundsAllQuestionsReq
  }
)(PrintAll);
