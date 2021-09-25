import React, { Component } from "react";
import { connect } from "react-redux";

import Moment from "moment";
import { extendMoment } from "moment-range";

import { getShifts } from "../../store/Shift/actions.js";
import { getAllProfiles } from "../../store/Profile/actions.js";
import { getHoursOfOperation } from "../../store/hourOfOperation/actions.js";
import { getRequestOffs } from "../../store/requestOff/actions.js";
import { getAvailabilities } from "../../store/Availability/actions.js";

import CalendarTopNav from "../Organisms/CalendarTopNav.js";
import ScheduleShift from "../Organisms/CalendarShift.js";
import ScheduleShiftUpdate from "../Organisms/CalendarShiftUpdate.js";

import {
  GridItemHeader,
  GridItemHeaderDay,
  GridItemHeaderDate,
  GridItemEmployee,
  GridItemOpenShift,
  GridContainer,
  GridItemOpenShiftHeader,
  ProfileIcon,
  ScheduleShiftGap,
  ScheduleShiftGapHeader,
  CalendarContainer,
  ScheduleClosedDay,
  ScheduleTimeOff,
} from "../../styles/Calendar.js";
import { Label } from "semantic-ui-react";

const moment = extendMoment(Moment);

// TODO: Make me more stylish
// TODO: Span shifts to multiple days

const dayLookupTable = {
  M: 1,
  T: 2,
  W: 3,
  R: 4,
  F: 5,
  S: 6,
  U: 7,
};

class Calendar extends Component {
  state = {
    date: moment().format(),
  };

  componentDidMount() {
    this.props.getAllProfiles();
    this.props.getShifts();
    this.props.getHoursOfOperation();
    this.props.getRequestOffs();
    this.props.getAvailabilities();
  }

  handleChangeDate = direction => {
    const newDate = moment(this.state.date);
    if (direction) newDate.add(7, "day");
    else newDate.subtract(7, "day");
    this.setState({ date: newDate.format() });
  };

  fillGrid = employees => {
    // This function takes the number of employees and fills the body of the table
    // There are 7 columns (First column is the row headers)
    // Rows = employees + 2 (one for column headers, one for open shifts)
    const output = [];
    for (let column = 2; column <= 7 + 1; column++) {
      for (let row = 2; row <= employees + 2; row++) {
        output.push(
          <ScheduleShift
            key={`${row}-${column}`}
            handleClick={this.handleClick}
            row={row}
            date={moment(this.state.date)
              .day(column - 1)
              .format()}
            profile={row > 2 ? this.props.allProfiles[row - 3].id : null}
          />
        );
      }
    }
    return output;
  };

  findGaps = () => {
    // This function takes the shifts in the current week and compares it against the HoO to find any gaps
    const currentDate = moment(this.state.date);
    const shiftsByDay = [[], [], [], [], [], [], []];
    const gapsByDay = [[], [], [], [], [], [], []];

    // Sorts shifts by day of the week
    // TODO: refactor this out to component scope so it isn't run twice
    this.props.allShifts.forEach((shift, index) => {
      const momentStart = moment(shift.start_datetime);
      const shiftInCurrentWeek = momentStart.isBetween(
        currentDate
          .clone()
          .day(1)
          .set({ hour: 0, minute: 0, "second:": 0, millisecond: 0 }),
        currentDate
          .clone()
          .day(7)
          .set({ hour: 23, minute: 59, "second:": 59, millisecond: 999 })
      );

      if (shift.profile && shiftInCurrentWeek) {
        const weekday = momentStart.isoWeekday();
        shiftsByDay[weekday - 1].push(
          moment.range(momentStart, moment(shift.end_datetime))
        );
      }
    });

    function getGapsFromRangesArray(start_time, end_time, ranges, index) {
      const HoO_start = currentDate
        .clone()
        .second(Number(`${start_time[6]}${start_time[7]}`))
        .minute(Number(`${start_time[3]}${start_time[4]}`))
        .hour(Number(`${start_time[0]}${start_time[1]}`))
        .isoWeekday(index);
      const HoO_end = currentDate
        .clone()
        .second(Number(`${end_time[6]}${end_time[7]}`))
        .minute(Number(`${end_time[3]}${end_time[4]}`))
        .hour(Number(`${end_time[0]}${end_time[1]}`))
        .isoWeekday(index);
      if (!ranges.length) {
        gapsByDay[index - 1].push(moment.range(HoO_start, HoO_end));
        return;
      }

      // Join together shifts for the day
      const sortedRanges = ranges.slice().sort(function(a, b) {
        if (a.start.format() > b.start.format()) return 1;
        else return -1;
      });

      const joinedRanges = [sortedRanges.shift()];
      while (sortedRanges.length) {
        const head = sortedRanges.shift();
        if (
          head.overlaps(joinedRanges[joinedRanges.length - 1], {
            adjacent: true,
          })
        ) {
          const newTail = joinedRanges.pop();
          joinedRanges.push(newTail.add(head, { adjacent: true }));
        } else joinedRanges.push(head);
      }

      // TODO: Maybe handle shifts out of HoO here
      // push gaps between shifts to day of gapsByDay using the day's index
      if (joinedRanges.length) {
        // If shift covers HoO_start
        if (HoO_start >= joinedRanges[0].start) {
          // and covers HoO_end in one shift, there are no gaps
          if (
            HoO_end <= joinedRanges[[joinedRanges.length - 1]].end &&
            joinedRanges.length === 1
          )
            return;

          // otherwise find gaps in between shifts
          for (let i = 0; i < joinedRanges.length - 1; i++) {
            gapsByDay[index - 1].push(
              moment.range(joinedRanges[i].end, joinedRanges[i + 1].start)
            );
          }
          // if HoO_end is not covered, find end gap
          if (HoO_end > joinedRanges[[joinedRanges.length - 1]].end)
            gapsByDay[index - 1].push(
              moment.range(joinedRanges[joinedRanges.length - 1].end, HoO_end)
            );
        }

        // If shift doesn't cover HoO_start, but covers HoO_end, find gaps between shifts
        else if (HoO_end <= joinedRanges[joinedRanges.length - 1].end) {
          gapsByDay[index - 1].push(
            moment.range(HoO_start, joinedRanges[0].start)
          );
          for (let i = 0; i < joinedRanges.length - 1; i++) {
            gapsByDay[index - 1].push(
              moment.range(joinedRanges[i].end, joinedRanges[i + 1].start)
            );
          }
        }

        // If shift doesn't cover HoO_start or HoO_end, find gaps between shifts
        else {
          gapsByDay[index - 1].push(
            moment.range(HoO_start, joinedRanges[0].start)
          );
          for (let i = 0; i < joinedRanges.length - 1; i++) {
            gapsByDay[index - 1].push(
              moment.range(joinedRanges[i].end, joinedRanges[i + 1].start)
            );
          }
          gapsByDay[index - 1].push(
            moment.range(joinedRanges[joinedRanges.length - 1].end, HoO_end)
          );
        }
      }
    }

    this.props.allHoOs.forEach(HoO => {
      if (HoO.is_open) {
        getGapsFromRangesArray(
          HoO.open_time,
          HoO.close_time,
          shiftsByDay[dayLookupTable[HoO.day] - 1],
          dayLookupTable[HoO.day]
        );
      }
    });
    return gapsByDay;
  };

  fillClosedDays = () => {
    const hoosByDay = [[], [], [], [], [], [], []];

    this.props.allHoOs.forEach(hoo => {
      hoosByDay[dayLookupTable[hoo.day] - 1].push(hoo);
    });
    return hoosByDay;
  };

  render() {
    const currentDate = moment(this.state.date);
    return (
      <CalendarContainer>
        <CalendarTopNav
          changeDate={this.handleChangeDate}
          displayDate={this.state.date}
        />
        <GridContainer rows={this.props.allProfiles.length + 2}>
          {/* TODO: Refactor into molecules - Column Header */}
          <GridItemHeader column="1" />
          {/* TODO: Refactor - Dynamic */}
          <GridItemHeader column="2">
            <GridItemHeaderDay>Monday</GridItemHeaderDay>
            <GridItemHeaderDate>
              {
                moment(this.state.date)
                  .day(1)
                  .toObject().date
              }
            </GridItemHeaderDate>
          </GridItemHeader>
          <GridItemHeader column="3">
            <GridItemHeaderDay>Tuesday</GridItemHeaderDay>
            <GridItemHeaderDate>
              {
                moment(this.state.date)
                  .day(2)
                  .toObject().date
              }
            </GridItemHeaderDate>
          </GridItemHeader>
          <GridItemHeader column="4">
            <GridItemHeaderDay>Wednesday</GridItemHeaderDay>
            <GridItemHeaderDate>
              {
                moment(this.state.date)
                  .day(3)
                  .toObject().date
              }
            </GridItemHeaderDate>
          </GridItemHeader>
          <GridItemHeader column="5">
            <GridItemHeaderDay>Thursday</GridItemHeaderDay>
            <GridItemHeaderDate>
              {
                moment(this.state.date)
                  .day(4)
                  .toObject().date
              }
            </GridItemHeaderDate>
          </GridItemHeader>
          <GridItemHeader column="6">
            <GridItemHeaderDay>Friday</GridItemHeaderDay>
            <GridItemHeaderDate>
              {
                moment(this.state.date)
                  .day(5)
                  .toObject().date
              }
            </GridItemHeaderDate>
          </GridItemHeader>
          <GridItemHeader column="7">
            <GridItemHeaderDay>Saturday</GridItemHeaderDay>
            <GridItemHeaderDate>
              {
                moment(this.state.date)
                  .day(6)
                  .toObject().date
              }
            </GridItemHeaderDate>
          </GridItemHeader>
          <GridItemHeader column="8">
            <GridItemHeaderDay>Sunday</GridItemHeaderDay>
            <GridItemHeaderDate>
              {
                moment(this.state.date)
                  .day(7)
                  .toObject().date
              }
            </GridItemHeaderDate>
          </GridItemHeader>

          {/* TODO: Refactor into molecules - Row Header  */}
          <GridItemEmployee row="1" />
          <GridItemOpenShift row="2">
            <GridItemOpenShiftHeader>Open Shifts</GridItemOpenShiftHeader>
          </GridItemOpenShift>
          {this.props.allProfiles.map((profile, index) => {
            let shiftCount = 0;
            this.props.allShifts.forEach((shift, index) => {
              const shiftInCurrentWeek = moment(shift.start_datetime).isBetween(
                currentDate
                  .clone()
                  .day(1)
                  .set({ hour: 0, minute: 0, "second:": 0, millisecond: 0 }),
                currentDate
                  .clone()
                  .day(7)
                  .set({
                    hour: 23,
                    minute: 59,
                    "second:": 59,
                    millisecond: 999,
                  })
              );
              if (shiftInCurrentWeek && shift.profile === profile.id) {
                shiftCount++;
              }
            });
            return (
              <GridItemEmployee
                row={index + 3}
                key={profile.user.last_name + index}
              >
                <ProfileIcon hue={240 - (index % 10) * 36}>
                  {shiftCount}
                </ProfileIcon>
                <h5>
                  {profile.user.first_name} {profile.user.last_name}
                </h5>
              </GridItemEmployee>
            );
          })}

          {/* TODO: Refactor into molecules - Body */}
          {/* Fills Grid with empty squares that add shifts when clicked */}
          {this.fillGrid(this.props.allProfiles.length)}

          {/* Maps Grid with the current week's shifts that update shift when clicked*/}
          {this.props.allShifts.map((shift, index) => {
            const shiftInCurrentWeek = moment(shift.start_datetime).isBetween(
              currentDate
                .clone()
                .day(1)
                .set({ hour: 0, minute: 0, "second:": 0, millisecond: 0 }),
              currentDate
                .clone()
                .day(7)
                .set({ hour: 23, minute: 59, "second:": 59, millisecond: 999 })
            );
            if (shiftInCurrentWeek) {
              const profileRow =
                this.props.allProfiles.indexOf(
                  this.props.allProfiles.filter(
                    profile => profile.id === shift.profile
                  )[0]
                ) + 3;
              const currentDayAvailability = this.props.allAvailabilities.filter(
                availability =>
                  availability.profile === shift.profile &&
                  dayLookupTable[availability.day] ===
                    moment(shift.start_datetime).isoWeekday()
              );
              console.log(
                currentDayAvailability[0],
                moment(shift.start_datetime).format("k:mm:ss"),
                moment(shift.end_datetime).format("k:mm:ss")
              );
              // TODO: better errors on conflict, floating tooltip with conflict times
              const hasScheduleConflict = currentDayAvailability.length
                ? !(
                    currentDayAvailability[0].start_time <=
                      moment(shift.start_datetime).format("k:mm:ss") &&
                    currentDayAvailability[0].end_time >=
                      moment(shift.end_datetime).format("k:mm:ss")
                  )
                : true;
              return (
                <ScheduleShiftUpdate
                  hue={profileRow ? 240 - ((profileRow - 3) % 10) * 36 : 102}
                  key={shift.id}
                  row={profileRow}
                  // TODO: add span to second day
                  column={moment(shift.start_datetime).isoWeekday() + 1}
                  startHour={moment(shift.start_datetime).hour()}
                  endHour={moment(shift.end_datetime).hour()}
                  start={shift.start_datetime}
                  end={shift.end_datetime}
                  notes={shift.notes}
                  profile={shift.profile}
                  id={shift.id}
                  conflict={hasScheduleConflict}
                />
              );
            } else return null;
          })}

          {/* Renders approved employee requests off */}
          {this.props.allRequestOffs.map((requestOff, index) => {
            if (requestOff.status === "A") {
              const startMoment = moment(requestOff.start_datetime);
              const startInCurrentWeek = startMoment.isBetween(
                currentDate
                  .clone()
                  .day(1)
                  .set({ hour: 0, minute: 0, "second:": 0, millisecond: 0 }),
                currentDate
                  .clone()
                  .day(7)
                  .set({
                    hour: 23,
                    minute: 59,
                    "second:": 59,
                    millisecond: 999,
                  })
              );
              const endMoment = moment(requestOff.end_datetime);
              const endInCurrentWeek = endMoment.isBetween(
                currentDate
                  .clone()
                  .day(1)
                  .set({ hour: 0, minute: 0, "second:": 0, millisecond: 0 }),
                currentDate
                  .clone()
                  .day(7)
                  .set({
                    hour: 23,
                    minute: 59,
                    "second:": 59,
                    millisecond: 999,
                  })
              );
              if (startInCurrentWeek || endInCurrentWeek) {
                const profileRow =
                  this.props.allProfiles.indexOf(
                    this.props.allProfiles.filter(
                      profile => profile.id === requestOff.profile
                    )[0]
                  ) + 3;
                return (
                  <ScheduleTimeOff
                    row={profileRow}
                    startColumn={
                      startInCurrentWeek ? startMoment.isoWeekday() : false
                    }
                    endColumn={
                      endInCurrentWeek ? endMoment.isoWeekday() : false
                    }
                    key={`timeoff ${index}`}
                  >
                    Time Off
                  </ScheduleTimeOff>
                );
              }
            }
            return null;
          })}

          {/* Renders Gaps in the business account's Hours of Operations versus what shifts are scheduled */}
          {this.findGaps().map((dayOfGaps, index) => {
            const renderedGaps = [];
            if (dayOfGaps.length) {
              for (let i = 0; i < dayOfGaps.length; i++) {
                renderedGaps.push(
                  <ScheduleShiftGap
                    key={`gap ${index}-${i}`}
                    column={index + 2}
                    start={dayOfGaps[i].start.hour()}
                    end={dayOfGaps[i].end.hour()}
                    height={this.props.allProfiles.length}
                  />
                );
                renderedGaps.push(
                  <ScheduleShiftGapHeader
                    key={`gaphead ${index}-${i}`}
                    column={index + 2}
                  >
                    <Label
                      color="red"
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      {`Fill ${dayOfGaps[i].start.format(
                        "h:mm A"
                      )} to ${dayOfGaps[i].end.format("h:mm A")}`}
                    </Label>
                  </ScheduleShiftGapHeader>
                );
              }
            }
            return renderedGaps;
          })}

          {/* Turns columns grey if the business account has no Hours of Operation for that day */}
          {this.fillClosedDays().map((day, index) => {
            if (day.length === 0) {
              return (
                <div key={`closed ${index}-${index}`}>
                  <ScheduleClosedDay
                    column={index + 2}
                    height={this.props.allProfiles.length}
                  />
                  <ScheduleShiftGapHeader column={index + 2}>
                    <Label
                      style={{ width: "100%", textAlign: "center" }}
                      color="grey"
                    >
                      CLOSED
                    </Label>
                  </ScheduleShiftGapHeader>
                </div>
              );
            } else return null;
          })}
        </GridContainer>
      </CalendarContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    allShifts: state.shift.allShifts,
    allProfiles: state.profile.allProfiles,
    allHoOs: state.hourOfOperation.allHoOs,
    allRequestOffs: state.requestOff.allRequestOffs,
    allAvailabilities: state.availability.allAvailabilities,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getShifts: () => {
      return dispatch(getShifts());
    },
    getAllProfiles: () => {
      return dispatch(getAllProfiles());
    },
    getHoursOfOperation: () => {
      return dispatch(getHoursOfOperation());
    },
    getAvailabilities: () => {
      return dispatch(getAvailabilities());
    },
    getRequestOffs: () => {
      return dispatch(getRequestOffs());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
