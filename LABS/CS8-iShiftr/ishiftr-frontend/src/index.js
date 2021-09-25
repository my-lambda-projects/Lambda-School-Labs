import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
// import 'react-dates/initialize';

ReactDOM.render(
<BrowserRouter>
    <App />
    {/* <div>
        <Route exact path="/" component={ App } />
        <Route exact path="/SignUp" component={ SignUp } />
        <Route path="/Schedule" component={ SignUp } />
        <Route path="/ShiftSchedule" component={ ShiftSchedule } />
    </div> */}
</BrowserRouter>,
document.getElementById('root'));
