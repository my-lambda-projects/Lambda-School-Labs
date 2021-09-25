import React from "react";

import Availability from "../Atoms/Availability.js";
import PostAvailability from "../Atoms/PostAvailability.js";

import {
  GridContainer,
  RowHeader,
  HorizontalContainer,
} from "../../styles/Employees.js";
import { Segment } from "semantic-ui-react";

const EmployeeAvailability = props => {
  const fillTimes = () => {
    const availabilityByDay = [[], [], [], [], [], [], []];

    const dayLookupTable = {
      M: 1,
      T: 2,
      W: 3,
      R: 4,
      F: 5,
      S: 6,
      U: 7,
    };

    const sorted = props.availability.slice().sort(function(a, b) {
      if (a.open_time > b.open_time) return 1;
      else return -1;
    });

    sorted.forEach((availability, index) => {
      availabilityByDay[dayLookupTable[availability.day] - 1].push(
        availability
      );
    });
    return availabilityByDay;
  };

  const times = fillTimes();

  return (
    <Segment>
      <GridContainer>
        <RowHeader row={1}>Monday</RowHeader>
        <HorizontalContainer row={1}>
          {times[0].map((time, index) => {
            return (
              <Availability
                type="availability"
                id={time.id}
                profile={time.profile}
                day={time.day}
                start_time={time.start_time}
                end_time={time.end_time}
                key={time.day + index}
              />
            );
          })}
        </HorizontalContainer>
        <PostAvailability
          row={2}
          profile={props.profile}
          type="availability"
          day="M"
        />

        <RowHeader row={3}>Tuesday</RowHeader>
        <HorizontalContainer row={3}>
          {times[1].map((time, index) => {
            return (
              <Availability
                type="availability"
                id={time.id}
                profile={time.profile}
                day={time.day}
                start_time={time.start_time}
                end_time={time.end_time}
                key={time.day + index}
              />
            );
          })}
        </HorizontalContainer>
        <PostAvailability
          row={4}
          profile={props.profile}
          type="availability"
          day="T"
        />

        <RowHeader row={5}>Wednesday </RowHeader>
        <HorizontalContainer row={5}>
          {times[2].map((time, index) => {
            return (
              <Availability
                type="availability"
                id={time.id}
                profile={time.profile}
                day={time.day}
                start_time={time.start_time}
                end_time={time.end_time}
                key={time.day + index}
              />
            );
          })}
        </HorizontalContainer>
        <PostAvailability
          row={6}
          profile={props.profile}
          type="availability"
          day="W"
        />

        <RowHeader row={7}>Thursday</RowHeader>
        <HorizontalContainer row={7}>
          {times[3].map((time, index) => {
            return (
              <Availability
                type="availability"
                id={time.id}
                profile={time.profile}
                day={time.day}
                start_time={time.start_time}
                end_time={time.end_time}
                key={time.day + index}
              />
            );
          })}
        </HorizontalContainer>
        <PostAvailability
          row={8}
          profile={props.profile}
          type="availability"
          day="R"
        />

        <RowHeader row={9}>Friday</RowHeader>
        <HorizontalContainer row={9}>
          {times[4].map((time, index) => {
            return (
              <Availability
                type="availability"
                id={time.id}
                profile={time.profile}
                day={time.day}
                start_time={time.start_time}
                end_time={time.end_time}
                key={time.day + index}
              />
            );
          })}
        </HorizontalContainer>
        <PostAvailability
          row={10}
          profile={props.profile}
          type="availability"
          day="F"
        />

        <RowHeader row={11}>Saturday</RowHeader>
        <HorizontalContainer row={11}>
          {times[5].map((time, index) => {
            return (
              <Availability
                type="availability"
                id={time.id}
                profile={time.profile}
                day={time.day}
                start_time={time.start_time}
                end_time={time.end_time}
                key={time.day + index}
              />
            );
          })}
        </HorizontalContainer>
        <PostAvailability
          row={12}
          profile={props.profile}
          type="availability"
          day="S"
        />

        <RowHeader row={13}>Sunday</RowHeader>
        <HorizontalContainer row={13}>
          {times[6].map((time, index) => {
            return (
              <Availability
                type="availability"
                id={time.id}
                profile={time.profile}
                day={time.day}
                start_time={time.start_time}
                end_time={time.end_time}
                key={time.day + index}
              />
            );
          })}
        </HorizontalContainer>
        <PostAvailability
          row={14}
          profile={props.profile}
          type="availability"
          day="U"
        />
      </GridContainer>
    </Segment>
  );
};

export default EmployeeAvailability;
