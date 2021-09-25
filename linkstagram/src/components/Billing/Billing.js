import React, { Component } from 'react';

class Billing extends Component {
  render() {
    return (
      <div>
                {/*  need to connect to server */ }
        <form action="/stripe_checkout" method="POST">

          <div>
            <label for="mail">E-mail:</label>
            <input type="email" id="mail" name="user_mail"/>
          </div>
          <div>
            <label for="amount">Amount:</label>
            <input type="text" id="amount" name="user_amount"/>
          </div>

          <script
            src="https://checkout.stripe.com/checkout.js"
            class="stripe-button"
            data-key="pk_test_S5hKQoss1Z5jCiJoAomrUYX6"
            data-amount="2000"
            data-name="Linkstasite"
            data-zip-code="true"
            data-description="Get a linkstasite subscription."
            data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
            data-locale="auto">
          </script>

        </form>
        
      </div>
    );
  }
}

export default Billing;
