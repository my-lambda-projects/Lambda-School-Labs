import React, { Component } from "react";
import Rounds from "./Rounds";
import { connect } from "react-redux";
import {
  fetchRoundsReq,
  saveRoundReq,
  getNewQuestionsReq,
  saveQuestionsReq,
  resetFetchedNewQuestions
} from "../actions";
import "./styles/Rounds.css";

/**
 * RoundsList Component
 * - renders a list of rounds for the selected game
 */
class RoundsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRoundOuterHeight: null,
      newRoundWidth: null,
      newRoundHeight: null,
      roundLimit: 3
    };
  }

  componentDidMount() {
    const id = Number(this.props.id);

    this.props.fetchRoundsReq(id);

    if (sessionStorage.getItem("status") === "1") {
      this.setState({ roundLimit: 10 });
    }
  }

  componentDidUpdate = prevProps => {
    // ***** This is all to automatically save a new rounds questions in the
    // ***** Users database, so if a user creates a new round, then prints all
    // ***** rounds, the new rounds question will show

    // If the following two are true, we've saved a new Round and need to get it's questions
    if (
      prevProps.roundId !== this.props.roundId &&
      this.props.roundId !== null
    ) {
      if (this.props.savedRound) {
        // Checks to see that current roundId is not in the prevProps rounds, this means
        // That we have a new round
        if (
          !prevProps.rounds
            .map(round => {
              return round.roundId;
            })
            .includes(this.props.roundId)
        ) {
          let formattedRound = {
            gameId: this.props.gameId,
            roundName: this.props.round.roundName,
            category: "",
            type: "multiple",
            difficulty: "easy",
            questions: 1
          };
          this.props.getNewQuestionsReq(formattedRound);
        }
      }
    }

    // If the following two are true, we have received questions from the QuestionsAPI,
    // and have saved a new round, giving us a roundId on our props. Since we'll be saving
    // the round every time we are saving the questions
    // Save them to the Users Database
    if (
      JSON.stringify(prevProps.new_questions) !==
        JSON.stringify(this.props.new_questions) &&
      this.props.roundId !== null
    ) {
      let round_id = this.props.roundId;

      let questionsPackage = this.props.new_questions.slice();
      questionsPackage = questionsPackage.map(question => {
        question.rounds_id = round_id;
        return question;
      });

      this.props.saveQuestionsReq(questionsPackage);
      this.props.resetFetchedNewQuestions();
    }
  };

  newRound = () => {
    let round = {
      gameId: this.props.gameId,
      roundName: "",
      category: "any",
      type: "multiple",
      difficulty: "easy",
      questions: 1
    };

    // Save the Round to the database with default values
    this.props.saveRoundReq(round);
  };

  render() {
    return (
      <div className="roundslist-container">
        {this.props.rounds.map((round, i) => {
          return (
            <div key={round.roundId} className="rounds-container">
              <div className="rounds-summary" key={round.roundId}>
                <Rounds index={i} round={round} />
              </div>
            </div>
          );
        })}
        {this.props.rounds.length >= 0 &&
        this.props.rounds.length < this.state.roundLimit ? (
          <div className="rounds-container">
            <div className="rounds-summary">
              <div className="cardnewRound">New Round</div>
              <div onClick={this.newRound}>
                <i className="small-fas fas fa-plus-circle" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ gamesList }) => {
  return {
    gameId: gamesList.gameId,
    roundId: gamesList.roundId,
    savedRound: gamesList.saved_round,
    fetchingRounds: gamesList.fetching_rounds,
    error: gamesList.error,
    rounds: gamesList.rounds,
    round: gamesList.round,
    new_questions: gamesList.new_questions,
    fetched_new_questions: gamesList.fetched_new_questions
  };
};

export default connect(
  mapStateToProps,
  {
    fetchRoundsReq,
    saveRoundReq,
    getNewQuestionsReq,
    saveQuestionsReq,
    resetFetchedNewQuestions
  }
)(RoundsList);
