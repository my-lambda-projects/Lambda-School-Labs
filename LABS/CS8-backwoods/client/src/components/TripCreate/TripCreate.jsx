import React from "react";
import PropTypes from "prop-types";
import slugify from "slugify";
import axios from "axios";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";
import { format } from "date-fns/esm";
import TripCreateForm from "./TripCreateForm";
import Map from "./Map";
import API_URL from "../../API_URL";
import WaypointList from "./WaypointList";
import "./TripCreate.css";

class TripCreate extends React.Component {
  state = {
    tripName: "",
    wayPoints: [],
    newMarkersArr: [],
    startDate: new Date(),
    endDate: new Date(),
    // email: "",
    fireRedirect: false,
    markerName: "",
    mapOpacity: 0.4,
    lng: null,
    lat: null,
    // tripId: "",
    MarkerCreated: false,
    saveLocationEnabled: true,
    disableRemoveMarker: true,
    expanded: null,
    tripSaveModal: false,
    modalFade: false,
    tripsfromUserName: [],
    markSaveModal: false,
    markSaveFade: false,
    eta: new Date(),
    time: new Date(),
    disableAddMarker: false,
    displayMarkerCard: false
  };

  componentWillMount() {
    const { tripsFromUser } = this.props;
    const tripsfromUserName = [];
    tripsFromUser.forEach(trip => {
      tripsfromUserName.push(trip.tripName);
    });
    this.setState({ tripsfromUserName });
  }

  activateMap = () => {
    this.setState({
      lng: 0,
      lat: 0,
      mapOpacity: 1,
      MarkerCreated: true
    });
  };

  // //// NEW FUNCTIONS

  markerAddCard = () => {
    this.setState({
      disableAddMarker: true,
      displayMarkerCard: true
    });
  };

  // ////////////////////////////

  deactivateMap = () => {
    this.setState({
      mapOpacity: 0.4,
      MarkerCreated: false,
      lat: null,
      lng: null
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value }, this._CheckMarkers());
  };

  handleNewWaypoint = e => {
    const {
      markerName,
      lat,
      time,
      eta,
      lng,
      startDate,
      newMarkersArr
    } = this.state;
    e.preventDefault();
    if (markerName === "" || lat === 0) {
      this.setState({
        markSaveModal: true,
        markSaveFade: true
      });
    } else {
      const formatTime = format(new Date(time), "hh:mm A");
      const formatDate = format(new Date(eta), "MM/DD/YYYY");

      const newWayPoint = {
        markerName,
        eta: formatDate,
        time: formatTime,
        lng,
        lat,
        tripId: ""
      };
      this.setState(
        {
          newMarkersArr: [...newMarkersArr, newWayPoint],
          disableAddMarker: false,
          disableRemoveMarker: false,
          saveLocationEnabled: true,
          displayMarkerCard: false,
          markerName: "",
          eta: startDate,
          time: new Date()
        },
        this.deactivateMap
      );
    }
  };

  handleSubmit = () => {
    const token = localStorage.getItem("token");
    const { tripName, startDate, endDate, newMarkersArr } = this.state;
    const { email, getUsersAgain, setSaveTripTrue } = this.props;
    const slug = slugify(tripName);
    axios
      .post(
        `${API_URL}/createTrips`,
        { tripName, startDate, endDate, email, slug },
        { headers: { authorization: token } }
      )
      .then(res => {
        getUsersAgain();
        this.setState({ fireRedirect: true }, setSaveTripTrue());
        const tripId = res.data.id;
        const markersArr = [...newMarkersArr];
        markersArr.forEach(item => {
          const newItem = item;
          newItem.tripId = tripId;
        });
        return axios.post(
          `${API_URL}/createMarker`,
          { markersArr },
          { headers: { authorization: token } }
        );
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // removes marker after hitting save location
  removeMarker = () => {
    const { newMarkersArr, startDate } = this.state;
    newMarkersArr.pop();
    this.setState(
      {
        disableAddMarker: false,
        eta: startDate,
        time: new Date(),
        markerName: ""
      },
      this.markerCheck
    );
  };

  markerCheck = () => {
    const { newMarkersArr } = this.state;
    if (newMarkersArr.length === 0) {
      return this.setState({ disableRemoveMarker: true });
    }
    return null;
  };

  addMarker = ({ lat, lng }) => {
    this.setState({ lat, lng }, this.disableSaveLocation());
  };

  handleWayPointExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  disableSaveLocation = () => {
    const { markerName, time } = this.state;
    if (markerName.length > 0 && time.length > 0) {
      return this.setState({ saveLocationEnabled: false });
    }
    return this.setState({ saveLocationEnabled: true });
  };

  _CheckMarkers = () => {
    const { lng, lat } = this.state;
    if (lat === null && lng === null) {
      return this.setState({ saveLocationEnabled: true });
    }
    return this.setState({ saveLocationEnabled: false });
  };

  noMarkersModalOpenF = e => {
    const { newMarkersArr } = this.state;
    e.preventDefault();
    if (newMarkersArr.length === 0) {
      this.setState({ tripSaveModal: true, modalFade: true });
    } else {
      this.handleSubmit();
    }
  };

  noMarkerNameFalseF = () => {
    const { markSaveModal, markSaveFade } = this.state;
    this.setState({
      markSaveModal: !markSaveModal,
      markSaveFade: !markSaveFade
    });
  };

  noMarkersModalFalseF = () => {
    this.setState({ tripSaveModal: false, modalFade: false });
  };

  handleTimeChange = NewTime => {
    this.setState({ time: NewTime });
  };

  handleDateChange = name => date => {
    const formatDate = format(new Date(date), "MM/DD/YYYY");
    this.setState({ [name]: formatDate });
  };

  render() {
    const {
      tripName,
      startDate,
      endDate,
      tripsfromUserName,
      tripSaveModal,
      modalFade,
      fireRedirect,
      mapOpacity,
      markers,
      MarkerCreated,
      newMarkersArr,
      lat,
      lng,
      markSaveModal,
      markSaveFade,
      disableAddMarker,
      displayMarkerCard,
      time,
      eta,
      wayPoints,
      disableRemoveMarker,
      expanded,
      saveLocationEnabled
    } = this.state;
    const { email } = this.props;
    const isEnabled =
      tripName.length > 0 && startDate.length > 0 && endDate.length > 0;
    return (
      <div className="tripCreateWrapper">
        <Slide direction="down" in mountOnEnter unmountOnExit>
          <TripCreateForm
            tripName={tripName}
            tripsfromUserName={tripsfromUserName}
            tripSaveModal={tripSaveModal}
            noMarkersModalOpenF={this.noMarkersModalOpenF}
            noMarkersModalFalseF={this.noMarkersModalFalseF}
            modalFade={modalFade}
            email={email}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            fireRedirect={fireRedirect}
            isEnabled={isEnabled}
            handleDateChange={this.handleDateChange}
            endDate={endDate}
            startDate={startDate}
          />
        </Slide>
        <div className="MapWaypointWrapper">
          <div className="thisISSPARTA">
            <Zoom in>
              <Map
                mapOpacity={mapOpacity}
                addMarker={this.addMarker}
                markers={markers}
                MarkerCreated={MarkerCreated}
                newMarkersArr={newMarkersArr}
                lat={lat}
                lng={lng}
              />
            </Zoom>
          </div>
          <Slide direction="left" in mountOnEnter unmountOnExit>
            <WaypointList
              noMarkerNameFalseF={this.noMarkerNameFalseF}
              markSaveModal={markSaveModal}
              markSaveFade={markSaveFade}
              noMarkersModalFalseF={this.noMarkersModalFalseF}
              noMarkersModalOpenF={this.noMarkersModalOpenF}
              tripSaveModal={tripSaveModal}
              modalFade={modalFade}
              handleNewWaypoint={this.handleNewWaypoint}
              disableAddMarker={disableAddMarker}
              displayMarkerCard={displayMarkerCard}
              markerAddCard={this.markerAddCard}
              lat={lat}
              startDate={startDate}
              endDate={endDate}
              newMarkersArr={newMarkersArr}
              time={time}
              eta={eta}
              handleChange={this.handleChange}
              wayPoints={wayPoints}
              activateMap={this.activateMap}
              removeMarker={this.removeMarker}
              disableRemoveMarker={disableRemoveMarker}
              expanded={expanded}
              handleWayPointExpand={this.handleWayPointExpand}
              saveLocationEnabled={saveLocationEnabled}
              handleTimeChange={this.handleTimeChange}
              handleDateChange={this.handleDateChange}
            />
          </Slide>
        </div>
      </div>
    );
  }
}

TripCreate.propTypes = {
  tripsFromUser: PropTypes.instanceOf(Object).isRequired,
  email: PropTypes.string.isRequired,
  setSaveTripTrue: PropTypes.func.isRequired,
  getUsersAgain: PropTypes.func.isRequired
};

export default TripCreate;
