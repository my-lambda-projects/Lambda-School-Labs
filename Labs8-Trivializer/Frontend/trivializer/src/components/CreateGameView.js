import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";
import { connect } from "react-redux";
import { submitGameReq } from "../actions";
import "./styles/CreateGameView.css";

/**
 * CreateGameView Component
 * - view to create and submit a game
 */
class CreateGameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTitle: "",
      gameDescription: "",
      gameCreated: "",
      gameCreatedMS: "",
      gameScheduled: "",
      gameScheduledMS: ""
    };
  }

  componentDidMount() {
    const d = new Date();

    this.setState({
      gameTitle: "",
      gameDescription: "",
      gameCreated: `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`,
      gameCreatedMS: Date.now(),
      gameScheduled: "",
      gameScheduledMS: ""
    });
  }

  componentDidUpdate = prevProps => {
    if (prevProps.gameId !== this.props.gameId) {
      this.props.history.push(`/game/${this.props.gameId}`);
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    if (this.state.gameTitle === "") return null;

    const d = new Date(this.state.gameScheduled);
    const ms = d.getTime();

    const game = {
      username: sessionStorage.getItem("user"),
      gameTitle: this.state.gameTitle,
      gameDescription: this.state.gameDescription,
      gameCreatedMS: this.state.gameCreatedMS,
      gameScheduledMS: ms || 0
    };

    this.props.submitGameReq(game);
  };

  logout = e => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="gameslist-page">
        <div className="top-content">
          <div className="top-leftside">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Games
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
          <NavBar />
          <div className="content-container ">
            <div className="createnewGame-container">
              <h1>Game Details</h1>
              <form>
                <div className="form-group">
                  <div className="form-description">Game Title</div>
                  <input
                    name="gameTitle"
                    className="form-control gameInput"
                    placeholder="Ex. Wednesday Night Trivia"
                    value={this.state.gameTitle}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <div className="form-description">Game Details</div>
                  <textarea
                    className="form-control descriptionInput"
                    placeholder="Ex. Trivia for Wednesday night with college friends, category: TV & Entertainment"
                    name="gameDescription"
                    value={this.state.gameDescription}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group third-form">
                  <div className="form-description">Date to Play</div>
                  <input
                    className="calendar"
                    type="date"
                    name="gameScheduled"
                    placeholder="Leave Blank For Today"
                    value={this.state.gameScheduled}
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  type="button"
                  className="savegameButton"
                  onClick={this.handleSubmit}
                >
                  Save Game
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ gamesList }) => {
  return {
    saving_game: gamesList.saving_game,
    saved_game: gamesList.saved_game,
    gameId: gamesList.gameId
  };
};

export default connect(
  mapStateToProps,
  { submitGameReq }
)(CreateGameView);
