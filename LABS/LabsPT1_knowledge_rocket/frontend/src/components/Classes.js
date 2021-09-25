import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { Card, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import "../css/Classes.css";

import SidebarNav from "./SidebarNav.js";

import { getUser, getClass, addClass, removeClass } from "../actions";
import AddClass from './AddClass';


class Classes extends Component {
  
  handleGet = () => {
    const token = localStorage.getItem("token");
    this.props.getUser(token);
  };

  handleClass = () => {
    const token = localStorage.getItem("token");
    this.props.getClass(token);
  };

  handleRemoveClass = (classname) => {
    this.props.removeClass(classname)
}

  componentWillMount() {
    this.handleGet();
    this.handleClass();
  }

  handleLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  handleAddClass = clsName => {
    this.props.addClass({ className: clsName });
    this.props.history.push({
      pathname: "/createClass",
      state: { className: clsName }
    });
  };

  handleRemoveClass = (classname) => {
    this.props.removeClass({className: classname})
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
                <div>
                  {this.props.state.user ? (
                    <h1 className="wel">
                      Welcome, {this.props.state.user[0].username}!
                    </h1>
                  ) : (
                    <h1>Welcome!</h1>
                  )}
                </div>
                <Row>
                  {this.props.state.classes && (
                    this.props.state.classes.map((unit, id) => {
                      return (
                        <Col md="4" sm="6" xs="12" className="mb-4" key={id}>
                        <Link
                          to={{
                            pathname: "/createClass",
                            state: { className: unit.className }
                          }}
                        >
                          <Card body>
                            <CardTitle className="text-center">
                              {unit.className}
                            </CardTitle>
                          </Card>
                        </Link>
                        <Button onClick={ () => this.handleRemoveClass(unit.className)}>Delete</Button>
                      </Col>
                    )})
                  )}
                  <Col md="4" sm="6" xs="12" className="mb-4">
                    <Card body>
                      <CardTitle className="text-center">New Class</CardTitle>
                      <AddClass handleAddClass={this.handleAddClass} />
                    </Card>
                    <div>{this.props.state.error ? <p>{this.props.state.errorMsg}</p> : null}</div>

                  </Col>
                </Row>
              </Col>
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
  { getUser, getClass, addClass, removeClass }
)(Classes);
