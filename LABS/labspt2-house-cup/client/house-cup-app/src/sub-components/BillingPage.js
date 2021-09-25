import React, { Component } from 'react';
import Checkout from '../Checkout';
import SideMenu from './SideMenu';

class BillingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            member: this.props.member
        }
    }

    render() {
        return (

            <div className='billing-page'>
                {/* side page component goes here  */}
                <SideMenu />
                <div className="payment">
                    <h1>House Cup Premium</h1>
                    <div className='payment-premium-ad'>
                        <h2>For $19.99</h2>
                        <h2>Upgrade to a premium account with UNLIMITED Houses and historical analytics.</h2>
                    </div>
                    <div className='payment-info-box'>
                        <Checkout
                            name={'Historical Analytics'}
                            description={'House Cup'}
                            amount={19}
                            checkMembership={this.props.checkMembership}
                            member={this.props.member}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default BillingPage;