import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import config from '../../config/config';

import './jobdeletemodal.css';

Modal.setAppElement(document.getElementById('root'));

class Jobdeletemodal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsopen: false,
      jobId: ''
    };
  }

  openModal = jobId => {
    this.setState({ modalIsOpen: true, jobId });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  updateLists() {
    const newLists = {};
    axios
      .get(`${config.serverUrl}/user/applications/`)
      .then(response => {
        //response is updated list of applications. They need sorted into lists and returned.
        const updatedApplications = response.data;

        const listCategories = [
          'wishlist',
          'applied',
          'phone',
          'on site',
          'offer',
          'rejected'
        ];
        listCategories.forEach(category => {
          if (!newLists[category]) newLists[category] = [];
        });

        updatedApplications.forEach(job => {
          newLists[job.category].push(job);
        });

        this.props.handleJobChange(newLists);
      })
      .catch(error => {
        console.log(error);
        document.getElementById('jobEditWarning').innerHTML =
          error.response.data.error;
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.jobId);
    axios
      .delete(
        `${config.serverUrl}/user/applications/delete/${this.state.jobId}`
      )
      .then(response => {
        this.updateLists();
        this.closeModal();
      })
      .catch(error => {
        console.log(error.response.data.error);
      });
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          overlayClassName="Overlay"
          className="jobDeleteModal"
        >
          <h1>Are you sure you want to delete this application?</h1>
          <div className="buttonContainer">
            <button onClick={this.handleSubmit} className="deleteButton">
              Yes
              </button>
              <button onClick={this.closeModal} className="deleteButton">
              No
              </button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Jobdeletemodal;
