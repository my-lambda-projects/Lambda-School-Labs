import React from "react";
import "./App.css";
import mixpanel from "./helpers/mixpanel";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import Nav from "./components/Nav";
import Team from "./components/Team";
import Welcome from "./components/Welcome";
import Learn from "./components/Learn";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Route exact path="/" component={Welcome} />
        <Route path="/learn" component={Learn} />
        <Route path="/team" component={Team} />
        <Footer />
      </Router>
    </div>
  );
}

// any time a user interacts with this page a notification will be sent to mixpanel

mixpanel.track("viewed landing");

export default App;
