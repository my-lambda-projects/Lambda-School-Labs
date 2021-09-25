import React, { Component } from "react";
import { Segment, Header, Icon, Form, Label } from "semantic-ui-react";
import {connect} from 'react-redux';
import {activeOrganization} from '../../actions/organizationActions';
import {getAdminOrganizations} from '../../actions/adminActions'
import jwt from "jsonwebtoken";

class AddOrganization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newOrgName: "",
      sent: false
    };
  }

  handleInput = (e, { value }) => {
    this.setState({ newOrgName: value });
    this.props.addOrgErrors.name = "";
  };

  handleSubmit = () => {
    const id = jwt.decode(localStorage.token.split(" ")[1]).id;
    this.props.addOrg({ id, name: this.state.newOrgName });
    this.props.getOrgs({ id });
    this.setState({sent: true})
  };

  // componentWillUpdate(nextProps, nextState) {
  //
  // }


  componentWillUpdate = (nextProps, nextState) => {
    console.log(nextProps.createdOrganization._id)
    if(nextProps.createdOrganization !== null && this.props.createdOrganization !== nextProps.createdOrganization) {
      this.props.activeOrganization(nextProps.createdOrganization._id, null);

    }
  }
  render() {
    return (
      <Segment.Group>
        <Segment inverted color="blue">
          <Header as="h2" icon textAlign="center" size="huge">
            <Icon name="users" circular />
            <Header.Content>Add New Organization</Header.Content>
          </Header>
        </Segment>

        <Segment>
          <Form>
            <Form.Field error={Boolean(this.props.addOrgErrors.name)}>
              {this.props.addOrgErrors.name ? (
                <Label
                  color="red"
                  pointing="below"
                  content={this.props.addOrgErrors.name}
                />
              ) : null}
              <Form.Input
                placeholder="New organization name"
                onChange={this.handleInput}
              />
              <Form.Button
                content="Create my organization"
                color="green"
                onClick={this.handleSubmit}
              />
            </Form.Field>
          </Form>
        </Segment>
      </Segment.Group>
    );
  }
}
const mapStateToProps = state => {
  return {
    createdOrganization: state.createdOrganization
    // stripeCustomerID(pin): null
    // _id(pin): '5b917cd8c8375b42eee39335'
  }
}
export default connect(mapStateToProps, {activeOrganization, getAdminOrganizations})(AddOrganization)
