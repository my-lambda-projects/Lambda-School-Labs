import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchProgress } from "../../actions";
import ProgressTracker from "./ProgressTracker";
import ProgressCard from "./ProgressCard";
import ProgressForm from "./ProgressForm";
import { Link } from "react-router-dom";
import { TweenMax, TimelineLite } from "gsap";

class Progress extends Component {
  constructor(props) {
    super(props);

    this.myTween = new TimelineLite();
    this.animateProgressTracker = null;
    this.myElements = [];
  }

  componentDidMount() {
    this.props.fetchProgress();
    this.animateProgressTracker = TweenMax.from(
      this.animateProgressTracker,
      1,
      { y: 100, opacity: 0 }
    );
    this.myTween
      .staggerFrom(this.myElements, 0.5, { opacity: 0, y: 50 }, 0.1)
      .delay(1);
  }

  render() {
    // display starting from the end of the array i.e. most recent first
    let sortedRecords = [];
    for (let i = this.props.progressRecords.length - 1; i >= 0; i--) {
      sortedRecords.push(this.props.progressRecords[i]);
    }

    return (
      <div
        className="outer-container"
        ref={div => (this.animateProgressTracker = div)}
      >
        {/* Experimental Patch - Premium User Toggle */}
        {this.props.premiumUser || this.props.userInfo.user.premiumUser ? (
          <div className="container">
            <ProgressTracker />
            <ProgressForm />
            <div className="progress-records">
              {sortedRecords.map((record, index) => {
                return <ProgressCard key={record._id} record={record} />;
              })}
            </div>
          </div>
        ) : (
          <div className="container blocked">
            <div>
              To track your progress of weight and measurements become a{" "}
              <Link to="/billing">Premium Member</Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    progressRecords: state.progress.progressRecords,
    premiumUser: state.user.premiumUser,
    userInfo: state.auth.currentUser
  };
};

Progress.propTypes = {
  fetchProgress: PropTypes.func,
  progressRecords: PropTypes.arrayOf(PropTypes.object),
  premiumUser: PropTypes.bool,
  userInfo: PropTypes.shape({
    token: PropTypes.string,
    user: PropTypes.object
  })
};

export default connect(
  mapStateToProps,
  { fetchProgress }
)(Progress);
