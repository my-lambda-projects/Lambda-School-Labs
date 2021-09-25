import React, { Component } from 'react';
import { addToInvoice } from '../../store/action/invoiceActions';
import { Col, Row, Collapse, Card, CardBody, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import FaClock from 'react-icons/lib/fa/clock-o';

class TimestampList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  addToInvoice = () => {
    this.props.addToInvoice(this.props.hour);
  };

  render() {
    return (
      <div>
        <StyledCard>
          <StyledCardTitle onClick={this.toggle}>
            <span>
              {moment(this.props.hour.startTime).format('MM/DD/YYYY')}
            </span>
            <span>
              {this.props.hour.duration ? (
                this.props.hour.duration
              ) : (
                <FaClock />
              )}
            </span>
          </StyledCardTitle>
          <Collapse isOpen={this.state.collapse}>
            <CardBody>
              {this.props.hour.comments ? (
                <p>{this.props.hour.comments}</p>
              ) : (
                <p>No comments yet</p>
              )}
              <Row>
                <Col sm="3">
                  <label htmlFor={`checkbox-${this.props.id}`}>
                    <p>add to invoice</p>
                  </label>
                </Col>
                <Col sm="1">
                  <Input
                    type="checkbox"
                    id={`checkbox-${this.props.id}`}
                    onChange={this.addToInvoice}
                  />
                </Col>
                <Col sm="2" />
                <Col sm="6">
                  <Link to={`timestamp/${this.props.hour._id}`}>
                    <StyledButton>Edit</StyledButton>
                  </Link>
                </Col>
              </Row>
            </CardBody>
          </Collapse>
        </StyledCard>
      </div>
    );
  }
}

const StyledCardTitle = styled.span`
  display: flex;
  justify-content: space-between;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const StyledCard = styled(Card)`
  max-width: 50vw;
  margin: auto;
  margin-bottom: 10px;
  :hover {
    cursor: pointer;
  }
`;

const StyledButton = styled(Button)`
  background-color: #4c4b63 !important;
`;

export default connect(null, { addToInvoice })(TimestampList);
