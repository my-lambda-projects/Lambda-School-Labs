import React from "react";
import DatePicker from "react-datepicker";
import CreatableAdvanced from "../styled/CreatableAdvanced";
import Select from "react-select";
import moment from "moment";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { StyledFormWrapper } from "../styled/components";
import AlertModal from "./AlertModal";

class AddEvent extends React.Component {
  state = {
    scheduledEvent_name: "",
    eventStart: null,
    eventEnd: null,
    eventTypeID: null,
    locationID: null,
    participants: [],
    showAlert: false
  };

  participantToOptions = options =>
    options.map(option => {
      return { value: option.id, label: option.userName };
    });

  onInputChange = (inputValue, { action }) => {
    this.setState({ participants: inputValue });
  };
  setStart = e => {
    this.setState({ eventStart: e });
  };

  setEventID = id => {
    this.setState({ eventTypeID: id });
  };

  setLocationID = id => {
    this.setState({ locationID: id });
  };

  setEnd = e => {
    this.setState({ eventEnd: e });
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addEventHandler = async e => {
    e.preventDefault();
    const {
      scheduledEvent_name,
      eventStart,
      eventEnd,
      eventTypeID,
      locationID,
      participants
    } = this.state;
    if (
      !scheduledEvent_name ||
      !eventStart ||
      !eventEnd ||
      !eventTypeID ||
      !locationID
    ) {
      return;
    }
    let newEvent = {
      scheduledEvent_name,
      eventStart: moment(eventStart).format("YYYYMMDD hh:mm a"),
      eventEnd: moment(eventEnd).format("YYYYMMDD hh:mm a"),
      eventTypeID,
      locationID,
      familyID: this.props.profile.familyID,
      createdBy: this.props.profile.id,
      pendingApproval: this.props.profile.isAdmin ? false : true
    };
    try {
      let eventResponse = await this.props.addToCalendar(newEvent);
      console.log(eventResponse);
      let { id, familyID } = eventResponse;
      await participants.forEach(
        async x =>
          await axios.post(
            `${process.env.REACT_APP_API_URL}/eventwithusers/create`,
            { familyID, userID: x.value, scheduledEventID: id }
          )
      );
      this.setState({
        scheduledEvent_name: "",
        eventStart: null,
        eventEnd: null,
        eventTypeID: null,
        locationID: null
      });
      await this.props.loadGlobal(familyID);
      if (!this.props.profile.isAdmin) {
        this.props.setCalendarFilter([{
          label: "Events Pending Approval",
          value: "pending"
        }], '');
      }
      this.toggleAlert();
    } catch (err) {
      console.log(err);
    }
  };

  toggleAlert = () => {
    this.setState({ showAlert: !this.state.showAlert });
  };

  render() {
    const { locations, eventTypes } = this.props.state;
    const { addOption, profile, family, toggleForm } = this.props;
    const {
      scheduledEvent_name,
      eventTypeID,
      eventStart,
      locationID,
      eventEnd,
      participants,
      showAlert
    } = this.state;
    console.log(showAlert);
    return (
      <>
        {showAlert ? <AlertModal toggleForm={toggleForm} /> : ""}
        <StyledFormWrapper hide={showAlert}>
          <form onSubmit={this.addEventHandler}>
            <h2>New Event</h2>
            <input
              type="text"
              name="scheduledEvent_name"
              onChange={this.inputHandler}
              placeholder="Event Title"
              value={scheduledEvent_name}
            />

            <DatePicker
              name="eventStart"
              dateFormat="MMMM d, yyyy h:mm aa"
              selected={eventStart}
              minDate={new Date()}
              selectsStart
              showTimeSelect
              placeholderText="Event start"
              value={eventStart}
              startDate={eventStart}
              endDate={eventEnd}
              onChange={this.setStart}
              timeFormat="h:mm aa"
              popperClassName="popper"
              popperPlacement="top"
            />

            <DatePicker
              name="eventEnd"
              value={eventEnd}
              selected={eventEnd}
              //minDate={eventStart || new Date()}
              selectsEnd
              showTimeSelect
              placeholderText="Event end"
              popperPlacement="top"
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: "100px,0"
                }
              }}
              popperClassName="popper popper-end"
              timeFormat="h:mm aa"
              dateFormat="MMMM d, yyyy h:mm aa"
              startDate={eventStart}
              endDate={eventEnd}
              onChange={this.setEnd}
            />
            <CreatableAdvanced
              name="eventType"
              placeholder="Event type"
              options={eventTypes}
              value={eventTypeID}
              setValue={this.setEventID}
              addOption={addOption}
              familyID={profile.familyID}
            />

            <CreatableAdvanced
              name="location"
              placeholder="Location"
              options={locations}
              value={locationID}
              setValue={this.setLocationID}
              addOption={addOption}
              familyID={profile.familyID}
            />

            <Select
              placeholder="Participants"
              name="participants"
              defaultValue={null}
              isMulti
              options={this.participantToOptions(family)}
              value={participants}
              onChange={this.onInputChange}
              className="participants-input"
            />
            <div className="button-box">
              <button type="submit">Add Event</button>
              <button onClick={toggleForm}>Exit</button>
            </div>
          </form>
        </StyledFormWrapper>
      </>
    );
  }
}
export default AddEvent;
