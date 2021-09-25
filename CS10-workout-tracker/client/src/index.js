import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReduxThunk from "redux-thunk";
import AccessControl from "./components/AccessControl";
import PasswordReset from "./components/PasswordReset";
import LandingPage from "./components/Landing/LandingPage";
import Schedule from "./components/Schedule";
import MainWorkout from "./components/Workout/MainWorkout";
import Progress from "./components/Progress/Progress";
import Billing from "./components/Billing";
import Settings from "./components/Settings";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import "./css/index.css";

import combinedReducer from "./reducers";

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

const store = createStoreWithMiddleware(combinedReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="main__page">
        <Nav />
        <div className="push__nav" />
        <Switch>
          <Route exact path="/" component={LandingPage} />

          <Route path="/reset" exact component={PasswordReset} />
          <div className="main__side__content">
            <SideBar />
            <div className="main__container">
              <Route
                path="/schedule"
                exact
                component={AccessControl(Schedule)}
              />
              <Route
                path="/workouts"
                exact
                component={AccessControl(MainWorkout)}
              />
              <Route
                path="/progress"
                exact
                component={AccessControl(Progress)}
              />
              <Route path="/billing" exact component={AccessControl(Billing)} />
              <Route
                path="/settings"
                exact
                component={AccessControl(Settings)}
              />
            </div>
          </div>
        </Switch>
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
