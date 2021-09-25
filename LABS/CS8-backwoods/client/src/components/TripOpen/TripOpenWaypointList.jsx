import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SingleTripOpen from "./SingleTripOpen";

const WaypointList = props => {
  const { startDate, endDate, markers } = props;
  return (
    <Paper className="tripInfo">
      <Typography className="tripInfo-startdate">Start: {startDate}</Typography>
      <Typography className="tripInfo-endddate">End: {endDate}</Typography>
      {markers.map(marker => (
        <SingleTripOpen marker={marker} key={marker.lng} />
      ))}
    </Paper>
  );
};

WaypointList.propTypes = {
  markers: PropTypes.instanceOf(Object).isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};

export default WaypointList;
