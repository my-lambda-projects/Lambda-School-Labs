import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SignUp.css';
import { SignUpForm } from './SignUpForm';
import { Container, Row, Col } from 'reactstrap';

import * as routes from '../constants/routes';

const SignUpPage = ({ history }) => (
  <div className="page"
       style={{
           display: 'flex',


       }}>
      <Container className="formContainer">
          <Row>
              <Col>
                  <Row>
                      <Col className="silogo silogo-sm" sm="12" md={{ size: 6, offset: 3 }}><i className="fa fa-code fa-lg"></i></Col>
                  </Row>

    <SignUpForm history={history} />
              </Col>
          </Row>
          <p>
              Already have an account? <Link to={routes.SIGN_IN}>Sign In</Link>
          </p>
      </Container>

  </div>
);

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpLink };
