import React, { Component } from "react";
import { connect } from "react-redux";
import { subscribe } from "../../actions";
import { CardElement, injectStripe } from "react-stripe-elements";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      subscribed: this.props.hirePartner.user.subscribed,
      end_date: new Date(this.props.hirePartner.user.subscription_end_date)
    };
  }

  async submit(ev) {
    let response = await this.props.stripe
      .createToken({ name: "Name" })
      .then(res => {
        this.props
          .subscribe({
            stripeToken: res.token.id,
            email: this.props.hirePartner.user.email
          })
          .then(res => {
            alert("successfully subscribed!");
            this.setState({
              subscribed: true,
              end_date: new Date(res.successful)
            });
            this.props.hirePartner.user.subscribed = this.state.subscribed;
            this.props.hirePartner.user.subscription_end_date = this.state.end_date;
          })
          .catch(err => {
            alert("failed to subscribe", err);
            console.log(err);
          });
      })
      .catch(err => {
        alert("error:", err);
      });
  }

  render() {
    if (this.state.subscribed) {
      return (
        <div className="checkout">
          <h1>
            Your subscription ends on{" "}
            {this.state.end_date.toString().slice(0, 15)}
          </h1>

          <p>Add another month?</p>
          <CardElement />
          <button onClick={this.submit}>Subscribe!</button>
        </div>
      );
    } else {
      return (
        <div className="checkout">
          <h1>Your subscription is inactive</h1>
          <p>Subscribe for one month?</p>
          <CardElement />
          <button onClick={this.submit}>Subscribe!</button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    hirePartner: state.hirePartner
  };
};

export default injectStripe(
  connect(
    mapStateToProps,
    { subscribe }
  )(CheckoutForm)
);
