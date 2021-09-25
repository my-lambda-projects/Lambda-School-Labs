import React, { Component } from "react";
import { StyledFormWrapper } from "../styled/components";
import CreatableAdvanced from "../styled/CreatableAdvanced";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Switch from "react-switch";

export default class EventEditModal extends Component {
  state = { addressControl: false };


  handleAddressControlChange = addressControl => {
    this.setState({ addressControl });
  };

  render() {
    const {
      scheduledEvent_name,
      eventEnd,
      eventStart,
      locations,
      locationID,
      eventTypeID,
      eventTypes,
      addOption,
      profile,
      participantOptions,
      setLocationID,
      setEventID,
      participants,
      address,
      onInputChange,
      setEnd,
      setStart
    } = this.props;
    return (
      <StyledFormWrapper>
        <form onSubmit={this.props.editEventHandler}>
          <h2>Edit Event</h2>
          <input
            type="text"
            name="scheduledEvent_name"
            onChange={this.props.inputHandler}
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
            onChange={setStart}
            timeFormat="h:mm aa"
            popperClassName="popper"
            popperPlacement="top"
          />

          <DatePicker
            name="eventEnd"
            value={eventEnd}
            selected={eventEnd}
            selectsEnd
            showTimeSelect
            onChange={setEnd}
            placeholderText="Event end"
            popperPlacement="top"
            popperModifiers={{
              offset: {
                enabled: true,
                offset: "100px,0"
              }
            }}
            popperClassName="popper-end"
            timeFormat="h:mm aa"
            dateFormat="MMMM d, yyyy h:mm aa"
            startDate={eventStart}
            endDate={eventEnd}
          />
          <CreatableAdvanced
            name="eventType"
            placeholder="Event type"
            options={eventTypes}
            value={eventTypeID}
            setValue={setEventID}
            addOption={addOption}
            familyID={profile.familyID}
          />

          <CreatableAdvanced
            name="location"
            placeholder="Location"
            options={locations}
            value={locationID}
            setValue={setLocationID}
            addOption={addOption}
            familyID={profile.familyID}
            isDisabled={this.state.addressControl}
          />
        {locationID ? (<div className="switchbox">
            <label>Update address for {locations.find(location=> location.id=== locationID).location_name}?</label>
            <Switch
              onChange={this.handleAddressControlChange}
              checked={this.state.addressControl}
              className="react-switch"
              id="address-switch"
              onColor="#00A3CF"
            />
          </div>):''}
          

          {this.state.addressControl ? (
            <input
              type="text"
              name="address"
              onChange={this.props.inputHandler}
              placeholder="Address"
              value={address}
            />
          ) : (
            ""
          )}

          <Select
            placeholder="Participants"
            name="participants"
            defaultValue={null}
            isMulti
            options={participantOptions}
            value={participants}
            onChange={onInputChange}
            className="participants-input"
          />

          <div className="button-box">
            <button type="submit">Update</button>
            <button onClick={() => this.props.toggleForm()}>Close</button>
          </div>
        </form>
      </StyledFormWrapper>
    );
  }
}
