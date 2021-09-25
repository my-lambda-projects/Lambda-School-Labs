import { withRouter } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";

import { Link } from 'react-router-dom';

import { Button, FormGroup, Label, Input } from "reactstrap";
import CsvParse from "@vtex/react-csv-parse";

import { addClass, addStudent, getClasses, editClass } from "../../actions";

import swal from "sweetalert";
import "./form.css";

import uuidv4 from "uuid/v4";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classname: this.props.location.state.class.name,
      firstname: "",
      lastname: "",
      participated: this.props.location.state.class.participation,
      resetMode: false,
      resetConf: false,
      allMode: this.props.location.state.class.allMode,
      trackMode: this.props.location.state.class.trackMode,
      students: this.props.location.state.class.students,
      // btnDropleft: false
      myref: HTMLElement
    };
  }

  allToggle = () => {
    this.setState({ allMode: !this.state.allMode });
    console.log("allMode:", this.state.allMode);
  };

  trackToggle = () => {
    this.setState({ trackMode: !this.state.trackMode });
    console.log(this);
  };

  resetHandler = () => {
    this.setState({ resetMode: !this.state.resetMode });
  };

  handleInputChange = event => {
    // console.log("handleInputChange");
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  // Updates this.students.state when you Import a CSV file
  handleImportData = data => {
    const { allMode, trackMode, participated } = this.state;
    const updated_students = this.state.students;
    data.map(item => {
      const newStudent = {
        first_name: item.first_name,
        last_name: item.last_name,
        component_state_id: uuidv4() // Needs to be here in order to for removeStudent to work
      };

      updated_students.push(newStudent);
    });

    this.setState({
      students: updated_students,
      firstname: "",
      lastname: ""
    });
  };

  // Updates this.student.state when you click 'Add'
  compileStudentList = () => {
    // This runs every time the `Add` button is pressed
    const { firstname, lastname } = this.state;

    if (firstname === "") {
      swal({
        icon: "error",
        text: "Oops!! Looks like you forgot to add a first name!"
      });
      return;
    } else if (lastname === "") {
      swal({
        icon: "error",
        text: "Oops!! Looks like you forgot to add a last name!"
      });
      return;
    } else {
      const newStudent = {
        first_name: firstname,
        last_name: lastname,
        component_state_id: uuidv4() // Needs to be here in order to for removeStudent to work
      };
      const students = this.state.students;
      students.push(newStudent);
      this.setState({
        students: students,
        firstname: "",
        lastname: ""
      });
      console.log("compileStudentList running:", this.state.students);
    }
  };

  // Updates the mLab database with whatever is stored in state
  handleAddClassAndStudents = () => {
    const { classname, students, allMode, trackMode } = this.state;
    const collection = students;
    const full_name = [];
    collection.map(item => {
      full_name.push({
        first_name: item.first_name,
        last_name: item.last_name,
        component_state_id: uuidv4()
      });
    });
    console.log("FULL_NAME ARRAY:", full_name);
    if (classname === "") {
      swal({
        icon: "error",
        text: "Oh no!! Looks like you forgot to add a Class Name!"
      });
      return;
    } else if (students === []) {
      swal({
        icon: "error",
        text: "Sorry! You must add at least one student to create a class!"
      });
      return;
    } else {
      this.props.editClass(
        {
          name: classname,
          students: full_name,
          allMode: allMode,
          trackMode: trackMode
        },
        this.props.history,
        this.props.location.state.class._id
      );
      this.setState({
        classname: "",
        students: [],
        firstname: "",
        lastname: ""
      });
    }
  };

  handleAddStudent = () => {
    // TODO: This will be used to add new students to a class AFTER it is made
  };

  removeStudent = e => {
    console.log("x", e.target.value);
    console.log("this.myref:", this.myref);
    console.log(
      "this.props.location.state.class.students:",
      this.props.location.state.class.students
    );
    const students = this.state.students;
    for (let i = 0; i < students.length; i++) {
      if (students[i].component_state_id === e.target.value) {
        students.splice(i, 1);
      }
    }

    this.setState({
      students: students
    });
  };

  // componentDidMount() {
  //   this.props.getClasses();
  //   console.log('mount')
  // }

  render() {
    const keys = ["first_name", "last_name"];


    console.log('props', this)
    let classitem = this.props.location.state.class;


    return (
      <div className="Form-div">
        <div className="Form-container">
          <div className="Form-container_left">
            <div className="Classname-box">
              <div className="Classname-box_content">
                <div className="title">Settings</div>

                <input
                  className="Classname-input"
                  value={this.state.classname}
                  name="classname"
                  text="text"
                  placeholder="Class Name"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="Options-box">
              <div className="Options-box_content">
                <div className="title">Options</div>
                <FormGroup check>
                  <Label check>
                    {this.state.trackMode === true ? (
                      <Input
                        type="checkbox"
                        onClick={this.trackToggle}
                        checked
                      />
                    ) : (
                      <Input type="checkbox" onClick={this.trackToggle} />
                    )}
                    Track Participation
                  </Label>
                </FormGroup>
                <Button id="Reset-button">Reset Participation</Button>
                <FormGroup check>
                  <Label check>
                    {this.state.allMode === true ? (
                      <Input type="checkbox" onClick={this.allToggle} checked />
                    ) : (
                      <Input type="checkbox" onClick={this.allToggle} />
                    )}
                    All Go
                  </Label>
                </FormGroup>
              </div>
            </div>
            <div className="Add-box">
              <div className="Add-box_content">
                <div className="title">Add Students</div>

                <input
                  className="firstname-input"
                  value={this.state.firstname}
                  name="firstname"
                  text="text"
                  placeholder="First Name"
                  onChange={this.handleInputChange}
                />
                <input
                  className="lastname-input"
                  value={this.state.lastname}
                  name="lastname"
                  text="text"
                  placeholder="Last Name"
                  onChange={this.handleInputChange}
                />
                <Button id="Add-button" onClick={this.compileStudentList}>
                  Add
                </Button>
              </div>
            </div>
            <div className="CSV-box">
              <div className="CSV-box_content">
                <div className="CSV_title">Import CSV</div>
                <CsvParse
                  keys={keys}
                  onDataUploaded={this.handleImportData}
                  onError={this.handleError}
                  render={onChange => <input type="file" onChange={onChange} />}
                />
              </div>
            </div>
          </div>
          <div className="List-box">
            <div className="List-box_content">
              <div className="title title_student-list">Student List</div>

              <div>
                {this.state.students.map(obj => {
                  var first = obj.first_name;
                  var last = obj.last_name;
                  return (
                    <Button
                      id="student-button"
                      onClick={this.removeStudent}
                      value={obj.component_state_id}
                      type="submit"
                      ref={r => {
                        this.myref = r;
                      }}
                    >
                      x {first + " " + last}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="submitButton-box">
            {/* <Link
                    to={{
                      pathname: `/classes/${classitem._id}`,
                      state: {
                        // classid: classitem._id,
                        class: classitem
                      }
                    }}
                  > */}
              <Button
                id="Class-submit-button"
                onClick={this.handleAddClassAndStudents}
                href="/classes"
              >
                Submit
              </Button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.errorMessage,
    addingClass: state.addingClass,
    students: state.students,
    classes: state.classes,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { addClass, getClasses, editClass }
)(EditForm);
