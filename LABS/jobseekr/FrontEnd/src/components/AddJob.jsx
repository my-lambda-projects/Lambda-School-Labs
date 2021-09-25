import React, { Component } from 'react';
import axios from 'axios';
import shortid from 'shortid';
import { 
  ToggleButtonGroup, 
  DropdownButton,
  Button, 
  Modal, 
  OverlayTrigger, 
  Radio, 
  MenuItem, 
  Glyphicon, 
  Tooltip, 
  FormControl,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';
import ROOT_URL from '../routes/config';

class AddJob extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      timelineSelection: this.props.currentStatus,
      notes: '',
      companyName: '',
      position: '',
      jobPostingLink: '',
      pointOfContactName: '',
      contactInfo: '',
      sourceOfJob: ['Met in Person', 'Referral', 'Applied Online'],
      sourceSelection: 'Source of Job',
      rejectionFile: '',
      rejectionUrl: '',
      offerFile: '',
      offerUrl: '',
      currentJobId: '',
    };
  }

  handleFileUpload = (e) => {
    const newStatus = e.target.name === 'offerFile' ? 'Offer' : 'Rejected'
    this.setState({ [e.target.name] : e.target.files[0] });
    this.setState({ timelineSelection: newStatus })
  }
  
  handleFileSubmit = jobdocument => {
    const fileName = jobdocument === 'offerUrl' ? 'offerFile' : 'rejectionFile';
    const { currentJobId } = this.state;
    const config = {
      headers: {
        currentJobId,
        jobdocument
      }
    }
    const data = new FormData();
    data.append('file', this.state[fileName]);
    data.append('name', this.state[fileName].name);
    axios.post(`${ROOT_URL}/jobfiles`, data, config)
      .then(() => this.props.getAllJobs())
      .catch(err => console.log(err));
  }

  handleAddJob = e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const body = this.state;
    axios
      .post(`${ROOT_URL}/jobs`, {
        status: body.timelineSelection,
        gotRejected: body.gotRejected,
        gotOffer: body.gotOffer,
        notes: body.notes,
        companyName: body.companyName,
        position: body.position,
        jobPostingLink: body.jobPostingLink,
        pointOfContactName: body.pointOfContactName,
        contactInfo: body.contactInfo,
        sourceOfJob: body.sourceSelection,
        rejectionFile: body.rejectionFile,
        rejectionUrl: body.rejectionUrl,
        offerFile: body.offerFile,
        offerUrl: body.offerUrl,
        token
      })
      .then(job => {
        console.log('job in handleAddJob is', job);
        this.setState({ currentJobId : job.data._id })
      })
      .then(() => { if (this.state.rejectionFile) this.handleFileSubmit('rejectionUrl'); })
      .then(() => { if (this.state.offerFile) this.handleFileSubmit('offerUrl'); })
      .then(() => this.setState({ show: false }))
      .then(() => this.props.getAllJobs())
      .catch(err => console.log({ error: err}));
  };

  handleTimelineRadioClick = (selection) => {
    this.setState({ timelineSelection: selection });
  }

  handleCheckbox = (e) => {
    const toBeChanged = e.target.value;
    this.setState({ [toBeChanged] : !this.state[toBeChanged] })
  }

  handleChange = (e) => {
    const change = e.target.value;
    this.setState({ [e.target.id] : change });
  }

  handleSourceClick = (key, e) => {
    this.setState({ sourceSelection: key });
  }
  
  render() {
    const tooltip = <Tooltip id="modal-tooltip">Add a Job.</Tooltip>;
    const statuses = [];
    this.props.lists.forEach(list => statuses.push(list.status));

    return (
      <div className='addJobModal'>
        <OverlayTrigger overlay={tooltip}>
          <Button className='addJobButton' bsStyle="primary" bsSize="large" onClick={() => this.setState({ show: true })}>
            <div className="list__btn">
              Add a Job <Glyphicon glyph="">+</Glyphicon>
            </div>
          </Button>
        </OverlayTrigger>

        <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Job Timeline</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <div className="top-section-job-modal">
                <div className="top-left-section">
                  <ToggleButtonGroup 
                    type="radio" 
                    name="timeline" 
                    value={[this.state.timelineSelection]} 
                    onChange={this.handleTimelineRadioClick}
                  >
                    {statuses.slice(0, Math.ceil(statuses.length / 2)).map(e => {
                      return <Radio key={shortid.generate()} value={e}>{e}</Radio>
                    })}
                  </ToggleButtonGroup>
                </div>
                <div className="top-middle-section">
                  <ToggleButtonGroup 
                    type="radio" 
                    name="timeline" 
                    value={[this.state.timelineSelection]} 
                    onChange={this.handleTimelineRadioClick}
                  >
                    {statuses.slice(Math.ceil(statuses.length / 2)).map(e => {
                      return <Radio key={shortid.generate()} value={e}>{e}</Radio>
                    })}
                  </ToggleButtonGroup>
                </div>
                <div className="top-right-section">
                  {this.state.rejectionUrl ? 
                    <a href={this.state.rejectionUrl} target="_blank">
                      <Button>
                        View Rejection Letter
                      </Button>
                    </a> :
                    <FormGroup>
                      <ControlLabel>Upload a Rejection Letter</ControlLabel>
                      <FormControl
                        type="file"
                        name="rejectionFile"
                        onChange={this.handleFileUpload}
                      />
                    </FormGroup>
                  }
                  {this.state.offerUrl ? 
                    <a href={this.state.offerUrl} target="_blank">
                      <Button>
                        View Offer Letter
                      </Button>
                    </a> :
                    <FormGroup>
                      <ControlLabel>Upload a Offer Letter</ControlLabel>
                      <FormControl
                        type="file"
                        name="offerFile"
                        onChange={this.handleFileUpload}
                      />
                    </FormGroup>
                  }
                </div>
              </div>
              <FormControl 
                componentClass="textarea" 
                value={this.state.notes} 
                placeholder="Notes"
                id='notes'
                onChange={this.handleChange}
              />
            </Modal.Body>
            <Modal.Header closeButton>
              <Modal.Title>Job Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="bottom-section-job-modal">
                <div className="bottom-left-section">
                  <FormControl 
                    type="text" 
                    placeholder="Company Name" 
                    id='companyName'
                    onChange={this.handleChange}
                  />
                  <FormControl 
                    type="text" 
                    placeholder="Point of Contact Name" 
                    id='pointOfContactName'
                    onChange={this.handleChange}
                  />
                  <FormControl 
                    type="text" 
                    placeholder="Contact Info"
                    id='contactInfo'
                    onChange={this.handleChange}
                  />
                </div>
                <div className="bottom-right-section">
                  <FormControl 
                    type="text" 
                    placeholder="Position Applied For" 
                    id='position'
                    onChange={this.handleChange}
                  />
                  <DropdownButton title={this.state.sourceSelection} id='source-of-job-dropdown'>
                    {this.state.sourceOfJob.map(e => {
                      return <MenuItem key={shortid.generate()} eventKey={e} onSelect={this.handleSourceClick}>{e}</MenuItem>
                    })}
                  </DropdownButton>
                  <FormControl 
                    type="text" 
                    placeholder="Link to Job Posting" 
                    id='jobPostingLink'
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </Modal.Body>
          </form>
          <Modal.Footer>
            <Button onClick={this.handleAddJob}>Add Job</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddJob;
