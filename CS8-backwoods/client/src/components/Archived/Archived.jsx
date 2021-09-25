import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import SingleAchived from "./SingleAchived";
import "./Archived.css";

const Archived = props => {
  let count = 550;
  const { trips, ...rest } = props;
  if (trips.length > 0) {
    return (
      <div className="mainTripList">
        {trips.map((trip, index) => {
          if (index > 0) {
            count += 250;
          } else if (count > 2000) {
            count -= 250;
          }
          return (
            <SingleAchived
              index={index}
              count={count}
              key={trip.id}
              tripName={trip.tripName}
              startDate={trip.startDate}
              endDate={trip.endDate}
              slug={trip.slug}
              email={trip.email}
              id={trip.id}
              {...rest}
            />
          );
        })}
      </div>
    );
  }
  return (
    <Fade in>
      <div className="mainTripList">
        <Paper className="noArchivedTripsPaper">
          <Typography variant="display1">No archived trips!</Typography>
        </Paper>
      </div>
    </Fade>
  );
};

Archived.propTypes = {
  trips: PropTypes.instanceOf(Object).isRequired
};

export default Archived;
