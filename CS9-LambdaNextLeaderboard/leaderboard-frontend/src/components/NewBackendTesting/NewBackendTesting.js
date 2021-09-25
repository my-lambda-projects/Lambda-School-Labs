import React, { Component } from "react";
import {
  Container,
  Menu,
  Input,
  Button,
  Label,
  Divider
} from "semantic-ui-react";
import {
  getAdminOrganizations,
  addAdminOrganization
} from "../../actions/adminActions";
import {
  getOrganizationClasses,
  addOrganizationClass
} from "../../actions/organizationActions";
import { connect } from "react-redux";

class NewBackendTesting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOrgId: "",
      selectedOrgName: "",
      newOrgName: "",
      newClassName: ""
    };
  }

  handleInput = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleGetOrg = () => {
    this.props.getAdminOrganizations({ id: localStorage.getItem("adminID") });
  };

  handleOrgClick = (e, { name, content }) => {
    this.setState({ selectedOrgId: name, selectedOrgName: content });
  };

  handleGetClasses = () => {
    this.props.getOrganizationClasses({ id: this.state.selectedOrgId });
  };

  handleSubmitOrg = () => {
    this.props.addAdminOrganization({
      name: this.state.newOrgName
    });
  };

  handleSubmitClass = () => {
    this.props.addOrganizationClass({
      id: this.state.selectedOrgId,
      name: this.state.newClassName
    });
  };

  componentWillMount = () => {
    this.props.getAdminOrganizations({ id: localStorage.getItem("adminID") });
    // if (this.state.selectedOrgId)
    //   this.props.getOrganizationClasses({ id: this.state.selectedOrgId });
    this.props.getOrganizationClasses({ id: this.state.selectedOrgId });
  };

  render() {
    return (
      <Container>
        <Button onClick={this.handleGetOrg}>Get Organizations</Button>
        <h1>Admin's organizations: </h1>
        <Menu vertical>
          {this.props.organizations.map((org, index) => {
            return (
              <Menu.Item
                content={org.name}
                name={org._id}
                key={`organization${index}`}
                onClick={this.handleOrgClick}
              />
            );
          })}
        </Menu>
        <h1>Add a new organization:</h1>
        <div>
          {this.props.newOrgErrors.name ? (
            <Label
              color="red"
              pointing="right"
              content={this.props.newOrgErrors.name}
            />
          ) : null}
          <Input
            name="newOrgName"
            placeholder="Enter organization name"
            type="text"
            onChange={this.handleInput}
          />
          <Button onClick={this.handleSubmitOrg}>Add organization</Button>
        </div>
        <Divider />
        <Button onClick={this.handleGetClasses}>Get classes</Button>
        <h1>{`${this.state.selectedOrgName} classes:`}</h1>
        <Menu vertical>
          {this.props.orgClasses.map((aClass, index) => {
            return (
              <Menu.Item
                content={aClass.name}
                name={aClass._id}
                key={`class${index}`}
              />
            );
          })}
        </Menu>
        <h1>Add a new class:</h1>
        <div>
          {this.props.newClassErrors.name ? (
            <Label
              color="red"
              pointing="right"
              content={this.props.newClassErrors.name}
            />
          ) : null}
          <Input
            name="newClassName"
            placeholder="Enter class name"
            type="text"
            onChange={this.handleInput}
          />
          <Button onClick={this.handleSubmitClass}>Add class</Button>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizations: state.adminOrganizations,
    newOrgErrors: state.newOrganizationErrors,
    orgClasses: state.organizationClasses,
    newClassErrors: state.newClassErrors
  };
};

export default connect(
  mapStateToProps,
  {
    getAdminOrganizations,
    addAdminOrganization,
    getOrganizationClasses,
    addOrganizationClass
  }
)(NewBackendTesting);
