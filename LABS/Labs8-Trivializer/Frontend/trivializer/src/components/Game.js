import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchGameReq } from "../actions";
import EditGameView from "./EditGameView";
import RoundsList from "./RoundsList";
import "./styles/Game.css";
import ReactToPrint from "react-to-print";
import PrintAll from "./PrintAll";

/**
 * Game Component
 * - renders selected game with an EditGameView and RoundsList Component
 */
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      gameId: null,
      roundId: 0,
      rounds: []
    };
  }

  componentDidMount() {
    const id = Number(this.props.match.params.id);
    this.props.fetchGameReq(id);
    this.setState({ game: this.props.game, gameId: id });
  }

  componentDidUpdate = prevProps => {
    if (prevProps.show_buttons !== this.props.show_buttons) {
    }
  };

  logout = e => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.push("/");
  };

  render() {
    if (!this.props.game) {
      return <div>Loading...</div>;
    }

    return (
      <div className="game-page">
        <div className="top-content">
          <div className="top-leftside">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/gameslist">Games</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {this.props.game.gamename}
                </li>
              </ol>
            </nav>
          </div>
          {sessionStorage.getItem("jwt") && !localStorage.getItem("guest") ? (
            <div onClick={this.logout} className="top-rightside">
              <p>Log Out</p>
              <i className="fas fa-sign-out-alt" />
            </div>
          ) : null}
        </div>

        <div className="main-content">
          <Navbar />
          {this.state.hideButtons ? (
            <div>Loading...</div>
          ) : (
            <div className="content-container">
              <div className="editAndRounds">
                <h1>Game Information</h1>
                <div className="game-top">
                  <EditGameView game={this.props.game} />

                  <div className="game-buttons">
                    {!this.props.show_buttons ? (
                      <button type="button" className="btn btn-primary round">
                        Print Answer Key
                      </button>
                    ) : (
                      <ReactToPrint
                        trigger={() => (
                          <button
                            type="button"
                            className="btn btn-primary round"
                          >
                            Print Answer Key
                          </button>
                        )}
                        content={() => this.answerKeyRef}
                      />
                    )}
                    {!this.props.show_buttons ? (
                      <button type="button" className="btn btn-primary round">
                        Print Answer Sheet
                      </button>
                    ) : (
                      <ReactToPrint
                        trigger={() => (
                          <button
                            type="button"
                            className="btn btn-primary round"
                          >
                            Print Answer Sheet
                          </button>
                        )}
                        content={() => this.userSheetRef}
                      />
                    )}
                  </div>
                </div>

                <RoundsList id={this.props.match.params.id} />
              </div>
            </div>
          )}
        </div>
        <div className="hidden">
          <PrintAll
            userSheets={false}
            game={this.props.game}
            gameId={this.props.match.params.id}
            rounds={this.props.rounds}
            ref={el => (this.answerKeyRef = el)}
          />
          <PrintAll
            userSheets={true}
            game={this.props.game}
            gameId={this.props.match.params.id}
            rounds={this.props.rounds}
            ref={el => (this.userSheetRef = el)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ gamesList }) => {
  return {
    game: gamesList.game[0],
    rounds: gamesList.rounds,
    fetched_all_questions: gamesList.fetched_all_questions,
    fetched_all_rounds: gamesList.fetched_all_rounds,
    saved_round: gamesList.saved_round,
    saved_questions: gamesList.saved_questions,
    show_buttons: gamesList.show_buttons
  };
};

export default connect(
  mapStateToProps,
  { fetchGameReq }
)(Game);
