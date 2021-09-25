import React from 'react';
import { Route } from 'react-router-dom';
import RegisterMap from './components/RegisterMap';

import LandingPage from './components/LandingPage';
import Register from './components/Register/Register';
import Register2 from './components/Register/Register2';
import Preloader from './components/Preloader';
import Dashboard from './components/Dashboard'

function App() {

  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/preloader/" component={Preloader} />
      <Route exact path="/dashboard/:id" component={Dashboard} />
      <Route path="/register/2/" component={Register2} />
    </div>
  );
};

export default App;