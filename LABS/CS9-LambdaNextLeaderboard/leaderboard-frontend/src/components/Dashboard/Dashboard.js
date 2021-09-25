import React, {Component} from "react";
import {Container, Grid, Menu, Transition, Label} from "semantic-ui-react";
import {connect} from "react-redux";

import jwt from "jsonwebtoken";

// components
import AddOrganization from "./AddOrganization";
import OrganizationView from "./OrganizationView";
import AddClass from "./AddClass";
import ClassView from "./ClassView";

// actions
import {
  getAdminOrganizations,
  addAdminOrganization
} from "../../actions/adminActions";
import {
  getOrganizationClasses,
  addOrganizationClass,
  deleteOrganization,
  activeOrganization,
  getSubscriptionInfo,
  resetState
} from "../../actions/organizationActions";

import {
  setClassForQuery
} from '../../actions'

// styling
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOrg: "",
      activeClass: "",
      activeOrgName: "",
      activeClassName: "",
      activeClassTracking: ""
    };
  }

  componentWillUpdate = (nextProps) => {
    if (nextProps.newOrganization === true) {
      this.props.activeOrganization(nextProps.activeOrganizationID, null)
      this.props.resetState()
    }
    if (nextProps.cancelled === true) {
      this.props.getSubscriptionInfo(null);
      this.props.resetState()
    }
    if (nextProps.newSelection === true && nextProps.subscriptionAdded !== true) {

      this.props.activeOrganization(nextProps.activeOrganizationID, nextProps.stripeCustomerID)
      this.props.getSubscriptionInfo(nextProps.stripeCustomerID)
      // }
      this.props.resetState()
    }
    if (nextProps.subscriptionAdded === true && nextProps.newSelection !== true) {
      this.props.getSubscriptionInfo(this.props.stripeCustomerID);
      this.props.resetState()
      // }

    }
    if (nextProps.deletedClass !== null && this.props.deletedClass !== nextProps.deletedClass) {
      this.props.getOrganizationClasses({id: this.state.activeOrg});
      this.setState({
        activeOrg: this.state.activeOrg,
        activeOrgName: this.state.activeOrgName,
        activeClass: "",
        activeClassName: ""
      });
    }
    if (nextProps.updatedClass !== null && this.props.updatedClass !== nextProps.updatedClass) {
      this.props.getOrganizationClasses({id: this.state.activeOrg});
      this.setState({
        activeOrg: this.state.activeOrg,
        activeOrgName: this.state.activeOrgName,
        activeClass: "",
        activeClassName: ""
      });
    }
    // if (nextProps.studentsAdded === true) {
    // }


  }

  getOrganizations = () => {
    const id = jwt.decode(localStorage.token.split(" ")[1]).id;
    this.props.getAdminOrganizations({id});
  };

  getClasses = () => {
    this.props.getOrganizationClasses({id: this.state.activeOrg});
  };

  getClasses = id => {
    if (id) {
      this.props.getOrganizationClasses({id});
    } else {
      this.props.getOrganizationClasses({id: this.state.activeOrg});
    }
  };

  handleOrgMenuClick = (e, {id, name, stripe}) => {
    this.setState({
      activeOrg: id,
      activeOrgName: name,
      activeClass: "",
      activeClassName: ""
    });
    console.log(id, name, stripe);
    if (name !== "addOrg") {
      if (stripe) {
        this.props.activeOrganization(id, stripe);
      }
      if (stripe === null) {
        this.props.activeOrganization(id, null);
      }
    }

    this.props.newOrgErrors.name = "";
  };

  handleClassMenuClick = (e, { id, name, trackingdate }) => {
    this.setState({
      activeClass: id,
      activeClassName: name,
      activeClassTracking: trackingdate
    });
    this.props.newClassErrors.name = "";
    this.props.setClassForQuery(null, null);
  };

  componentDidUpdate = (prevProps, prevState) => {
    // No Organizations -> Showing add organization component
    if (
      !this.props.organizations.length &&
      this.state.activeOrg !== "addOrg" &&
      !this.props.createdOrganization._id
    ) {
      this.handleOrgMenuClick(null, {id: "addOrg", name: "addOrg"});
    }

    // Admin has Organization(s) -> Showing the first
    if (this.props.organizations.length && this.state.activeOrg === "") {
      this.handleOrgMenuClick(null, {
        id: this.props.organizations[0]._id,
        name: this.props.organizations[0].name,
        stripe: this.props.organizations[0].stripeCustomerID
      });
    }

    // New Organization created -> Updating Organizations and showing newest
    if (
      this.props.createdOrganization._id &&
      this.props.createdOrganization !== prevProps.createdOrganization
    ) {
      this.handleOrgMenuClick(null, {
        id: this.props.createdOrganization._id,
        name: this.props.createdOrganization.name
      });
      this.getOrganizations();
    }

    // Organization deleted -> Updating Organization
    if (
      this.props.deletedOrganization._id &&
      prevProps.deletedOrganization !== this.props.deletedOrganization
    ) {
      if (this.props.organizations.length > 1) {
        if (
          this.props.organizations[0]._id !== this.props.deletedOrganization._id
        ) {
          this.handleOrgMenuClick(null, {
            id: this.props.organizations[0]._id,
            name: this.props.organizations[0].name
          });
        } else {
          this.handleOrgMenuClick(null, {
            id: this.props.organizations[1]._id,
            name: this.props.organizations[1].name
          });
        }
      } else {
        this.handleOrgMenuClick(null, {id: "addOrg", name: "addOrg"});
      }
      this.getOrganizations();
    }

    // Selected Organization was changed -> Updating Classes
    if (
      this.state.activeOrg !== "" &&
      this.state.activeOrg !== "addOrg" &&
      this.state.activeOrg !== prevState.activeOrg
    ) {
      this.getClasses();
    }

    // New Class created -> Updating Classes
    if (
      this.props.createdClass._id &&
      this.props.createdClass !== prevProps.createdClass
    ) {
      this.getClasses();
      this.handleClassMenuClick(null, {
        id: this.props.createdClass._id,
        name: this.props.createdClass.name
      });
    }
  };

  componentDidMount = () => {
    this.getOrganizations();
  };

  render() {
    const {activeOrg, activeClass} = this.state;
    return (
      <Container className="myDashboard">
        <Grid>
          <Grid.Column width={5}>
            <Menu size="massive" fluid vertical color="blue">
              <Menu.Item>
                <Menu.Header>
                  {this.props.organizations.length
                    ? "Organizations"
                    : "You aren't a part of any organizations yet"}
                </Menu.Header>
                <Menu.Menu>
                  {this.props.organizations.map((org, index) => {
                    return (
                      <Transition
                        key={index}
                        transitionOnMount={
                          this.props.createdOrganization._id === org._id
                        }
                        animation="swing down"
                        duration={1000}
                        unmountOnHide
                      >
                        <Menu.Item
                          name={org.name}
                          id={org._id}
                          stripe={org.stripeCustomerID}
                          active={activeOrg === org._id}
                          onClick={this.handleOrgMenuClick}
                        >
                          {org.name}
                          {org.name === this.props.createdOrganization.name ? (
                            <Label color="teal">Newest</Label>
                          ) : null}
                        </Menu.Item>
                      </Transition>
                    );
                  })}
                  <Menu.Item
                    content="Add a new organization"
                    icon="add"
                    name="addOrg"
                    id="addOrg"
                    active={activeOrg === "addOrg"}
                    onClick={this.handleOrgMenuClick}
                  />
                </Menu.Menu>
              </Menu.Item>
              {this.state.activeOrg && this.state.activeOrg !== "addOrg" ? (
                <Menu.Item>
                  <Menu.Header>
                    {!this.props.orgClasses.length
                      ? `${this.state.activeOrgName} currently has no classes`
                      : "Classes"}
                  </Menu.Header>
                  <Menu.Menu>
                    {this.props.orgClasses.map((aClass, index) => {
                      return (
                        <Transition
                          key={index}
                          transitionOnMount={
                            this.props.createdClass._id === aClass._id
                              ? true
                              : false
                          }
                          animation="swing down"
                          duration={1000}
                        >
                          <Menu.Item
                            id={aClass._id}
                            name={aClass.name}
                            trackingdate={aClass.trackingDate}
                            active={activeClass === aClass._id}
                            onClick={this.handleClassMenuClick}
                          >
                            {aClass.name}
                            {this.props.createdClass._id === aClass._id ? (
                              <Label color="teal">Newest</Label>
                            ) : null}
                          </Menu.Item>
                        </Transition>
                      );
                    })}
                    <Menu.Item
                      content="Add a new class"
                      icon="add"
                      id="addClass"
                      active={activeClass === "addClass"}
                      onClick={this.handleClassMenuClick}
                    />
                  </Menu.Menu>
                </Menu.Item>
              ) : null}
            </Menu>
          </Grid.Column>
          <Grid.Column width={11}>
            {/* ADD ORGANIZATION VIEW */}
            {activeOrg === "addOrg" ? (
              <AddOrganization
                addOrg={this.props.addAdminOrganization}
                addOrgErrors={this.props.newOrgErrors}
                getOrgs={this.props.getAdminOrganizations}
              />
            ) : null}

            {/* ORGANIZATION VIEW */}
            {activeOrg !== "" &&
            activeOrg !== "addOrg" &&
            activeClass === "" ? (
              <OrganizationView
                id={this.state.activeOrg}
                name={this.state.activeOrgName}
                numOfClasses={this.props.orgClasses.length}
                delete={this.props.deleteOrganization}
              />
            ) : null}

            {/* ADD CLASS VIEW */}
            {activeClass === "addClass" ? (
              <AddClass
                orgId={this.state.activeOrg}
                orgName={this.state.activeOrgName}
                addClass={this.props.addOrganizationClass}
                addClassErrors={this.props.newClassErrors}
              />
            ) : null}

            {/* CLASS VIEW */}
            {activeClass !== "" && activeClass !== "addClass" ? (
              <ClassView
                classId={this.state.activeClass}
                className={this.state.activeClassName}
                trackingDate={this.state.activeClassTracking}
                props={this.props}
              />
            ) : null}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizations: state.adminOrganizations,
    newOrgErrors: state.newOrganizationErrors,
    createdOrganization: state.createdOrganization,
    deletedOrganization: state.deletedOrganization,
    stripeCustomerID: state.stripeCustomerID,
    orgClasses: state.organizationClasses,
    newClassErrors: state.newClassErrors,
    createdClass: state.createdClass,
    cancelled: state.cancelled,
    activeOrganizationID: state.activeOrganization,
    newOrganization: state.newOrganization,
    newSelection: state.newSelection,
    subscriptionAdded: state.subscriptionAdded,
    studentsAdded: state.studentsAdded,
    deletedClass: state.deletedClass,
    updatedClass: state.updatedClass
  };
};

export default connect(
  mapStateToProps,
  {
    getAdminOrganizations,
    addAdminOrganization,
    deleteOrganization,
    getOrganizationClasses,
    addOrganizationClass,
    activeOrganization,
    getSubscriptionInfo,
    resetState,
    setClassForQuery
  }
)(Dashboard);
