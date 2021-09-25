import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

const ProgressTracker = props => {
  // || operator is used to short circuit the absence of props upon render
  let firstProgress = props.progressRecords[0] || {};
  let mostRecentProgress =
    props.progressRecords[props.progressRecords.length - 1] || {};

  let firstProgressDate = firstProgress.date;
  let formattedDate = moment(firstProgressDate).format("MM/DD/YYYY");

  let startingWeight = firstProgress.weight;
  let mostRecentWeight = mostRecentProgress.weight;
  let weightLost = (startingWeight - mostRecentWeight).toFixed(1) + " lbs";
  let weightGained = (parseInt(weightLost, 10) * -1).toFixed(1) + " lbs";

  let startingInches = firstProgress.waist;
  let mostRecentInches = mostRecentProgress.waist;
  let inchesLost = (startingInches - mostRecentInches).toFixed(1) + " inches";
  let inchesGained = (parseInt(inchesLost, 10) * -1).toFixed(1) + " inches";

  return (
    <div
      className={
        props.progressRecords.length <= 1
          ? " progress-tracker gray"
          : "progress-tracker"
      }
    >
      {props.progressRecords.length <= 1 ? (
        <div>
          <div className="progress-tracker-title">Progress Tracker</div>
          <div className="tracker-requirement">
            * Minimum 2 submissions required to calculate progress.
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="progress-box tracker-border">
            {parseInt(weightLost, 10) >= 0 ? (
              <React.Fragment>
                <div className="number-lost">{weightLost}</div>
                <div>Weight Lost Since</div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="number-lost">{weightGained}</div>
                <div>Weight Gained Since</div>
              </React.Fragment>
            )}
            <div>{formattedDate}</div>
          </div>
          <div className="progress-box">
            {parseInt(inchesLost, 10) >= 0 ? (
              <React.Fragment>
                <div className="number-lost">{inchesLost}</div>
                <div>Inches Lost Since</div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="number-lost">{inchesGained}</div>
                <div>Inches Gained Since</div>
              </React.Fragment>
            )}
            <div>{formattedDate}</div>
            <div className="disclaimer">* around waist</div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    progressRecords: state.progress.progressRecords
  };
};

ProgressTracker.propTypes = {
  progressRecords: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(ProgressTracker);
