import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { getShifts } from "../../store/Shift/actions.js";

import { AssignedShiftsContainer } from "../../styles/Dashboard.js";
import { Segment, Header, Label } from "semantic-ui-react";

class DashboardAssignedShift extends Component {
  componentDidMount() {
    this.props.getShifts();
  }

  render() {
    return (
      <AssignedShiftsContainer>
        <Header>Assigned Shifts</Header>
        <Segment style={{ width: "80%", minHeight: "60vh" }}>
          {this.props.allShifts
            .slice()
            .sort(function(a, b) {
              if (a.start_datetime > b.start_datetime) return 1;
              else return -1;
            })
            .map((shift, index) => {
              if (
                shift.end_datetime >
                moment()
                  .utc()
                  .format()
              )
                return (
                  <Segment.Group key={index}>
                    <Segment
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Label>Start :</Label>
                      {moment(shift.start_datetime).format("MMM Do h:mm a")}
                    </Segment>
                    <Segment
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Label>End :</Label>
                      {moment(shift.end_datetime).format("MMM Do h:mm a")}
                    </Segment>
                    {shift.notes ? (
                      <Segment
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Label>Notes :</Label>
                        {shift.notes}
                      </Segment>
                    ) : null}
                  </Segment.Group>
                );
              else return null;
            })}
        </Segment>
      </AssignedShiftsContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    allShifts: state.shift.allShifts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getShifts: () => {
      return dispatch(getShifts());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardAssignedShift);
