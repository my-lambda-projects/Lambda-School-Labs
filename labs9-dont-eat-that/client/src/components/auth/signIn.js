import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button, Header, Icon, Segment } from 'semantic-ui-react';
import ourColors from '../../ColorScheme.js';

import { SignUpLink } from './signUp.js';
import PasswordForgetPage from './passwordForgot.js';

import { withFirebase } from '../firebase/index.js';
import { getUser, addUser } from '../../actions';
// import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div className='flexCenter'>
    <Segment style={{ background: ourColors.formColor, fontFamily: 'Roboto' }}>
      <Header as='h1' textAlign='center'>
        Login
      </Header>
      <SignInForm />
      <br />
      <SignInGoogle />
      <br />
      <SignInFacebook />
      <br />
      <SignUpLink />
    </Segment>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  resetPassword: false
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async event => {
    // console.log('Inside Signin OnSubmit ');
    event.preventDefault();
    const { email, password } = this.state;

    if (email === 'test@test.com' && password === '1234') {
      this.setState({ ...INITIAL_STATE });
      localStorage.setItem('uid', '1234');
      await this.props.getUser();
      // should change below code so it would wait until getUser is completed...
      this.props.history.push('/recipes');
    } else {
      console.log('Inside Signin OnSubmit Else');
      this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(user => {
          this.setState({ ...INITIAL_STATE });
          localStorage.setItem('uid', user.user.uid);
          return user;
        })
        .then(res => {
          console.log('PROPS', this.props);
          this.props.getUser();
          return res;
        })
        .then(res => this.props.history.push('/recipes'))
        .catch(error => {
          this.setState({ error });
        });
    }
  };

  resetPassword = e => {
    e.preventDefault();
    this.setState({ resetPassword: true });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    const resetPasswordComponent =
      this.state.resetPassword === false ? null : <PasswordForgetPage />;

    return (
      <section>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <input
              name='email'
              value={email}
              onChange={this.onChange}
              type='email'
              placeholder='Email Address'
            />
          </Form.Field>
          <Form.Field>
            <input
              name='password'
              value={password}
              onChange={this.onChange}
              type='password'
              placeholder='Password'
            />
          </Form.Field>
          <div className='flexCenter'>
            <Button
              disabled={isInvalid}
              type='submit'
              style={
                isInvalid
                  ? {
                      background: ourColors.inactiveButtonColor,
                      color: 'white'
                    }
                  : { background: ourColors.buttonColor, color: 'white' }
              }
            >
              Sign In
            </Button>
            <Button
              onClick={this.resetPassword}
              style={{ background: ourColors.buttonColor, color: 'white' }}
            >
              Forgot Password?
            </Button>
          </div>
          {error && (
            <p>
              {' '}
              Sorry, the credentials you entered do not match. Please try again.
            </p>
          )}
        </Form>

        {resetPasswordComponent}
      </section>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(user => {
        this.setState({ ...INITIAL_STATE });
        localStorage.setItem('uid', user.user.uid);
        this.props.addUser(user.user.uid);
        return user;
      })
      .then(res => {
        this.props.getUser();
        this.props.history.push('/recipes');
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <div className='flexCenter'>
          <Button
            type='submit'
            style={{
              background: ourColors.buttonColor,
              color: 'white',
              width: '225.95px'
            }}
          >
            <Icon name='google' />
            Sign In with Google
          </Button>
        </div>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(user => {
        this.setState({ ...INITIAL_STATE });
        localStorage.setItem('uid', user.user.uid);
        this.props.addUser(user.user.uid);
        return user;
      })
      .then(res => {
        this.props.getUser();
        this.props.history.push('/recipes');
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <div className='flexCenter'>
          <Button
            type='submit'
            style={{ background: '#4267B2', color: 'white' }}
          >
            <Icon name='facebook' />
            Sign In with Facebook
          </Button>
        </div>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignInForm = withRouter(
  connect(
    null,
    { getUser }
  )(compose(withFirebase)(SignInFormBase))
);

const SignInGoogle = withRouter(
  connect(
    null,
    { getUser, addUser }
  )(compose(withFirebase)(SignInGoogleBase))
);

const SignInFacebook = withRouter(
  connect(
    null,
    { getUser, addUser }
  )(compose(withFirebase)(SignInFacebookBase))
);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook };
