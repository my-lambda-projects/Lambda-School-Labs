import React from "react";
import axios from "axios";
import Archived from "./Archived";
import API_URL from "../../API_URL";
import Snackbar from "../Snackbar/Snackbar";
import WithSnackbar from "../Snackbar/SnackbarHOC";

class GetArchived extends React.Component {
  state = {
    trips: [],
    animateList: true
  };

  componentWillMount() {
    const { match } = this.props;
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/${match.params.user}/getArchivedTrips`,
        { email: match.params.user },
        { headers: { authorization: token } }
      )
      .then(res => {
        this.setState({ trips: res.data.trips });
      })
      .catch(error => {
        console.log(error);
      });
  }

  UnarchiveTrip = (TripId, index) => {
    const { match, getUsersAgain, handleSnackbarOpen } = this.props;
    const { trips } = this.state;
    const tripsCopy = [...trips];
    const token = localStorage.getItem("token");
    const id = TripId;
    axios
      .put(
        `${API_URL}/${match.params.user}/archiveTrip`,
        { id, archived: false },
        { headers: { authorization: token } }
      )
      .then(res => {
        tripsCopy.splice(index, 1);
        this.setState({ trips: tripsCopy });
        getUsersAgain();
        handleSnackbarOpen("success", "Trip Uncarchived Successfully!");
        console.log(res);
      })
      .catch(err => {
        handleSnackbarOpen("error", "Server cannot unarchive trip!");
        console.log(err);
      });
  };

  render() {
    const { animateList, trips } = this.state;
    const { ...snackbarProps } = this.props;
    return (
      <div>
        <Snackbar {...snackbarProps} />
        <Archived
          animateList={animateList}
          trips={trips}
          UnarchiveTrip={this.UnarchiveTrip}
        />
      </div>
    );
  }
}

export default WithSnackbar(GetArchived);
