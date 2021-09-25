import React from 'react';
import Routes from './routes/Routes';
import ReactGA from 'react-ga';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
// import './styles/global.scss'
import './styles/reset.scss'

library.add(faAngleLeft)

ReactGA.initialize('UA-157968315-1');

ReactGA.pageview(window.location.pathname + window.location.search);


function App() {
  
  return (
    <div className="App" >
      <Routes />
    </div>
  );
}

export default App;

