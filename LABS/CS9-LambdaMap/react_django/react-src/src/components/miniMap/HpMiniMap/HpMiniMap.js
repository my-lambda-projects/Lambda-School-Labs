/*global google*/
import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { get_clients, get_listings } from "../../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./minimap.css";
import blue from "../../map/bluemarker.png";
import orange from "../../map/orangemarker.png";

class HpMiniMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      client: {},
      jobListing: [],
      job_listing: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

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
    return (
          <Link to="/hpmap">
        <div className="mini-map">
            <Map
              className="mapstuff"
              google={this.props.google}
              initialCenter={{
                lat: 38.6872,
                lng: -96.3301
              }}
              disableDefaultUI={true}
              zoom={2}
              style={{
                borderRadius: "500px",
                boxShadow: "0px 0px 10px 0px black",
                border: "4px solid #DC681D",
              }}
              styles= {[
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#454545"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#4D9FCA"
                        },
                        {
                            "visibility": "on"
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
                  }}
                  style={{ height: "30px", width: "30px" }}
                  name={client.city}
                  title={client.first_name}
                  position={{ lat: client.lat, lng: client.lng }}
                  icon={{
                    scaledSize: new google.maps.Size(10, 15),
                    url: blue
                  }}
                />
              ))}
              {this.props.jobListing.job_listings.map((job_listing, i) => (
                <Marker
                  key={i}
                  onClick={() => {
                    this.onMarkerClickHp(job_listing.ID);
                  }}
                  style={{ height: "30px", width: "30px" }}
                  name={job_listing.company_name.city}
                  title={job_listing.company_name}
                  position={{ lat: job_listing.lat, lng: job_listing.lng }}
                  icon={{
                    scaledSize: new google.maps.Size(12, 17),
                    url: orange
                  }}
                />
              ))}
            </Map>
          </div>
      </Link>
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
    HpMiniMap
  )
);