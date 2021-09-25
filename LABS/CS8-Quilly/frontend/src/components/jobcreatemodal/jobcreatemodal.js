import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import config from '../../config/config';

import './jobcreatemodal.css';

Modal.setAppElement(document.getElementById('root'));

const defaultState = {
  modalIsOpen: false,
  company: "",
  position: "",
  submitted: false,
  onSiteInterview: false,
  recievedResponse: false,
  whiteboard: false,
  phoneInterview: false,
  codeTest: false,
  open: true,
  category: 'wishlist',
  notes: "",
  jobSource: "",
  linkToJobPost: "",
  pointOfContact: "",
  availableResumes: ["Non available"],
  resume: "",
  resumes: []
};

class Jobcreatemodal extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFocus = this.setFocus.bind(this);
  }

  setFocus() {
    document.getElementById('companyName').focus();
  }

  openModal() {
    if (this.state.modalIsOpen === true) {
      this.closeModal();
    } else {
      this.setState({ modalIsOpen: true });
      setTimeout(() => this.setFocus(), 100);
    }

    axios.get(`${config.serverUrl}/user/getResumes`)
    .then(resumes => {
      console.log(resumes);
      const temp = [];
      resumes.data.forEach(resume => {
        temp.push(resume.name);
      });
      this.setState({ resumes: temp });
      console.log(this.state.resumes);
    })
    .catch(error => {
      console.log(error);
    });
  }

  closeModal() {
    this.setState(defaultState);
  }

  handleChange(event) {
    const { name } = event.target;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    this.setState({
      [name]: value
    });
  }

  addToLists(newApplication) {
    let lists = this.props.jobs;

    // This will have to be reworked to handle user entered lists
    if (newApplication.category === 'wishlist')
      lists["wishlist"].push(newApplication);
    else if (newApplication.category === 'on site')
      lists["on site"].push(newApplication);
    else if (newApplication.category === 'phone')
      lists["phone"].push(newApplication);
    else if (newApplication.category === 'applied')
      lists["applied"].push(newApplication);
    return lists;
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.position === "" || this.state.company === "") {
      document.getElementById("jobCreateWarning").innerHTML = "Company name and position are required fields";
      return;
    }
    const {
      company,
      position,
      submitted,
      onSiteInterview,
      recievedResponse,
      whiteboard,
      phoneInterview,
      codeTest,
      open,
      notes,
      jobSource,
      linkToJobPost,
      pointOfContact,
      resume
    } = this.state;
    const onsiteInterview = this.state.onSiteInterview;

    // set status based on checkboxes
    let category = this.state.category;
    if (onSiteInterview)
      category = 'on site';
    else if (phoneInterview)
      category = 'phone';
    else if (submitted)
      category = 'applied';

    const temp = {
      company,
      position,
      submitted,
      onsiteInterview,
      recievedResponse,
      whiteboard,
      phoneInterview,
      codeTest,
      open,
      category,
      notes,
      jobSource,
      linkToJobPost,
      pointOfContact,
      resume
    }
    axios
    .post(`${config.serverUrl}/user/applications/add`, temp)
    .then(response => {
      const newLists = this.addToLists(response.data.applications.slice(-1)[0]);
      this.props.handleJobChange(newLists);
      this.closeModal();

    })
    .catch(error => {
      document.getElementById("jobCreateWarning").innerHTML = error.response.data.error;
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <button className="openModal" onClick={this.openModal}>
          Add Job &#10010;
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          overlayClassName="Overlay"
          className="hello"
        >
          <div className="Jobtimeline">
            <h2>Job Timeline</h2>
              <form className="form">
                <div className="checkboxes">
                <div className="firstGroupOfBoxes">
                <label>
                  <input
                  type="checkbox"
                  name="submitted"
                  checked={this.state.submitted}
                  onChange={this.handleChange} />
                  Submitted Job Application
                </label>
                <label>
                  <input
                  type="checkbox"
                  name="onSiteInterview"
                  checked={this.state.onSiteInterview}
                  onChange={this.handleChange} />
                  On-Site Interview
                </label>
                <br />
                <label>
                  <input
                  type="checkbox"
                  name="recievedResponse"
                  checked={this.state.recievedResponse}
                  onChange={this.handleChange} />
                  Received Response
                </label>
                </div>
                <div className="secondGroupOfBoxes">
                <label>
                  <input
                  type="checkbox"
                  name="whiteboard"
                  checked={this.state.whiteboard}
                  onChange={this.handleChange} />
                  Whiteboarding
                </label>
                <br />
                <label>
                  <input
                  type="checkbox"
                  name="phoneInterview"
                  checked={this.state.phoneInterview}
                  onChange={this.handleChange} />
                  Phone Interview
                </label>
                <label>
                  <input
                  type="checkbox"
                  name="codeTest"
                  checked={this.state.codeTest}
                  onChange={this.handleChange} />
                  Code Test
                </label>
                </div>
                </div>
                <input
                className="Notes"
                placeholder="Notes"
                name="notes"
                value={this.state.notes}
                onChange={this.handleChange} />
              </form>
          </div>
          <div className="Jobinformation">
            <h2>Job Information</h2>
            <div className="inputContainer">
            <div className="infoContainer">
            <input
            id="companyName"
            placeholder="Company"
            name="company"
            value={this.state.company}
            onChange={this.handleChange}
            required="true"/>
            <select name="jobSource" value={this.state.jobSource} onChange={this.handleChange}>
              <option value="">Source of Job</option>
              <option value="Job Board">Job Board</option>
              <option value="Linked In">Linked In</option>
              <option value="Friend">Friend</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Meetup">Meetup</option>
            </select>
            <br />
            <input
            placeholder="Link to Job Posting"
            name="linkToJobPost"
            value={this.state.link}
            onChange={this.handleChange} />
            <select name="open" value={this.state.open} onChange={this.handleChange}>
              <option value={true}>Open</option>
              <option value={false}>Closed</option>
            </select>
            <br />
            <input
            placeholder="Point of Contact"
            name="pointOfContact"
            value={this.state.pointOfContact}
            onChange={this.handleChange} />
            <select name="resume" value={this.state.resume} onChange={this.handleChange}>
              <option value="Resume">Resume</option>
              {this.state.resumes.map(resume => {
                return (<option value={resume}>{resume}</option>)
              })
              }
            </select>
            <br/>
            <input
            placeholder="Position"
            name="position"
            value={this.state.position}
            onChange={this.handleChange}
            required="true"/>
            </div>
            <button onClick={this.handleSubmit} className="addJob">
              Add Job
            </button>
            <div id="jobCreateWarning"></div>
            </div>
          </div>
          <button className="openModal" onClick={this.openModal}>
            Add Job &#10010;
          </button>
        </Modal>
      </div>
    );
  }
}

export default Jobcreatemodal;
