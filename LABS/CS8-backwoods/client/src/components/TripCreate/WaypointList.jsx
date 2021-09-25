import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import WayPoint from "./Waypoint";
import WaypointCreateCard from "./WaypointCreateCard";

const addTheme = createMuiTheme({
  palette: {
    primary: blue
  }
});
const removeTheme = createMuiTheme({
  palette: {
    primary: red
  }
});
const WaypointList = props => {
  const {
    markerAddCard,
    disableAddMarker,
    removeMarker,
    disableRemoveMarker,
    displayMarkerCard,
    handleChange,
    handleWayPointExpand,
    newMarkersArr,
    expanded,
    ...rest
  } = props;
  return (
    <Paper className="WaypointListWrapper" elevation={1}>
      <Typography
        variant="display1"
        component="h3"
        className="waypointStartEnd"
      >
        Start
      </Typography>
      <Divider />
      <div className="waypointButtonWrapper">
        <MuiThemeProvider theme={addTheme}>
          <Button
            size="large"
            variant="outlined"
            onClick={markerAddCard}
            disabled={disableAddMarker}
            color="primary"
          >
            <Icon>add</Icon>
            Add
          </Button>
        </MuiThemeProvider>
        <MuiThemeProvider theme={removeTheme}>
          <Button
            size="large"
            variant="outlined"
            onClick={removeMarker}
            disabled={disableRemoveMarker}
            color="primary"
          >
            <Icon>delete</Icon>
            Remove
          </Button>
        </MuiThemeProvider>
      </div>
      <div className="waypointContainer">
        <WaypointCreateCard
          displayMarkerCard={displayMarkerCard}
          handleChange={handleChange}
          {...rest}
        >
          {displayMarkerCard ? (
            <Input
              placeholder="Marker Name here"
              className="markerName"
              inputProps={{
                "aria-label": "Description"
              }}
              onChange={handleChange("markerName")}
            />
          ) : null}
        </WaypointCreateCard>
        {newMarkersArr.map((wayPoint, index) => (
          <WayPoint
            wayPoint={wayPoint}
            wayPointKey={index}
            key={wayPoint.lng}
            handleWayPointExpand={handleWayPointExpand}
            expanded={expanded}
          />
        ))}
      </div>
      <Divider />
      <Typography
        variant="display1"
        component="h3"
        className="waypointStartEnd"
      >
        End
      </Typography>
    </Paper>
  );
};

WaypointList.propTypes = {
  markerAddCard: PropTypes.func.isRequired,
  removeMarker: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleWayPointExpand: PropTypes.func.isRequired,
  disableAddMarker: PropTypes.bool.isRequired,
  disableRemoveMarker: PropTypes.bool.isRequired,
  displayMarkerCard: PropTypes.bool.isRequired,
  newMarkersArr: PropTypes.instanceOf(Array).isRequired
};

export default WaypointList;
