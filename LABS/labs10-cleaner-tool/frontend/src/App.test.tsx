import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import {UserContextProvider} from './UserContext'

jest.mock('react-firebaseui/StyledFirebaseAuth', () => () => {
  return <div>Hellooo</div>;
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <UserContextProvider><App /></UserContextProvider>
    </Router>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
