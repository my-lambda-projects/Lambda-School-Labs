import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class BaseModal extends Component {
  render() {
    let { userData } = this.props.matchData;
    let userElement;
    if (userData) {
      userElement = userData["employer"] ? (
        <ul>
          <li>Job Title: {userData.title}</li>
          <li>
            salary Range: {userData.salary_max} - {userData.salary_min}
          </li>
          <li>Job description: {userData.description}</li>
          <li>Job requirements: {userData.requirements}</li>
          <li>
            Job employer name: {userData.employer.first_name} -{" "}
            {userData.employer.last_name}
          </li>
          <li>employer-email: {userData.employer.email}</li>
          <li>employer summary: {userData.employer.summary}</li>
          <li>company name: {userData.employer.company_name}</li>
        </ul>
      ) : (
        <ul>
          <li>email: {userData.email}</li>
          <li>summary: {userData.summary}</li>
          <li>Desired_title: {userData.desired_title}</li>
          <li>Top_skills {userData.top_skills}</li>
          <li>Extra_skills: {userData.extra_skills}</li>
          <li>Other_skills: {userData.other_skills}</li>
        </ul>
      );
    } else {
      userElement = <p>waiting</p>;
    }

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggleJobModal}
        className="modal-lg"
      >
        {" "}
        {userData && (
          <React.Fragment>
            <ModalHeader toggle={this.props.toggleJobModal}>
              <img src={userData.photo} alt="" />
              {userData.first_name} {userData.last_name}
            </ModalHeader>
            <ModalBody>{userElement}</ModalBody>

            <ModalFooter>
              <Button color="secondary" onClick={this.props.toggleJobModal}>
                Cancel
              </Button>
            </ModalFooter>
          </React.Fragment>
        )}
      </Modal>
    );
  }
}

export default BaseModal;

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  matchData: PropTypes.shape({
    userData: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      employer: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        summary: PropTypes.string,
        photo: PropTypes.string,
        email: PropTypes.string,
        company: PropTypes.string
      })
    })
  })
};
BaseModal.defaultProps = {
  isOpen: false,
  toggle: () => {
    console.log("toggle modal");
  },
  matchData: {
    userData: {
      first_name: "fetching name",
      summary: "fetching summary",
      photo: "https://www.drupal.org/files/issues/default-avatar.png",
      employer: {
        first_name: "fetching name",
        last_name: "fetching last_name",
        summary: "fetching summary",
        photo: "https://www.drupal.org/files/issues/default-avatar.png",
        email: "default@employer.com",
        company: "default company"
      }
    }
  }
};
