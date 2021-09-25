import React, { Component } from "react";
import {
  Card,
  CardBody,
  Button,
  Col,
  Input,
  Row,
  Progress,
  Label,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import "./letterControl.css";
import axios from "axios";
import { Link } from "react-router-dom";

class LetterControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versions: [{ content: "Content..." }],
      name: "Name",
      email:"",
      content: "",
      versionsCounter: 0,
      anger: 0,
      sadness: 0,
      joy: 0,
      analytical: 0,
      angerModal: 0,
      sadnessModal: 0,
      joyModal: 0,
      analyticalModal: 0,
      sentence: [],
      id: "",
      email: "",
      modal: false,
      modalTwo: false,
      modalThree: false,
      modalFour: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleModalTwo = this.toggleModalTwo.bind(this);
    this.toggleThree = this.toggleThree.bind(this);
    this.toggleFour = this.toggleFour.bind(this);
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    if (id !== "add") {
      this.setletter(id);
    }
  }
  
  // Toggles for modals
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  toggleModalTwo() {
    this.setState({
      modalTwo: !this.state.modalTwo
    });
  }
  toggleThree() {
    this.setState({
      modalThree: !this.state.modalThree
    });
  }
  toggleFour() {
    this.setState({
      modalFour: !this.state.modalFour
    });
  }

  // Fetches letter based on id, sets content to newest letter version
  setletter(id) {
    axios
      .get(`https://dontemail.herokuapp.com/letters/${id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(resp => {
        this.setState({
          versions: resp.data.versions,
          name: resp.data.name,
          email:resp.data.name,
          id: id,
          content: resp.data.versions[resp.data.versions.length - 1].content
        });
        this.versionsCounter();
      })
      .catch(err => {});
  }

  // allow user to create new letter
  createLetter() {
    let letter = {};
    if (this.state.name !== "Name") {
      letter.name = this.state.name;
    }
    if (this.state.content !== "") {
      letter.content = this.state.content;
    }
    axios
      .post("https://dontemail.herokuapp.com/letters", letter, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(resp => {
        this.props.history.push(`/dashboard/create/${resp.data._id}`);
        this.setletter(resp.data._id);
      });
  }

  // Call Watson API; passing in the text & the auth username/pw
  watson() {
    const text = {
      text: this.state.versions[this.state.versionsCounter].content
    };
    axios
      .post(
        "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21",
        text,
        {
          auth: {
            username: process.env.REACT_APP_watsonUSERNAME,
            password: process.env.REACT_APP_watsonPassword
          }
        }
      )
      .then(resp => {
        let sadness = 0;
        let anger = 0;
        let joy = 0;
        let analytical = 0;
        // For each tone in document tone off of the response data
        // pull values from the score setting it onto declared variables above
        resp.data.document_tone.tones.forEach(tone => {
          if (tone.tone_id === "sadness") {
            sadness += Math.floor(tone.score * 100);
          } else if (tone.tone_id === "anger") {
            anger += Math.floor(tone.score * 100);
          } else if (tone.tone_id === "analytical") {
            analytical += Math.floor(tone.score * 100);
          } else if (tone.tone_id === "joy") {
            joy += Math.floor(tone.score * 100);
          }
        });

        // If response returns a sentence tone, set sentence tone 
        // to sentence on state
        if (resp.data.sentences_tone !== undefined) {
          this.setState({
            sentence: resp.data.sentences_tone
          });
        }
        this.setState({
          sadness,
          anger,
          joy,
          analytical
        });

        let sadnessModal = 0;
        let angerModal = 0;
        let joyModal = 0;
        let analyticalModal = 0;

        // Same concept as above for doc tones, but divided by sentence length
        // results will show in our advanced analytics modal
        this.state.sentence.forEach(sentence => {
          let biggestObj = this.setupScore(sentence.tones);
          if (biggestObj.tone_id === "sadness") {
            sadnessModal +=
              Math.floor(biggestObj.score * 100) / this.state.sentence.length;
          } else if (biggestObj.tone_id === "anger") {
            angerModal +=
              Math.floor(biggestObj.score * 100) / this.state.sentence.length;
          } else if (biggestObj.tone_id === "analytical") {
            analyticalModal +=
              Math.floor(biggestObj.score * 100) / this.state.sentence.length;
          } else if (biggestObj.tone_id === "joy") {
            joyModal +=
              Math.floor(biggestObj.score * 100) / this.state.sentence.length;
          }
        });
        this.setState({
          sadnessModal,
          angerModal,
          joyModal,
          analyticalModal
        });
      });
  }

  // Map out styled sentences
  renderHighlights() {
    return this.state.sentence.map(sentence => {
      let tone = this.setupClass(sentence.tones);
      return this.checkTone(tone, sentence.text, sentence._id);
    });
  }
 
  // Takes in the tone which is a string with the highest emotion
  // Takes in the sentence text & id using those to return JSX based on
  // what tone was sent into the function
  checkTone(tone, toneStr, id) {
    if (tone === "joy") {
      return (
        <div key={id} className={tone}>
          
          <i class="fas fa-smile-beam" />
         
          {toneStr}
         
          <i class="fas fa-smile-beam" />
          
          
        </div>
      );
    } else if (tone === "anger") {
      return (
        <div key={id} className={tone}>
         
          <i class="fas fa-angry" />
         
          {toneStr}
       
          <i class="fas fa-angry" />
        
        </div>
      );
    } else if (tone === "sadness") {
      return (
        <div key={id} className={tone}>
         
          <i class="fas fa-sad-tear" />
          
          {toneStr}
         
          <i class="fas fa-sad-tear" />
        
        </div>
      );
    } else if (tone === "analytical") {
      return (
        <div key={id} className={tone}>
         
          <i class="fas fa-surprise" />
          
          {toneStr}
        
          <i class="fas fa-surprise" />
          
       
        </div>
      );
    }
  }

  // Takes in tone object, returns highest emotion as a string
  setupClass(tones) {
    let greatest = 0;
    let biggestObj = {};
    tones.forEach(tone => {
      if (greatest < tone.score) {
        greatest = tone.score;
        biggestObj = tone;
      }
    });

    return biggestObj.tone_id;
  }

  // Returns the highest emotion value as an integer
  setupScore(tones) {
    let greatest = 0;
    let biggestObj = {};
    tones.forEach(tone => {
      if (greatest < tone.score) {
        greatest = tone.score;
        biggestObj = tone;
      }
    });

    return biggestObj;
  }

  // save the content of the current content
  parseContent(content) {
    this.setState({ content: content.blocks[0].text });
  }
  saveVersion() {
    let id = this.state.id;
    let newVersion = {};
    newVersion.content = this.state.content;

    axios
      .post(
        `https://dontemail.herokuapp.com/letters/updateLetter/${id}`,
        newVersion
      )
      .then(resp => {
        this.setletter(id);
        this.setState({ content: "" });
      });
  }

  // sets the current index for the version rendering in the component
  versionsCounter() {
    this.setState({ versionsCounter: this.state.versions.length - 1 });
  }
  // change the index of the version to change what content is rendered.
  changeVersion(type) {
    let counter = this.state.versionsCounter;
    if (type === "up") {
      if (this.state.versionsCounter + 1 < this.state.versions.length) {
        counter++;
      } else {
        counter = 0;
      }
    } else {
      if (this.state.versionsCounter - 1 !== -1) {
        counter--;
      } else {
        counter = this.state.versions.length - 1;
      }
    }
    this.setState({
      versionsCounter: counter,
      content: this.state.versions[counter].content,
      analytical: 0,
      sadness: 0,
      joy: 0,
      anger: 0,
      sentence: []
    });
  }
  // render the save button based on the if the version is the most current version.
  renderSave() {
    if (this.state.id === "") {
      return (
        <Button
          className="btn movement-btn btn-styles"
          onClick={() => this.createLetter()}
        >
          Create
        </Button>
      );
    } else {
      if (this.state.versionsCounter + 1 === this.state.versions.length) {
        return (
          <Button
            className="btn movement-btn btn-styles"
            onClick={() => this.saveVersion()}
          >
            Save
          </Button>
        );
      } else {
        return (
          <Button
            className="btn movement-btn btn-styles"
            onClick={() => this.saveVersion()}
          >
            Save As
          </Button>
        );
      }
    }
  }
  renderCancel() {
    if (
      this.state.content !==
      this.state.versions[this.state.versionsCounter].content
    ) {
      return (
        <div>
          <Button className="btn movement-btn btn-styles" onClick={this.toggleModalTwo}>
            Cancel
          </Button>

          <Modal
            isOpen={this.state.modalTwo}
            toggle={this.toggleModalTwo}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggleModalTwo}>
              Are you sure?
            </ModalHeader>
            <ModalBody>
              Your message will be lost if you leave this page without saving.
            </ModalBody>
            <ModalFooter>
              <Button className="btn-styles"
                color="primary"
                onClick={() => this.props.history.push("/dashboard")}
              >
                Leave
              </Button>{" "}
              <Button
                className="btn movement-btn btn-styles"
                color="secondary"
                onClick={this.toggleModalTwo}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    } else {
      return (
        <Link to="/dashboard">
          <Button className="btn movement-btn btn-styles" style={{ opacity: 0.5 }}>
            Cancel
          </Button>
        </Link>
      );
    }
  }

  // Based on if sentence tone exist, render this "Advanced Analytics" button active to bring up modal
  renderMoreInfoIcon = () => {
    if (this.state.sentence.length === 0) {
      return <i className="fas fa-info-circle fa-2x" />;
    } else {
      return (
        <div>
          <i
            onClick={this.toggle}
            className="fas fa-info-circle fa-2x success"
          />
          <Modal
            toggle={this.toggle}
            isOpen={this.state.modal}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Advanced Analytics</ModalHeader>
            <ModalBody className="">
              {this.renderProgressBars(
                this.state.angerModal,
                this.state.joyModal,
                this.state.sadnessModal,
                this.state.analyticalModal
              )}
              {this.renderHighlights()}
            </ModalBody>
            <ModalFooter>
              <Button className="btn-styles" color="success" onClick={this.toggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  };

  emailModal = () => {
    return (
      <React.Fragment>
        <ModalHeader toggle={this.toggleThree}>
          Would you like to send this email?
        </ModalHeader>
        <ModalBody>
          <Label className="email-Label">Send To</Label>
          <Input
            placeholder="email..."
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
         
          />
        </ModalBody>
        <ModalFooter>
          <Button className="btn-styles" color="primary" onClick={this.toggleThree}>
            Send
          </Button>{" "}
          <Button className="btn-styles"  color="secondary" onClick={this.toggleThree}>
            Cancel
          </Button>
        </ModalFooter>
      </React.Fragment>
    );
  };

  renderProgressBars(anger, joy, sadness, analytical) {
    return (
      <div className="progress-styles">
        <Label>Anger</Label>

        <Progress animated color="danger" value={anger}>
          {anger}%
        </Progress>
        <br />
        <Label>Joy</Label>

        <Progress animated color="success" value={joy}>
          {joy}%
        </Progress>
        <br />
        <Label>Sadness</Label>

        <Progress animated color="info" value={sadness}>
          {sadness}%
        </Progress>
        <br />
        <Label>Analytical</Label>

        <Progress animated color="warning" value={analytical}>
          {analytical}%
        </Progress>
        <br />
        <br />
      </div>
    );
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { auth } = this.props.context.userData;
    return (
      <Col sm="12" md="12" lg="10" className="controlCol-styles">
        {auth ? (
          <Form className="form-styles">
            <br />

            {!this.state.id ? (
              <React.Fragment>
                <div className="versionsCounter-styles">
                  Edit {this.state.versionsCounter + 1}/
                  {this.state.versions.length}
                </div>

                <br />
                <Row className="analyze-styles">
                  <Col md="12" lg="12" xl="5">
                    <Input
                      placeholder={this.state.name}
                      name="name"
                      onChange={this.handleChange}
                    />
                    <br />
                  </Col>
                  <Col  md="6" lg="6" xl="3">
                    <Button
                      className="analyzeBtn-styles btn-styles"
                      onClick={() => this.watson()}
                    >
                      Analyze
                    </Button>
                  </Col>
                  <Col md="6" lg="6" xl="3">
                    {this.renderMoreInfoIcon()}
                  </Col>
                </Row>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="versionsCounter-styles">
                  Edit {this.state.versionsCounter + 1}/
                  {this.state.versions.length}
                </div>

                <br />
                <Row className="analyze-styles">
                  <Col md="12" lg="6">
                    <Label className="label-styles">{this.state.name}</Label>
                  </Col>
                  <Col md="6" lg="3">
                    <Button
                      className="analyzeBtn-styles btn-styles"
                      onClick={() => this.watson()}
                    >
                      Analyze
                    </Button>
                  </Col>
                  <Col md="6" lg="3">
                    {this.renderMoreInfoIcon()}
                  </Col>
                </Row>
              </React.Fragment>
            )}
            <br />
            <Row className="rowTextArea-styles">
              <Col md="6">
                <div>
                  <Input
                    style={{ height: 400 }}
                    // static height please fix
                    className="taInput-styles"
                    type="textarea"
                    name="content"
                    value={this.state.content}
                    onChange={this.handleChange}
                  />
                </div>
              </Col>
              <Col md="4">
                {this.renderProgressBars(
                  this.state.anger,
                  this.state.joy,
                  this.state.sadness,
                  this.state.analytical
                )}
              </Col>
            </Row>

            <br />
            <Row className="infoRow-styles">
              <Col md="6" className="controlBtn-styles">
                <Col md="6">
                  <i
                    className="fas fa-arrow-circle-left"
                    onClick={() => this.changeVersion("down")}
                  />
                  <br />
                  <br />
                  {this.renderCancel()}
                </Col>
                <Col md="6">
                  <i
                    className="fas fa-arrow-circle-right"
                    onClick={() => this.changeVersion("up")}
                  />
                  <br />
                  <br />

                  {this.renderSave()}
                </Col>
              </Col>
            </Row>
            <div className="emails-styles">
              <Button className="btn btn-styles" onClick={this.toggleThree}>
                Send Email
              </Button>
              <Modal
                className={this.props.className}
                isOpen={this.state.modalThree}
                toggle={this.toggleThree}
              >
                {this.emailModal()}
              </Modal>
            </div>
          </Form>
        ) : (
          this.props.history.push("/")
        )}
      </Col>
    );
  }
}

export default LetterControl;
