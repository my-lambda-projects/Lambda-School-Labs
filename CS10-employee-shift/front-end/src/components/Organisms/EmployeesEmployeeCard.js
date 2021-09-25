import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { updateProfile, deleteProfile } from "../../store/Profile/actions.js";

import {
  Card,
  Image,
  Icon,
  Segment,
  Grid,
  Input,
  Button,
  Dropdown,
} from "semantic-ui-react";

import RequestedTimeOff from "../Molecules/EmployeesRequestedTimeOff.js";
import EmployeeAvailability from "../Molecules/EmployeesEmployeeAvailability.js";

class EmployeeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.profile.user.email,
      phone_number: this.props.profile.user.phone_number,
      first_name: this.props.profile.user.first_name,
      last_name: this.props.profile.user.last_name,
      visible: false,
    };
  }

  handleReveal = () => {
    if (!this.state.visible) {
      this.setState({ visible: true });
    } else {
      this.setState({ visible: false });
    }
  };

  handleUpdate = () => {
    this.setState({ visible: false });
    console.log("update");
  };

  handleDelete = () => {
    this.props.deleteProfile(this.props.profile.id);
  };

  render() {
    const profile = this.props.profile;
    return (
      // TODO: REDO grid for media queries
      <Grid columns={3} divided>
        <Grid.Column verticalAlign="middle">
          <Card centered color="blue">
            <Card.Content>
              <div
                style={{
                  width: "100%",
                  height: "20px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {this.state.visible ? (
                  <p
                    style={{ position: "absolute", top: "10px", left: "10px" }}
                  >
                    <Dropdown
                      defaultValue={profile.user.first_name}
                      fluid
                      selection
                      options={[
                        { text: "Employee", value: "Employee" },
                        { text: "Manager", value: "Manager" },
                      ]}
                    />
                  </p>
                ) : null}
                <Icon
                  onClick={this.handleReveal}
                  link
                  name="pencil"
                  color="blue"
                  style={{ marginRight: "8px" }}
                />
                <Icon
                  onClick={this.handleDelete}
                  link
                  color="red"
                  name="trash alternate"
                />
              </div>
              <Image
                floated="left"
                size="tiny"
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              />
              {this.state.visible ? (
                <div>
                  <Input
                    fluid
                    value={this.state.first_name}
                    onChange={this.inputChangeHandler}
                    name="first_name"
                    iconPosition="left"
                    placeholder="First name"
                    style={{ paddingBottom: "10px" }}
                  />
                  <Input
                    fluid
                    value={this.state.last_name}
                    onChange={this.inputChangeHandler}
                    name="last_name"
                    iconPosition="left"
                    placeholder="Last name"
                  />
                </div>
              ) : (
                <Card.Header textAlign="center" style={{ marginTop: "10px" }}>
                  {profile.user.first_name}
                  {"  "}
                  {profile.user.last_name}
                </Card.Header>
              )}
            </Card.Content>
            {this.state.visible ? (
              <Card.Content>
                <Card.Description>
                  <Input
                    fluid
                    value={this.state.email}
                    onChange={this.inputChangeHandler}
                    name="email"
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail address"
                    style={{ paddingBottom: "10px" }}
                  />
                </Card.Description>
                <Card.Description>
                  <Input
                    fluid
                    value={this.state.phone_number}
                    onChange={this.inputChangeHandler}
                    name="phone_number"
                    icon="phone"
                    iconPosition="left"
                    placeholder="Phone number"
                  />
                </Card.Description>
                <Button
                  onClick={this.handleUpdate}
                  fluid
                  color="green"
                  style={{ marginTop: "10px" }}
                >
                  Submit
                </Button>
              </Card.Content>
            ) : (
              <Card.Content>
                <Card.Description style={{ padding: "5%" }}>
                  <Icon name="mail" />
                  {profile.user.email}
                </Card.Description>
                <Card.Description style={{ padding: "5%" }}>
                  <Icon name="phone" />
                  {profile.phone_number}
                </Card.Description>
              </Card.Content>
            )}
          </Card>
        </Grid.Column>
        <Grid.Column>
          <h3>Availability</h3>
          {
            <EmployeeAvailability
              availability={this.props.allAvailabilities.filter(
                availability => availability.profile === profile.id
              )}
              profile={profile.id}
            />
          }
        </Grid.Column>
        <Grid.Column>
          <h3>Requested Time Off</h3>
          <Segment style={{ minHeight: "92%" }}>
            {// TODO: Also filter by dates
            this.props.allRequestOffs
              .filter(requestOff => {
                return (
                  requestOff.profile === profile.id &&
                  moment()
                    .utc()
                    .format() < requestOff.end_datetime
                );
              })
              .map(requestOff => (
                <RequestedTimeOff
                  key={requestOff.id}
                  requestOff={requestOff}
                  profile={profile.id}
                  id={requestOff.id}
                  start_datetime={requestOff.start_datetime}
                  end_datetime={requestOff.end_datetime}
                  reason={requestOff.reason}
                />
              ))}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: data => {
      return dispatch(updateProfile(data));
    },
    deleteProfile: data => {
      return dispatch(deleteProfile(data));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EmployeeCard);
