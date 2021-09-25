import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-infinite-calendar/styles.css';




ReactDOM.render(
    <Router>
        <App />
    </Router>,
     document.getElementById('root'));

