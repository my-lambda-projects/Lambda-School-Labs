import React, { Component } from 'react';
import axios from 'axios';
import { getVehicles } from "../../store/actions";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { loadModules } from 'esri-loader';

//CSS STYLES
import "./Map.css"

//Testing new Sidebar -Jerry
import Sidebar from '../sidebar/newSidebar/Sidebar-new';



class MapPage extends Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
    this.state = {
      start: '',
      end: '',
      sidebarOpen: true,
      directionsService: {},
      directionsDisplay: {},
      Coordinates: [],
      polygonsArray: [],
      startCoord: "",
      endCoord: "",
      map: null,
      loading: "",
      walmartSelected: false,
      campsiteSelected: false,
      pointOfInterestDistance: 5,
      textDirections: [],
    }
  }

  componentDidMount() {
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      "esri/widgets/BasemapToggle",
      "esri/widgets/Track",
      "esri/Graphic",
      "esri/widgets/Search",
    ], { css: true })
      .then(([ArcGISMap, MapView, BasemapToggle, Track, Graphic, Search]) => {
        const map = new ArcGISMap({
          basemap: 'streets-navigation-vector'
        });

        const view = new MapView({
          container: this.mapRef.current,
          map: map,
          center: [-95.7129, 37.0902], // longitude, latitude 37.0902° N, 95.7129° W
          zoom: 4
        });

        var basemapToggle = new BasemapToggle({
          view: view,  
          nextBasemap: "hybrid",
        });

        view.ui.add(basemapToggle, {
          position: "bottom-right"
        });

        var track = new Track({
          view: view,
          graphic: new Graphic({
            symbol: {
              type: "simple-marker",
              size: "32px",
              color: "#008BB7",
              outline: {
                color: "#F8F9FA",
                width: "1px"
              }
            }
          }),
          useHeadingEnabled: false  // Don't change orientation of the map
        });
        console.log('TRACK WIDGET FROM MAP', track)
        // console.log('TRACK WIDGET FROM MAP', track.view.center.y)
  
        view.ui.add(track, "bottom-right");

        view.ui.move("zoom", "bottom-right");

      });
    this.props.getVehicles()
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  toggleSidebar = () => {
    //Google analytics tracking
    window.gtag("event", "sidebar toggle", {
      event_category: "sidebar",
      event_label: "sidebar toggle"
    });
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }

  //selects the map from API and puts it on the components state
  setMapToState = () => {
    var map = document.getElementsByClassName('WebMap')
    this.setState({
      map: map
    })
  }

  //stores the changes as someone types in the start and end boxes on the routing form
  //basic text change handler
  routeChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //this function is triggered when the route button is clicked
  //calls the geocode() function for start and end, triggers a series of functions/api calls
  onChangeHandler = (e) => {
    this.setState({ loading: "Searching addresses" })
    this.geocode(this.state.start, "startCoord");
  }

  //calls ArcGIS geocode API, converts the address entered in the route form to gps coordinates
  //calls routeBeforeBarriers ()
  geocode = (address, coordinate) => {
    axios
      .get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${address}&outFields=Match_addr,Addr_type`)
      .then(res => {
        if (res) {
          this.setState({
            [coordinate]: {
              "geometry": {
                "x": res.data.candidates[0].location.x, //x corresponds to longitude
                "y": res.data.candidates[0].location.y, //y corresponds to latitude
                "spatialReference": {
                  "wkid": res.data.spatialReference.wkid
                }
              },
              "attributes": {
                "Name": res.data.candidates[0].address
              }
            }
          },
            () => {
              if (coordinate === "startCoord") {
                this.geocode(this.state.end, "endCoord");
              }
              else if (coordinate === "endCoord") {
                this.setState({ loading: "Checking initial route" });
                this.routeBeforeBarriers();
              }
            }
          )

        }
      })
      .catch(err => {
        console.log("gecode err", err)
        this.setState({ loading: "Problem geocoding, please try again" });
      })

  }

  //calls arcGIS route API, makes route without barriers, loops along said route to check for low clearance
  //calls clearanceAPI() to check for barriers if height is > 0
  routeBeforeBarriers = () => {
    var formData = new FormData();
    formData.append('f', 'json');
    formData.append('token', process.env.REACT_APP_ARC_KEY);
    formData.append('stops',
      JSON.stringify({
        "type": "features",
        "features": [
          this.state.startCoord,
          this.state.endCoord
        ]
      }));
    formData.append('findBestSequence', false);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.post("https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve", formData, config)
      .then(res => {
        console.log("Map post res",res)
        if (res) {
          let resLength = res.data.routes.features[0].geometry.paths[0].length;
          let startCoordinate = { lat: null, lng: null }; //the first coordinate sent to the clearance api
          let endCoordinate = { lat: null, lng: null }; //the second coordinate sent to the clearance api
          let increment = 500; //variable for breaking the route into chunks for the clearance api, call will be made every nth coordinate returned from ArcGIS
          let polyArrayLocal = []; //stores barriers beofre they are set to state
          let lastStartPoint = resLength - (resLength % increment); //the value of i when the loop is on it's last run (ex. i = 1000 for an array of length 1200 with increments of 500)
          this.setState({ loading: "Checking clearance" }) //changes loading message displayed below routing form
          for (let i = 0; i < resLength; i = i + increment) {

            startCoordinate = { lat: res.data.routes.features[0].geometry.paths[0][i][1], lng: res.data.routes.features[0].geometry.paths[0][i][0] }

            //checks if we are at the last value of i in the loop and, if so, runs a special case checking the last part of the route 
            if (i === lastStartPoint) {
              //when at the last value of i, checks from that value to the final index
              endCoordinate = { lat: res.data.routes.features[0].geometry.paths[0][resLength - 1][1], lng: res.data.routes.features[0].geometry.paths[0][resLength - 1][0] }
            } else {
              //when not at the last value of i in the loop, that value to another value based on the increment
              endCoordinate = { lat: res.data.routes.features[0].geometry.paths[0][i + increment][1], lng: res.data.routes.features[0].geometry.paths[0][i + increment][0] }
            }
            //function that call the clearance api
            //startCoordinate and endCoordinate are sent to make the API call, polyArrayLocal stores the response from the api, i and last startPoint are used check when the loops is finished
            this.clearanceAPI(startCoordinate, endCoordinate, polyArrayLocal, i, lastStartPoint);

          }

        }
      })
      .catch(err => {
        console.log("arc route err:", err);
        this.setState({ loading: "Problem with initial route, please try again" });
      })

  }


  //startCoordinate and endCoordinate are sent to make the API call, polyArrayLocal stores the response from the api, i and last startPoint are used check when the loops is finished
  //calls api to check low clearances on route
  //call initRoute() to make new route with barriers/clearances included
  clearanceAPI = (start, end, polyArrayLocal, i, lastStartPoint) => {
    //sets height to zero intially
    let heightOfSelectedVehicle = 0;
    //if height has been set for a vehicle, checks the height and assigns it as the value to be sent to the api
    if (this.props.vehicles.vehicles) {
      this.props.vehicles.vehicles.map(e => {
        //checks if a vehicle has been selected by the user
        if (e.id === this.props.selected_id) {
          heightOfSelectedVehicle = e.height;
        }
        return heightOfSelectedVehicle;
      })
    }
    let bridgePost = { //sends low bridges a long a route
      "height": heightOfSelectedVehicle,
      "start_lon": parseFloat(start.lng.toFixed(4)),
      "start_lat": parseFloat(start.lat.toFixed(4)),
      "end_lon": parseFloat(end.lng.toFixed(4)),
      "end_lat": parseFloat(end.lat.toFixed(4))
    }
    //creates a triangle based on the points of low clearance sent from the low clearance api
    //this is done because the routing api uses polygons to block the route from passing through certain areas, and the clearance api returns only one point so a triangle is created around that point
    //any polygon shape can be sent to the routing api, triangles were chosen to avoid problems creating the points out of order (eg a square as an hourglass), and to reduce the number of points sent to the api, hopefully speeding it up
    let makePolygon = (latitude, longitude) => {
      let polygon = [];
      polygon[0] = [longitude, latitude + .00007]
      polygon[1] = [longitude - .0001, latitude - .0002];
      polygon[2] = [longitude + .0001, latitude - .0001];
      return polygon;
    }

    axios.post("https://dr7ajalnlvq7c.cloudfront.net/fetch_low_clearance", bridgePost)
      .then(res => {
        // res.data.map(e => { //<--- To check low bridge heights across route
        //   console.log('LOW CLEARANCE MAP', e.height)
        // })
        if (res) {

          for (let j = 0; j < res.data.length; j++) {
            polyArrayLocal.push(makePolygon(res.data[j].latitude, res.data[j].longitude));
          }
          //if we have made the final call to this api, as checked using values from the previous function, then we call the init route function
          if (i === lastStartPoint) {
            this.setState(
              {
                ...this.state.polygonsArray,
                polygonsArray: polyArrayLocal
              },
              //this callback insure the function is called after the state that it need is properly set
              () => this.initRoute()
            );
          }
        } 
        console.log('LOW CLEARANCE',res)
      })
      .catch(err => {
        this.setState({ loading: "Problem getting clearance info, please try again" })
        console.log("clearance error:", err);
       
      })
  }

  //makes call to the routing API with barriers included
  //displays route to API
  //calls pointsOfInterest()
  initRoute = () => {
    this.setMapToState();
    this.setState({ loading: "Making final route" })

    var formData = new FormData();
    formData.append('f', 'json');
    formData.append('token', process.env.REACT_APP_ARC_KEY);
    formData.append('stops',
      JSON.stringify({
        "type": "features",
        "features": [
          this.state.startCoord,
          this.state.endCoord
        ]
      }));
    formData.append("polygonBarriers", JSON.stringify(
      {
        "features": [{
          "geometry": {
            "rings": this.state.polygonsArray
          },
          "attributes": {
            "Name": "Bridge",
            "BarrierType": 0
          }
        }
        ]
      }
    ))
    formData.append('findBestSequence', false);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.post("https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve", formData, config)
      .then(res => {
        this.setState({ Coordinates: [] })
        for (let i = 0; i < res.data.routes.features[0].geometry.paths[0].length; i++) {
          let lng = res.data.routes.features[0].geometry.paths[0][i][0];
          let lat = res.data.routes.features[0].geometry.paths[0][i][1];
          parseFloat(lat);
          parseFloat(lng);
          let Coordinate = [null, null]
          Coordinate[1] = lat;
          Coordinate[0] = lng;
          this.setState({
            Coordinates: [...this.state.Coordinates, Coordinate]
          })
        }
        let directionsResArr = res.data.directions[0].features;
        let newDirectionsArray = [];
        for (let i = 0; i < directionsResArr.length; i++) {
          newDirectionsArray.push(directionsResArr[i].attributes.text);
        }
        this.setState({ textDirections: newDirectionsArray })

        //NOTE: the following loop will display markes for all the low clearance trianges on the map
        //it is commented out as it makes the UI cluttered for the user
        //it probably SHOULD NOT BE DELETED unless another dev tool has been made to replace it, as it allows one to visually see what parts of the map we are blocking
        // for(let i = 0; i < this.state.polygonsArray.length; i++){
        //   console.log("markers i", i);
        //   let displayPoly = [];     
        //   for(let j = 0; j < 3; j++){
        //     displayPoly[0] = {lat: this.state.polygonsArray[i][j][1] , lng: this.state.polygonsArray[i][j][0]};
        //     displayPoly[1] = {lat: this.state.polygonsArray[i][j][1], lng:  this.state.polygonsArray[i][j][0]};
        //     displayPoly[2] = {lat: this.state.polygonsArray[i][j][1], lng: this.state.polygonsArray[i][j][0] };
        //     console.log(`markers poly ${j}`, displayPoly);
        //       new window.google.maps.Marker({
        //         map: this.state.map,
        //         label: `${j}`,
        //         position: displayPoly[j]      
        //     }) 
        //   }
        // }

        // this.pointsOfInterest();

        loadModules([
          'esri/Map',
          'esri/views/MapView',
          "esri/Graphic",
          "esri/layers/GraphicsLayer",
          "esri/widgets/Track",
          "esri/widgets/BasemapToggle",
          "esri/symbols/PictureMarkerSymbol"
        ]).then(([ArcGISMap, MapView, Graphic, GraphicsLayer, Track, BasemapToggle, PictureMarkerSymbol]) => {

          const map = new ArcGISMap({
            basemap: 'streets-navigation-vector'
          });

          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);

          const view = new MapView({
            container: this.mapRef.current,
            map: map,
            center: this.state.Coordinates[0],
            zoom: 15
          });

          var basemapToggle = new BasemapToggle({
            view: view,  
            nextBasemap: "hybrid",
          });
          
          view.ui.add(basemapToggle, {
            position: "bottom-right"
          });

          let polyline = ({
            type: "polyline",
            paths: this.state.Coordinates
          });

          let startPoint = {
            type: "point",
            longitude: this.state.Coordinates[0][0],
            latitude: this.state.Coordinates[0][1]
          };

          let endPoint = {
            type: "point",
            longitude: this.state.Coordinates[this.state.Coordinates.length - 1][0],
            latitude: this.state.Coordinates[this.state.Coordinates.length - 1][1]
          };

          let endMarkerSymbol = {
            type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
            url: "https://i.ibb.co/hcjQqBV/pin.png",
            width: "32px",
            height: "32px"
          };

          let startMarkerSymbol = {
            type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
            url: "https://i.ibb.co/wy2JX4N/location-map.png",
            width: "32px",
            height: "32px"
          };

          let sPointGraphic = new Graphic({
            geometry: startPoint,
            symbol: startMarkerSymbol
          });

          graphicsLayer.add(sPointGraphic);

          let ePointGraphic = new Graphic({
            geometry: endPoint,
            symbol: endMarkerSymbol
          });

          graphicsLayer.add(ePointGraphic);

          let simpleLineSymbol = {
            type: "simple-line",
            color: [102, 157, 246], // orange
            width: 2
          };

          let polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: simpleLineSymbol
          })

          graphicsLayer.add(polylineGraphic)

          let track = new Track({
            view: view
          });
          view.ui.add(track, "bottom-right");
          view.ui.move("zoom", "bottom-right");

          this.setState({ loading: "Routing successful" })
        })
      })
      .catch(err => {
        this.setState({ loading: "Problem making final route, please try again" })
        console.log("arc route err:", err);
      })
  }

  //*vv DO NOT DELETE, COMMENTED OUT FOR FUTURE ITERATIONS TO WORK ON vv* 

  //checks if any points of interest have been checked off
  //if yes, calls pointOfInterest() and passes in the relevant information
  // pointsOfInterest = () => {
  //   if (this.state.walmartSelected === true) {
  //     this.pointOfInterestAPI("walmart", "lightblue");
  //   }
  //   if (this.state.campsiteSelected === true) {
  //     this.pointOfInterestAPI("campsite", "tan");
  //   }
  // }

  //makes a call to the point of interest api
  pointOfInterestAPI = (type, color) => {
    var bar = {
      //      path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
      path: 'M -30 -10, 30 -10, 30 10, 5 10, 0 20, -5 10, -30 10 z',
      fillColor: `${color}`,
      fillOpacity: 1,
      scale: 1,
      strokeColor: `${color}`,
      strokeWeight: 1
    };

    let post = {
      "latitude": this.state.endCoord.geometry.y,
      "longitude": this.state.endCoord.geometry.x,
      "distance": parseInt(this.state.pointOfInterestDistance)
    }


    axios.post(`https://dr7ajalnlvq7c.cloudfront.net/fetch_${type}`, post)
      .then(res => {
        if (res) {
          res.data.map(e => {
            new window.google.maps.Marker({
              map: this.state.map,
              icon: bar,
              label: `${type}`,
              position: { lat: e.latitude, lng: e.longitude }
            })
          })
        }
      })
      .catch(err => {
        console.log("POI walmart error:", err);
      })
  }

  //toggles a value when point of interest button is clicked
  toggle = (stateKey) => {
    //Google analytics tracking
    window.gtag("event", "checking points of interest", {
      event_category: "points of interest",
      event_label: "checking points of interest"
    });
    this.setState({
      [stateKey]: !this.state[stateKey]
    })
  }

  render() {
    console.log('START & END POINT MAP', this.state)
    return (
      <div>
        <Sidebar
          textDirections={this.state.textDirections}
          toggle={this.toggle}
          walmartSelected={this.state.walmartSelected}
          campsiteSelected={this.state.campsiteSelected}
          pointOfInterestDistance={this.state.pointOfInterestDistance}
          loading={this.state.loading}
          routeChangeHandler={this.routeChangeHandler}
          onChangeHandler={this.onChangeHandler}
          start={this.state.start}
          end={this.state.end}
          toggleSidebar={this.toggleSidebar} sidebarOpen={this.state.sidebarOpen} />
        <div className="webmap" ref={this.mapRef} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vehicles: state.vehicles,
  selected_id: state.selected_id
})

export default withRouter(connect(
  mapStateToProps, { getVehicles }
)(MapPage))
