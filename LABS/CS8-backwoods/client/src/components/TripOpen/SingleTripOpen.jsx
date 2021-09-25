import React from "react";
import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import { format } from "date-fns/esm";

const SingleTripOpen = props => {
  const { marker } = props;
  const formatDate = format(new Date(marker.eta), "MM/DD/YYYY");
  return (
    <Paper>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Checkpoint Name: {marker.markerName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            ETA: {formatDate} Time: {marker.time}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
};

SingleTripOpen.propTypes = {
  marker: PropTypes.instanceOf(Object).isRequired
};

export default SingleTripOpen;
