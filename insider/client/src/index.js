import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap-reboot.min.css';
import './css/bootstrap-grid.min.css';
import './css/bootstrap.min.css';
import './css/style.css';
import WebFont from 'webfontloader';
import App from './App';

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// registerServiceWorker();

WebFont.load({
  google: {
    families: ['PT Sans:400', 'Roboto:700', 'sans-serif'],
  },
});
