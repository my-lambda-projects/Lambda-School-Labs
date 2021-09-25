import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const TripOpenName = props => {
  const { tripName } = props;
  return (
    <Paper className="OpenTripName">
      <Typography className="tripname" variant="display1">
        {tripName}
      </Typography>
    </Paper>
  );
};

TripOpenName.propTypes = {
  tripName: PropTypes.string.isRequired
};

export default TripOpenName;
