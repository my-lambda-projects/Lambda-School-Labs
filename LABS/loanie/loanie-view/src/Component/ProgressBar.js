import React, { Component } from 'react';
import axios from 'axios';
import base from './base';
import '../CSS/ProgressBar.css';

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressValue: 0,
      currentPhase: '',
      totalPhases: 0,
    };
  }
  componentDidMount() {
    // grabs the current url
    let getLoanId = window.location.href;
    // grabs username inside current url
    getLoanId = getLoanId.split('/').pop();
    axios
      .get(`${base}/loan/${getLoanId}`)
      .then((loandata) => {
        const phaseArr = loandata.data.phases;
        // records the length of filtered loans to indicate total number of phases
        const totalPhaseNo = phaseArr.length;
        this.setState({
          currentPhase: loandata.data.currentStatus,
          progressValue: Number(loandata.data.currentStatus) * (100 / totalPhaseNo),
          totalPhases: totalPhaseNo,
        });
      })
      .catch((err) => {
        throw err;
      });
  }
  render() {
    return (
      <div className="ProgressBar">
        <div className="progress ProgressBar-container">
          <div
            className="progress-bar ProgressBar-style progress-bar-success"
            role="progressbar"
            aria-valuenow={this.state.progressValue}
            style={{
              width: `${this.state.progressValue /
                (100 / this.state.totalPhases) *
                (68.5 / this.state.totalPhases)}em`,
            }}
          >
            Current Phase: {this.state.currentPhase}
          </div>
        </div>
      </div>
    );
  }
}
