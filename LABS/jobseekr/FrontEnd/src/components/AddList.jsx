import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, OverlayTrigger, Glyphicon, Tooltip, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import ROOT_URL from '../routes/config';

class AddList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      title: '',
    };
  }

  handleAddList = e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const list = this.props.lists;
    const { title } = this.state;
    axios
      .post(`${ROOT_URL}/jobslist`, {
        list, title, token
      })
      .then(() => this.setState({ show: false }))
      .then(() => this.props.getAllLists())
      .then(() => this.props.getAllJobs())
      .catch(err => console.log({ error: err}));
  };

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  }


  render() {
    const tooltip = <Tooltip id="modal-tooltip">Add a new category to the lists.</Tooltip>;
    const statuses = [];
    this.props.lists.forEach(list => statuses.push(list.status));

    return (
      <div>
        <OverlayTrigger overlay={tooltip}>
          <Button onClick={() => this.setState({ show: true })}>
            Add List &nbsp;<Glyphicon glyph="">+</Glyphicon>
          </Button>
        </OverlayTrigger>

        <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Add list</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>New Job Status</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.title}
                  placeholder="e.g. Interview Followup"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Add a new status to the list.</HelpBlock>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleAddList}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddList;
