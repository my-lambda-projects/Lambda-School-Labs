import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlans } from '../../actions';
import './Pricing.css';
import PricingPackage from './components/PricingPackage/PricingPackage';

class Pricing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      packages: [
        {
          name: 'K-12',
          amount: 29,
          teachersAllowed: 5,
          housesAllowed: 10,
        },
        {
          name: 'College',
          amount: 59,
          teachersAllowed: 10,
          housesAllowed: 20,
        },
        {
          name: 'University',
          amount: 89,
          teachersAllowed: '10 +',
          housesAllowed: '20 +',
        },
      ],
    };
  }

  async componentWillMount() {
    await this.props.getPlans();
  }

  componentWillReceiveProps(props) {
    this.setState({
      plans: [...props.plans.sort((a, b) => a.allowedHouses - b.allowedHouses)],
    });
  }

  render() {
    const { packages, plans } = this.state;
    return (
      <div className="Pricing">
        <div className="wrapper">
          <h2>Affordable Pricing</h2>
          <div className="PricingPackages__listings">
            {
              plans.map((plan, index) => {
                return (
                  <PricingPackage
                    key={plan.name}
                    name={plan.name}
                    housesAllowed={plan.allowedHouses}
                    teachersAllowed={plan.allowedTeachers}
                    amount={packages[index].amount}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  getPlans,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
