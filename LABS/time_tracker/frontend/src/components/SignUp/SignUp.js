import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { signUp } from '../../store/action/userActions';
import { withRouter } from 'react-router-dom';

// components
import TopBar from '../TopBar/TopBar';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    type: '',
    signedUp: false
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.signUp(this.state);
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  componentDidUpdate() {
    if (this.props.signedUp) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div>
        <TopBar />
        <div style={{ marginTop: 52 }}>
          <Row style={{ fontSize: 20, fontStyle: 'strong', color: '#4c4b63' }}>
            <Col>You are almost there</Col>
          </Row>
          <Row style={{ marginTop: 52 }}>
            <Col md="4" />
            <Col>
              <Form onSubmit={e => this.onSubmitHandler(e)}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="name"
                    name="name"
                    id="name"
                    value={this.state.name}
                    placeholder="your name"
                    onChange={this.inputChangeHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    placeholder="your email"
                    onChange={this.inputChangeHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    placeholder="your password"
                    onChange={this.inputChangeHandler}
                  />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend>Radio Buttons</legend>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="type"
                        value="vendor"
                        onChange={this.inputChangeHandler}
                        defaultChecked
                      />Vendor
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="type"
                        value="client"
                        onChange={this.inputChangeHandler}
                      />Client
                    </Label>
                  </FormGroup>
                </FormGroup>
                <Button style={{ backgroundColor: '#4c4b63' }}>Submit</Button>
              </Form>
            </Col>
            <Col md="4" />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signedUp: state.userReducer.signedUp
  };
};

export default withRouter(connect(mapStateToProps, { signUp })(SignUp));
