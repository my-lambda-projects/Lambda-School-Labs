import React, { Component } from "react";
import EventEditModal from "./EventEditModal";
import axios from "axios";
import moment from "moment";

export default class EventEdit extends Component {
  state = {
    eventTypes: [],
    locations: [],
    locationID: this.props.pendingEdit.locationID,
    scheduledEvent_name: this.props.pendingEdit.scheduledEvent_name,
    eventStart: new Date(
      moment(this.props.pendingEdit.eventStart, 'YYYYMMDD hh:mm a').format("LLLL")
    ),
    eventEnd: new Date(moment(this.props.pendingEdit.eventEnd, 'YYYYMMDD hh:mm a').format("LLLL")), //"YYYYMMDD hh:mm a"
    eventTypeID: this.props.pendingEdit.eventTypeID,
    address: "",
    loaded: false,
    participants: [],
    participantOptions: [],
    eventByUsers: []
  };
  eventStart;

  componentDidMount() {
    this.loadState();
  }

  participantToOptions = options =>
    options.map(option => {
      return { value: option.id, label: option.userName };
    });

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onInputChange = (inputValue, { action }) => {
    this.setState({ participants: inputValue });
  };

  addOption = (name, option) => {
    this.setState({ [`${name}s`]: [...this.state[`${name}s`], option] });
  };

  setEnd = e => {
    this.setState({ eventEnd: e });
  };

  setStart = e => {
    this.setState({ eventStart: e, eventEnd: null });
  };

  setEventID = id => {
    this.setState({ eventTypeID: id });
  };

  setLocationID = id => {
    let address = "";
    if (id) {
      address = this.state.locations.find(location => location.id === id)
        .address;
    }
    this.setState({ locationID: id, address });
  };

  loadState = async () => {
    const { familyID } = this.props.profile;
    let participantOptions = this.participantToOptions(this.props.family);
    let participants = participantOptions.filter(participant =>
      this.props.pendingEdit.userID.includes(participant.value)
    );
    let locations = await axios.get(
      `${process.env.REACT_APP_API_URL}/location/byfamily/${familyID}`
    );
    let eventTypes = await axios.get(
      `${process.env.REACT_APP_API_URL}/eventtype/byfamily/${familyID}`
    );
    let eventByUsers = await axios.get(
      `${process.env.REACT_APP_API_URL}/eventbyusers/${
        this.props.pendingEditId
      }`
    );
    let address =
      locations.data.find(location => location.id === this.state.locationID)
        .address || "";
    this.setState({
      eventTypes: eventTypes.data,
      locations: locations.data,
      loaded: true,
      participantOptions,
      participants,
      address,
      eventByUsers: eventByUsers.data
    });
  };

  editEventHandler = async e => {
    e.preventDefault();
    const {
      scheduledEvent_name,
      eventStart,
      eventEnd,
      eventTypeID,
      locationID,
      participants,
      locations,
      eventByUsers
    } = this.state;
    const { pendingEdit, pendingEditId, profile } = this.props;
    let address = locations.find(location => location.id === locationID) || "";

    let editedEvent = {};
    if (eventTypeID !== pendingEdit.eventTypeID) {
      editedEvent.eventTypeID = eventTypeID;
    }

    if (locationID !== pendingEdit.locationID) {
      editedEvent.locationID = locationID;
    }

    if (eventStart !== pendingEdit.eventStart) {
      editedEvent.eventStart =moment(eventStart).format('YYYYMMDD hh:mm a');
      console.log(eventStart )
    }

    if (eventEnd !== pendingEdit.eventEnd) {
      editedEvent.eventEnd = moment(eventEnd).format('YYYYMMDD hh:mm a');
    }

    if (scheduledEvent_name !== pendingEdit.scheduledEvent_name) {
      editedEvent.scheduledEvent_name = scheduledEvent_name;
    }
    let createMap = participants.map(participant => participant.value);
    let deleteMap = [];
    eventByUsers.forEach(eventWithUser => {
      if (!createMap.length) {
        return;
      }
      if (createMap.includes(eventWithUser.userID)) {
        createMap = createMap.filter(x => x !== eventWithUser.userID);
      } else {
        deleteMap.push(eventWithUser.id);
      }
    });

    try {
      if (this.state.address !== address.address) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/location/edit/${locationID}`,
          { address: this.state.address }
        );
      }
      if (Object.keys(editedEvent).length) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/event/edit/${pendingEditId}`,
          editedEvent
        );
      }
      if (createMap.length) {
        createMap.forEach(async id => {
          await axios.post(
            `${process.env.REACT_APP_API_URL}/eventwithusers/create`,
            {
              userID: id,
              familyID: profile.familyID,
              scheduledEventID: pendingEditId
            }
          );
        });
      }

      if (deleteMap.length) {
        deleteMap.forEach(async id => {
          await axios.delete(
            `${process.env.REACT_APP_API_URL}/eventwithusers/delete/${id}`
          );
        });
      }

      await this.props.loadGlobal(profile.familyID);
      this.props.toggleForm("");
    } catch (err) {
      console.log(err);
    }
  };

  render() {

    return (
      <>
        {this.state.loaded ? (
          <EventEditModal
            toggleForm={this.props.toggleForm}
            pendingEdit={this.props.pendingEdit}
            profile={this.props.profile}
            participants={this.state.participants}
            participantOptions={this.participantOptions}
            {...this.state}
            inputHandler={this.inputHandler}
            onInputChange={this.onInputChange}
            setEnd={this.setEnd}
            setStart={this.setStart}
            setEventID={this.setEventID}
            setLocationID={this.setLocationID}
            addOption={this.addOption}
            editEventHandler={this.editEventHandler}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}
