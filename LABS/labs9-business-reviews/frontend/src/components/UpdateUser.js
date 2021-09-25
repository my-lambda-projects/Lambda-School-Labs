import React, { Component } from 'react';
import GatedSignInComponent from './GatedSignInComponent';
import UserUpdateForm from './UserUpdateForm';
import styled from 'styled-components';
import NavBar from './NavBar';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export default class UpdateUser extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Container>
          <GatedSignInComponent>
            <UserUpdateForm />
          </GatedSignInComponent>
        </Container>
      </div>
      
    );
  }
}
