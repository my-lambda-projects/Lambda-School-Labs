import React, { Component } from "react";
import { connect } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";

import { Link } from "react-router-dom";
import { Form, CardBody, Input, 
         FormGroup, Container, Row, Col, Card,
         CardTitle 
        } from "reactstrap";

import RemoveStudent from './RemoveStudent';
import RemoveRocket from './RemoveRocket';
import SelectClass from './SelectClass';
import add_icon from '../img/add_icon.png';
import { getRockets, addStudent, getStudents, getClasses, 
         getRocketsByClassName, addClass, removeStudent, 
         removeRocket 
       } from '../actions';


import SidebarNav from "./SidebarNav";

import "../css/CreateClass.css";


class CreateClass extends Component {
    state = {
        clsName: "",
        studentLastName: '',
        studentFirstName: '',
        studentEmail: '',
        studentDetailsError: "",
        startDate: new Date(),
        className: this.props.history.location.state
        ? this.props.history.location.state.className
        : ""
    }
    
    handleAddClass = (clsName) => {
        this.props.addClass({className: clsName});
        this.setState({clsName});
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    handleDateChange = (date) => {
        this.setState({
          startDate: date
        });
      }

    handleAddStudent = (e) => {
        e.preventDefault();
        if (this.state.studentLastName === "" || 
            this.state.studentFirstName === "" || 
            this.state.studentEmail === "") {
                this.setState({"studentDetailsError": "All fields are required."})
                return;
        }        
        const student = { className: this.state.clsName, 
                          studentName: `${this.state.studentFirstName} ${' '} ${this.state.studentLastName}`,
                          studentEmail: this.state.studentEmail }
        this.props.addStudent(student);
        this.setState({ studentFirstName: "", studentLastName: "", studentEmail:"",
                        studentDetailsError: "" })
    }

    handleRemoveStudent = (student) => {
        this.props.removeStudent({studentName: student.studentName,
                                  studentEmail: student.studentEmail,
                                  className: this.state.clsName});
    }

    handleRemoveRocket = (rocket) => {
        this.props.removeRocket({ rocketName: rocket,
                                  className: this.state.clsName});
    }
    

    handleSelectClass = (clsName) => {
        this.setState({clsName, 
                       studentLastName: "",
                       studentFirstName: "",
                       studentEmail: "",
                       studentDetailsError: ""
                      });
        this.props.getRocketsByClassName({className: clsName});
        this.props.getStudents({className: clsName});
    }

    componentDidMount() {
        this.props.getClasses();
        this.handleSelectClass(this.props.history.location.state ? this.props.history.location.state.className : "");
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col lg="3">
                        <SidebarNav className="create-class-sidebar"/>
                    </Col>
                    <Col lg="9">
                        <Row className="create-class-contents">
                            <Form className="create-class-form">
                                <FormGroup className="form-group-create-class">
                                    <h3 className="text-header">Select Class</h3>
                                    <Row>
                                        <Col lg="12">
                                            <SelectClass 
                                                classes={this.props.state.classes}
                                                handleSelectClass={this.handleSelectClass}
                                                clsName={this.state.clsName}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Form>
                            <Form onSubmit={this.handleAddStudent} className="create-class-form">
                                <FormGroup className="form-group-create-class">
                                    <h3 className="text-header">Add Student</h3>
                                    <Row className="add-student-form-row">
                                        <Col lg="4">
                                            <Input className="stdnt-input"
                                                type="text" 
                                                name="studentLastName" 
                                                id="lastname" 
                                                maxLength="50"
                                                placeholder="Last Name"
                                                value={this.state.studentLastName}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </Col>
                                        <Col lg="4">
                                            <Input className="stdnt-input"
                                                type="text" 
                                                name="studentFirstName" 
                                                id="firstname" 
                                                maxLength="50"
                                                placeholder="First Name"
                                                value={this.state.studentFirstName}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </Col>
                                        <Col lg="4">
                                            <Input className="stdnt-input"
                                                type="email" 
                                                name="studentEmail" 
                                                id="email" 
                                                maxLength="256"
                                                placeholder="Email"
                                                value={this.state.studentEmail}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </Col>
                                        <div className="create-student-btn">
                                                <Input className="create-student-img" type="image" src={add_icon} alt="Add Class" />
                                        </div>
                                    </Row>
                                    <hr/>
                                <h3>Students</h3>
                                    <Row className="create-class-display-students">
                                        {this.props.state.students.map((student, id) => {                                
                                            return (
                                                <RemoveStudent key={id} student={student}
                                                    handleRemoveStudent={this.handleRemoveStudent}
                                                />
                                        )})}
                                    </Row>
                                </FormGroup>
                            </Form>
                            <Form className="create-class-form">
                                <FormGroup className="form-group-create-class">
                                    <h3>Knowledge Rockets</h3>
                                    {this.props.state.classRockets && this.state.clsName && 
                                        <Row>{this.props.state.classRockets.map((rocket, id) => {
                                            return (
                                            <Col md="4" sm="6" xs="12" className="mb-4" key={id}>
                                            <Card style={{height: "80%"}}>
                                                <CardBody className="create-class-rocket-box">
                                                    <CardTitle className="text-center">
                                                        {rocket.rocketname}
                                                    </CardTitle>
                                                </CardBody>
                                            <RemoveRocket key={id} rocket={rocket.rocketname}
                                            handleRemoveRocket={this.handleRemoveRocket}
                                            />
                                            </Card>
                                        </Col>
                                        )})}
                                        <Col md="4" sm="6" xs="12" className="mb-4">
                                            <Card style={{height: "80%"}}>
                                                <CardBody>
                                                    <CardTitle className="text-center">New Rocket</CardTitle>
                                                    <div style={{textAlign: "center"}}>
                                                    <Link
                                                      to={{
                                                        pathname: "/createRocket",
                                                        state: { className: this.state.className }
                                                      }}
                                                    >
                                                        <i class="fas fa-plus-circle"/>
                                                    </Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>}
                                </FormGroup>
                            </Form>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,

    }
  }
  
export default connect(mapStateToProps,{ getRockets, getStudents, addStudent, 
                                        getClasses, getRocketsByClassName, 
                                        addClass, removeStudent, removeRocket } )(CreateClass);