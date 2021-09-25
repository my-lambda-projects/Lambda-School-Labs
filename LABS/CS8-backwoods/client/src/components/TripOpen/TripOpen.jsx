import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { testTrip, testTripMarkers } from "./testData";
import MapContainer from "./Map";
import WaypointList from "./TripOpenWaypointList";
import TripOpenName from "./TripOpenName";
import "./tripOpenStyling.css";
import API_URL from "../../API_URL";

class TripOpen extends React.Component {
  state = {
    markers: [],
    startDate: "",
    endDate: "",
    tripName: ""
  };

  componentDidMount() {
    const { match } = this.props;
    if (
      match.params.user === "aaron@backwood.app" &&
      match.params.slug === "Crystal-Mountain-Loop"
    ) {
      this.setState({
        startDate: testTrip[0].startDate,
        endDate: testTrip[0].endDate,
        tripName: testTrip[0].tripName,
        markers: testTripMarkers
      });
    } else {
      axios
        .get(`${API_URL}/${match.params.user}/${match.params.slug}`)
        .then(res => {
          this.setState({
            startDate: res.data.trip.startDate,
            endDate: res.data.trip.endDate,
            tripName: res.data.trip.tripName
          });
          const tripId = res.data.trip.id;
          return axios.get(`${API_URL}/getMarkers/${tripId}`);
        })
        .then(res => {
          // 420 other getOneTripBySlug
          // 421 trip doesn't exist
          // 422 "trip has no markers"
          // 423 other getMarkers
          this.setState({ markers: res.data.marker });
        })
        .catch(error => {
          const { history } = this.props;
          if (error.response.status === 421) {
            history.push(`/${match.params.user}/trip-not-found`);
          }
        });
    }
  }

  render() {
    const { tripName, markers, startDate, endDate } = this.state;
    return (
      <div className="tripOpen">
        <TripOpenName tripName={tripName} />
        <div className="tripOpen-wrapper">
          <MapContainer markers={markers} />
          <WaypointList
            markers={markers}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    );
  }
}

TripOpen.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

export default withRouter(TripOpen);
