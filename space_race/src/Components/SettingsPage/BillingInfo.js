import React, { Component } from 'react';

class BillingInfo extends Component {
    render() {
        return (
            // This button will wrap a Link to a page where user can update their billing info
            <div>
            <button>
                Billing Info
            </button>
            <p>Subscription Expires on:</p>
            </div>
            // Need to add infro about when users subscription will expire
        );
    }

}
export default BillingInfo;