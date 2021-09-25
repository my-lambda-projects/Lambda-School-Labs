import React from "react";
import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

const Waypoint = props => {
  const { expanded, wayPointKey, handleWayPointExpand, wayPoint } = props;
  return (
    <ExpansionPanel
      expanded={expanded === `panel${wayPointKey}`}
      onChange={handleWayPointExpand(`panel${wayPointKey}`)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="headline">
          Checkpoint Name: {wayPoint.markerName}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          ETA: {wayPoint.eta}
          <br />
          Time: {wayPoint.time}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

Waypoint.propTypes = {
  wayPointKey: PropTypes.number.isRequired,
  handleWayPointExpand: PropTypes.func.isRequired,
  wayPoint: PropTypes.instanceOf(Object).isRequired,
  expanded: PropTypes.string
};

Waypoint.defaultProps = {
  expanded: null
};

export default Waypoint;
