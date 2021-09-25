import React, { Component } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Billing from "./components/Billing";
import GamesList from "./components/GamesList";
import Setting from "./components/Setting";
import Game from "./components/Game";
import { Route, withRouter } from "react-router-dom";
import Round from "./components/Round";
import CreateGameView from "./components/CreateGameView";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "./components/styles/Components.css";
import Faqs from "./components/Faqs";

/**
 * App Component
 * - handles routes to specified component
 */
class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/billing" component={Billing} />
        <Route path="/gameslist" component={GamesList} />
        <Route path="/creategame" component={CreateGameView} />
        <Route path="/setting" component={Setting} />
        <Route path="/faqs" component={Faqs} />
        <Route exact path="/game/:id" render={props => <Game {...props} />} />
        <Route exact path="/game/:id/round/:id" render={props => <Round {...props} />} />
      </div>
    );
  }
}

export default withRouter(DragDropContext(HTML5Backend)(App));
