import React, { Component } from "react";
import { connect } from "react-redux";

import { updateHoursOfOperation } from "../../store/hourOfOperation/actions.js";

import Availability from "../Atoms/Availability.js";
import PostAvailability from "../Atoms/PostAvailability.js";

import {
  AdminHoursContainer,
  GridContainer,
  RowHeader,
  HorizontalContainer,
} from "../../styles/Admin.js";
import { Segment, Header, Divider } from "semantic-ui-react";

class AdminHours extends Component {
  fillTimes = () => {
    const hoosByDay = [[], [], [], [], [], [], []];

    const dayLookupTable = {
      M: 1,
      T: 2,
      W: 3,
      R: 4,
      F: 5,
      S: 6,
      U: 7,
    };

    const sorted = this.props.allHoOs.slice().sort(function(a, b) {
      if (a.open_time > b.open_time) return 1;
      else return -1;
    });

    sorted.forEach((hoo, index) => {
      hoosByDay[dayLookupTable[hoo.day] - 1].push(hoo);
    });
    return hoosByDay;
  };

  render() {
    return (
      <AdminHoursContainer>
        <Segment padded="very">
          <Header textAlign="center">Hours of Operation</Header>
          <Divider />
          <GridContainer>
            <RowHeader row={1}>Monday</RowHeader>
            <HorizontalContainer row={1}>
              {this.props.times[0].map((time, index) => {
                // BUG: HoOs not updating correctly
                return (
                  <Availability
                    type="hoursOfOperation"
                    id={time.id}
                    day={time.day}
                    start_time={time.open_time}
                    end_time={time.close_time}
                    key={time.day + index}
                  />
                );
              })}
            </HorizontalContainer>
            <PostAvailability row={2} type="hoursOfOperation" day="M" />

            <RowHeader row={3}>Tuesday</RowHeader>
            <HorizontalContainer row={3}>
              {this.props.times[1].map((time, index) => {
                return (
                  <Availability
                    type="hoursOfOperation"
                    id={time.id}
                    day={time.day}
                    start_time={time.open_time}
                    end_time={time.close_time}
                    key={time.day + index}
                  />
                );
              })}
            </HorizontalContainer>
            <PostAvailability row={4} type="hoursOfOperation" day="T" />

            <RowHeader row={5}>Wednesday</RowHeader>
            <HorizontalContainer row={5}>
              {this.props.times[2].map((time, index) => {
                return (
                  <Availability
                    type="hoursOfOperation"
                    id={time.id}
                    day={time.day}
                    start_time={time.open_time}
                    end_time={time.close_time}
                    key={time.day + index}
                  />
                );
              })}
            </HorizontalContainer>
            <PostAvailability row={6} type="hoursOfOperation" day="W" />

            <RowHeader row={7}>Thursday</RowHeader>
            <HorizontalContainer row={7}>
              {this.props.times[3].map((time, index) => {
                return (
                  <Availability
                    type="hoursOfOperation"
                    id={time.id}
                    day={time.day}
                    start_time={time.open_time}
                    end_time={time.close_time}
                    key={time.day + index}
                  />
                );
              })}
            </HorizontalContainer>
            <PostAvailability row={8} type="hoursOfOperation" day="R" />

            <RowHeader row={9}>Friday</RowHeader>
            <HorizontalContainer row={9}>
              {this.props.times[4].map((time, index) => {
                return (
                  <Availability
                    type="hoursOfOperation"
                    id={time.id}
                    day={time.day}
                    start_time={time.open_time}
                    end_time={time.close_time}
                    key={time.day + index}
                  />
                );
              })}
            </HorizontalContainer>
            <PostAvailability row={10} type="hoursOfOperation" day="F" />

            <RowHeader row={11}>Saturday</RowHeader>
            <HorizontalContainer row={11}>
              {this.props.times[5].map((time, index) => {
                return (
                  <Availability
                    type="hoursOfOperation"
                    id={time.id}
                    day={time.day}
                    start_time={time.open_time}
                    end_time={time.close_time}
                    key={time.day + index}
                  />
                );
              })}
            </HorizontalContainer>
            <PostAvailability row={12} type="hoursOfOperation" day="S" />

            <RowHeader row={13}>Sunday</RowHeader>
            <HorizontalContainer row={13}>
              {this.props.times[6].map((time, index) => {
                return (
                  <Availability
                    type="hoursOfOperation"
                    id={time.id}
                    day={time.day}
                    start_time={time.open_time}
                    end_time={time.close_time}
                    key={time.day + index}
                  />
                );
              })}
            </HorizontalContainer>
            <PostAvailability row={14} type="hoursOfOperation" day="U" />
          </GridContainer>
        </Segment>
      </AdminHoursContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    allHoOs: state.hourOfOperation.allHoOs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHoursOfOperation: (id, day, open_time, close_time) => {
      return dispatch(updateHoursOfOperation(id, day, open_time, close_time));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminHours);
