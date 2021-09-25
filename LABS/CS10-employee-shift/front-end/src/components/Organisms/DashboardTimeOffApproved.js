import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { getRequestOffs } from "../../store/requestOff/actions.js";

import { Segment, Header, Label } from "semantic-ui-react";
import { TimeOffApprovedContainer } from "../../styles/Dashboard.js";

class TimeOffApproved extends Component {
  state = {
    start_datetime: "2018-10-30T00:00:00",
    end_datetime: "2018-10-30T00:00:00",
  };

  componentDidMount() {
    this.props.getRequestOffs();
  }

  render() {
    return (
      <TimeOffApprovedContainer>
        <Header>TimeOffApproved</Header>
        <Segment style={{ width: "80%", minHeight: "60vh" }}>
          {this.props.allRequestOffs
            .slice()
            .sort(function(a, b) {
              if (a.start_datetime > b.start_datetime) return 1;
              else return -1;
            })
            .map((requestOff, index) => {
              if (
                // TODO: handle is_open shift
                requestOff.status === "A" &&
                requestOff.end_datetime >
                  moment()
                    .utc()
                    .format()
              )
                return (
                  <Segment.Group key={index}>
                    <Segment>
                      <Label>Start :</Label>
                      {moment(requestOff.start_datetime).format(
                        "MMM Do h:mm a"
                      )}
                    </Segment>
                    <Segment>
                      <Label>End :</Label>
                      {moment(requestOff.end_datetime).format("MMM Do h:mm a")}
                    </Segment>
                    {requestOff.notes ? (
                      <Segment>
                        <Label>Notes :</Label>
                        {requestOff.notes}
                      </Segment>
                    ) : null}
                  </Segment.Group>
                );
              else return null;
            })}
        </Segment>
      </TimeOffApprovedContainer>
    );
  }
}
//moment().isAfter
const mapStateToProps = state => {
  return {
    allRequestOffs: state.requestOff.allRequestOffs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRequestOffs: () => {
      return dispatch(getRequestOffs());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeOffApproved);
