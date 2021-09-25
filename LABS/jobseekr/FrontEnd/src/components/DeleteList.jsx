import React, { Component } from 'react';
import axios from 'axios';
import { 
  Button, 
  Modal, 
  OverlayTrigger, 
  Glyphicon, 
  Tooltip, 
} from 'react-bootstrap';
import ROOT_URL from '../routes/config';

class AddJob extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
    };
  }

  handleDeleteList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const token = localStorage.getItem('token');
    const { id, lists } = this.props;
    axios
      .delete(`${ROOT_URL}/lists`, { params: { id, lists, token }})
      .then(() => {
        this.props.getAllLists();
        this.props.getAllJobs();
        console.log('list successfully deleted');
      })
      .catch(err => console.log({ 'error deleting list': err }));
  }

  render() {
    const tooltip = <Tooltip id="modal-tooltip">Delete List</Tooltip>;
    let status = '';
    for (let i = 0; i < this.props.lists.length; i++) {
      if (this.props.lists[i].id === this.props.id) {
        status = this.props.lists[i].status;
        break;
      }
    }

    return (
      <div className='deleteListModal'>
        <OverlayTrigger overlay={tooltip}>
          <Button bsSize="small" onClick={() => this.setState({ show: true })}>
            <Glyphicon glyph="trash" />
            <span> Delete List</span>
          </Button>
        </OverlayTrigger>

        <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete the list: {status}</Modal.Title>
          </Modal.Header>
          <Modal.Footer className='delete-modal-button'>
            <Button className='actual-delete-button' onClick={this.handleDeleteList}>DELETE</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddJob;
