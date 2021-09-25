import React, { Component } from "react";
import {
  Header,
  Icon,
  Form,
  Label,
  Button,
  Input,
  Tab
} from "semantic-ui-react";
import {connect} from 'react-redux';
import {postCsvStudents} from '../../actions/classActions'
class AddStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      github: "",
      csvFile: null
    };
  }

  handleInput = (e, { name, value }) => {
    this.setState({ [name]: value });
    // this.props.addOrgErrors.name = "";
    this.props.addStudentErrors[name] = "";
  };

  handleSubmit = () => {
    this.props.addStudent({
      id: this.props.classId,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      github: this.state.github
    });
  };

  handleImportChange = e => {
    this.setState({
      csvFile: e.target.files[0]
    });
    console.log("CSV ready for upload.");
  };

  handleImportSubmit = e => {
    e.preventDefault();
    console.log("Import submit");

    let classID = this.props.classId;
    let csvData = new FormData();

    csvData.append("file", this.state.csvFile);

    // Pass CSV, classname
    this.props.postCsvStudents(csvData, classID, true);
  };

  clearForm = () => {
    this.props.addStudentErrors.firstname = "";
    this.props.addStudentErrors.lastname = "";
    this.props.addStudentErrors.email = "";
    this.props.addStudentErrors.github = "";
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      github: "",
      csvFile: null
    });
  };

  componentDidMount = () => {
    this.props.onRef(this);
  };

  componentWillUnmount = () => {
    this.props.onRef(undefined);
  };

  render() {
    const panes = [
      {
        menuItem: { key: "user", icon: "user", content: "Create New Student" },
        render: () => (
          <Tab.Pane>
            <Header as="h2" icon textAlign="center" size="huge">
              <Icon name="user" circular />
              <Header.Content>Add New Student</Header.Content>
            </Header>

            <Form>
              <Form.Field
                error={Boolean(this.props.addStudentErrors.firstname)}
              >
                {this.props.addStudentErrors.firstname ? (
                  <Label
                    color="red"
                    pointing="below"
                    content={this.props.addStudentErrors.firstname}
                  />
                ) : null}
                <Form.Input
                  name="firstname"
                  value={this.state.firstname}
                  placeholder="First name"
                  onChange={this.handleInput}
                />
              </Form.Field>

              <Form.Field error={Boolean(this.props.addStudentErrors.lastname)}>
                {this.props.addStudentErrors.lastname ? (
                  <Label
                    color="red"
                    pointing="below"
                    content={this.props.addStudentErrors.lastname}
                  />
                ) : null}
                <Form.Input
                  name="lastname"
                  value={this.state.lastname}
                  placeholder="Last name"
                  onChange={this.handleInput}
                />
              </Form.Field>

              <Form.Field error={Boolean(this.props.addStudentErrors.email)}>
                {this.props.addStudentErrors.email ? (
                  <Label
                    color="red"
                    pointing="below"
                    content={this.props.addStudentErrors.email}
                  />
                ) : null}
                <Form.Input
                  name="email"
                  value={this.state.email}
                  placeholder="Email address"
                  onChange={this.handleInput}
                />
              </Form.Field>

              <Form.Field error={Boolean(this.props.addStudentErrors.github)}>
                {this.props.addStudentErrors.github ? (
                  <Label
                    color="red"
                    pointing="below"
                    content={this.props.addStudentErrors.github}
                  />
                ) : null}
                <Form.Input
                  name="github"
                  value={this.state.github}
                  placeholder="Github handle"
                  onChange={this.handleInput}
                />
              </Form.Field>

              <Form.Field>
                <Form.Button
                  content="Create new student"
                  color="green"
                  onClick={this.handleSubmit}
                />
              </Form.Field>
            </Form>
          </Tab.Pane>
        )
      },
      {
        menuItem: {
          key: "cloud upload",
          icon: "cloud upload",
          content: "Import CSV File"
        },
        render: () => (
          <Tab.Pane>
            <Header as="h2" icon textAlign="center" size="huge">
              <Icon name="cloud upload" circular />
              <Header.Content>Import CSV File</Header.Content>
            </Header>

            <Input
              focus
              type="file"
              ref={input => {
                this.filesInput = input;
              }}
              name="file"
              icon="file alternate outline"
              iconPosition="left"
              placeholder="UploadCSV"
              onChange={this.handleImportChange}
            />

            <Button
              className="ui clearing segment BtnImport"
              onClick={this.handleImportSubmit}
              primary
              size="large"
              fluid
            >
              Upload CSV
            </Button>
          </Tab.Pane>
        )
      }
    ];

    const addStudentsTabs = () => <Tab panes={panes} />;

    return addStudentsTabs();
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps, {postCsvStudents})(AddStudent)
