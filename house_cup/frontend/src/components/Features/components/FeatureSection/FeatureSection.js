import React, { Component } from 'react';
import './FeatureSection.css';

class FeatureSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feature: props.feature,
    };
  }

  render() {
    const { feature } = this.state;
    return (
      <div className="FeatureSection">
        <div className="wrapper">
          <div className="FeatureSection__column">
            <div className="FeatureSection__text">
              <h3>{ feature.title }</h3>
              <p>{ feature.description }</p>
            </div>
          </div>
          <div className="FeatureSection__column FeatureSection__column__image" data-feature-name={feature.id} />
        </div>
      </div>
    );
  }

}

export default FeatureSection;
