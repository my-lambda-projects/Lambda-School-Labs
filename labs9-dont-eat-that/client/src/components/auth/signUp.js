import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// import { FirebaseContext } from '../Firebase';
import { withFirebase } from '../firebase';
import { compose } from 'recompose'; // manage higher order component
import { connect } from 'react-redux';
import { Header, Form, Button, Segment } from 'semantic-ui-react';

import { getUser, addUser } from '../../actions';
// eslint-disable-next-line
import { domainToASCII } from 'url';
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-google';
import ourColors from '../../ColorScheme';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  // username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  isReCaptcha: false
};

class SignUpFormBase extends Component {
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { ...INITIAL_STATE };

    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  componentDidMount() {
    loadReCaptcha();

    if (this.captchaDemo) {
      // console.log("started, just a second...")
      this.captchaDemo.reset();
    }
  }

  // currently after a successful singup , localStorage is not set signIn page is displayed and
  // at the moment, Firebase automatically SignIn a user when signUp is complete
  // if we decide to allow auto signIn and display /recipes after signup
  // uncomment LocalStorage assign and change URL
  //

  onSubmit = event => {
    event.preventDefault();
    const { email, passwordOne } = this.state;

    if (email === 'test@test.com' && passwordOne === '1234') {
      this.props.addUser('1234');
      this.props.getUser();
      this.setState({ ...INITIAL_STATE });
    } else {
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(user => {
          console.log('SignUp.js create user SUCCESS');
          this.props.addUser(user.user.uid);
          this.setState({ ...INITIAL_STATE });
          localStorage.setItem('uid', user.user.uid);
          return user;
        })
        .then(user => {
          this.props.getUser();
          return user;
        })
        .then(res => {
          console.log('this.props = ', this.props.history);
          this.props.history.push('/recipes'); //change this to recipes if routing back to recipes
        })
        .catch(error => {
          console.log('SignUp.js create user FAILED');
          alert('SignUp.js create user FAILED');
          this.setState({ error });
        });
    }
    event.preventDefault();
  };

  // reCaptcha = event => {
  //   // console.log("true");
  // }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onLoadRecaptcha() {
    //on a page reload it will rest the box to unclicked
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }

  verifyCallback(recaptchaToken) {
    //setting the state to true after the user verifies that they are a person
    // Here you will get the final recaptchaToken!!!
    // console.log(recaptchaToken,  "<= your recaptcha token")
    this.setState({ isReCaptcha: true });
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      this.state.isReCaptcha === false;

    return (
      <div className="flexCenter">
        <Segment style={{ background: ourColors.formColor }}>
          <Header as="h1" textAlign="center">
            SignUp
          </Header>
          <Form onSubmit={this.onSubmit} inverted>
            {/* <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        /> */}
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
                name='passwordOne'
                value={passwordOne}
                onChange={this.onChange}
                type='password'
                placeholder='Password'
              />
            </Form.Field>
            <Form.Field>
              <input
                name='passwordTwo'
                value={passwordTwo}
                onChange={this.onChange}
                type='password'
                placeholder='Confirm Password'
              />
            </Form.Field>

            {error && <p>{error.message}</p>}

            {/* You can replace captchaDemo with any ref word */}
            <Form.Field className='flexCenter'>
              <ReCaptcha
                ref={el => {
                  this.captchaDemo = el;
                }}
                size='normal'
                data-theme='dark'
                render='explicit'
                sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                onloadCallback={this.onLoadRecaptcha}
                verifyCallback={this.verifyCallback}
              />
            </Form.Field>
            <div className="flexCenter">
              <Button disabled={isInvalid} type="submit" style={{ background: ourColors.buttonColor, color: 'white' }}>
                Sign Up
              </Button>
            </div>
          </Form>
        </Segment>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p style={{ textAlign: 'center' }}>
    Don't have an account? <Link to='/signup'>Sign Up</Link>
  </p>
);

// without compose, use below code
//const SignUpForm = withFirebase(SignUpFormBase);

const SignUpForm = withRouter(
  connect(
    null,
    { getUser, addUser }
  )(compose(withFirebase)(SignUpFormBase))
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
