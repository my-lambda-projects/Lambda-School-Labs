import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';


//As far as I can tell, this component only exists to add in the user's googleId in the URL so the backend can grab it. Not sure why the previous group didn't just send it via axios. This should probably be changed in the future, but would also necessitate altering the backend slightly.
const Authenticate = () => {
  const { googleApi } = useAuth();
  const { currentUser } = googleApi;
  return <Redirect to={`/${currentUser.googleId}/dashboard`} />;
};

export default Authenticate;
