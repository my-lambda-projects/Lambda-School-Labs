import React from 'react';
import axios from 'axios';
import Dialog from 'react-bootstrap-dialog';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Grid,
  Row,
  Col,
  PageHeader,
  Collapse,
  Well,
} from 'react-bootstrap';
import { Header } from '../components/AllComponents';
import ROOT_URL from './config';

class Settings extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      oldEmail: '',
      newEmail: '',
      oldPassword: '',
      newPassword: '',
      resumeOpen: false,
      changePassword: false,
      changeEmail: false,
      currentPassword: 'password',
      currentEmail: 'email@example.com',
      selectedFile: '',
      resumeTitle: '',
      resumeUrl: '',
      userdocument: 'resume',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.getResume();
    }
  }

  getResume = () => {
    const token = localStorage.getItem('token');
    const { userdocument } = this.state;
    axios
      .get(`${ROOT_URL}/files`, {
        headers: {
          token,
          userdocument,
        },
      })
      .then(response => {
        const { title, url } = response.data;
        this.setState({
          resumeTitle: title,
          resumeUrl: url,
        });
      })
      .catch(err => {});
  };

  validateLength() {
    const { length } = this.state.newPassword;
    if (length > 9) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  validateMatchingPassword(password) {
    if (password === this.state.currentPassword) return 'success';
    return 'warning';
  }

  validateMatchingEmail(email) {
    if (email === this.state.currentEmail) return 'success';
    return 'warning';
  }

  handleEmailSubmit = e => {
    e.preventDefault();
    let body = { ...this.state };
    let token = localStorage.getItem('token');
    axios
      .put(`${ROOT_URL}/changeemail`, {
        oldEmail: body.oldEmail,
        newEmail: body.newEmail,
        token,
      })
      .then(result => {
        localStorage.setItem('token', result.data.token);
        this.dialog.showAlert(`${result.data.msg}`);
      })
      .catch(err => {
        this.dialog.showAlert(`${err.response.data.msg}`);
      });
  };

  handlePasswordSubmit = e => {
    e.preventDefault();
    const body = { ...this.state };
    const token = localStorage.getItem('token');
    axios
      .put(`${ROOT_URL}/changepassword`, {
        oldPassword: body.oldPassword,
        newPassword: body.newPassword,
        token,
      })
      .then(result => {
        this.dialog.showAlert('Your new password has been saved');
      })
      .catch(() => {
        this.dialog.showAlert('Error changing password');
      });
  };

  handleFileUpload = e => {
    switch (e.target.name) {
      case 'selectedFile':
        this.setState({ selectedFile: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleFileSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const { userdocument } = this.state;
    const config = {
      headers: {
        token,
        userdocument,
      },
    };
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    data.append('name', this.state.selectedFile.name);
    axios
      .post(`${ROOT_URL}/files`, data, config)
      .then(() => {
        this.getResume();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="settingsWrapper">
        <Dialog
          ref={el => {
            this.dialog = el;
          }}
        />
        <Header />
        <Grid>
          <Row>
            <PageHeader>Settings</PageHeader>
            <Col xs={8} md={4}>
              <Button onClick={() => this.setState({ changeEmail: !this.state.changeEmail })}>
                Change Email
              </Button>
              <Collapse in={this.state.changeEmail}>
                <div>
                  <Well>
                    <form>
                      <FormGroup
                        controlId="formControlsOldEmail"
                        validationState={this.validateMatchingEmail(this.state.oldEmail)}
                      >
                        <ControlLabel>Email Address</ControlLabel>
                        <FormControl
                          type="email"
                          value={this.state.oldEmail}
                          placeholder="Enter email"
                          onChange={e => this.setState({ oldEmail: e.target.value })}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Must match current email address on file.</HelpBlock>
                      </FormGroup>
                      <FormGroup controlId="formControlsEmail">
                        <ControlLabel>Email Address</ControlLabel>
                        <FormControl
                          type="email"
                          value={this.state.newEmail}
                          placeholder="Enter email"
                          onChange={e => this.setState({ newEmail: e.target.value })}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Must use a valid email address.</HelpBlock>
                      </FormGroup>
                      <Button onClick={e => this.handleEmailSubmit(e)}>Save</Button>
                    </form>
                  </Well>
                </div>
              </Collapse>
            </Col>
          </Row>
        </Grid>
        <hr width="85%" />
        <Grid>
          <Row>
            <Col xs={8} md={4}>
              <Button onClick={() => this.setState({ changePassword: !this.state.changePassword })}>
                Change Password
              </Button>
              <Collapse in={this.state.changePassword}>
                <div>
                  <Well>
                    <form>
                      <FormGroup
                        controlId="formControlsOldPassword"
                        validationState={this.validateMatchingPassword(this.state.oldPassword)}
                      >
                        <ControlLabel>Old Password</ControlLabel>
                        <FormControl
                          type="password"
                          value={this.state.oldPassword}
                          placeholder="Enter old password"
                          onChange={e => this.setState({ oldPassword: e.target.value })}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Password must match existing password.</HelpBlock>
                      </FormGroup>
                      <FormGroup
                        controlId="formControlsNewPassword"
                        validationState={this.validateLength()}
                      >
                        <ControlLabel>New Password</ControlLabel>
                        <FormControl
                          type="password"
                          value={this.state.newPassword}
                          placeholder="Enter new password"
                          onChange={e => this.setState({ newPassword: e.target.value })}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Password must be at least 10 characters long.</HelpBlock>
                      </FormGroup>
                      <Button onClick={e => this.handlePasswordSubmit(e)}> Save</Button>
                    </form>
                  </Well>
                </div>
              </Collapse>
            </Col>
          </Row>
        </Grid>
        <hr width="85%" />
        <Grid>
          <Row>
            <Col xs={8} md={4}>
              {this.state.resumeTitle ? (
                <div className="resume--btn">
                  <a href={this.state.resumeUrl} target="_blank">
                    <Button>
                      view resume <br />
                      {/* using substr(36) to hide the uuid on the actual filename for 
                    display */}
                      {this.state.resumeTitle.substr(36)}
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="resume--txt">upload a resume</div>
              )}
              {this.state.resumeTitle ? (
                <Button onClick={() => this.setState({ resumeOpen: !this.state.resumeOpen })}>
                  Update Resume
                </Button>
              ) : (
                <Button onClick={() => this.setState({ resumeOpen: !this.state.resumeOpen })}>
                  Add Resume
                </Button>
              )}
              <Collapse in={this.state.resumeOpen}>
                <div>
                  <Well>
                    <form onSubmit={this.handleFileSubmit}>
                      <FormGroup>
                        <ControlLabel>Upload a copy of your Resume</ControlLabel>
                        <FormControl
                          id="resumeUpload"
                          type="file"
                          accept=".pdf"
                          name="selectedFile"
                          onChange={this.handleFileUpload}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Submit a .pdf file</HelpBlock>
                      </FormGroup>
                      <Button type="submit">Submit</Button>
                    </form>
                  </Well>
                </div>
              </Collapse>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Settings;
