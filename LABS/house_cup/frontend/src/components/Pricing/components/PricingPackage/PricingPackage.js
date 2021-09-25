import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PricingPackage.css';

class PricingPackage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      amount: props.amount,
      housesAllowed: props.housesAllowed,
      teachersAllowed: props.teachersAllowed,
    };
  }

  render() {    
    return (
      <div className="PricingPackage">
        <div className="Package__header">
          <h4>{ this.state.name }</h4>
          <div className="Package__billing">
            <div className="Package__billing__amount">
              <span className="amount">{ this.state.amount }</span>
              <span className="currency">USD</span>
            </div>
            <div className="Package__billing__frequency">per month</div>
          </div>
        </div>
        <div className="Package__features">
          <ol>
            <li className="Package__feature">
              <div className="Package__feature__name">Total Teachers</div>
              <div className="Package__feature__value">{ this.state.teachersAllowed }</div>
            </li>
            <li className="Package__feature">
              <div className="Package__feature__name">Total Houses</div>
              <div className="Package__feature__value">{ this.state.housesAllowed }</div>
            </li>
          </ol>
        </div>
        <div className="Package__actions">
          <button>Choose This Plan</button>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PricingPackage);
