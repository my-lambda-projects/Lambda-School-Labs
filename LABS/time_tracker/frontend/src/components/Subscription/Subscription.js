import './Subscription.css';
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { paymentSuccess } from '../../store/action/userActions';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col
} from 'reactstrap';
import styled from 'styled-components';

const backend =
  process.env.NODE_ENV === 'production'
    ? `https://ls-time-tracker.herokuapp.com`
    : `http://localhost:5000`;

class Subscription extends Component {
  state = {
    successModal: false,
    monthly: false,
    annually: false
  };

  onToken = token => {
    axios
      .post(
        `${backend}/vendor/checkout`,
        {
          token: token.id,
          amount: 500,
          vendorId: this.props.user
        },
        {
          headers: {
            token: window.localStorage.getItem('Authorization'),
            userType: window.localStorage.getItem('UserType')
          }
        }
      )
      .then(({ data }) => {
        this.props.paymentSuccess();
        this.setState({ successModal: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  toggleSuccess = () => {
    this.setState({
      ...this.state,
      successModal: !this.state.successModal
    });
  };

  toggleAnnually = () => {
    this.setState({
      ...this.state,
      monthly: false,
      annually: true
    });
  };

  toggleMonthly = () => {
    this.setState({
      ...this.state,
      monthly: true,
      annually: false
    });
  };

  render() {
    return (
      <div style={{ marginTop: 52 }}>
        <Row>
          <Col md="2" />
          <Col md="4">
            <StyledCard
              monthly="true"
              onClick={this.toggleMonthly}
              className={this.state.monthly ? 'monthly active' : 'monthly'}
            >
              <StyledCardTitle style={{ backgroundColor: '#5673B5' }}>
                Monthly
                <CardSubtitle style={{ marginTop: 3 }}>
                  Testing the waters
                </CardSubtitle>
              </StyledCardTitle>
              <CardBody>
                <StyledUl style={{ textAlign: 'left' }}>
                  <StyledLi>Monthly Cost: $5</StyledLi>
                  <StyledLi>Annual Cost: $60</StyledLi>
                  <StyledLi>
                    Freedom to stop and start when workload increases
                  </StyledLi>
                </StyledUl>
                <StyledButton outline="true">Select plan</StyledButton>
              </CardBody>
            </StyledCard>
          </Col>
          <Col md="4">
            <StyledCard
              onClick={this.toggleAnnually}
              className={this.state.annually ? 'annually active' : 'annually'}
            >
              <StyledCardTitle style={{ backgroundColor: '#CDE7B0' }}>
                Annually
                <CardSubtitle style={{ marginTop: 3 }}>
                  You know you want it
                </CardSubtitle>
              </StyledCardTitle>
              <CardBody>
                <StyledUl style={{ textAlign: 'left' }}>
                  <StyledLi>Monthly Cost: $4.16</StyledLi>
                  <StyledLi>Annual Cost: $50</StyledLi>
                  <StyledLi>
                    Save money and don't have to worry about keeping track of
                    more expenses.
                  </StyledLi>
                </StyledUl>
                <StyledButton outline="true">Select plan</StyledButton>
              </CardBody>
            </StyledCard>
          </Col>
          <Col md="2" />
        </Row>
        <StripeCheckout
          stripeKey="pk_test_aJJUpO0Rhq6Y6bGqF88tjdMt"
          token={this.onToken}
          style={{ marginTop: 20 }}
        />
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
      </div>
    );
  }
}

const StyledCard = styled(Card)`
  min-height: 275px;
  :hover {
    cursor: pointer;
    border: solid 4px;
    border-color: ${props => (props.monthly ? '#5673B5' : '#CDE7B0')};
  }
`;

const StyledCardTitle = styled(CardTitle)`
  min-height: 75px;
  padding-top: 15px;
  color: white;
`;

const StyledUl = styled.ul`
  text-align: left;
  margin-top: -25px !important;
  min-height: 150px;
`;

const StyledLi = styled.li`
  margin-bottom: 8px;
  font-size: 0.8em;
`;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: auto;
`;

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default withRouter(
  connect(mapStateToProps, { paymentSuccess })(Subscription)
);
