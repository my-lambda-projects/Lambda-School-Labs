/* 
  - Have two tabs:
    1. Favorite locations (name & location)
    2. Friends (name & location)
*/
import React from "react";
import { connect } from "react-redux";
import DrawerBar from "../drawer/Drawer";

// --> import userActions
import { fetchUser, searchUsers } from "../../store/actions/userActions";
// --> import friendsActions
import {
  fetchFriends,
  addFriend,
  deleteFriend
} from "../../store/actions/friendsActions";
// --> import favoritesActions
import {
  addFavorite,
  fetchFavorites,
  searchFavorites,
  deleteFavorite
} from "../../store/actions/favoritesActions";

import { Link } from "react-router-dom";
// CSS IMPORT
import "./UserProfile.css";

import { Container, EditBtn, FlexEnd } from "./userprofile_css.js";

//-------------Material UI------------------
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

// Select imports
import ReactDOM from "react-dom";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Search field imports
import TextField from "@material-ui/core/TextField";

// Avatar imports
import Avatar from "@material-ui/core/Avatar";

// List imports for friends
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";

// Button Import
import Button from "@material-ui/core/Button";

// Card Import for Styling
import Card from "@material-ui/core/Card";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3, width: "100%" }}>
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
    display: "flex",
    flexWrap: "wrap"
  },
  // For select
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 100,
    height: "40px",
    marginTop: "24px"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 0
  },
  // For search field
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  // For avatar
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  justifyTabs: {
    justifyContent: "center"
  },
  root_81: {
    padding: 0,
    width: "100%",
    textAlign: "center",
    margin: "0 10px",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    }
  },
  userName: {
    fontSize: "1.9rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem"
    }
  },
  // Profile container
  profileContainer: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      maxWidth: "1000px",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  profileDetails: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    textAlign: "center",
    width: "90%",

    [theme.breakpoints.up("md")]: {
      // marginRight: "100px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  profileFunctions: {
    [theme.breakpoints.up("md")]: {
      width: "800px"
    }
  },
  evenWidth: {
    [theme.breakpoints.up("sm")]: { width: "50%" }
  }
});

//^^^^^^^^^^Material UI ABOVE^^^^^^^^^^^^^^^

class UserProfile extends React.Component {
  state = {
    search: "",
    value: "All",
    // For tabs
    tabValue: 0,
    // For select
    name: "hai",
    labelWidth: 0
  };

  // For tabs
  handleChangeTabs = (event, tabValue) => {
    this.setState({ tabValue });
  };

  handleChange = e => {
    this.setState({
      search: [e.target.value]
    });
  };

  handleSelect = e => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    });
  };

  handleSubmitFavorites = e => {
    e.preventDefault();
    this.props.searchFavorites(this.state.search);
    this.setState({
      search: ""
    });
    let box = document.getElementById("results");
    box.style.display = "inline-block";
  };

  handleSubmitUsers = e => {
    e.preventDefault();
    this.props.searchUsers(this.state.search);
    this.setState({
      search: ""
    });
    let box = document.getElementById("results");
    box.style.display = "inline-block";
  };

  // handle mouse click off results
  handleClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }

    let box = document.getElementById("results");
    if (e.target !== box && box.style.display === "inline-block") {
      box.style.display = "none";
    }
  };

  friendAdd = event => {
    event.preventDefault();
    let ids = {
      user_id: parseInt(localStorage.getItem("user_id")),
      friends_id: parseInt(event.target.id)
    };
    let obj = { data: ids };
    let cid = obj.data.user_id;
    this.props.addFriend(obj, cid);
  };

  favorite;

  componentDidMount() {
    // fetchUser
    this.props.fetchUser(localStorage.getItem("user_id"));
    // fetchFavorites
    this.props.fetchFavorites(localStorage.getItem("user_id"));
    // fetchFriends
    this.props.fetchFriends(localStorage.getItem("user_id"));
    // mousedown
    document.addEventListener("mousedown", this.handleClick, false);
    // Select material ui
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  componentWillUnmount() {
    // mousedown
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  render() {
    // For tabs
    const { classes } = this.props;
    const { tabValue } = this.state;

    return (
      <div className="profile">
        <DrawerBar />
        <Container className={classes.profileContainer}>
          <div className={classes.profileDetails}>
            <div className="profile-header">
              <Avatar
                src={this.props.user.user_pic}
                className={classes.bigAvatar}
              />
              <Typography
                variant="h3"
                className="profile-name"
                classes={{ root: classes.userName }}
              >
                {this.props.user.name}
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  this.props.history.push("/user-settings");
                }}
              >
                Edit Profile
              </Button>
            </div>
            <div className="profile-preferences">
              <Typography>
                Tortilla preference: {this.props.user.hard_or_soft}
              </Typography>
              <Typography>Spiciness: {this.props.user.heat_pref}</Typography>
              <Typography>
                Street or Gourmet: {this.props.user.street_gourmet}
              </Typography>
            </div>
          </div>

          <div className={classes.profileFunctions}>
            <div className="profile-search">
              {/* Search Bar */}
              <div className="profile-search-friends">
                {/* Form for Search Results */}
                {this.state.tabValue === 0 ? (
                  <div>
                    <form
                      className={classes.container}
                      noValidate
                      autoComplete="off"
                      onSubmit={this.handleSubmitFavorites}
                    >
                      <TextField
                        id="standard-search"
                        label="Find a new favorite"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        value={this.state.search}
                        onChange={this.handleChange}
                      />
                    </form>
                  </div>
                ) : (
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleSubmitUsers}
                  >
                    <TextField
                      id="standard-search"
                      label="Find a new friend"
                      type="search"
                      className={classes.textField}
                      margin="normal"
                      value={this.state.search}
                      onChange={this.handleChange}
                    />
                  </form>
                )}

                <div className="results-container">
                  {this.state.tabValue === 0 ? (
                    // Results for Favorites
                    <div id="results" ref={node => (this.node = node)}>
                      {this.props.locations.map(result => {
                        if (result !== undefined) {
                          return (
                            <ListItem>
                              <div
                                className={`resultsDisplay ${result.location}`}
                              >
                                <div className="location-picture">
                                  {/* <img /> */}
                                  <ListItemText primary={result.name} />
                                  <ListItemText primary={result.location} />
                                  <IconButton aria-label="Add">
                                    <Icon
                                      onClick={event => {
                                        event.preventDefault();
                                        let ids = {
                                          name: result.name,
                                          location: result.location,
                                          user_id: parseInt(
                                            localStorage.getItem("user_id")
                                          )
                                        };
                                        this.props.addFavorite(ids);
                                      }}
                                    >
                                      +
                                    </Icon>
                                  </IconButton>
                                </div>
                              </div>
                            </ListItem>
                          );
                        }
                        return "Locations map completed";
                      })}
                    </div>
                  ) : (
                    // Results for Users
                    <div id="results" ref={node => (this.node = node)}>
                      <List>
                        {this.props.users.map(result => {
                          if (result !== undefined) {
                            return (
                              <Link to={`user/${result.id}`}>
                                <ListItem className="resultsDisplay">
                                  <ListItemAvatar className="location-picture">
                                    <Avatar src={result.user_pic} />
                                  </ListItemAvatar>
                                  <ListItemText primary={result.name} />
                                  <IconButton aria-label="Delete">
                                    <Icon
                                      onClick={this.friendAdd}
                                      id={result.id}
                                    >
                                      +
                                    </Icon>
                                  </IconButton>
                                </ListItem>
                                <Divider />
                              </Link>
                            );
                          }
                        })}
                      </List>
                    </div>
                  )}
                </div>
              </div>

              {this.state.tabValue === 0 && (
                <form className={classes.root} autoComplete="off">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                    >
                      Location
                    </InputLabel>
                    <Select
                      value={this.state.value}
                      onChange={this.handleSelect}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="age"
                          id="outlined-age-simple"
                        />
                      }
                    >
                      <MenuItem value="All">
                        <em>All</em>
                      </MenuItem>
                      {this.props.favorites.map(favorite => {
                        if (favorite !== undefined) {
                          return (
                            <MenuItem
                              className={`location-${favorite.location}`}
                              value={`${favorite.location}`}
                            >
                              {favorite.location}
                            </MenuItem>
                          );
                        }
                      })}
                    </Select>
                  </FormControl>
                </form>
              )}
            </div>

            <div className="profile-personal-container">
              {/* Tabs */}
              <div className={classes.root}>
                <AppBar
                  position="static"
                  style={{
                    justifyContent: "center",
                    backgroundColor: "#9f0808"
                  }}
                >
                  <Tabs
                    value={tabValue}
                    onChange={this.handleChangeTabs}
                    classes={{ flexContainer: classes.justifyTabs }}
                  >
                    <Tab label="Favorite" style={{ width: "50%" }} />
                    <Tab label="Friends" style={{ width: "50%" }} />
                  </Tabs>
                </AppBar>
                {tabValue === 0 && (
                  <TabContainer>
                    {/* Favorites Tab */}
                    {this.state.value === "All" ? (
                      <div id="Favorites" className="tabcontent">
                        <List>
                          {this.props.favorites.map(favorite => {
                            return (
                              <ListItem>
                                <div
                                  className={`resultsDisplay ${
                                    favorite.location
                                  }`}
                                >
                                  <div className="location-picture">
                                    {/* <img /> */}
                                    <ListItemText primary={favorite.name} />
                                    <ListItemText primary={favorite.location} />
                                    <IconButton aria-label="Delete">
                                      <DeleteIcon
                                        onClick={event => {
                                          event.preventDefault();
                                          this.props.deleteFavorite(
                                            favorite.id
                                          );
                                        }}
                                      />
                                    </IconButton>
                                  </div>
                                </div>
                              </ListItem>
                            );
                          })}
                        </List>
                      </div>
                    ) : (
                      <div id="Favorites" className="tabcontent">
                        <List>
                          {this.props.favorites
                            .filter(
                              favorite => favorite.location === this.state.value
                            )
                            .map(favorite => {
                              return (
                                <ListItem>
                                  <div
                                    className={`resultsDisplay ${
                                      favorite.location
                                    }`}
                                  >
                                    <div className="location-picture">
                                      {/* <img /> */}
                                      <ListItemText primary={favorite.name} />
                                      <ListItemText
                                        primary={favorite.location}
                                      />
                                      <IconButton aria-label="Delete">
                                        <DeleteIcon
                                          onClick={this.favoriteDelete}
                                          id={favorite.id}
                                        />
                                      </IconButton>
                                    </div>
                                  </div>
                                </ListItem>
                              );
                            })}
                        </List>
                      </div>
                    )}
                  </TabContainer>
                )}
                {tabValue === 1 && (
                  <TabContainer>
                    {/* Friends Tab */}
                    <List classes={{ root: classes.root_81 }}>
                      {this.props.friends.map(friend => {
                        return (
                          <Link
                            to={`/user/${friend.id}`}
                            className={classes.evenWidth}
                          >
                            <ListItem className="resultsDisplay">
                              <ListItemAvatar className="location-picture">
                                <Avatar src={friend.user_pic} />
                              </ListItemAvatar>
                              <ListItemText primary={friend.name} />
                              <IconButton aria-label="Delete">
                                <DeleteIcon
                                  onClick={event => {
                                    event.preventDefault();
                                    let ids = {
                                      user_id: parseInt(
                                        localStorage.getItem("user_id")
                                      ),
                                      friends_id: friend.id
                                    };
                                    this.props.deleteFriend(
                                      ids,
                                      ids.friends_id
                                    );
                                  }}
                                />
                              </IconButton>
                            </ListItem>
                          </Link>
                        );
                      })}
                    </List>
                  </TabContainer>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  } // --> render() brace
} // --> class brace

// mapStateToProps
const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    favorites: state.favoritesReducer.favorites,
    friends: state.friendsReducer.friends,
    users: state.userReducer.users,
    locations: state.favoritesReducer.locations
  };
};

export default connect(
  mapStateToProps,
  {
    fetchUser,
    fetchFavorites,
    fetchFriends,
    searchUsers,
    searchFavorites,
    addFriend,
    addFavorite,
    deleteFriend,
    deleteFavorite
  }
)(withStyles(styles, { withTheme: true })(UserProfile));
