import React, { Component } from 'react';
import {connect} from 'react-redux'
import {toggleSettings, activeOrganization, addSubscription , getSubscriptionInfo} from '../../actions/organizationActions';
import {getAdminOrganizations} from '../../actions/adminActions';
class Sub2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupon: '',
      currentPlan: 'standard',
    };

    this.onCouponChange = this.onCouponChange.bind(this);
    this.switchPlan = this.switchPlan.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  onCouponChange(event) {
    this.setState({
      coupon: event.target.value
    });
  }

  switchPlan(currentPlan) {
    this.setState({
      currentPlan
    });
  }

  nextStep() {
    let { currentPlan, coupon } = this.state;

    this.props.addSubscription(currentPlan, coupon, this.props.stripeCustomerID )
    this.props.toggleSettings(true)
  }

  render() {
    let { coupon, currentPlan } = this.state;
    let plans = ["standard", "premium"];

    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Coupon"
            value={coupon}
            onChange={this.onCouponChange}
          />
        </div>
        <div>
          <h2>Plans</h2>
          {(plans).map((plan, index) => {
            if (currentPlan === plan) {
              return (
                <button
                  key={"plan" + index}
                  style={{
                    backgroundColor: "#03b4ae"
                  }}
                  onClick={() => this.switchPlan(plan)}
                >
                  {plan}
                </button>
              );
            }
            return (
              <button
                key={"plan" + index}
                style={{
                  backgroundColor: "#ffffff"
                }}
                onClick={() => this.switchPlan(plan)}
              >
                {plan}
              </button>
            );
          })}
        </div>
        <div>
          <button onClick={this.nextStep}>Next</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    stripeCustomerID: state.stripeCustomerID,
    activeOrganizationID: state.activeOrganization
  }
}

export default connect(mapStateToProps, {getSubscriptionInfo, addSubscription, toggleSettings, getAdminOrganizations, activeOrganization})(Sub2);
