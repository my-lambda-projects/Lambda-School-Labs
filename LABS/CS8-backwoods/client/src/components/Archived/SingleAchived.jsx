import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MapImg from "../TripList/Google-Maps.jpg";
import "./Archived.css";

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

const SingleAchived = props => {
  const {
    id,
    tripName,
    startDate,
    endDate,
    email,
    slug,
    count,
    animateList
  } = props;
  const TripOpen = {
    pathname: `/${email}/trip/${slug}`,
    param1: id,
    param2: tripName,
    param3: startDate,
    param4: endDate
  };

  const startDateFormat = new Date(startDate);
  const startDateDisplay = ` ${startDateFormat.getMonth() +
    1}/${startDateFormat.getDate()}/${startDateFormat
    .getFullYear()
    .toString()
    .substr(-2)}`;
  const endDateFormat = new Date(endDate);
  const endDateDisplay = ` ${endDateFormat.getMonth() +
    1}/${endDateFormat.getDate()}/${endDateFormat
    .getFullYear()
    .toString()
    .substr(-2)}`;
  return (
    <Grow
      in={animateList}
      style={{ transformOrigin: "0 0 0" }}
      {...(animateList ? { timeout: count } : {})}
    >
      <Paper className="trip2" elevation={1}>
        <Link to={TripOpen} style={{ textDecoration: "none" }}>
          <Typography variant="display1" component="h2" className="TripTitle">
            {tripName}
          </Typography>
          <img src={MapImg} alt="" className="mapsIcon" />
        </Link>
        <div className="tripDatesWrapper">
          <div className="tripdates">
            <span className="SingleTripStartAndEndDate">
              Start Date: {startDateDisplay}
            </span>{" "}
            <span className="SingleTripStartAndEndDate">
              End Date: {endDateDisplay}
            </span>{" "}
          </div>
          <MuiThemeProvider theme={theme}>
            <Button
              onClick={() => props.UnarchiveTrip(props.id, props.index)}
              variant="outlined"
              color="primary"
            >
              Unarchive
            </Button>
          </MuiThemeProvider>
        </div>
      </Paper>
    </Grow>
  );
};

export default SingleAchived;
