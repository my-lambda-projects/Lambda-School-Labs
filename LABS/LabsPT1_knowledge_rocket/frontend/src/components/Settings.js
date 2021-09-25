import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, Form, Input, FormGroup } from "reactstrap";
import { Container, Row, Col } from "reactstrap";

import SidebarNav from "./SidebarNav";
import "../css/SidebarNav.css";
import "../css/Settings.css";

import { updatePassword } from '../actions';
import { updateEmail } from '../actions';

class Settings extends Component {
  state = {
    newPassword: "",
    newEmail: "",
    notify: false,
    notifyMsg: "",
    notifyMsg2: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePasswordSubmit = e => {
    e.preventDefault();
    this.setState({ notify: false });
    this.props.updatePassword({ newPassword: this.state.newPassword }); 
    this.setState({ newPassword: ''})

    this.setState({
      notify: true,
      notifyMsg: "Your password has been updated."
    });
  };

  handleEmailSubmit = e => {
    e.preventDefault();
    this.setState({ notify: false });
    this.props.updateEmail({ newEmail: this.state.newEmail  }); 
    this.setState({ newEmail: ''})

    this.setState({
      notify: true,
      notifyMsg2: "Your email has been updated."
    });
  };

  render() {
    return (
      <Container className="container">
        <Row>
          <Col sm="md" lg="3">
            <SidebarNav />
          </Col>
          <Col>
            <Row>
              <Col>
              <h1>Update</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form>
                    <FormGroup>
                      <Input
                        type="newPassword"
                        name="newPassword"
                        id="current_password"
                        placeholder="Type new password here"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                      />
                    <div className="func-btn">
                    <Button onClick={this.handlePasswordSubmit} type="submit">
                      Update
                    </Button>
                    </div>
                    </FormGroup>
                  </Form>
                  <div>{this.state.notify ? <p>{this.state.notifyMsg}</p> : null}</div>
                  <Form>
                    <FormGroup>
                      
                      <Input
                        type="newEmail"
                        name="newEmail"
                        id="newEmail"
                        placeholder="Type new email here"
                        value={this.state.newEmail}
                        onChange={this.handleInputChange}
                      />
                    <div className="func-btn">
                      <Button onClick={this.handleEmailSubmit} type="submit">
                      Update
                    </Button>
                    </div>
                      </FormGroup>
                    </Form>
                    <div>{this.state.notify ? <p>{this.state.notifyMsg2}</p> : null}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      state: state,
  }
}

export default connect(mapStateToProps, { updatePassword, updateEmail })( Settings );

