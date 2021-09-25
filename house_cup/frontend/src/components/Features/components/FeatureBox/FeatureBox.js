import React, { Component } from 'react';
import './FeatureBox.css';

class FeatureBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feature: props.feature,
    };
  }

  render() {
    const { feature } = this.state;
    return (
      <div className="FeatureBox">
        <div className="FeatureBox__image" data-feature-name={ feature.id }></div>
        <div className="FeatureBox__title">{ feature.title }</div>
      </div>
    );
  }

}

export default FeatureBox;
