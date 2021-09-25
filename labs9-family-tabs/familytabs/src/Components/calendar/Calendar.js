import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import styled from "styled-components";
import Header from "../Header";
import ChildPromptModal from "./ChildPromptModal";
import axios from "axios";
import Select from "react-select";
import AddEvent from "./AddEvent";
import EventEdit from "../event-edit/EventEdit";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 1281px) {
    padding: 0;
  }
`;

const StyledTop = styled.div`
  color: white;
  font-size: 64px;
  margin: 0 0 25px 0;
  font-family: "Merriweather", sans-serif;
`;

const StyledBottom = styled.div`
  padding: 0 150px 0 150px;
  display: flex;
  flex-direction: row;
  @media (min-width: 1024px) and (max-width: 1281px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    padding: 0;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    padding: 0;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    padding: 0;
  }
`;

const LeftSide = styled.div`
  width: 85%;
  @media (max-width: 1281px) {
    width: 100%;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  margin: 75px 0 75px 15px;
  @media (max-width: 1281px) {
    margin: 0 0 25px 0;
    width: 100%;
  }
`;

const Button = styled.button`
  color: white;
  background: #242943;
  border: 2px solid #ffffff;
  padding: 15px 50px 15px 50px;
  width: 200px;
  height: 50px;
  :hover {
    border-color: #3985ac;
    color: #3985ac;
    cursor: pointer;
  }
`;

const SelectStyled = styled(Select)`
  margin: 50px 15px 0 0;
  width: 250px;
  @media (max-width: 1281px) {
    margin: auto;
    margin-top: 25px;
    width: 350px;
  }
`;

const StyledCalendar = styled(Calendar)`
  /* play with the inspector in the browser to see what things are called and how best to interact with them. Have fun */
  .rbc-month-view {
    height: 90vh;
  }
  .rbc-day-bg {
    background: white;
  }
  .rbc-row-content {
    z-index: 0;
  }
  /* date number styles in here */
  .rbc-date-cell {
    font-family: "Lato", sans-serif;
    font-size: 17px;
    padding: 5px;
  }
  /* today's date */
  .rbc-month-view .rbc-now {
    background-color: #68659e;
    color: white;
  }
  .rbc-toolbar-label {
    font-family: "Lato", sans-serif;
    color: white;
    font-size: 24px;
    margin: 15px;
  }
  .rbc-header {
    font-family: "Lato", sans-serif;
    padding: 15px;
    font-weight: 300;
    color: white;
  }
  .rbc-btn-group button {
    color: white;
  }
  .rbc-btn-group .rbc-active {
    color: #242943;
  }
  .rbc-time-header {
    background-color: #242943;
  }
  .rbc-time-header .rbc-today {
    color: #242943;
    font-weight: 550;
  }
  .rbc-time-view {
    background-color: white;
  }
  .rbc-calendar .rbc-agenda-view {
    color: white;
    margin: 10px 10px 10px 10px;
  }
  thead {
    width: 100%;
    border: 2px solid red;
    display: none;
    > tr > th {
      border: 2px solid red;
    }
  }
  .rbc-agenda-view .rbc-agenda-empty {
    color: white;
    margin: 10px;
  }
  .rbc-header {
    display: flex;
    justify-content: center;
  }
  @media (max-width: 481px) {
    .rbc-month-view {
      height: 80vh;
    }
  }
`;

const Event = ({ event }) => {
  return (
    <span>
      <p>{event.title}</p>
      <p>{event.participants}</p> <p>{event.particulars}</p>
    </span>
  );
};

class CalendarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTypes: [],
      locations: [],
      participants: [],
      showForm: false,
      pendingEditId: null,
      pendingEdit: {}
    };
  }

  componentDidMount() {
    this.loadState();
  }

  setEdit = id => {
    if (!this.props.profile.isAdmin) {
      return;
    }
    if (id) {
      const pendingEdit = this.props.familyEvents.find(
        event => event.id === id
      );
      this.setState({ pendingEditId: id, pendingEdit });
      return;
    }
    this.setState({ pendingEditId: null, pendingEdit: {} });
  };

  participantToOptions = options =>
    options
      .map(option => {
        return { value: option.id, label: option.userName };
      })
      .concat([
        { value: "pending", label: "Events Pending Approval" },
        { value: "declined", label: "Declined Events" }
      ]);

  setCalendarFilter = (inputValue, { action }) => {
    if (!inputValue.length) {
      this.setState({ participants: [] });
      return;
    }
    let lastType = typeof inputValue[inputValue.length - 1].value;
    this.setState({
      participants: inputValue.filter(input => typeof input.value === lastType)
    });
  };

  addOption = (name, option) => {
    this.setState({ [`${name}s`]: [...this.state[`${name}s`], option] });
  };

  toggleForm = () => {
    this.loadState();
    this.setState({ showForm: !this.state.showForm });
  };

  loadState = async () => {
    const { familyID } = this.props;
    let { locations, eventTypes } = this.state;
    if (!locations.length) {
      locations = await axios.get(
        `${process.env.REACT_APP_API_URL}/location/byfamily/${familyID}`
      );
      this.setState({ locations: locations.data });
    }
    if (!eventTypes.length) {
      eventTypes = await axios.get(
        `${process.env.REACT_APP_API_URL}/eventtype/byfamily/${familyID}`
      );
      this.setState({ eventTypes: eventTypes.data });
    }
  };

  mapToCalendar = events => {
    if (!events.length) {
      return [];
    }
    return events
      .map((event, i) => {
        const {
          address,
          id,
          scheduledEvent_name,
          location_name,
          eventType_name,
          eventStart,
          eventEnd,
          userName,
          userID,
          pendingApproval,
          declined
        } = event;

        let startTime = new Date(moment(eventStart, "YYYYMMDD hh:mm a"));
        let endTime = new Date(moment(eventEnd, "YYYYMMDD hh:mm a"));
        return {
          title: scheduledEvent_name,
          start: startTime,
          end: endTime,
          participants: `${userName.join(", ")}`,
          particulars: `${eventType_name} event at ${location_name} ${
            address ? address : ""
          }`,
          userID,
          id,
          pendingApproval,
          declined
        };
      })
      .filter(event => {
        const { participants } = this.state;
        if (participants.length && typeof participants[0].value === `string`) {
          //checks for pending or declined status and then filters by pending or declined and removes family filters.
          if (
            participants.some(x => x.value === "pending") &&
            event.pendingApproval
          ) {
            return true;
          }
          if (
            participants.some(x => x.value === "declined") &&
            event.declined
          ) {
            return true;
          }
          return false;
        }
        //if pending or declined isn't selected in filter. Pending and declined events removed.
        if (event.pendingApproval || event.declined) {
          return false;
        }
        //if nothing selected, all non pending and non declined events display
        if (!participants.length) {
          return true;
        }
        //otherwise checks events to see if users corespond with people in the filter
        let currentFamilyIDs = participants.map(person => person.value);
        return currentFamilyIDs.some(id => event.userID.includes(id));
      });
  };
  addToCalendar = async eventData => {
    try {
      let addedEvent = await axios.post(
        `${process.env.REACT_APP_API_URL}/event/create`,
        eventData
      );
      addedEvent = {
        ...addedEvent.data[0],
        eventStart: moment(addedEvent.data[0].eventStart, "YYYYMMDD hh:mm a"),
        eventEnd: moment(addedEvent.data[0].eventEnd, "YYYYMMDD hh:mm a")
      };
      return addedEvent;
    } catch (err) {
      console.log(err);
    }
  };

  eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = `#00A3CF`;
    if (event.declined) {
      backgroundColor = "#aa0101";
    }
    if (event.pendingApproval) {
      backgroundColor = "#c4a403";
    }
    const style = {
      backgroundColor
    };
    return {
      style: style
    };
  };

  editedToCalendar = async eventData => {
    try {
      let editedEvent = await axios.put(
        `${process.env.REACT_APP_API_URL}/event/edit${eventData.id}`,
        eventData
      );
      editedEvent = {
        ...editedEvent.data[0],
        eventStart: moment(editedEvent.data[0].eventStart, "YYYYMMDD hh:mm a"),
        eventEnd: moment(editedEvent.data[0].eventEnd, "YYYYMMDD hh:mm a")
      };
      return editedEvent;
    } catch (err) {
      console.log(err);
    }
  };

  toggleFormChild = () => {
    this.setState({ showForm: false });
  };

  render() {
    console.log(this.state.participants);
    let events = this.mapToCalendar(this.props.familyEvents);

    return (
      <StyledMain>
        <StyledTop>
          <Header
            title="Family Tabs"
            subTitle="Your calendar of events at"
            isSubscribed={
              this.props.profile ? this.props.profile.isSubscribed : 0
            }
          />
        </StyledTop>

        <StyledBottom>
          <LeftSide>
            <StyledCalendar
              popup
              day={1}
              localizer={localizer}
              defaultDate={new Date()}
              onDoubleClickEvent={e => this.setEdit(e.id)}
              defaultView="month"
              events={events}
              eventPropGetter={this.eventStyleGetter}
              components={{
                event: Event
              }}
            />
          </LeftSide>

          <RightSide>
            <div>
              {this.state.showForm ? (
                <AddEvent
                  toggleForm={this.toggleForm}
                  addToCalendar={this.addToCalendar}
                  state={this.state}
                  addOption={this.addOption}
                  profile={this.props.profile}
                  family={this.props.family}
                  loadGlobal={this.props.loadState}
                  history={this.props.history}
                  setCalendarFilter={this.setCalendarFilter}
                />
              ) : (
                <Button onClick={this.toggleForm}>NEW EVENT</Button>
              )}
            </div>

            <SelectStyled
              placeholder="Filter Events"
              name="participants"
              defaultValue={this.state.participants}
              isMulti
              options={this.participantToOptions(this.props.family)}
              value={this.state.participants}
              onChange={this.setCalendarFilter}
            />
          </RightSide>
        </StyledBottom>
        {this.state.pendingEditId ? (
          <EventEdit
            pendingEditId={this.state.pendingEditId}
            loadGlobal={this.props.loadState}
            pendingEdit={this.state.pendingEdit}
            family={this.props.family}
            toggleForm={this.setEdit}
            profile={this.props.profile}
          />
        ) : (
          ""
        )}

        {this.props.family.length === 1 ? <ChildPromptModal /> : ""}
      </StyledMain>
    );
  }
}

export default CalendarComponent;
