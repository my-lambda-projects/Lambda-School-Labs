import React from 'react';
import { Form, Segment, Label, Input, Icon, Button, } from 'semantic-ui-react';
import { style } from './style/inline.js';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SignUpForm = props => {
  return (
      <Segment style={ style.segment }>
        <Form>

          <h2 style={ style.formHeader }>Sign Up</h2>


          <Form.Field
            style={ style.inputContainer }
            error={ props.signUpUsernameInput.error }
          >

            <label
              style={ style.label }
            >
              Username
              <span
                style={ style.error }
                hidden={ props.signUpUsernameInput.label.hidden }
              >
                { props.signUpUsernameInput.label.value }
              </span>
            </label>

            <Input
              id='sign-up-username-input'
              name='signUpUsernameInput'
              fluid
              placeholder='Enter a username'
              type='text'
              icon={ () => <Icon color={ props.signUpUsernameInput.icon.color || 'black' } name={ props.signUpUsernameInput.icon.name || 'user' } /> }
              value={ props.signUpUsernameInput.value }
              onChange={ props.handleChange }
              onBlur={ props.handleBlur }
              loading={ props.signUpUsernameInput.loading }
            >
            </Input>
          </Form.Field>


          <Form.Field
            style={ style.inputContainer }
            error={ props.signUpEmailInput.error }
          >
            <label
              style={ style.label }
            >
              Email
              <span
                style={ style.error }
                hidden={ props.signUpEmailInput.label.hidden }
              >
                { props.signUpEmailInput.label.value }
              </span>
            </label>
            <Input
              id='sign-up-email-input'
              name='signUpEmailInput'
              fluid
              placeholder='Enter your email'
              type='email'
              icon={ () => <Icon color={ props.signUpEmailInput.icon.color || 'black' } name={ props.signUpEmailInput.icon.name || 'mail' } /> }
              value={ props.signUpEmailInput.value }
              onChange={ props.handleChange }
              onBlur={ props.handleBlur }
              loading={ props.signUpEmailInput.loading }
            >
            </Input>
          </Form.Field>

          


          <Form.Field
            style={ style.inputContainer }
            error={ props.signUpPasswordInput.error }
          >

            <label
              style={ style.label }
            >
              Password
              <span
                style={ style.error }
                hidden={ props.signUpPasswordInput.label.hidden }
              >
                { props.signUpPasswordInput.label.value }
              </span>
            </label>

            <Input
              id='sign-up-password-input'
              name='signUpPasswordInput'
              fluid
              placeholder='Enter a password'
              type='password'
              icon={ () => <Icon color={ props.signUpPasswordInput.icon.color || 'black' } name={ props.signUpPasswordInput.icon.name || 'lock' } /> }
              value={ props.signUpPasswordInput.value }
              onChange={ props.handleChange }
              onBlur={ props.handleBlur }
              loading={ props.signUpPasswordInput.loading }
            >
            </Input>
          </Form.Field>

          <Form.Field
            style={ style.buttonContainer }
          >
            <Button
              id='alertifi-register-button'
              name='alertifiRegisterButton'
              content='Register'
              fluid
              positive
              icon='signup'
              labelPosition='left'
              onClick={ props.handleSubmit }
              disabled={ props.registerButton.disabled }
            />
          </Form.Field>
          
        </Form>
      </Segment>
  );
}

SignUpForm.propTypes = {

};

export default SignUpForm;

