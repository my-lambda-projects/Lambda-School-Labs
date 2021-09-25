import React from 'react';
import { Form, } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ButtonContainer, GitHubButton, GoogleButton, ButtonIcon, ButtonText } from './style/styledComponents/styled.js';

const OAuthForm = props => {
  return (
    <ButtonContainer>
      <GoogleButton
        id='google-sign-in-button'
        name='googleSignInButton'
        onClick={ props.handleSubmit }
      >
        <ButtonIcon className='fab fa-google fa-lg'></ButtonIcon>
        <ButtonText>Sign in with Google</ButtonText>
      </GoogleButton>

      <GitHubButton
        id='github-sign-in-button'
        name='gitHubSignInButton'
        onClick={ props.handleSubmit }
      >
        <ButtonIcon className="fab fa-github fa-lg"></ButtonIcon>
        <ButtonText>Sign in with GitHub</ButtonText>
      </GitHubButton>

    </ButtonContainer>
  );
}

OAuthForm.propTypes = {

};

export default OAuthForm;

const FormContainer = styled.form`

  // border: 1px solid black;
  /* max-width: 600px; */
  // align-self: center;

`;