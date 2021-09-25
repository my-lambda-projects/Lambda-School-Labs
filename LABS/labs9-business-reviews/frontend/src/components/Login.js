import React from 'react';
import GatedSignIn from './GatedSignInComponent';
import styled from 'styled-components';
import NavBar from './NavBar';

const AuthWrapper = styled.div`
  display: flex;
  margin: 50px auto;
  justify-content: space-evenly;
  max-width: 1200px;
  width: 100%;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;

const Login = (props) => {
  return (
    <div>
      <NavBar />
      <AuthWrapper>
        <GatedSignIn {...props}/>
      </AuthWrapper>
    </div>
    
  );
};

export default Login;
