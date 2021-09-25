import React, { Component } from "react";
import { connect } from "react-redux";

import { getHoursOfOperation } from "../../store/hourOfOperation/actions.js";

import AdminDetails from "../Organisms/AdminDetails.js";
import AdminHours from "../Organisms/AdminHours.js";

import { Segment } from "semantic-ui-react";
import {
  AdminContainer,
  AdminHeader,
  Welcome,
  AdminBody,
} from "../../styles/Admin.js";

class Admin extends Component {
  componentDidMount() {
    this.props.getHoursOfOperation();
  }

  fillTimes = () => {
    const hoosByDay = [[], [], [], [], [], [], []];

    const dayLookupTable = {
      M: 1,
      T: 2,
      W: 3,
      R: 4,
      F: 5,
      S: 6,
      U: 7,
    };

    const sorted = this.props.allHoOs.slice().sort(function(a, b) {
      if (a.open_time > b.open_time) return 1;
      else return -1;
    });

    sorted.forEach((hoo, index) => {
      hoosByDay[dayLookupTable[hoo.day] - 1].push(hoo);
    });
    return hoosByDay;
  };

  render() {
    const times = this.fillTimes();
    return (
      <AdminContainer>
        <AdminHeader>
          <Welcome>
            {`Welcome, ${this.props.first_name} ${this.props.last_name}`}
          </Welcome>
        </AdminHeader>
        <Segment padded="very" style={{ width: "100%", margin: "0 10% 0 10%" }}>
          <AdminBody>
            <AdminDetails />
            <AdminHours times={times} />
          </AdminBody>
        </Segment>
      </AdminContainer>
    );
  }
}

const mapStateToProps = state => {
  const userProfile = state.user.currentUser;
  //TODO: check for empty profile - error
  return {
    first_name: userProfile.user.first_name,
    last_name: userProfile.user.last_name,
    allHoOs: state.hourOfOperation.allHoOs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHoursOfOperation: () => {
      return dispatch(getHoursOfOperation());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
