import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { Card, CardTitle, Form, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import "../css/Classes.css";
import SelectClass from "./SelectClass.js";

import SidebarNav from "./SidebarNav.js";
import { getRocketsByClassName, getClasses, removeRocket } from "../actions";

class Rocket extends Component {
  state = {
    className: this.props.history.location.state
      ? this.props.history.location.state.className
      : ""
  };

  componentDidMount() {
    this.props.getClasses();
    this.props.getRocketsByClassName(this.state)
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelectClass = clsName => {
    this.props.history.location.state = clsName;
    this.setState({ className: clsName });
    this.props.getRocketsByClassName({ className: clsName });
  };

  handleRemoveRocket = (rocketName) => {
    const rocket = {
      className: this.state.className,
      rocketName: rocketName
    }
    this.props.removeRocket(rocket)
}

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
                <h1>Rockets</h1>
              </Col>
            </Row>
            <Row>
              <Form style={{ width: "80%" }}>
                <FormGroup style={{ maxWidth: "100%" }}>
                  <h3>Select Class</h3>
                  <SelectClass
                    classes={this.props.state.classes}
                    handleSelectClass={this.handleSelectClass}
                    clsName={this.state.className}
                  />
                </FormGroup>
              </Form>
              <Form style={{width: "80%"}}>
                <FormGroup style={{maxWidth: "100%"}}>
                <Row>{this.props.state.classRockets && 
                    this.props.state.classRockets.map((unit, id) => (
                      <Col md="4" sm="6" xs="12" className="mb-4" key={id}>
                        <Card body >
                          <CardTitle className="text-center" >
                            {unit.rocketname}
                          </CardTitle>
                        </Card>
                        <Button onClick={ () => this.handleRemoveRocket(unit.rocketname)}>Delete</Button>
                      </Col>
                    ))}
                    <Col md="4" sm="6" xs="12" className="mb-4 addRocket">
                      <Card body>
                        <CardTitle className="text-center">
                          New Rocket
                        </CardTitle>
                        <Link
                          to={{
                            pathname: "/createRocket",
                            state: { className: this.state.className }
                          }}
                        >
                          <i className="fas fa-plus-circle" />
                        </Link>
                      </Card>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(
  mapStateToProps,
  { getRocketsByClassName, getClasses, removeRocket }
)(Rocket);
