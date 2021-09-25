import React, { Component } from 'react';
// import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
// import ClientCheckout from './ClientCheckout';
import { ToastContainer, ToastStore } from 'react-toasts';
import NoInvoice from './noInvoice';
import PaidInvoice from './paidInvoice';

class ClientBilling extends Component {
  state = {
    invoice: false,
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/clientinvoice/${id}`)
      .then(response => {
        const invoice = response.data;
        this.setState({ invoice });
      })
      .catch(err => this.setState({ invoice: false }));
  }

  onToken = (amount, description) => token => {
    return axios
      .post('/api/payinvoice', {
        code: this.state.invoice.admin.stripe.code,
        scope: this.state.invoice.admin.stripe.scope,
        description,
        source: token.id,
        currency: 'USD',
        amount,
        invoiceId: this.state.invoice._id,
      })
      .then(res => {
        ToastStore.success('Payment successful');
        this.setState({ invoice: res.data.invoice });
        console.log(res);
      })
      .catch(data => {
        ToastStore.error('Payment declined');
        console.log(data);
      });
  };

  render() {
    if (!this.state.invoice) {
      return <NoInvoice invoice={this.props.match.params.id} />;
    }
    if (this.state.invoice.isPaid) {
      return <PaidInvoice invoice={this.state.invoice} />;
    }
    // return console.log(this.state);
    const { totalAmount, number } = this.state.invoice
      ? this.state.invoice
      : { amount: null, number: null };
    const description = this.state.invoice ? `GMMM invoice ${number}` : 'no invoice';
    let email;
    if (this.state.invoice && this.state.invoice.email) {
      email = this.state.invoice.email.address;
    }
    const from = this.state.invoice.admin.companyName
      ? this.state.invoice.admin.companyName
      : this.state.invoice.admin.fullName;
    // console.log(this.state.invoice);
    const buttonStyle = {
      color: 'white',
      height: '4rem',
      width: '100%',
      border: 'none',
      background: '#E86C62',
      borderRadius: '.5rem',
      backgroundImage: 'none',
    };
    return (
      <div className="window" style={{ display: 'flex', marginTop: '15rem' }}>
        <ToastContainer position={ToastContainer.POSITION.TOP_LEFT} store={ToastStore} />
        <div
          className="payInvoice"
          style={{ justifyContent: 'center', alignItems: 'center', margin: 'auto' }}
        >
          <div className="typed-logo" style={{ marginBottom: '4rem' }}>
            <h1 className="signin--titles">
              giveMe
              <span className="slideout--dot">.</span>
              <br />
              <p className="signin--slogans">myMoney</p>
            </h1>
          </div>
          <div
            style={{
              textAlign: 'center',
              margin: 10,
            }}
          >
            <h1>Invoice # {this.state.invoice.number}</h1>
            <h1>
              Contact: <a href={`mailto:${this.state.invoice.admin.username}`}>{from}</a>
            </h1>

            <h1>Amount Due: {(this.state.invoice.totalAmount / 100).toFixed(2)}</h1>
          </div>
          {/* <div>
          </div> */}
          <div style={{ margin: 10 }}>
            <a id="openPDF" href={`../viewpdf/${this.state.invoice._id}`} target="_blank">
              <button className="add-invoice_submit" style={{ marginRight: 0 }}>
                View Invoice
              </button>
            </a>
          </div>
          <div style={{ margin: 10 }}>
            <StripeCheckout
              style={{ ...buttonStyle }}
              textStyle={{ ...buttonStyle }}
              name="Name"
              email={email}
              allowRememberMe={false}
              description={description}
              amount={totalAmount}
              token={this.onToken(totalAmount, description)}
              currency="USD"
              stripeKey={process.env.STRIPE_PK || 'pk_test_ILI7ZfrCQbKaNU5WAVRa6yg6'}
            />
          </div>
        </div>
      </div>
    );

    // return this.state.invoice ? this.hasInvoice() : <div />;
  }
}

// const Checkout = ({ name, description, amount }) => (
//   <StripeCheckout
// name={name}
// description={description}
// amount={amount}
// token={onToken(amount, description)}
// currency={CURRENCY}
// stripeKey="pk_test_GrN1cUmXTG8g6u5D9sFoRUgp"
//   />
// );

export default ClientBilling;
