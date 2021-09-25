import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MapImg from "./Google-Maps.jpg";

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

const SingleTrip = props => {
  const {
    email,
    slug,
    id,
    tripName,
    startDate,
    endDate,
    animateList,
    count,
    isLoggedIn
  } = props;
  const TripOpen = {
    pathname: `/${email}/trip/${slug}`,
    param1: id,
    param2: tripName,
    param3: startDate,
    param4: endDate
  };

  const startDateFormat = new Date(startDate);
  const displayStartDate = ` ${startDateFormat.getMonth() +
    1}/${startDateFormat.getDate()}/${startDateFormat
    .getFullYear()
    .toString()
    .substr(-2)}`;
  const endDateFormat = new Date(endDate);
  const displayEndDate = ` ${endDateFormat.getMonth() +
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
      <Paper className="trip" elevation={1}>
        <Link to={TripOpen} style={{ textDecoration: "none" }}>
          <Typography variant="display1" component="h2" className="TripTitle">
            {tripName}
          </Typography>
          <img src={MapImg} alt="" className="mapsIcon" />
        </Link>
        <div className="tripDatesWrapper">
          <div className="tripdates">
            <span className="SingleTripStartAndEndDate">
              Start Date: {displayStartDate}
            </span>{" "}
            <span className="SingleTripStartAndEndDate">
              End Date: {displayEndDate}
            </span>{" "}
          </div>
          {isLoggedIn && (
            <MuiThemeProvider theme={theme}>
              <Button
                onClick={() => props.archiveTrip(props.id, props.index)}
                variant="outlined"
                color="primary"
              >
                Archive
              </Button>
            </MuiThemeProvider>
          )}
        </div>
      </Paper>
    </Grow>
  );
};

export default SingleTrip;
