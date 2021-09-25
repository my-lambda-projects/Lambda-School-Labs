import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGameReq, updateGameReq } from "../actions";
import "./styles/EditGameView.css";

/**
 * EditGameView
 * - view to edit selected game and handle updates
 */
class EditGameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      gameTitle: "",
      gameDescription: "",
      gameScheduled: "",
      gameScheduledMS: null
    };
  }

  componentDidMount() {
    if (this.props.game) {
      const d = new Date(parseInt(this.props.game.datePlayed));
      const day =
        d.getDate() + 1 < 10 ? `0${d.getDate() + 1}` : `${d.getDate() + 1}`;
      const s = `${d.getFullYear()}-${d.getMonth() + 1}-${day}`;

      this.setState({
        game: this.props.game,
        gameTitle: this.props.game.gamename,
        gameDescription: this.props.game.description,
        gameScheduledMS: day,
        gameScheduled: s
      });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpdate = e => {
    const d = new Date(this.state.gameScheduled);
    const ms = d.getTime();

    const game = {
      username: sessionStorage.getItem("user"),
      gameTitle: this.state.gameTitle,
      gameCreatedMS: this.props.game.dateCreated,
      gameDescription: this.state.gameDescription,
      gameScheduledMS: ms || 0
    };

    this.props.updateGameReq(this.props.game.gameId, game);
  };

  render() {
    return (
      <div className="editGameView">
        <div className="title">
          <div>Game Title</div>
          <input
            name="gameTitle"
            placeholder="Game Title"
            value={this.state.gameTitle}
            onChange={this.handleChange}
          />
        </div>

        <div className="description">
          <div>Description</div>
          <textarea
            name="gameDescription"
            placeholder="Game Description"
            value={this.state.gameDescription}
            onChange={this.handleChange}
          />
        </div>
        <div className="date">
          <div>Date</div>
          <input
            type="date"
            name="gameScheduled"
            placeholder="mm/dd/yyyy"
            value={this.state.gameScheduled}
            onChange={this.handleChange}
          />
        </div>

        <button className="saveButton" onClick={this.handleUpdate}>
          Update Game Info
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ gamesList }) => {
  return {
    // game: gamesList.game[0],
    // rounds: gamesList.game.rounds
  };
};

export default connect(
  mapStateToProps,
  { fetchGameReq, updateGameReq }
)(EditGameView);
