import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grow from "@material-ui/core/Grow";
import "./TripList.css";
import UserHasNoTrips404 from "../404/UserHasNoTrips404";
import SingleTrip from "./SingleTrip";

class MainTriplist extends React.Component {
  state = { animateList: true };

  render() {
    const {
      trips,
      isLoggedIn,
      hasTrips,
      user,
      setSaveTripFalse,
      archiveTrip
    } = this.props;
    const { animateList } = this.state;
    let count = 550;
    const tripsLenght = 250 * trips.length;
    const addButtonCount = count + tripsLenght;
    if (isLoggedIn === false && hasTrips === false) {
      return <UserHasNoTrips404 />;
    }
    return (
      <div className="mainTripList">
        {trips.map((trip, index) => {
          if (index > 0) {
            count += 250;
          } else if (count > 2000) {
            count -= 250;
          }
          return (
            <SingleTrip
              key={trip.id}
              tripName={trip.tripName}
              animateList={animateList}
              count={count}
              createdAt={trip.createdAt}
              updatedAt={trip.updatedAt}
              startDate={trip.startDate}
              endDate={trip.endDate}
              slug={trip.slug}
              email={trip.email}
              id={trip.id}
              archiveTrip={archiveTrip}
              index={index}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
        {isLoggedIn && (
          <Grow
            in={animateList}
            style={{ transformOrigin: "0 0 0" }}
            {...(animateList ? { timeout: addButtonCount } : {})}
          >
            <Paper className="trip" id="addNewTripWrapper" elevation={1}>
              <Typography variant="headline" component="h2">
                Add a trip!
              </Typography>
              <Link to={`/${user}/create`}>
                <Button
                  variant="fab"
                  color="primary"
                  aria-label="Add"
                  onClick={setSaveTripFalse}
                >
                  <AddIcon />
                </Button>
              </Link>
            </Paper>
          </Grow>
        )}
      </div>
    );
  }
}

MainTriplist.propTypes = {
  setSaveTripFalse: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  hasTrips: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  archiveTrip: PropTypes.func.isRequired
};

export default MainTriplist;
