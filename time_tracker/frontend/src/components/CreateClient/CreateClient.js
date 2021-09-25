import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addClient } from '../../store/action/userActions';

class CreateClient extends Component {
  state = {
    email: '',
    user: '',
    successModal: false,
    errorModal: false
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.addClientErr && this.props.addClientErr) {
      this.toggleError();
    }
    if (!prevProps.addedClient && this.props.addedClient) {
      this.toggleSuccess();
    }
  }

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.addClient(this.state.email, this.props.user);
  };

  toggleSuccess = () => {
    this.setState({
      successModal: !this.state.successModal
    });
  };

  toggleError = () => {
    this.setState({
      errorModal: !this.state.errorModal
    });
  };

  render() {
    return (
      <StyledRow>
        <Col md="4" />
        <Col>
          <StyledForm onSubmit={this.onSubmitHandler}>
            <h4>Client's Email</h4>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="emial"
                placeholder="Email"
                value={this.state.email}
                onChange={this.inputChangeHandler}
              />
            </FormGroup>
            <Button style={{ backgroundColor: '#4C4B63' }}>Submit</Button>
          </StyledForm>
        </Col>
        <Col md="4" />
        <Modal
          isOpen={this.state.successModal}
          toggle={this.toggleSuccess}
          onClosed={() => this.props.history.push('/dashboard/clients')}
        >
          <ModalHeader toggle={this.toggleSuccess}>Changes Saved</ModalHeader>
          <ModalBody>Changed Successfully</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleSuccess}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.errorModal} toggle={this.toggleError}>
          <ModalHeader>OH NO</ModalHeader>
          <ModalBody>
            Could not find user with that email, check the email or ask them to
            sign up. maybe can send an email here{' '}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleError}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </StyledRow>
    );
  }
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledRow = styled(Row)`
  margin-top: 52px;
`;

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    addClientErr: state.userReducer.addClientErr,
    addedClient: state.userReducer.addedClient
  };
};

export default connect(mapStateToProps, { addClient })(CreateClient);
