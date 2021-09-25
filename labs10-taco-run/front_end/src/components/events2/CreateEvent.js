import React from "react";
import { connect } from "react-redux";
import { createEvent } from "../../store/actions/eventsActions";
import "./create_event.css";
import DrawerBar from "../drawer/Drawer";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";

import firebase from 'firebase';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Select from 'react-select'
import SelectUSState from 'react-select-us-states';
import { withAlert } from 'react-alert';

import taco_buddies from './t_friends.jpg';

import taco_pic from './taco.png'

import Modal from 'react-awesome-modal';

import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import { CreateEventWrapper, FlexForm, OverFlow, MapDiv, YelpDiv, MapDiv2 } from "./create_event_css.js";

import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import classNames from "classnames";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Input from '@material-ui/core/Input';

const styles = theme => ({
  grid: {
    width: "100%",
    borderRadius: 10,
    padding: 10
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  button: {
    margin: theme.spacing.unit,
    width: "60%"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: '700px',
    width: '100%',
    margin: '0 auto'
  },
  bottom: {
    marginBottom: 0,
    marginTop: 10
  },
  media: {
    height: 80,
  },
  media2: {
    height: 40
  },
  noHref: {
    textDecoration: 'none'
  },
  margL: {
    marginLeft: "1%"
  },
  textField2: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "94%",
    marginLeft: '3%'
  },
  input: {
    margin: theme.spacing.unit,
  },
  spaceTop: {
    marginTop: 10
  },
  biggerFontCreate: {
    fontSize: "16px",
    marginTop: 5
  }
});

//datepicker

const TacoLocation = ({ text }) => <div>{text}</div>;

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      name: '',
      byName: '',
      selectedDate: new Date(),
      author: "",
      user_id: "",
      checkedInvite: true,
      checkedNoInvite: true,
      invite_only: false,
      posters_email: "",
      show_map: false,
      show_map2: false,
      city_location: "",
      taco_places: [],
      destinations: [],
      zoom: 13,
      lat_av: 0,
      lon_av: 0,
      currentPage: 1,
      tacosPerPage: 4,
      byCity: "",
      venueName: "",
      street: "",
      venue: "",
      usState: "",
      usCity: '',
      singleVenue: '',
      value: 0,
      selected_venue: "",
      setVenue: '',
      bottom_0: "moreBottom",
      visible : false
    };
    this.setNewValue = this.setNewValue.bind(this);
  }

  componentDidMount() {
    console.log(`checkedInvite is: ${this.state.checkedInvite}`);
  }

  setNewValue(state) {
    this.setState({
      usState: state
    })
  }

  changeHandler = value => {
    this.setState({ value })
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleSwitchChange = ()  => {
    this.setState({ invite_only: !this.state.invite_only });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = obj => {

    let event_obj

    if (!this.state.selectedDate || !this.state.content) {
      this.props.alert.show('please select name and date')
      return
    }
    
    if (this.state.setVenue){
      event_obj = this.state.setVenue
      let venue = this.state.setVenue.name
      event_obj.name = this.state.content
      event_obj.venue = venue
      event_obj.date = this.state.selectedDate
      event_obj.author = this.props.auth.displayName
      event_obj.user_id = Number(localStorage.getItem("user_id"))
      event_obj.posters_email = this.props.auth.email
      event_obj.posters_pic = this.props.auth.photoURL
      event_obj.invite_only = this.state.invite_only
      event_obj.raiting = this.state.setVenue.rating
    } else {
      event_obj = {
        name: this.state.content,
        date: this.state.selectedDate,
        author: this.props.auth.displayName,
        user_id: Number(localStorage.getItem("user_id")),
        posters_email: this.props.auth.email,
        posters_pic: this.props.auth.photoURL,
        invite_only: this.state.invite_only,
        location: '',
        venue: '',
      }
    }

    this.props.createEvent(event_obj, Number(localStorage.getItem("user_id")));
    this.props.history.push("/events");
  };

  searchMap = event => {

    this.setState({
      show_map: false,
      taco_places: []
    }, () => {

    let key = firebase.functions().app_.options_.yelpkey;
    let city = this.state.byCity;

    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?term=taco&location=${city}&categories=mexican`,
        {
          headers: {
            Authorization: `Bearer ${key}`
          }
        }
      )
      .then(res => {
        console.log(res);

        let destinations = [];
        let obj;
        let biz = res.data.businesses;
        let lat_ar = [];
        let lon_ar = [];

        for (let i = 0; i < biz.length; i++) {
          obj = {
            lat: biz[i].coordinates.latitude,
            lon: biz[i].coordinates.longitude,
            name: biz[i].name
          };
          lat_ar.push(biz[i].coordinates.latitude);
          lon_ar.push(biz[i].coordinates.longitude);
          destinations.push(obj);
        }

        const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

        const av_lat = average(lat_ar);
        const av_lon = average(lon_ar);

        this.setState({
          city_location: "",
          taco_places: res.data.businesses,
          destinations: destinations,
          lat_av: av_lat,
          lon_av: av_lon,
          show_map: true
        });
      })
      .catch(error => {
        
        this.setState({
          city_location: ""
        });
      });
    })
  };


  searchSingle = (event) => {
    let key = firebase.functions().app_.options_.yelpkey;
    let {byName, street, usState, usCity}  = this.state
    let url = `https://api.yelp.com/v3/businesses/matches?name=${byName}&address1=${street}&city=${usCity}&state=${usState}&country=US`
    
     axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}${url}`,
        {
          headers: {
            Authorization: `Bearer ${key}`
          }
        }
      )
      .then(res => {
        
        let id = res.data.businesses[0].id
        let url = `https://api.yelp.com/v3/businesses/${id}`
        axios
          .get(
            `${"https://cors-anywhere.herokuapp.com/"}${url}`,
            {
              headers: {
                Authorization: `Bearer ${key}`
              }
            }
          )
          .then(res => {
            let singleVenue = {
              name: res.data.name,
              img_url: res.data.image_url,
              rating: res.data.rating,
              url: res.data.url,
              price: res.data.price,
              location: `${res.data.location.display_address[0]} ${res.data.location.display_address[1]}`,
              lat: res.data.coordinates.latitude,
              lon: res.data.coordinates.longitude
            }

            this.setState({
              singleVenue: singleVenue,
              show_map2: true
            })
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error.data)
      })   
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  setVenues = (value) => {
    if (value === 0) {
      this.setState({
        setVenue: '',
        value: value,
        show_map2: false,
        show_map: false,
        byName: '',
        usCity: '',
        street: '',
        byCity: '',
      })
    } else {
      this.setState({
        value: value,
        show_map2: false,
        show_map: false,
        byCity: '',
        byName: '',
        usCity: '',
        street: ''
      })
    }
  }

  setVenue = (obj) => {
    
    this.props.alert.show(`${obj.name} set as venue`)
    this.setState({
      setVenue: obj
    })
  }

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
    this.setState({
        visible : false
    });
  }

  render() {
    const { classes } = this.props;
    const { selectedDate, value, taco_places, currentPage, tacosPerPage } = this.state;
    const indexOfLastTaco = currentPage * tacosPerPage;
    const indexOfFirstTaco = indexOfLastTaco - tacosPerPage;
    const currentTacos = taco_places.slice(indexOfFirstTaco, indexOfLastTaco);
    const pageNumbers = [];

    

    for (let i = 1; i <= Math.ceil(taco_places.length / tacosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button
          key={number}
          id={number}
          onClick={this.handleClick}
          className="btnMarginC"
        >
          {number}
        </button>
      );
    });

    

    function TabContainer(props) {
      return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
          {props.children}
        </Typography>
      );
    }

    return (
      <div className="create-event-full-wrapper pageBottom">
        <div className="navigation-wrapper">
          <DrawerBar />
        </div>

        <div className={`form-wrapper createDiv ${this.state.bottom_0}`}>
          <Paper className={classes.root} elevation={1}>
            <CreateEventWrapper>
              <FlexForm>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid className="formDiv">
                    <div className="taco_budiesDiv">
                      <img src={taco_buddies} className="taco_buddies" />
                      <div className="centered">Create Event</div>
                    </div>
                    <div className="flexDiv">
                      <TextField
                        id="outlined-name"
                        label="Event Name"
                        className={classes.textField}
                        value={this.state.content}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="content"
                      />
                    </div>
                    <div className="flexDivDate">
                      <DatePicker
                        required
                        margin="normal"
                        label="Date picker"
                        value={selectedDate}
                        onChange={this.handleDateChange}
                      />
                      <TimePicker
                        required
                        margin="normal"
                        label="Time picker"
                        value={selectedDate}
                        onChange={this.handleDateChange}
                      />
                    </div>
                  </Grid>
                </MuiPickersUtilsProvider>
              </FlexForm>
            </CreateEventWrapper>

            <div className="venueBtns">
              <Button onClick={() => {this.setVenues(1); this.openModal()}}>Lookup Venue</Button>
              <Button onClick={() => {this.setVenues(2); this.openModal()}}>Search Venues by City</Button>
            </div>

            {this.state.setVenue ? (
              <Typography variant="h5" className="centerText">
                <span className="xbutton2" onClick={() => {this.setVenues(0)}}>x</span> Venue, {this.state.setVenue.name}
              </Typography>
            ) : null}

            <section>
      <Modal visible={this.state.visible} className="modal-body" effect="fadeInUp" onClickAway={() => this.closeModal()}>




        {this.state.value === 0 ? (null) 
          : this.state.value === 1 ? (
          <div>
            <div className="containSingle">
              <p className="xbutton" onClick={() => {this.closeModal()}}>X</p>
              <Typography variant="h5" className={`${classes.bottom} centerText`}>
                Look Up Specific Venue
              </Typography>

              <Input
                placeholder="venue"
                id="outlined-name"
                label="Venue Name"
                className={`${classes.textField} ${classes.spaceTop}`}
                value={this.state.byName}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                name="byName"
              />

              <Input
                placeholder="city"
                id="outlined-name"
                label="City"
                className={classes.textField}
                value={this.state.usCity}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                name="usCity"
              />

              <Input
                placeholder="street"
                id="outlined-name"
                label="street"
                className={classes.textField}
                value={this.state.street}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                name="street"
                
              />

              <SelectUSState onChange={this.setNewValue} className="bottom_marg"/><br />
              <div className="bottom_marg">
                <Button variant="contained" onClick={this.searchSingle}>
                  Search
                </Button>
              </div>
            </div>

            <div>
              {this.state.show_map2 ? (
                <div className="mapSingle">
                  <MapDiv2>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: firebase.functions().app_.options_.googlekey }}
                      defaultZoom={16}
                      defaultCenter={{lat: this.state.singleVenue.lat, lng: this.state.singleVenue.lon}}
                    >
                    <TacoLocation
                      text={this.state.singleVenue.name}
                      lat={this.state.singleVenue.lat}
                      lng={this.state.singleVenue.lon}
                    />
                    </GoogleMapReact>
                  </MapDiv2>

                  <Card>
                    <a href={this.state.singleVenue.url} target="_blank" className={classes.noHref}>
                      <CardActionArea>
                        <CardMedia
                          className={`${classes.media2}`}
                          image={this.state.singleVenue.image_url}
                          title="venue picture"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {this.state.singleVenue.name}
                          </Typography>
                          <Typography component="p">
                            Location: {this.state.singleVenue.location}<br/>
                            Rating: {this.state.singleVenue.rating}<br/>
                            Price: {this.state.singleVenue.price}<br/>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </a>
                      <CardActions>
                        <Button size="small" color="primary" onClick={() => {this.setVenue(this.state.singleVenue); this.closeModal()}}>
                          Set as Location
                        </Button>
                    </CardActions>
                  </Card>
                </div>
              ) : null }
            </div>
          </div>

            )
          : this.state.value === 2 ? (

          <div >
            <div className="cityLook">
              <p className="xbutton3" onClick={() => {this.closeModal()}}>X</p>
              <Typography variant="h5" className={`${classes.bottom} centerText`}>
                  Lookup Top Venues
              </Typography>

              <TextField
                id="outlined-name"
                label="by City"
                className={classes.textField2}
                value={this.state.byCity}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                name="byCity"
              />

              <div className="bottom_marg2">
                <Button variant="contained" onClick={this.searchMap}>
                  Search
                </Button>
              </div>
            </div>

            {this.state.show_map ? (
              <OverFlow>
                  <MapDiv>
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: firebase.functions().app_.options_.googlekey
                        }}
                        defaultZoom={this.state.zoom}
                        defaultCenter={{ lat: this.state.lat_av, lng: this.state.lon_av }}
                      >
                        {this.state.destinations.map((d, i) => {
                          return <TacoLocation lat={d.lat} lng={d.lon} text={d.name} key={i} />;
                        })}
                      </GoogleMapReact>
                  </MapDiv>
                  <div className="flex1">
                  {currentTacos.map((t, idx) => {
                        return (
                    
                      <Card className="card">
                        <a href={t.url} target="_blank" className={classes.noHref}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={t.image_url}
                              title="venue picture"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                {t.name}
                              </Typography>
                              <Typography component="p">
                                Location:{" "}
                                {`${t.location.display_address[0]} ${
                                  t.location.display_address[1]
                                }`}<br/>
                                Rating: {t.rating}<br/>
                                Price: {t.price}<br/>
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </a>
                        <CardActions>
                          <Button size="small" color="primary" 
                            onClick={() => {this.setVenue(
                              {
                                lat: t.coordinates.latitude,
                                lon: t.coordinates.longitude,
                                name: t.name,
                                img_url: t.image_url,
                                location: `${t.location.display_address[0]} ${
                                  t.location.display_address[1]
                                }`,
                                raiting: t.rating,
                                price: t.price,
                                url: t.url
                              }
                            ); this.closeModal()}}
                          >
                            Set as Location
                          </Button>
                      </CardActions>
                    </Card>
                    )
                  })}
                </div>
                {renderPageNumbers}
              </OverFlow>
              ) : null}
          </div>
          )
          : null
        }

          </Modal>
          </section>

          <div className="flexDiv">
            <Button
              variant="contained"
              size="small"
              className={`${classes.button} ${classes.biggerFontCreate}`}
              onClick={this.handleSubmit}
            >

            <img src={taco_pic} className="tacopicCreate"/>
            Create
            </Button>
          </div>

          </Paper>

        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps, {createEvent})(withStyles(styles)(withAlert()(CreateEvent)));


//create