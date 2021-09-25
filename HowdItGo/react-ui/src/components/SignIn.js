import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import axios from 'axios';
import {Container, Row, Col, Form, Input, Button} from 'reactstrap';
import './SignIn.css';

const SignInPage = ({ history }) => (
  <Container className="formContainer">
    <Row>
      <Col>
        <Row>
          <Col className="silogo" sm="12" md={{ size: 6, offset: 3 }}><i className="fa fa-code fa-lg"></i></Col>
        </Row>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
      </Col>
    </Row>
  </Container>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    localStorage.getItem('sessionCookie');
    if (localStorage.getItem('sessionCookie')) {
      localStorage.removeItem('sessionCookie');
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { history } = this.props;
    axios
      .post(`/signin`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(result => {
        if (result.data.message) {
          alert(result.data.message);
          return;
        } else {
          localStorage.setItem('sessionCookie', result.data.sessionCookie);
          localStorage.setItem('email', this.state.email);
          history.push('/Dashboard');
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (

        <Form className="form" onSubmit={this.onSubmit}>
          <Input type="email" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
          <Input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
          <Button disabled={isInvalid} type="submit" className="Fbutton">
            Sign In
          </Button>

          {error && <p>{error.message}</p>}
        </Form>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
