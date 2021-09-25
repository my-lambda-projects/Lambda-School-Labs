import React from "react";
import { Link } from "react-router-dom";
import {
  getEvents,
  deleteEvent,
  updateEvent,
  acceptEvent,
  declineEvent
} from "../../store/actions/eventsActions";
import { connect } from "react-redux";
import "./create_event.css";
import DrawerBar from "../drawer/Drawer";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";

// import HomeIcon from '@material-ui/icons/Home';
import SvgIcon from "@material-ui/core/SvgIcon";

//-------------Material UI------------------
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

// Imports for delete event button
import Fab from "@material-ui/core/Fab";

import "./custom.css";

import Moment from "react-moment";

// Badge Import
import Badge from "@material-ui/core/Badge";

import { ListContainer, UpcomingContainer, FlexList } from "./eventlist_css.js";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  appBar: {},
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  button: {
    margin: theme.spacing.unit
  },
  buttonAccept: {
    margin: theme.spacing.unit,
    backgroundColor: "#17a81c",
    height: "40",
    color: "white"
  },
  buttonDecline: {
    margin: theme.spacing.unit,
    backgroundColor: "#c41515",
    height: "40",
    color: "white"
  },
  buttonGroup: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column"
    }
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  pmarg: {
    marginBottom: 10
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  tabs: {
    width: "33%",
    [theme.breakpoints.down("xs")]: {
      width: "inherit"
    },
    color: "white"
  },
  tabBar: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#3f51b5",
    color: "ffff"
  },
  textBox: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  },
  redish: {
    backgroundColor: '#9f0808'
  }
});

//root

//------------------------------------------

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: "",
      editDate: "",
      windowWidth: "",
      tabValue: 0
    };
  }

  // For tabs
  handleChangeTabs = (event, tabValue) => {
    this.setState({ tabValue });
  };

  componentDidMount() {
    this.props.getEvents(parseInt(localStorage.getItem("user_id")));
    console.log(window.innerWidth);

    /* 
			- This is to check if the window is getting resized or not (kind of like a media query) 
			and then invoking my checkWindowWidth function to adjust the this.state.windowWidth value

			- The this.state.windowWidth value is getting rendered as either "50%" or "100%" in my inline styling for the 
			`<GridListTile />` where I adjust width
		*/
  }

  showForm = () => {
    this.setState({
      showEdit: !this.state.showEdit
    });
  };

  update = event => {
    event.preventDefault();
    let obj = {
      name: this.state.editName,
      date: this.state.editDate,
      id: parseInt(event.target.id)
    };
    
    this.props.updateEvent(obj);
    this.setState({
      showEdit: false
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  joinEvent = id => {
    let id_user = Number(localStorage.getItem("user_id"));
    let obj = { user_id: id_user, event_id: id };
    this.props.acceptEvent(obj);
  };

  declineEvent = id => {
    let id_user = Number(localStorage.getItem("user_id"));
    let obj = { user_id: id_user, event_id: id };
    this.props.declineEvent(obj);
  };

  render() {
    // For tabs
    const { classes } = this.props;
    const { tabValue } = this.state;
    
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div className="events-container">
        <DrawerBar />

        <ListContainer>
          {this.props.events ? (
            <div className={classes.root}>
              <div className={classes.appBar} position="static">
                <Tabs
                  value={tabValue}
                  onChange={this.handleChangeTabs}
                  classes={{ flexContainer: `${classes.tabBar} ${classes.redish}` }}
                >
                  <Tab label="Upcoming" className={classes.tabs} />
                  <Tab
                    label={
                      <Badge
                        className={classes.padding}
                        color="secondary"
                        badgeContent={this.props.pendingCount}
                      >
                        Pending
                      </Badge>
                    }
                    className={classes.tabs}
                  />
                  <Tab label="Past" className={classes.tabs} />
                </Tabs>
              </div>
              {tabValue === 0 && (
                <TabContainer>
                  <Grid>
                    {this.props.events.upcoming &&
                      this.props.events.upcoming.map(event => {
                        return (
                          <Grid item xs={12} key={event.id}>
                            {this.props.auth.email === event.posters_email ? (
                              <Fab
                                aria-haspopup="true"
                                style={{
                                  backgroundColor: "#ffff",
                                  top: "55px",
                                  left: "5px",
                                  height: "50px",
                                  width: "50px",
                                  position: "relative",
                                  zIndex: "20",
                                  boxShadow: "none"
                                }}
                                onClick={() => {
                                  this.props.deleteEvent(event.id);
                                }}
                              >
                                <i class="fas fa-times" />
                              </Fab>
                            ) : null}
                            <Paper
                              className={`${classes.paper} flexList hoverpoint`}
                              onClick={() => {
                                this.props.history.push(`/events/${event.id}`);
                              }}
                            >
                              <Avatar
                                alt="posters image"
                                src={event.posters_pic}
                                className={classes.bigAvatar}
                              />

                              <CardContent className={classes.textBox}>
                                <Typography
                                  variant="h5"
                                  component="h2"
                                  className={classes.pos}
                                >
                                  {event.name}
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">
                                    {event.date}
                                  </Moment>
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  total attending: {event.total_users}
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  comments: {event.total_comments}
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  posted by {event.author}
                                </Typography>
                              </CardContent>
                            </Paper>
                          </Grid>
                        );
                      })}
                  </Grid>
                </TabContainer>
              )}
              {tabValue === 1 && (
                <TabContainer>
                  <Grid container>
                    {this.props.events.pending &&
                      this.props.events.pending.map(event => {
                        return (
                          <Grid item xs={12} key={event.id}>
                            <Fab
                              aria-haspopup="true"
                              style={{
                                backgroundColor: "#ffff",
                                top: "55px",
                                left: "5px",
                                height: "50px",
                                width: "50px",
                                position: "relative",
                                zIndex: "20",
                                boxShadow: "none"
                              }}
                              id={event.id}
                              onClick={() => {
                                this.declineEvent(event.id);
                              }}
                            >
                              <i class="fas fa-times" />
                            </Fab>

                            <Paper
                              className={`${classes.paper} flexList`}
                              onClick={() => {
                                this.props.history.push(`/events/${event.id}`);
                              }}
                            >
                              <Avatar
                                alt="posters image"
                                src={event.posters_pic}
                                className={classes.bigAvatar}
                              />

                              <CardContent className={classes.textBox}>
                                <Typography
                                  variant="h5"
                                  component="h2"
                                  className={classes.pos}
                                >
                                  {event.name}
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">
                                    {event.date}
                                  </Moment>
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  total attending: {event.total_users}
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  comments: {event.total_comments}
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  posted by {event.author}
                                </Typography>
                              </CardContent>

                              <div className={classes.buttonGroup}>
                                <Button
                                  variant="contained"
                                  className={classes.buttonAccept}
                                  id={event.id}
                                  onClick={() => {
                                    this.joinEvent(event.id);
                                  }}
                                >
                                  LET'S GO
                                </Button>
                              </div>
                            </Paper>
                          </Grid>
                        );
                      })}
                  </Grid>
                </TabContainer>
              )}
              {tabValue === 2 && (
                <TabContainer>
                  <Grid container>
                    {this.props.events.past &&
                      this.props.events.past.map(event => {
                        return (
                          <Grid
                            item
                            xs={12}
                            key={event.id}
                            onClick={() => {
                              this.props.history.push(`/events/${event.id}`);
                            }}
                          >
                            {this.props.auth.email === event.posters_email ? (
                              <Fab
                                aria-haspopup="true"
                                style={{
                                  backgroundColor: "#ffff",
                                  top: "55px",
                                  left: "5px",
                                  height: "50px",
                                  width: "50px",
                                  position: "relative",
                                  zIndex: "20",
                                  boxShadow: "none"
                                }}
                                onClick={() => {
                                  this.props.deleteEvent(event.id);
                                }}
                              >
                                <i class="fas fa-times" />
                              </Fab>
                            ) : null}
                            <Paper className={`${classes.paper} flexList`}>
                              <Avatar
                                alt="posters image"
                                src={event.posters_pic}
                                className={classes.bigAvatar}
                              />
                              <CardContent className={classes.textBox}>
                                <Typography
                                  variant="h5"
                                  component="h2"
                                  className={classes.pos}
                                >
                                  {event.name}
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">
                                    {event.date}
                                  </Moment>
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  total attending: {event.total_users}
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  comments: {event.total_comments}
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  posted by {event.author}
                                </Typography>
                              </CardContent>
                            </Paper>
                          </Grid>
                        );
                      })}
                  </Grid>
                </TabContainer>
              )}
            </div>
          ) : (
            <div>Loading ...</div>
          )}
        </ListContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    events: state.eventsReducer.events,
    pendingCount: state.eventsReducer.pendingCount
  };
};

export default connect(
  mapStateToProps,
  { getEvents, deleteEvent, updateEvent, acceptEvent, declineEvent }
)(withStyles(styles, { withTheme: true })(EventList));
