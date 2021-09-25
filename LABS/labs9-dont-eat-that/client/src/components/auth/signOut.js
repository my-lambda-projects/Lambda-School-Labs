import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Header } from 'semantic-ui-react';

import { removeUser } from '../../actions';

import { withFirebase } from '../firebase';

const SignOutButton = withRouter(({ firebase, history, removeUser }) => {
  const onSignOut = () => {
    localStorage.removeItem('uid');
    firebase.doSignOut();
    removeUser();
    history.push('/');
  };
  return (
    <div>
      <Header as="h1">Sign Out</Header>
      <Button onClick={onSignOut}>Sign Out</Button>
    </div>
  );
});

export default connect(
  null,
  { removeUser }
)(withFirebase(SignOutButton));
