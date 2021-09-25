import React, { Component } from 'react';

export default class ConnectStripe extends Component {
  state = {
    terms: false,
    color: 'black',
  };

  checkTerms = () => {
    if (this.state.terms === false) {
      this.setState({ color: '#E86C62' });
    }
    // this.forceUpdate();
  };

  render() {
    const { color } = this.state;
    console.log(color);
    let link = this.state.terms ? `/stripe/authorize?jwt=${localStorage.getItem('id')}` : null;
    return (
      <div className="billing-window">
        <p className="billing-headline">Payment Options</p>
        <p className="billing-announcement">
          Before buying credits, or uploading any invoices, you must connect your{' '}
          <span style={{ fontWeight: 900 }}>giveMeMyMoney.app </span>
          account with a stripe account. This allows you clients to pay you directly. Once your
          client pays, 95% will be deposited into your stripe account immediately. You can then
          transfer to a bank acocunt of your choice from your stripe account. All invoices paid are
          subject to a 5% fee.
        </p>
        <div className="billing-options">
          <div className="billing-free">
            <h2 className="billing-free_package">Starter</h2>
            <p className="billing-label">
              By default, all accounts have 1 free invoice at a time.
            </p>
            <a href={link}>
              <button style={{ marginTop: '8.5rem'}}className="billing-premium_button" onClick={() => this.checkTerms()}>Connect Stripe</button>
            </a>
          </div>
          <div className="billing-standard">
            <div className="corner-ribbon top-left sticky red shadow">Popular</div>
            <h2 className="billing-standard_package">Basic</h2>
            <p className="billing-standard_price">$1.99<br /> <span> per invoice</span></p>
            <p className="billing-standard_label">
              Don't need a subscription? Easily use our service on a per invoice basis. $1.99 per
              invoice will include unlimited reminders for 1 invoice.
            </p>
            <a href={link}>
              <button className="billing-standard_button" onClick={() => this.checkTerms()}>Connect Stripe</button>
            </a>
          </div>
          <div className="billing-premium">
            <h2 className="billing-premium_package">Premium</h2>
            <p className="billing-premium_price">$20 <br /> <span>for a 30 day subscription</span></p>
            <p className="billing-premium_label" style={{ marginLeft: 15 }}>
              This will allow an unlimited number of invoices and notifications to be set up until your
              subscription expires.
            </p>
            <a href={link}>
              <button className="billing-premium_button" onClick={() => this.checkTerms()}>Connect Stripe</button>
            </a>
          </div>
        </div>
        <br />
        <div className="billing-terms">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            onChange={() => this.setState({ terms: !this.state.terms })}
          />
          <h4 style={{ color: color }}>
            By checking this box, you agree to giveMeMyMoney.app taking a 5% fee off all invoices
            paid. ($1,000.00 invoice = $50.00 fee + $950.00 deposited into your stripe account.
          </h4>
        </div>
        {/* <br />
        <a
          style={{ display: this.state.terms ? null : 'none' }}
          href={`/stripe/authorize?jwt=${localStorage.getItem('id')}`}
        >
          <button className="connect-stripe_button">Connect Stripe</button>
        </a> */}
      </div>
    );
  }
}
