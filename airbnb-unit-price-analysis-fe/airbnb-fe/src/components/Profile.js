import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import styled from 'styled-components';

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }

  const Div = styled.div`
    margin-top: 30vh;
  `


  return (
    <Div>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </Div>
  );
};

export default Profile;