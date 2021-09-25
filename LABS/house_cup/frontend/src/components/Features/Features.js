import React, { Component } from 'react';
import './Features.css';
import FeatureSection from './components/FeatureSection/FeatureSection';
import FeatureBox from './components/FeatureBox/FeatureBox';

class Features extends Component {

  constructor(props) {
    super(props);
    this.state = {
      features: [
        {
          id: 'multiple-houses',
          title: 'Multiple Houses',
          description: 'A school can have multiple houses, which can be created by the admin of the school. ' +
            'A mascot and a color can be assigned to a house.',
        },
        {
          id: 'multiple-teachers',
          title: 'Multiple Teachers',
          description: 'A school can have multiple houses, which can be created by the admin of the school. ' +
            'A mascot and a color can be assigned to a house.',
        },
        {
          id: 'realtime-updates',
          title: 'Realtime Updates',
          description: 'When a teacher updates the score, students and parents can monitor their progress on the scoreboard in realtime.',
        },
        {
          id: 'public-scoreboard',
          title: 'Public Scoreboard',
          description: 'House scores can be made available to the public via a web address. ' +
            'You can choose to enable or disable the public visibility of your scoreboard.',
        },
        // {
        //   id: 'cross-device',
        //   title: 'Cross Device',
        //   description: 'House Cup can be accessed from multiple device platforms. It will work seemlessly on all popular OS and browsers.',
        // },
      ],
    };
  }

  render() {
    return (
      <div className="Features">
        <h2>Awesome Features</h2>
        <div className="Features__grid">
          <div className="wrapper">
            {
              this.state.features.map((feature) => {
                return <FeatureBox key={feature.id} feature={feature} />;
              })
            }
          </div>
        </div>
        <div className="Features__sections">
          {
            this.state.features.map((feature) => {
              return <FeatureSection key={feature.id} feature={feature} />;
            })
          }
        </div>
      </div>
    );
  }

}

export default Features;
