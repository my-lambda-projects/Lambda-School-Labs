import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button } from "reactstrap";
import "./checkoutForm.css";
import { connect } from "react-redux";
import { editUser } from "../../../actions";
import jwt_decode from "jwt-decode";
import axios from "axios";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      standard: false,
      premium: false
    };
    this.submitPayment = this.submitPayment.bind(this);
  }

  async submitPayment(ev) {
    let { token } = await this.props.stripe.createToken({
      name: "Finigus T. Barth"
    });

    if (this.state.standard === true && this.state.premium === false) {
      let response = await fetch("http://localhost:5000/api/chargestandard", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: token.id
      });
      const logged_in_user_id = jwt_decode(localStorage.jwtToken).sub + "";
      if (response.ok) {
        this.setState({ complete: true });
        this.props.editUser({subscription: "standard"})
        // axios.put(
        //   `http://localhost:5000/api/updatesubscription/${logged_in_user_id}`,
        //   { subscription: "standard" }
        // )
        // .then(response => {
        //   dispatch({
        //     type: EDITEDUSER,
        //     class_data: response.data
        //   });
        //   swal({ icon: "success", text: "Subscription Updated!" });
        //   history.push("../classes");
        // })
        // .catch(err => {
        //   dispatch({ type: ERROR, errorMessage: "Error updating subscription." });
        //   swal({
        //     icon: "error",
        //     text:
        //       "Sorry! We were unable to update your subscription at this time! Please try again later!"
        //   });
        // });
        alert("Splendid! Your payment has been successfully sent!");
      }
    } else if (this.state.premium === true && this.state.standard === false) {
      let response = await fetch("http://localhost:5000/api/chargepremium", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: token.id
      });
      const logged_in_user_id = jwt_decode(localStorage.jwtToken).sub + "";
      if (response.ok) {
        this.setState({ complete: true });
        this.props.editUser({subscription: "premium"})
        // axios.put(
        //   `http://localhost:5000/api/updatesubscription/${logged_in_user_id}`,
        //   { subscription: "premium" }
        // )
        // .then(response => {
        //   dispatch({
        //     type: EDITEDUSER,
        //     class_data: response.data
        //   });
        //   swal({ icon: "success", text: "Subscription Updated!" });
        //   history.push("../classes");
        // })
        // .catch(err => {
        //   dispatch({ type: ERROR, errorMessage: "Error updating subscription." });
        //   swal({
        //     icon: "error",
        //     text:
        //       "Sorry! We were unable to update your subscription at this time! Please try again later!"
        //   });
        // });
        alert("Splendid! Your payment has been successfully sent!");
      }
    } else {
      return "Error submitting payment";
    }
  }

  checkbox_one_handler = event => {
    console.log("event:", event);
    if (event.target.value === "standard") {
      const update = !this.state.standard;
      this.setState({
        standard: update
      });
      // console.log("this.state.standard:", this.state.standard);
    } else if (event.target.value === "premium") {
      const update = !this.state.premium;
      this.setState({
        premium: update
      });
      // console.log("this.state.premium:", this.state.premium);
    }
  };

  render() {
    console.log("this.state.standard:", this.state.standard);
    console.log("this.state.premium:", this.state.premium);
    if (this.state.complete) {
      return <h1>Purchase Complete</h1>;
    } else {
      console.log("Error, this.state.complete is not true");
    }
    // console.log('this.state.toggle_stand_sub:', this.state.toggle_stand_sub)
    return (
      <div className="checkout">
        <CardElement
          id="CardElement"
          style={{
            base: { fontSize: "16px", fontFamily: "Times", color: "black" }
          }}
        />
        <label check className="checkout_subscribe">
          <input
            type="checkbox"
            value="standard"
            className="subscribe_input"
            onChange={this.checkbox_one_handler}
          />
          1 Year Subscription - $9.99
          <br />
          <input
            type="checkbox"
            value="premium"
            className="subscribe_input"
            onChange={this.checkbox_one_handler}
          />
          1 Year Premium Subscription - $29.99
        </label>
        <br />
        <Button onClick={this.submitPayment} className="checkout_button">
          Buy Now
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { editUser }
)(injectStripe(CheckoutForm));
