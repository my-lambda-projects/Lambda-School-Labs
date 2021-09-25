import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { changeUserDetails } from '../../store/action/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Settings extends Component {
  state = {
    email: '',
    newEmail: '',
    password: '',
    newPassword: '',
    userType: '',
    user: '',
    successModal: false
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.changeUserDetails(
      this.state.password,
      this.state.newPassword,
      this.state.newEmail,
      this.props.userType,
      this.props.user
    );
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  // @TODO: change to modal instead of alert
  componentDidUpdate(prevProps) {
    if (this.props.changeSuccess && !prevProps.changeSuccess) {
      this.setState({
        successModal: true
      });
    }
  }

  toggleSuccess = () => {
    this.setState({
      successModal: !this.state.successModal
    });
  };

  render() {
    return (
      <div style={{ marginTop: 52 }}>
        <Row>
          <Col md="6">
            <div style={{ marginBottom: 5 }}>Confirm account information</div>
            <Form onSubmit={e => this.onSubmitHandler(e)}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={this.state.email}
                  placeholder="current email"
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
                  placeholder="current password"
                  onChange={this.inputChangeHandler}
                />
              </FormGroup>
            </Form>
          </Col>
          <Col md="6">
            <div style={{ marginBottom: 5 }}>Change one or both</div>
            <Form>
              <FormGroup>
                <Label for="newEmail">New Email</Label>
                <Input
                  type="email"
                  name="newEmail"
                  id="newEmail"
                  value={this.state.newEmail}
                  placeholder="new email"
                  onChange={this.inputChangeHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label for="newPassword">New Password</Label>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={this.state.newPassword}
                  placeholder="new password"
                  onChange={this.inputChangeHandler}
                />
              </FormGroup>
            </Form>
          </Col>
          <Col>
            <Button
              style={{ backgroundColor: '#4c4b63' }}
              onClick={e => this.onSubmitHandler(e)}
            >
              Submit
            </Button>
          </Col>
        </Row>

        <Modal
          isOpen={this.state.successModal}
          toggle={this.toggleSuccess}
          onClosed={() => this.props.history.push('/dashboard')}
        >
          <ModalHeader toggle={this.toggleSuccess}>Changes Saved</ModalHeader>
          <ModalBody>Changed Successfully</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleSuccess}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.userReducer.userType,
    user: state.userReducer.user,
    changeSuccess: state.userReducer.changeSuccess
  };
};

export default withRouter(
  connect(mapStateToProps, { changeUserDetails })(Settings)
);
