import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import config from '../../config/config';

import './jobeditmodal.css';

Modal.setAppElement(document.getElementById('root'));

const defaultState = {
  modalIsOpen: false,
  company: "",
  position: "",
  submitted: false,
  onsiteInterview: false,
  receivedResponse: false,
  whiteboard: false,
  phoneInterview: false,
  codeTest: false,
  open: true,
  category: 'wishlist',
  notes: "",
  jobSource: "",
  linkToJobPost: "",
  pointOfContact: "",
  resumes: [],
  resume: ""
};

class Jobeditmodal extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openModal(jobInfo) {
    this.setState({ modalIsOpen: true, ...jobInfo });

    axios.get(`${config.serverUrl}/user/getResumes`)
    .then(resumes => {
      console.log(resumes);
      const temp = [];
      resumes.data.forEach(resume => {
        temp.push(resume.name);
      });
      this.setState({ resumes: temp });
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

  updateLists() {
    const newLists = {};
    axios
    .get(`${config.serverUrl}/user/applications/`)
    .then(response => {
      //response is updated list of applications. They need sorted into lists and returned.
      const updatedApplications = response.data;

      const listCategories = ['wishlist', 'applied', 'phone', 'on site', 'offer', 'rejected'];
      listCategories.forEach(category => {
        if (!newLists[category])
          newLists[category] = [];
      });

      updatedApplications.forEach(job => {
        newLists[job.category].push(job);
      });


      this.props.handleJobChange(newLists);
    })
    .catch(error => {
      console.log(error);
      document.getElementById("jobEditWarning").innerHTML = error.response.data.error;
    });

    //return newLists;
    // This will have to be reworked to handle user entered lists
    // if (newApplication.category === 'wishlist')
    //   lists["wishlist"].push(newApplication);
    // else if (newApplication.category === 'onSiteInterview')
    //   lists["on site"].push(newApplication);
    // else if (newApplication.category === 'phoneInterview')
    //   lists["phone"].push(newApplication);
    // else if (newApplication.category === 'submitted')
    //   lists["applied"].push(newApplication);
    // return lists;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.position === "" || this.state.company === "") {
      document.getElementById("jobEditWarning").innerHTML = "Company name and position are required fields";
      return;
    }
    const {
      company,
      position,
      submitted,
      onsiteInterview,
      receivedResponse,
      whiteboard,
      phoneInterview,
      codeTest,
      rejection,
      offer,
      open,
      notes,
      jobSource,
      linkToJobPost,
      pointOfContact,
      resume
    } = this.state;
    //const onsiteInterview = this.state.onSiteInterview;

    // set status based on checkboxes
    let category = this.state.category;
    if (rejection)
      category = 'rejected';
    else if (offer)
      category = 'offer';
    else if (onsiteInterview)
      category = 'on site';
    else if (phoneInterview)
      category = 'phone';
    else if (submitted)
      category = 'applied';
    else
      category = 'wishlist';

    const temp = {
      company,
      position,
      submitted,
      onsiteInterview,
      receivedResponse,
      whiteboard,
      phoneInterview,
      codeTest,
      rejection,
      offer,
      open,
      category,
      notes,
      jobSource,
      linkToJobPost,
      pointOfContact,
      resume
    }
    axios
    .put(`${config.serverUrl}/user/applications/update/${this.state._id}`, temp)
    .then(response => {
      this.updateLists();
      this.closeModal();

    })
    .catch(error => {
      console.log(error);
    });
   }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          overlayClassName="Overlay"
          className="jobeditmodal"
        >
          <div className="Jobtimeline">
            <h2>Job Timeline</h2>

            <div className="Checkboxes">
              <form className="form">
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
                  name="onsiteInterview"
                  checked={this.state.onsiteInterview}
                  onChange={this.handleChange} />
                  On-Site Interview
                </label>
                <br />
                <label>
                  <input
                  type="checkbox"
                  name="receivedResponse"
                  checked={this.state.receivedResponse}
                  onChange={this.handleChange}/>
                  Received Response
                </label>
                <label>
                  <input
                  type="checkbox"
                  name="whiteboard"
                  checked={this.state.whiteboard}
                  onChange={this.handleChange}/>
                  Whiteboarding
                </label>
                <br />
                <label>
                  <input
                  type="checkbox"
                  name="phoneInterview"
                  checked={this.state.phoneInterview}
                  onChange={this.handleChange}/>
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
                <br />
                <input
                placeholder="Notes"
                name="notes"
                value={this.state.notes}
                onChange={this.handleChange} />
                </form>
            </div>
          </div>

          <div className="Jobinformation">
            <h2>Job Information</h2>
            <input
            placeholder="Company"
            name="company"
            value={this.state.company}
            onChange={this.handleChange}/>
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
            {/* <input
            placeholder="Upload resume/CV"
             /> */}
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
            onChange={this.handleChange} />
            <button onClick={this.handleSubmit}>
              Update Application Info
            </button>
            <div id="jobEditWarning"></div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Jobeditmodal;
