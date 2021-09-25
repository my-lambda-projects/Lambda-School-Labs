import React, { Component } from "react";
import axios from "axios";
import striptags from "striptags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  UncontrolledAlert,
  ButtonGroup,
  Col,
  Label,
  Container,
  Input,
  Row,
  Card,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import ContentEditable from "react-contenteditable";
import Analysis from "./Analysis";
import "./email.css";

class NewEmail extends Component {
  crumbs = [{ name: "Home", path: "/" }, { name: "Document" }];
  state = {
    title: "",
    addressee: "",
    versions: [{ text: "", tone_analysis: null }],
    editorText: "",
    selected_version: 1,
    analyzingEmail: false,
    sendingEmail: false,
    savingEmail: false,
    error: false,
    componentState: 0
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.fetchEmail(id);
    }
  }

  fetchEmail = id => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/emails/${id}`, {
        withCredentials: true
      })
      .then(({ data }) => {
        const { email } = data;
        if (email) {
          const state = { ...this.state, ...data.email };

          // Set the latest version as selected
          if (data.email.versions.length) {
            state.selected_version = data.email.versions.length;
          }

          // Update the editor once new state is populated
          this.setState(state, this.processTone);
        }
      });
  };

  previousVersion = () => {
    if (this.state.selected_version > 1) {
      const selected_version = this.state.selected_version - 1;
      this.setState({ selected_version }, this.processTone);
    }
  };

  nextVersion = () => {
    if (this.state.selected_version < this.state.versions.length) {
      const selected_version = this.state.selected_version + 1;
      this.setState({ selected_version }, this.processTone);
    }
  };

  // Return the selected version, or a blank one if none have been made.
  selectedVersion = () => {
    return this.state.versions[this.state.selected_version - 1];
  };

  sendEmail = () => {
    if (
      //check to make sure user meets requirements to svae email
      this.state.title.trim() === "" ||
      this.selectedVersion().text.trim() === "" ||
      this.state.addressee.trim() === ""
    ) {
      this.setState({ componentState: 2 });
    } else {
      if (this.state.sendingEmail === false) {
        //if user is not already sending email
        this.setState({ sendingEmail: true }, () => {
          //then we start sending an email
          axios
            .post(
              process.env.REACT_APP_BACKEND_URL + "/sendemail",
              {
                title: this.state.title,
                text: this.selectedVersion().text,
                addressee: this.state.addressee,
                reqType: "send"
              },
              { withCredentials: true }
            )
            .then(
              res => this.setState({ sendingEmail: false, componentState: 1 }) //on success we set sending email to false and componentstate to 1
            )
            .catch(err => {
              //else we set sendingemail to false and componentstate to an error state
              // eslint-disable-next-line
              err == "Error: Request failed with status code 429"
                ? this.setState({ sendingEmail: false, componentState: 3 })
                : this.setState({ sendingEmail: false, componentState: 4 });
            });
        });
      }
    }
  };

  resetComponentState = () => {
    this.setState({ componentState: 0 });
  };

  // Apply watson analysis to the version's text
  processTone = () => {
    let { text, tone_analysis } = this.selectedVersion();
    if (text) {
      if (tone_analysis && tone_analysis.sentences_tone) {
        const colors = {
          Joy: "success",
          Anger: "danger",
          Fear: "warning",
          Sadness: "info",
          Confident: "success",
          Analytical: "primary",
          Tentative: "warning"
        };
        let editorText = text.replace(/[()]/g, ""); // Removes parentheses from text
        tone_analysis.sentences_tone
          .filter(({ tones }) => tones.length) // Ignore sentences with no tones
          .forEach(({ text: sentence, tones }) => {
            const re = new RegExp(sentence.trim()); // No leading or trailing whitespace in highlights. Replace removes parentheses from sentence
            const tone = tones.sort((a, b) => b.score - a.score)[0]; // Pull the strongest tone from the list
            const color = colors[tone.tone_name];
            editorText = editorText.replace(re, match => {
              return this.tonalSentence(color, match);
            });
          });
        this.setState({ editorText });
      } else {
        this.setState({ editorText: text });
      }
    }
  };

  tonalSentence = (color, text) =>
    `<span class="label-${color} analyzed">${text}</span>`;

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editorInput = e => {
    let editorText = e.target.value;
    let text = striptags(e.target.value);
    const versions = this.state.versions;
    versions[this.state.selected_version - 1].text = text;
    this.setState({ versions, editorText });
  };

  analyzeText = () => {
    if (!this.state.analyzingEmail) {
      //if user is not analyzing email
      this.setState({ analyzingEmail: true }, () => {
        //he now analyzes email
        axios
          .post(
            process.env.REACT_APP_BACKEND_URL + "/api/watson",
            {
              text: this.selectedVersion().text,
              reqType: "analyze"
            },
            { withCredentials: true }
          )
          .then(res => {
            const tone_analysis = res.data;
            let componentState = 0;
            if (tone_analysis.document_tone && !tone_analysis.sentences_tone) {
              componentState = 9;
            }
            const { versions } = this.state;
            versions[this.state.selected_version - 1].tone_analysis = res.data;
            this.setState(
              { versions, error: false, analyzingEmail: false, componentState }, //when done set analyzing email to false
              this.processTone
            );
          })
          .catch(err => this.setState({ error: err, analyzingEmail: false }));
      });
    }
  };

  handleSave = e => {
    e.preventDefault();
    if (
      this.state.title.trim() === "" ||
      this.state.addressee.trim() === "" ||
      this.selectedVersion().text.trim() === ""
    ) {
      //check to see if user email meets requirements to be saved
      this.setState({ componentState: 6 });
    } else {
      if (this.state.savingEmail === false) {
        //if user is not  saving email already
        this.setState({ savingEmail: true }, () => {
          //he is not saaving an email
          const body = {
            email: {
              title: this.state.title,
              addressee: this.state.addressee
            },
            version: this.selectedVersion()
          };

          if (this.props.match.params.id) {
            body.email.id = this.props.match.params.id;
          }

          let headers = {
            withCredentials: true,
            headers: { Authorization: process.env.USER_COOKIE }
          };
          axios
            .post(process.env.REACT_APP_BACKEND_URL + "/emails", body, headers)
            .then(res => {
              if (!this.props.match.params.id) {
                this.props.history.push(`/email/${res.data.id}`);
              } else {
                this.fetchEmail(res.data.id);
              }
              this.setState({ componentState: 5, savingEmail: false });
            })
            .catch(err =>
              this.setState({ componentState: 7, savingEmail: false })
            );
        });
      }
    }
  };

  // Renames button to "save as" when editing a version that is not the latest
  saveButton = () => {
    if (this.state.selected_version === this.state.versions.length) {
      return "Save";
    }
    return "Save as";
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  navigationButtons = () => (
    <ButtonGroup>
      <Button color="danger" onClick={this.previousVersion}>
        <FontAwesomeIcon icon="arrow-left" className="fa-lg version-icon" />
      </Button>
      <Button color="danger" disabled>
        {this.state.selected_version} / {this.state.versions.length}
      </Button>
      <Button color="danger" onClick={this.nextVersion}>
        <FontAwesomeIcon icon="arrow-right" className="fa-lg version-icon" />
      </Button>
    </ButtonGroup>
  );

  actionButtons = () => (
    <ButtonGroup>
      <Button onClick={this.analyzeText}>Analyze</Button>
      <Button onClick={this.handleSave}>{this.saveButton()}</Button>
      <Button onClick={this.sendEmail}>Send</Button>
    </ButtonGroup>
  );

  toneAlert = () => {
    if (this.state.componentState === 9) {
      return (
        <UncontrolledAlert
          color="info"
          onClick={this.resetComponentState}
          className="mt-2"
        >
          Document is too short for sentence-level analysis.
        </UncontrolledAlert>
      );
    }
    return null;
  };
  sendEmailAlert = () => {
    if (this.state.componentState >= 1 && this.state.componentState <= 4) {
      let response;
      if (this.state.componentState === 1) {
        response = "Email sent.";
      } else if (this.state.componentState === 2) {
        response = "To send an email you need a title, addressee, and message.";
      } else if (this.state.componentState === 3) {
        response = "Free users cannot send emails.";
      } else {
        response = "Something went wrong while trying to send email.";
      }
      return (
        <UncontrolledAlert
          color={this.state.componentState === 1 ? "success" : "danger"}
          onClick={() => this.resetComponentState()}
          className="mt-2"
        >
          {response}
        </UncontrolledAlert>
      );
    }
    return null;
  };
  saveEmailAlert = () => {
    if (this.state.componentState >= 5 && this.state.componentState <= 7) {
      let response;
      if (this.state.componentState === 5) {
        response = "Saved email.";
      } else if (this.state.componentState === 6) {
        response =
          "To save an email, one must include a title, addressee, and message.";
      } else {
        response = "Something went wrong trying to save email.";
      }
      return (
        <UncontrolledAlert
          color={this.state.componentState === 5 ? "success" : "danger"}
          onClick={() => this.resetComponentState()}
          className="mt-2"
        >
          {response}
        </UncontrolledAlert>
      );
    }
    return null;
  };
  render() {
    return (
      <Container className="mt-3">
        {this.sendEmailAlert()}
        {this.saveEmailAlert()}
        {this.toneAlert()}
        <Row className="top-row">
          <Col md={12} lg={{ order: 0, size: 8 }} className="fields">
            <InputGroup className="email-fields">
              <InputGroupAddon
                addonType="prepend"
                className="input-group-addon"
              >
                <i className="nc-icon nc-caps-small" />
              </InputGroupAddon>
              <Input
                name="title"
                value={this.state.title}
                onChange={this.handleInput}
                spellCheck="false"
                placeholder="Title"
              />
            </InputGroup>
            <InputGroup className="email-fields">
              <InputGroupAddon
                addonType="prepend"
                className="input-group-addon"
              >
                <i className="nc-icon nc-email-85" />
              </InputGroupAddon>
              <Input
                name="addressee"
                value={this.state.addressee}
                onChange={this.handleInput}
                spellCheck="false"
                placeholder="Addressee"
              />
            </InputGroup>
          </Col>
          <Col md={12} lg={{ size: 4 }}>
            <Card className="no-transition emailCard" body>
              <ButtonGroup vertical>
                {this.navigationButtons()}
                {this.actionButtons()}
              </ButtonGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={{ order: 2 }} lg={{ order: 0, size: 8 }}>
            <Label>Message</Label>
            <ContentEditable
              html={this.state.editorText}
              onChange={this.editorInput}
              className="form-control"
              style={{ height: "auto", minHeight: "150px" }}
            />
          </Col>
          <Col xs={{ order: 1 }} lg={{ size: 4 }} className="analysis">
            <Analysis
              error={this.state.error}
              toneAnalysis={this.selectedVersion().tone_analysis}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NewEmail;
