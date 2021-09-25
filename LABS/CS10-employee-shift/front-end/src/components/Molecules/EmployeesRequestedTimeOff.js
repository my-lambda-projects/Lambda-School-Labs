import React, { Component } from "react";
import { connect } from "react-redux";

import { updateRequestOff } from "../../store/requestOff/actions.js";

import moment from "moment";

import { EmployeesRequestedTimeOffContainer } from "../../styles/Employees.js";
import { Form, Divider, Checkbox, Accordion, Label } from "semantic-ui-react";

// STATUS_CHOICES = (
//   ('P', 'Pending'),
//   ('C', 'Canceled'),
//   ('A', 'Accepted'),
//   ('E', 'Expired')
// )

class RequestedTimeOff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false,
      value:
        this.props.requestOff.status === "P"
          ? null
          : this.props.requestOff.status === "A"
            ? "A"
            : "C",
    };
  }

  handleSubmit = value => {
    this.props.updateRequestOff(
      this.props.id,
      this.props.profile,
      value,
      this.props.start_datetime,
      this.props.end_datetime,
      this.props.reason
    );
  };

  handleReveal = () => this.setState({ revealed: !this.state.revealed });

  handleChange = (e, { value }) => {
    this.setState({ value });
    this.handleReveal();
    this.handleSubmit(value);
  };

  render() {
    const requestOff = this.props.requestOff;
    return (
      <Accordion onMouseLeave={this.state.revealed ? this.handleReveal : null}>
        <Accordion.Title
          active={this.state.revealed}
          onClick={this.handleReveal}
        >
          <EmployeesRequestedTimeOffContainer>
            <Label
              circular
              empty
              color={
                requestOff.status === "P"
                  ? "yellow"
                  : requestOff.status === "A"
                    ? "green"
                    : "red"
              }
            />
            <div>
              {moment(requestOff.start_datetime).format("MMMM Do, h:mm a")}
            </div>
            <div>-</div>
            <div>
              {moment(requestOff.end_datetime).format("MMMM Do, h:mm a")}
            </div>
          </EmployeesRequestedTimeOffContainer>
        </Accordion.Title>
        <Accordion.Content
          active={this.state.revealed}
          children={
            <EmployeesRequestedTimeOffContainer style={{ paddingTop: "10px" }}>
              <Form>
                <Form.Group widths="equal">
                  <Form.Field>
                    <Checkbox
                      radio
                      label="Approved"
                      name="checkboxRadioGroup"
                      value="A"
                      checked={this.state.value === "A"}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      radio
                      label="Denied"
                      name="checkboxRadioGroup"
                      value="C"
                      checked={this.state.value === "C"}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </EmployeesRequestedTimeOffContainer>
          }
        />
        <Divider />
      </Accordion>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRequestOff: (
      id,
      profile,
      status,
      start_datetime,
      end_datetime,
      notes
    ) => {
      return dispatch(
        updateRequestOff(
          id,
          profile,
          status,
          start_datetime,
          end_datetime,
          notes
        )
      );
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RequestedTimeOff);
