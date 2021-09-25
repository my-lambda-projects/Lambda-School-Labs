import React, {Component} from "react";
import {
  Segment,
  Card,
  Button,
  List,
  Modal,
  Header,
  Icon,
  Input,
  Form,
  Label
} from "semantic-ui-react";
import {connect} from 'react-redux';
import {updateStudent} from '../../actions/studentActions'

class StudentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStudent: "",
      selectedStudentName: "",
      editStudent: false,
      openDeleteModal: false,
      updatedInfo: {}
    };
  }

  openModal = (e, {id, student}) => {
    this.setState({
      openDeleteModal: true,
      selectedStudent: id,
      selectedStudentName: `${student.firstname} ${student.lastname}`
    });
  };

  closeModal = () => {
    this.setState({
      openDeleteModal: false,
      selectedStudent: "",
      selectedStudentName: ""
    });
  };

  handleHire = (e, {id, student}) => {
    const objStudent = {
      classId: this.props.classId,
      id: id,
      hired: true,
      firstname : student.firstname,
      lastname : student.lastname,
      email : student.email,
      github : student.github
    }
    this.props.updateStudent(objStudent);
  };

  openEditView = (e, {student}) => {
    let current = {};
    current.hired = student.hired
    current.id = student._id;
    current.classId = this.props.classId;
    current.firstname = student.firstname;
    current.lastname = student.lastname;
    current.email = student.email;
    current.github = student.github;
    this.setState({
      editStudent: true,
      selectedStudent: student._id,
      updatedInfo: current
    });
    this.props.toggleSearch();
  };

  closeEditView = () => {
    this.setState({editStudent: false, selectedStudent: "", updatedInfo: {}});
    this.props.toggleSearch();
    this.props.updateErrors.firstname = "";
    this.props.updateErrors.lastname = "";
    this.props.updateErrors.email = "";
    this.props.updateErrors.github = "";
  };

  handleInput = (e, {name, value}) => {
    let current = Object.assign({}, this.state.updatedInfo);
    current[name] = value;
    this.props.updateErrors[name] = "";
    this.setState({updatedInfo: current});
  };

  handleUpdate = () => {
    this.props.updateStudent(this.state.updatedInfo);
  };

  handleDelete = () => {
    this.props.deleteStudent({id: this.state.selectedStudent});
  };

  componentDidUpdate = (prevProps, prevState) => {
    // Student updated successfully -> closing modal
    if (
      this.props.updatedStudent &&
      this.props.updatedStudent !== prevProps.updatedStudent
    ) {
      this.closeEditView();
    }
  };

  render() {
    return (
      <Segment>
        <DeleteModal
          open={this.state.openDeleteModal}
          close={this.closeModal}
          selected={this.state.selectedStudent}
          delete={this.handleDelete}
          student={this.state.selectedStudentName}
          class={this.props.className}
        />
        <Card.Group itemsPerRow="1" stackable>
          {this.props.students.map((student, index) => {
            return !student.hired ? (
              this.state.editStudent &&
              this.state.selectedStudent === student._id ? (
                <Card key={index}>
                  <Card.Content>
                    <Form>
                      <Form.Field
                        error={Boolean(this.props.updateErrors.firstname)}
                      >
                        {this.props.updateErrors.firstname ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.updateErrors.firstname}
                          />
                        ) : null}
                        <Input
                          name="firstname"
                          placeholder="Student first name"
                          value={this.state.updatedInfo.firstname}
                          onChange={this.handleInput}
                          fluid
                        />
                      </Form.Field>
                      <Form.Field
                        error={Boolean(this.props.updateErrors.lastname)}
                      >
                        {this.props.updateErrors.lastname ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.updateErrors.lastname}
                          />
                        ) : null}
                        <Input
                          name="lastname"
                          placeholder="Student last name"
                          value={this.state.updatedInfo.lastname}
                          onChange={this.handleInput}
                          fluid
                        />
                      </Form.Field>
                      <Form.Field
                        error={Boolean(this.props.updateErrors.email)}
                      >
                        {this.props.updateErrors.email ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.updateErrors.email}
                          />
                        ) : null}
                        <Input
                          name="email"
                          placeholder="Student email address"
                          value={this.state.updatedInfo.email}
                          onChange={this.handleInput}
                          fluid
                        />
                      </Form.Field>
                      <Form.Field
                        error={Boolean(this.props.updateErrors.github)}
                      >
                        {this.props.updateErrors.github ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.updateErrors.github}
                          />
                        ) : null}
                        <Input
                          name="github"
                          placeholder="Student Github handle"
                          value={this.state.updatedInfo.github}
                          onChange={this.handleInput}
                          fluid
                        />
                      </Form.Field>
                    </Form>
                  </Card.Content>
                  <Card.Content textAlign="center" extra>
                    <Button
                      id={student._id}
                      content="Update"
                      onClick={this.handleUpdate}
                      color="blue"
                      inverted
                    />
                    <Button
                      content="Cancel"
                      onClick={this.closeEditView}
                      color="red"
                      inverted
                    />
                  </Card.Content>
                </Card>
              ) : (
                <Card key={index}>
                  <Card.Content>
                    <Card.Header>
                      {`${student.firstname} ${student.lastname}`}
                      <Button.Group compact basic floated="right" widths="1">
                        <Button
                          id={student._id}
                          student={student}
                          icon
                          animated="vertical"
                          onClick={this.handleHire}
                          disabled={this.state.editStudent}
                        >
                          <Button.Content visible>
                            <Icon name="trophy" color="yellow"/>
                          </Button.Content>
                          <Button.Content hidden>Hired!</Button.Content>
                        </Button>
                        <Button
                          id={student._id}
                          student={student}
                          name="openEditModal"
                          icon
                          animated="vertical"
                          onClick={this.openEditView}
                          disabled={this.state.editStudent}
                        >
                          <Button.Content visible>
                            <Icon name="wrench"/>
                          </Button.Content>
                          <Button.Content hidden>Edit</Button.Content>
                        </Button>
                        <Button
                          id={student._id}
                          student={student}
                          name="openDeleteModal"
                          icon
                          animated="vertical"
                          onClick={this.openModal}
                          disabled={this.state.editStudent}
                        >
                          <Button.Content visible>
                            <Icon name="trash" color="red" inverted/>
                          </Button.Content>
                          <Button.Content hidden>Delete</Button.Content>
                        </Button>
                      </Button.Group>
                    </Card.Header>
                    <Card.Description>
                      <List>
                        <List.Item>
                          <Icon name="mail"/>: {student.email}
                        </List.Item>
                        <List.Item>
                          <Icon name="github"/>: {student.github}
                        </List.Item>
                      </List>
                    </Card.Description>
                  </Card.Content>
                </Card>
              )
            ) : null;
          })}
        </Card.Group>
      </Segment>
    );
  }
}

const DeleteModal = props => {
  return (
    <Modal
      centered
      size="small"
      closeIcon
      open={props.open}
      onClose={props.close}
      dimmer="blurring"
    >
      <Header icon="trash" content="Delete Student"/>
      <Modal.Content>
        Are you sure you want to delete <b>{props.student}</b> from{" "}
        <b>{props.class}</b>?
      </Modal.Content>
      <Modal.Actions onClick={props.close}>
        <Button color="red" onClick={props.delete}>
          <Icon name="trash alternate"/>
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, {updateStudent})(StudentList)
