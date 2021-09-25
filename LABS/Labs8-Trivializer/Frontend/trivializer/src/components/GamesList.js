import React, { Component } from "react";
import Games from "./Games";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchGamesReq, deleteGameReq } from "../actions";
import "./styles/Components.css";
import axios from "axios";
import "./styles/GamesList.css";
import URL from "../URLs";

/**
 * GamesList Component
 * - renders a list of games for the logged in user
 */
class GamesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      gameLimit: 3
    };
  }

  componentDidMount() {
    this.props.fetchGamesReq();
    // NOTE: setState after API request doesn't render state in time
    // this.setState({ games: this.props.games });
    // SOLUTION: render with props directly
    if (localStorage.getItem("register")) {
      let googleUsername = localStorage.getItem("user").displayName;
      let googleUID = localStorage.getItem("user").uid;
      axios
        .post(`${URL.current_URL}/login`, {
          username: googleUsername,
          password: googleUID
        })
        .then(res => {
          sessionStorage.setItem("userId", JSON.stringify(res.data.userId));
          sessionStorage.setItem("paid", JSON.stringify(res.data.paid));
          sessionStorage.setItem(
            "jwt",
            JSON.stringify(res.data.token)
              .split("")
              .slice(1, -1)
              .join("")
          );
          sessionStorage.setItem("google", "yes");
          localStorage.removeItem("register");
        });
    }

    if (sessionStorage.getItem("status") === "1") {
      this.setState({ gameLimit: 10 });
    }
  }

  componentDidUpdate = prevProps => {
    if (JSON.stringify(prevProps.games) !== JSON.stringify(this.props.games)) {
      this.setState({ games: this.props.games });
    }
  };

  logout = e => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.push("/");
  };

  delete = id => {
    this.props.deleteGameReq(id);
  };

  render() {
    if (!this.props.games) {
      return <div>Loading...</div>;
    }

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
          <Navbar />
          <div className="content-container whole">
            {!this.props.games[0] ? (
              <div className="addnewGame">
                <h3 className="main-middle ">Add New Game</h3>

                <Link to={`/creategame`}>
                  {" "}
                  <i className="fas fa-plus-circle" />
                </Link>
              </div>
            ) : (
              <div className="gamelist">
                <h1>Games</h1>
                <div className="gamelist-overallcontainer">
                  <div className="gamelist-container">
                    {this.props.games.map((game, i) => (
                      <div key={game["gameId"]} className="game-container">
                        <div className="game-summary">
                          <Link
                            className="game-link"
                            to={`/game/${game["gameId"]}`}
                            key={game["gameId"]}
                          >
                            <GameDetails index={i} game={game} />
                          </Link>
                          <button
                            className="game-delete"
                            onClick={() => this.delete(game["gameId"])}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {this.props.games.length > 0 &&
                  this.props.games.length < this.state.gameLimit ? (
                    <div className="game-container">
                      <div className="game-summary">
                        <Link className="newgame-link" to={`/creategame`}>
                          <div className="cardnewGame">New Game</div>
                          <i className="small-fas fas fa-plus-circle" />
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * GameDetails function
 * - helper function to render mapped properties for each game
 */
function GameDetails({ game }) {
  return (
    <div>
      <Games game={game} />
    </div>
  );
}

const mapStateToProps = ({ gamesList }) => {
  return {
    games: gamesList.games
  };
};

export default connect(
  mapStateToProps,
  { fetchGamesReq, deleteGameReq }
)(GamesList);
