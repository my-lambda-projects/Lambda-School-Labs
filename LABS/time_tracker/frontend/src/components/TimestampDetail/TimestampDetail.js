import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-autosize-textarea';
import styled from 'styled-components';

const backend =
  process.env.NODE_ENV === 'production'
    ? `https://ls-time-tracker.herokuapp.com`
    : `http://localhost:5000`;

class TimestampDetail extends Component {
  state = {
    comments: '',
    startTime: '',
    endTime: '',
    clientName: '',
    duration: '',
    date: '',
    hours: '',
    minutes: '',
    deleteModal: false,
    successModal: false
  };

  componentDidMount() {
    axios
      .get(`${backend}/timestamp/${this.props.match.params.id}`, {
        headers: {
          token: window.localStorage.getItem('Authorization'),
          userType: window.localStorage.getItem('UserType')
        }
      })
      .then(({ data }) => {
        this.setState({
          comments: data.comments,
          startTime: data.startTime,
          endTime: data.endTime,
          clientName: data.client.name,
          duration: data.duration
        });
      })
      .then(data => {
        const splitDuration = this.state.duration.slice(0).split(':');
        this.setState({
          hours: splitDuration[0],
          minutes: splitDuration[1]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  editTimestamp = event => {
    event.preventDefault();
    const newDuration = `${this.state.hours}:${this.state.minutes}`;
    this.setState({ duration: newDuration });
    const newEndTime = moment(this.state.startTime)
      .add(Number(this.state.hours), 'hours')
      .add(Number(this.state.mins), 'minutes');

    axios
      .put(
        `${backend}/timestamp/${this.props.match.params.id}`,
        {
          newTimestamp: this.state,
          endTime: newEndTime,
          duration: newDuration
        },
        {
          headers: {
            token: window.localStorage.getItem('Authorization'),
            userType: window.localStorage.getItem('UserType')
          }
        }
      )
      .then(updatedTStamp => {
        this.setState({
          comments: updatedTStamp.comments,
          endTime: updatedTStamp.endTime,
          duration: updatedTStamp.duration
        });
        this.setState({
          successModal: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  toggleDelete = () => {
    this.setState({
      ...this.state,
      deleteModal: !this.state.deleteModal
    });
  };

  toggleSuccess = () => {
    this.setState({
      ...this.state,
      successModal: !this.state.successModal
    });
  };

  deleteTimestamp = () => {
    axios
      .delete(`${backend}/timestamp/${this.props.match.params.id}`, {
        headers: {
          token: window.localStorage.getItem('Authorization'),
          userType: window.localStorage.getItem('UserType')
        }
      })
      .then(success => {
        this.setState({
          successModal: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>{this.state.clientName}</h1>
        <h3>{moment(this.state.startTime).format('MM/DD/YYYY')}</h3>
        <Row>
          <Col md="3" />
          <Col>
            <Form onSubmit={this.editTimestamp}>
              <FormGroup>
                <Label for="hours">Hours</Label> {/* Edit hours form*/}
                <Input
                  name="hours"
                  id="hours"
                  value={this.state.hours}
                  onChange={this.inputChangeHandler}
                  placeholder={this.state.hours}
                />
                <Label for="minutes">Minutes</Label> {/* Edit minutes select*/}
                <Input
                  type="select"
                  name="minutes"
                  id="minutes"
                  placeholder={this.state.minutes}
                  value={this.state.minutes}
                  onChange={this.inputChangeHandler}
                >
                  <option>00</option>
                  <option>15</option>
                  <option>30</option>
                  <option>45</option>
                </Input>
                <Label for="comments">Comments</Label> {/* Edit comments form*/}
                <StyledTextArea
                  name="comments"
                  id="comments"
                  placeholder="Type here.."
                  value={this.state.comments}
                  onChange={this.inputChangeHandler}
                  rows={3}
                />
              </FormGroup>
              <Button style={{ backgroundColor: '#4c4b63' }}>Submit</Button>
              <Modal
                isOpen={this.state.successModal}
                toggle={this.toggleSuccess}
                onClosed={() => this.props.history.goBack()}
              >
                <ModalHeader toggle={this.toggleSuccess}>
                  Changes Saved
                </ModalHeader>
                <ModalBody>Changed Successfully</ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleSuccess}>
                    Close
                  </Button>
                </ModalFooter>
              </Modal>
            </Form>
            <br />
            <Button
              onClick={this.toggleDelete}
              style={{ backgroundColor: '#e3170a' }}
            >
              Delete Timestamp
            </Button>
            <Modal
              isOpen={this.state.deleteModal}
              toggle={this.toggleDelete}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggleDelete}>
                Delete timestamp?
              </ModalHeader>
              <ModalBody>
                Are you sure you want to delete this timestamp?
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.deleteTimestamp}>
                  Delete
                </Button>{' '}
                <Button color="secondary" onClick={this.toggleDelete}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
          <Col md="3" />
        </Row>
      </div>
    );
  }
}

const StyledTextArea = styled(TextareaAutosize)`
  min-width: 100%;
  border: 1px lightgray;
  border-style: solid;
  border-radius: 4px;
`;

export default withRouter(TimestampDetail);
