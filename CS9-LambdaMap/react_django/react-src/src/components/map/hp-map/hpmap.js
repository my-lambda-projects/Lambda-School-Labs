/*global google*/
import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import HPNav from "../../nav/company/HPnav";
import "./map.css";
import { get_clients, get_listings } from "../../../actions/index";
import { connect } from "react-redux";
import worldlogo from "./atlascardlogo.png";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaBriefcase } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import orange from "../orangemarker.png";
import blue from "../bluemarker.png";

class HPMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      client: {},
      jobListing: [],
      job_listing: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      jsModal: false,
      hpModal: false,
      color: "black"
    };
  }

  favorited = () => {
    if (this.state.color === "black") {
      this.setState({ color: "orange" });
    } else {
      this.setState({ color: "black" });
    }
  };

  componentDidMount = () => {
    this.props.get_clients();
    this.props.get_listings();
  };

  onMarkerClick = id => {
    this.props.clients.clients.filter(c => {
      if (c.ID === id) {
        this.setState({ client: c });
      }
      return console.log("listing");
    });
  };

  onMarkerClickHp = id => {
    this.props.jobListing.job_listings.filter(j => {
      if (j.ID === id) {
        this.setState({ job_listing: j });
      }
      return console.log("listing");
    });
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    let jsModal = null;
    let hpModal = null;
    if (this.state.jsModal === true) {
      jsModal = (
        <div
          className="js-modal"
          onClick={() => {
            this.setState({
              jsModal: false,
              hpModal: false
            });
          }}
        >
          <div
            className="jsmodal-cont"
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <div className="jsmodal-header">
              <img
                src={`http://127.0.0.1:8000/media/${this.state.client.picture}`}
                alt="user"
              />
              <div className="info-container">
                <div className="modal-name">
                  <h2>
                    {this.state.client.first_name} {this.state.client.last_name}
                  </h2>
                  <TiPin
                    className={this.state.color}
                    onClick={this.favorited}
                  />
                </div>
                <div className="job-loc">
                  <h4 className="prof">{this.state.client.profession}</h4>
                  <h4>
                    {this.state.client.city}, {this.state.client.state}
                  </h4>
                  <hr align="left" className="modal-hr" />
                </div>
              </div>
            </div>
            <div className="jsmodal-body">
              <p>{this.state.client.about}</p>
            </div>
            <div className="jsmodal-footer">
              <img src={worldlogo} alt="worldlogo" />
              <Link
                to={`/jsprofile/${this.state.client.ID}`}
                key={this.state.client.ID}
                className="profile-link"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      );
    } else if (this.state.hpModal === true) {
      hpModal = (
        <div
          className="js-modal"
          onClick={() => {
            this.setState({
              jsModal: false,
              hpModal: false
            });
          }}
        >
          <div
            className="jsmodal-cont"
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <div className="jsmodal-header">
              <img
                src={`http://127.0.0.1:8000/media/${this.state.job_listing.picture}`}
                alt="user"
              />
              <div className="info-container">
                <div className="modal-name">
                  <h2>{this.state.job_listing.company_name}</h2>
                  <TiPin
                    className={this.state.color}
                    onClick={this.favorited}
                  />
                </div>
                <div className="job-loc">
                  <h4 className="prof">
                    {this.state.job_listing.city},{" "}
                    {this.state.job_listing.state}
                  </h4>
                  <h5>
                    <FaBriefcase className="listing-icon" />
                    {this.state.job_listing.jobListings.length} Job Listings
                  </h5>
                  <hr align="left" className="modal-hr" />
                </div>
              </div>
            </div>
            <div className="jsmodal-body">
              <p>{this.state.job_listing.about}</p>
            </div>
            <div className="jsmodal-footer">
              <img src={worldlogo} alt="worldlogo" />
              <Link
                to={`/hpview/${this.state.job_listing.ID}`}
                key={this.state.job_listing.ID}
                className="profile-link"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <HPNav />
        <div className="main-container">
          <div className="map">
            <Map
              className="mapstuff"
              google={this.props.google}
              initialCenter={{
                lat: 38.6872,
                lng: -96.3301
              }}
              disableDefaultUI={true}
              zoom={5}
              style={{
                width: "100%",
                height: "100vh"
              }}
              styles={[
                {
                  featureType: "administrative",
                  elementType: "labels.text.fill",
                  stylers: [
                    {
                      color: "#454545"
                    }
                  ]
                },
                {
                  featureType: "landscape",
                  elementType: "all",
                  stylers: [
                    {
                      color: "#f2f2f2"
                    }
                  ]
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "off"
                    }
                  ]
                },
                {
                  featureType: "road",
                  elementType: "all",
                  stylers: [
                    {
                      saturation: -100
                    },
                    {
                      lightness: 45
                    }
                  ]
                },
                {
                  featureType: "road.highway",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "simplified"
                    }
                  ]
                },
                {
                  featureType: "road.arterial",
                  elementType: "labels.icon",
                  stylers: [
                    {
                      visibility: "off"
                    }
                  ]
                },
                {
                  featureType: "transit",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "off"
                    }
                  ]
                },
                {
                  featureType: "water",
                  elementType: "all",
                  stylers: [
                    {
                      color: "#4D9FCA"
                    },
                    {
                      visibility: "on"
                    }
                  ]
                }
              ]}
              onClick={this.onMapClicked}
            >
              {this.props.clients.clients.map((client, i) => (
                <Marker
                  key={i}
                  onClick={() => {
                    this.onMarkerClick(client.ID);
                    this.setState({
                      jsModal: !this.state.jsModal
                    });
                  }}
                  style={{ height: "30px", width: "30px" }}
                  name={client.city}
                  title={client.first_name}
                  position={{ lat: client.lat, lng: client.lng }}
                  icon={{
                    scaledSize: new google.maps.Size(20, 30),
                    url: blue
                  }}
                />
              ))}
              {this.props.jobListing.job_listings.map((job_listing, i) => (
                <Marker
                  key={i}
                  onClick={() => {
                    this.onMarkerClickHp(job_listing.ID);
                    this.setState({
                      hpModal: !this.state.hpModal
                    });
                  }}
                  style={{ height: "30px", width: "30px" }}
                  name={job_listing.company_name.city}
                  title={job_listing.company_name}
                  position={{ lat: job_listing.lat, lng: job_listing.lng }}
                  icon={{
                    scaledSize: new google.maps.Size(23, 33),
                    url: orange
                  }}
                />
              ))}
            </Map>
            {jsModal}
            {hpModal}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    clients: state.clients,
    client: state.client,
    jobListings: state.jobListings,
    jobListing: state.jobListing,
    fetchingListings: state.fetchingListings,
    fetchingClients: state.fetchingClients,
    error: state.error
  };
};
export default connect(
  mapStateToProps,
  { get_clients, get_listings }
)(
  GoogleApiWrapper({ apiKey: "AIzaSyAgToUna43JuFhMerOH1DO1kzgCOR7VWm4" })(
    HPMapView
  )
);
