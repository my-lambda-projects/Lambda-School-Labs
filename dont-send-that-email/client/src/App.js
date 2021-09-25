import React, { Component } from "react";

import axios from "axios";
import "./App.css";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Navigation/Sidebar";
import MainContent from "./components/MainContent";
import LandingPage from "./components/LandingPage";
import { Container } from "reactstrap";
import "typeface-montserrat";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faIgloo,
  faPlusCircle,
  faCopy,
  faTrash,
  faHome,
  faUser,
  faSignOutAlt,
  faArrowLeft,
  faArrowRight,
  faQuoteRight,
  faAt
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faIgloo,
  faPlusCircle,
  faCopy,
  faTrash,
  faHome,
  faUser,
  faSignOutAlt,
  faArrowLeft,
  faArrowRight,
  faQuoteRight,
  faAt,
  fab
);

class App extends Component {
  state = {
    user: null,
    loading: false,
    loaded: false
  };

  updateUser = () => {
    if (this.state.loading === false) {
      this.setState({ loading: true, loaded: false }, () => {
        axios
          .get(process.env.REACT_APP_BACKEND_URL + "/auth/profile", {
            withCredentials: true
          })
          .then(response => {
            const { user } = response.data;
            if (user) {
              this.setState({ user, loading: false, loaded: true });
            }
          })
          .catch(err => this.setState({ loaded: true, loading: false }));
      });
    }
  };

  handleClick = e => {
    this.setState({ testLogin: false });
  };

  componentDidMount() {
    this.updateUser();
  }

  render() {
    if (this.state.user) {
      return (
        <Container fluid>
          <Navigation user={this.state.user} class="navbar-transparent" />
          <Sidebar />
          <MainContent user={this.state.user} />
        </Container>
      );
    } else if (
      this.state.loading === false &&
      this.state.loaded === true &&
      this.state.user === null
    ) {
      return (
        <div>
          <LandingPage handleClick={this.handleClick} />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default App;
