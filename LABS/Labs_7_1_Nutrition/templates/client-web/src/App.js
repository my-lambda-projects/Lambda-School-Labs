import React from 'react';
import Main from './components/main.js';
import Headers from './components/header.js';
import Footers from './components/footer.js';


class App extends React.Component {
  render() {
    return(
      <div> 
        <Headers />
        <Main />
        <Footers />
     </div>
    )
  } 
}

export default App;
     
     
      
    