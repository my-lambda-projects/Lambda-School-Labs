import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import countrydata from "./countries.geo.json";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserData } from "../../actions/mapActions";
import styled from "styled-components";
import { returnCode, returnId } from "../helper";
import Card from "./Card";
import Legend from "./Legend";
import Loading from "../Loading";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const colorCodes = {
  0: "lightgrey",
  1: "#017B7B",
  2: "#9B016D",
  3: "#CD5D01",
  4: "#8FC201"
};

function countryColorMatcher(userData, geoJsonCountry) {
  let colorCode = 0;
  userData.map(country => {
    if (
      JSON.stringify(returnCode(country.country_id)) ===
      JSON.stringify(geoJsonCountry)
    ) {
      colorCode = country.status;
    }
  });
  return colorCode;
}

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      clickedCountry: "",
      alt_code: "",
      currentUser: "",
      loading: ""
    };
    this.cardSaveHandler = this.cardSaveHandler.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  openModal() {
    this.setState({ isOpen: true });
  }

  toggleModal() {
    this.setState({ isOpen: false });
  }

  cardSaveHandler(id) {
    this.props.getUserData(id);
    this.setState({ isOpen: false });
  }

  componentDidMount() {
    const user = this.props.displayedUser
      ? this.props.displayedUser
      : this.props.location.state.user;
    this.setState({ currentUser: user }, () => {
      this.props.getUserData(user);
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.displayedUser !== prevProps.displayedUser) {
      this.props.getUserData(this.props.displayedUser);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: nextProps.loading });
    function style(feature) {
      return {
        fillColor:
          colorCodes[
            countryColorMatcher(
              nextProps.userCountryData,
              feature.properties.SOV_A3
            )
          ] || "pink",
        weight: 1,
        opacity: 1,
        color: "darkgrey",
        fillOpacity: 1,
        stroke: "true"
      };
    }

    if (this.map) {
      L.geoJson(countrydata, {
        onEachFeature: (feature, layer) => {
          layer.bindPopup("<h4>" + feature.properties.ADMIN + "</h4>", {
            closeButton: false,
            offset: L.point(0, -20)
          });
          layer.on("mouseover", e => {
            let popup = e.target.getPopup();
            popup.setLatLng(e.latlng).openOn(this.map);
          });
          layer.on("mouseout", e => {
            e.target.closePopup();
          });
          layer.on("click", () => {
            this.setState({
              clickedCountry: feature.properties.SOV_A3,
              isOpen: true
            });
          });
        },
        style: style,
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng);
        }
      }).addTo(this.map);
    } else {
      if (this.props.loading !== nextProps.loading) {
        this.map = L.map("map", {
          center: [30, 0],
          zoom: 1.8,
          zoomControl: false,
          maxZoom: 20,
          minZoom: 1.8,
          maxBounds: [[-90, -180], [90, 180]],
          maxBoundsViscosity: 1
        });
        L.tileLayer(
          "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png",
          {
            attribution:
              'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 3,
            noWrap: true
          }
        ).addTo(this.map);
        L.geoJson(countrydata, {
          onEachFeature: (feature, layer) => {
            layer.bindPopup("<h4>" + feature.properties.ADMIN + "</h4>", {
              closeButton: false,
              offset: L.point(0, -20)
            });
            layer.on("mouseover", e => {
              let popup = e.target.getPopup();
              popup.setLatLng(e.latlng).openOn(this.map);
            });
            layer.on("mouseout", e => {
              e.target.closePopup();
            });
            layer.on("click", () => {
              this.setState({
                clickedCountry: feature.properties.BRK_A3,
                isOpen: true
              });
            });
          },
          style: style,
          pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
          }
        }).addTo(this.map);
      }
    }
  }

  render() {
    return (
      <div className="mapview">
        {this.state.isOpen ? (
          <Card
            open={this.state.isOpen}
            onClose={this.toggleModal}
            key={returnId(this.state.clickedCountry)}
            country_code={this.state.clickedCountry}
            cardSaveHandler={this.cardSaveHandler}
            currentUser={this.props.displayedUser}
          />
        ) : null}

        {this.state.loading ? <Loading /> : <Legend />}

        <Wrapper className="mapContainer" id="map" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.getUserDataReducer.userData,
    userCountryData: state.getUserDataReducer.userCountryData,
    loading: state.getUserDataReducer.loading,
    displayedUser: state.getUserDataReducer.displayedUser
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { getUserData }
  )(MapContainer)
);
