import React from 'react';
import { OAuthForm, } from '../presentation.js';
import { Segment, Form, Input, Label, Button, Divider, Icon, } from 'semantic-ui-react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { style, } from './style/inline/inline.js';

const SignInForm = props => {


  

  return (


      <Segment style={ style.segment }>
        <Form>

          <h2 style={ style.formHeader }>Sign In</h2>






          <Form.Field
            style={ style.inputContainer }
            error={ props.signInEmailInput.error }
          >
            
            
            <label
              style={ style.label }
            >
              Email
              <span
                style={ style.error }
                hidden={ props.signInEmailInput.label.hidden }
              >
                { props.signInEmailInput.label.value }
              </span>
            </label>





            <Input
              id='sign-in-email-input'
              name='signInEmailInput'
              fluid
              placeholder='Enter your email'
              type='email'
              icon={ () => <Icon color={ props.signInEmailInput.icon.color } name={ props.signInEmailInput.icon.name || 'mail' } /> }
              value={ props.signInEmailInput.value }
              onChange={ props.handleChange }
              onBlur={ props.handleBlur }
              loading={ props.signInEmailInput.loading }
            >
            </Input>
          </Form.Field>








          <Form.Field
            style={ style.inputContainer }
            error={ props.signInPasswordInput.error }
          >
            <label
              style={ style.label }
            >
              Password
              <span
                style={ style.error }
                hidden={ props.signInPasswordInput.label.hidden }
              >
                { props.signInPasswordInput.label.value }
              </span>
            </label>
            <Input
              id='sign-in-password-input'
              name='signInPasswordInput'
              fluid
              placeholder='Enter your password'
              type='password'
              icon={ () => <Icon color={ props.signInPasswordInput.icon.color } name={ props.signInPasswordInput.icon.name || 'lock' } /> }
              value={ props.signInPasswordInput.value }
              onChange={ props.handleChange }
              onBlur={ props.handleBlur }
              loading={ props.signInPasswordInput.loading }
            />
          </Form.Field>

          <Form.Field
            style={ style.buttonContainer }
          >
            <Button
              id='alertifi-sign-in-button'
              name='alertifiSignInButton'
              content='Sign In'
              fluid
              positive
              icon='sign-in'
              labelPosition='left'
              onClick={ props.handleSubmit }
              disabled={ props.signInButton.disabled }
            />
          </Form.Field>
          
          <p style={ style.forgotPassword }><a href='/ForgotPassword'>Forgot Password</a></p>

          <p style={ style.createAccount }>Not Registered? <Link to='/SignUp'>Create an Account</Link></p>

          <span style={ style.dividerContainer }>
            <Divider horizontal>OR</Divider>
          </span>

        </Form>

        <OAuthForm handleSubmit={ props.handleSubmit } />
      </Segment>
  );
}

SignInForm.propTypes = {

};

export default SignInForm;

