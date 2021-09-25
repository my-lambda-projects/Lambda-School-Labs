import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Segment,
  Input,
  List,
  Button,
  Modal,
  Header,
  Label,
  Form
} from "semantic-ui-react";

// components
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import LeaderBoard from "../Leaderboard/LeaderBoard";

// actions
import {
  getClassStudents,
  queryStudents,
  addClassStudent,
  updateClassAction,
  deleteClassAction
} from "../../actions/classActions";

import Settings from "../SettingsComponent/Settings";

import { updateStudent, deleteStudent } from "../../actions/studentActions";
import {resetState} from '../../actions/organizationActions'
import {
  getGithubDataAction,
  setClassForQuery,
  setSettingsAction
} from "../../actions";

class ClassView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unhired: 0,
      hired: 0,
      total: 0,
      searchable: true,
      openEditModal: false,
      leaderboard: false,
      settings: false,
      updatedInfo: {}
    };
  }

  getStudents = () => {
    this.props.getClassStudents({ id: this.props.classId });
  };

  setStudentCounts = students => {
    let count = 0;
    for (let i = 0; i < students.length; i++) {
      if (students[i].hired) break;
      count++;
    }
    this.setState({
      unhired: count,
      hired: students.length - count,
      total: students.length
    });
  };

  queryStudents = (e, { value }) => {
    this.props.queryStudents({ id: this.props.classId, query: value });
  };

  toggleSearchable = () => {
    this.setState({ searchable: !this.state.searchable });
  };

  openModal = () => {
    let current = {};
    // current.id = this.props.classId;
    current.name = this.props.className;
    current.trackingDate = this.props.trackingDate;
    current.updated = false;
    current.orgId = this.props.activeOrganizationID
    this.setState({ openEditModal: true, updatedInfo: current });
  };

  closeModal = () => {
    this.setState({ openEditModal: false, updatedInfo: {} });
  };

  handleInput = (e, { name, value }) => {
    let current = Object.assign({}, this.state.updatedInfo);
    current[name] = value;
    if (
      current.name === this.props.className &&
      (current.trackingDate === this.props.trackingDate ||
        current.trackingDate === "")
    ) {
      current.updated = false;
    } else {
      current.updated = true;
    }
    console.log('old state', this.state.updatedInfo);
    this.setState({ updatedInfo: current });
  };
  getData = () => {
    console.log("Send data", this.props.props.history, this.props.classId);
    // this.props.getGithubDataAction(this.props.classId)
    this.props.setClassForQuery(this.props.classId, this.props.className);
  };

  setSettings = () => {
    this.setState({ settings: true });
    this.props.setSettingsAction(true);
  };

  componentDidUpdate = (prevProps, prevState) => {
    // New Students -> Settings counts
    if (this.props.students !== prevProps.students) {
      this.setStudentCounts(this.props.students);
      // this.addStudentComponent.clearForm();
    }

    // Selected Class was changed -> Updating Students
    if (this.props.classId && this.props.classId !== prevProps.classId) {
      this.getStudents();
    }

    // New Student created -> Updating Students
    if (
      this.props.createdStudent &&
      this.props.createdStudent !== prevProps.createdStudent
    ) {
      this.getStudents();
    }

    // Student updated -> Updating Students
    if (
      this.props.updatedStudent &&
      this.props.updatedStudent !== prevProps.updatedStudent
    ) {
      this.getStudents();
    }

    // Student deleted -> Updating Students
    if (
      this.props.deletedStudent &&
      this.props.deletedStudent !== prevProps.deletedStudent
    ) {
      this.getStudents();
    }
  };
componentWillUpdate = (nextProps, nextState) => {
  if (nextProps.classToQuery !== null &&
    this.props.classToQuery !== nextProps.classToQuery) {
    console.log("Ready to FIre, this.props.classToQuery",
    nextProps.classToQuery,
      this.props
    );
    this.setState({ leaderboard: true });
  }
  if (nextProps.studentsAdded === true) {
    this.getStudents()
    this.props.resetState()
  }
}



  componentDidMount = () => {
    this.getStudents();
  };
  sendUpdate = () => {
    this.props.updateClassAction(this.props.classId, this.state.updatedInfo)
  }
  deleteClass = () => {
    this.props.deleteClassAction(this.props.classId);
  }

  render() {
    if (this.state.leaderboard === true && this.props.classToQuery !== null) {
      return (
          <LeaderBoard students={this.props.students}/>
      )
  }
  if (this.state.settings === true && this.props.changeSettings === true) {
      return (
          <Settings/>

          )
  }
    return (
      <Segment.Group>
        <EditModal
          open={this.state.openEditModal}
          close={this.closeModal}
          info={this.state.updatedInfo}
          update={this.handleInput}
          sendUpdate={this.sendUpdate}
          deleteClass={this.deleteClass}
        />
        <Segment inverted color="blue">
          <Header as="h2" content="Class View" textAlign="center" />
        </Segment>
        <Segment textAlign="center">
          <Header textAlign="center">{this.props.className}</Header>
          <List bulleted horizontal>
            <List.Item>Students: {this.state.unhired}</List.Item>
            <List.Item>Participation: 0%</List.Item>
            <List.Item>
              Hired: {this.state.hired}/{this.state.total}
            </List.Item>
          </List>
        </Segment>
        <Segment textAlign="center">
          {this.state.unhired ? (

              <Button
                icon="ordered list"
                content="Leaderboard"
                inverted
                color="green"
                size="large"
                onClick={this.getData}
              />
          ) : null}
          <Button
            icon="cog"
            content="Settings"
            inverted
            color="blue"
            size="large"
            onClick={this.openModal}
          />
        </Segment>
        {this.props.queryingStudents || this.state.unhired ? (
          <Segment>
            <Form>
              <Form.Field>
                {this.props.students &&
                !this.state.unhired &&
                this.props.queryingStudents ? (
                  <Label
                    pointing="below"
                    content="No students found"
                    color="orange"
                  />
                ) : null}
                <Input
                  fluid
                  icon="users"
                  iconPosition="left"
                  placeholder="Search students..."
                  disabled={!this.state.searchable}
                  onChange={this.queryStudents}
                />
              </Form.Field>
            </Form>
          </Segment>
        ) : null}
        {this.state.unhired ? (
          <StudentList
            classId={this.props.classId}
            className={this.props.className}
            students={this.props.students}
            updateStudent={this.props.updateStudent}
            updateErrors={this.props.updateStudentErrors}
            updatedStudent={this.props.updatedStudent}
            deleteStudent={this.props.deleteStudent}
            toggleSearch={this.toggleSearchable}
          />
        ) : null}
        <Segment>
          <AddStudent
            onRef={ref => (this.addStudentComponent = ref)}
            classId={this.props.classId}
            addStudent={this.props.addClassStudent}
            addStudentErrors={this.props.newStudentErrors}
          />
        </Segment>
      </Segment.Group>
    );
  }
}

const EditModal = props => {
  return (
    <Modal
      centered
      size="small"
      closeIcon
      open={props.open}
      onClose={props.close}
      dimmer="blurring"
    >
      <Header icon="cog" content="Class Settings" />
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <Input
                name="name"
                value={props.info.name}
                onChange={props.update}
                label={{ color: "teal", content: "Class name" }}
                placeholder="Class name"
                fluid
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="trackingDate"
                value={props.info.trackingDate ? props.info.trackingDate : ""}
                onChange={props.update}
                label={{ color: "teal", content: "Tracking start date" }}
                placeholder="Class tracking date"
                type="Date"
                fluid
              />
            </Form.Field>
          </Form.Group>
          <Form.Field disabled={!props.info.updated}>
            <Button content="Update" onClick={props.sendUpdate} color="blue" inverted />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          icon="trash alternate"
          content="Delete this Class"
          onClick={props.deleteClass}
        />
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    students: state.classStudents,
    queryingStudents: state.queryingStudents,
    createdStudent: state.createdStudent,
    newStudentErrors: state.newStudentErrors,
    updatedStudent: state.updatedStudent,
    updateStudentErrors: state.updateStudentErrors,
    deletedStudent: state.deletedStudent,
    githubData: state.githubData,
    classToQuery: state.classToQuery,
    changeSettings: state.changeSettings,
    studentsAdded: state.studentsAdded,
    activeOrganizationID: state.activeOrganization
  };
};

export default connect(
  mapStateToProps,
  {
    getClassStudents,
    queryStudents,
    addClassStudent,
    updateStudent,
    deleteStudent,
    setSettingsAction,
    getGithubDataAction,
    setClassForQuery,
    resetState,
    updateClassAction,
    deleteClassAction
  }
)(ClassView);
