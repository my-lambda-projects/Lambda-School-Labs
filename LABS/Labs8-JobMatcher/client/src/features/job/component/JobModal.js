import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import JobForm from "./JobForm";

class JobModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggleJobModal}
        className="modal-lg"
      >
        <ModalHeader toggle={this.props.toggleJobModal}>
          Add / Edit Job
        </ModalHeader>

        <ModalBody>
          {this.props.jobData ? (
            <JobForm
              jobData={this.props.jobData}
              onFormChange={this.props.onFormChange}
            />
          ) : (
            <JobForm onFormChange={this.props.onFormChange} />
          )}
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggleJobModal}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={
              this.props.jobData
                ? this.props.editJobHandler
                : this.props.createJobHandler
            }
          >
            Save
          </Button>
          {this.props.jobData ? (
            <Button color="danger" onClick={this.props.deleteJobHandler}>
              Delete
            </Button>
          ) : (
            ""
          )}
        </ModalFooter>
      </Modal>
    );
  }
}

export default JobModal;
