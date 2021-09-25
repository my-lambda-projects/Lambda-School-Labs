import React, { Component } from 'react';
import { AlertFeedSegment, } from '../../presentation/presentation.js';

class AlertFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertFeedDropdown: {
        value: 0,
      }
    };

  }

  handleAlertSelect = (e, {value, }) => {

    this.setState({
      alertFeedDropdown: {
        value,
      }
    });

  }

  render() {
    return (
      <>
        <AlertFeedSegment { ...this.props } { ...this.state } handleAlertSelect={ this.handleAlertSelect } />
      </>
    );
  }
}

export default AlertFeed;
