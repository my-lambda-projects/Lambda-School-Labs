import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "assets/css/black-dashboard-react.css";
import "assets/css/nucleo-icons.css";
import Landing from "./layouts/landingPage/Landing";
import AdminLayout from "layouts/Admin/Admin.jsx";
import { connect } from "react-redux";
import Auth from "./features/auth/container/Auth";

class App extends Component {
  // notify = () => toast("Wow so easy !");
  render() {
    return (
      <div className="App">
        <ToastContainer transition={Slide} />
        <Switch>
          <Route path="/auth/register" component={Auth} />
          <Route
            path="/"
            render={props =>
              !this.props.authenticatoin_succeed ? (
                <Landing {...props} />
              ) : (
                <>
                  <AdminLayout {...props} />
                  <Redirect to="/seek" />
                </>
              )
            }
          />
        </Switch>
      </div>
    );
  }
}
// export default App;
const MapPropsToState = state => ({
  authenticatoin_succeed: state.user.authenticatoin_succeed
});
export default withRouter(connect(MapPropsToState)(App));
