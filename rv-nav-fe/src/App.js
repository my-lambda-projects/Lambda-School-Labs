import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
// import Auth from './components/auth/Auth';
import Map from "./components/map/Map";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import RegisterHooks from "./components/auth/register/Register-Hooks";
import LoadingPage from "./components/auth/loading/LoadingPage";
import Main from "./components/onboarding/Main";





const App = () => {
  return (
    <div className="App">
      <Route path="/" exact component={LandingPage} />
      <Route path="/map" component={Map} />
      {/* <Route path="/load" component = {LoadingPage}/> */}
      <Route path="/onboarding" component={Main} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      
      
      

     
    </div>
  );
};

export default App;
