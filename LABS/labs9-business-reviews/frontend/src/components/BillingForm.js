import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import styled from 'styled-components';
import axios from 'axios';
import { backendLink } from '../assets/config';
import GatedSignInComponent from './GatedSignInComponent';
import image from '../assets/white-waves.png';

const Container = styled.div`
  background-image: url(${image});
`;

const StyledBillingForm = styled.div`
  background-color: white;

  .billing-form {
    padding: 40px;
    max-width: 500px;
  }
  .radio-form {
    padding: 15px;
  }

  .subscription__text {
    font-family: Roboto;
  }

  .radio-form {
    font-family: Roboto;
  }
`;

class BillingForm extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: null
    };
  }

  annualSub = () => {
    this.setState({ amount: 999 });
  };

  monthlySub = () => {
    this.setState({ amount: 99 });
  };

  onToken = async res => {
    if (this.state.amount === 99) {
      await axios.post(
        `${backendLink}/api/billing/monthly?token=${
          res.id
        }`,
        undefined,
        {
          withCredentials: 'include'
        }
      );
      try {
        alert('we sent you a email thanks for subscribing!!');
      } catch (err) {
        alert('payment did not succeed');
      }
    } else if (this.state.amount === 999) {
      await axios.post(
        `${backendLink}/api/billing/yearly?token=${
          res.id
        }`,
        undefined,
        {
          withCredentials: 'include'
        }
      );
      try {
        alert('we sent you a email thanks for subscribing!');
      } catch (err) {
        alert('payment did not succeed');
      }
    } else return null;
  };

  render() {
    return (
      <GatedSignInComponent>
        <Container>
          <StyledBillingForm>
            <div className='billing-form'>
              <h1>Bonafind Subscription</h1>
              <p className='subscription__text'>
                Bonafind is a free service for everything from finding
                businesses around you to meeting people in places you'll go.
                Free members are limited to 3 reviews. With a premium
                membership, reviews are unlimited.
              </p>
              <form className='radio-form'>
                <input
                  type='radio'
                  name='subscription'
                  value='yearly'
                  className='subscription__btn'
                  onClick={this.annualSub}
                />
                1 Year Subscription: $9.99 <br /> <br />
                <input
                  type='radio'
                  name='subscription'
                  value='monthly'
                  className='subscription__btn'
                  onClick={this.monthlySub}
                />
                1 Month Subscription: $0.99 <br />
              </form>
              <StripeCheckout
                amount={this.state.amount}
                name='Bonafind'
                description='Purchase Subscription'
                stripeKey='pk_test_YRDXagNKMjZOXlX2ULVNUWbT'
                currency='USD'
                token={res => this.onToken(res)}
              >
                {this.props.children}
              </StripeCheckout>
            </div>
          </StyledBillingForm>
        </Container>
      </GatedSignInComponent>
    );
  }
}

export default BillingForm;
