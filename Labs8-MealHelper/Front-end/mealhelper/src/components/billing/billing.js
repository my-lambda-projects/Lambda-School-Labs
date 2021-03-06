import React, { Component } from "react";
import { connect } from "react-redux";
import "./billing.css";
//change the route for this
import { addUser } from "../../store/actions/userActions";
import { withRouter, Link } from "react-router-dom";
import { Button, Modal, ModalHeader } from "reactstrap";
import StripeCheckout from "react-stripe-checkout";
import CheckOut from "../landingpage/eatwellimage.png";

class Billing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      zip: null,
      healthCondition: "",
      visable: false,
      modal: false
    };
    this.onToken.bind(this);
  }
  componentDidMount = () => {
    if (localStorage.getItem("token")) {
    } else {
      this.props.history.push("/");
    }
  };

  // handleChange = event => {
  //   event.preventDefault();
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // };

  // createUser = event => {
  //   event.preventDefault();
  //   if (!this.state.email || !this.state.password) {
  //     this.setState({ visable: true });
  //   } else {
  //     const { email, password, zip, healthCondition } = this.state;
  //     const user = { email, password, zip, healthCondition };
  //     this.props.addUser(user);
  //   }
  // };
  // toggle = () => {
  //   this.setState({
  //     modal: !this.state.modal
  //   });
  // };

  // logout = event => {
  //   event.preventDefault();
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user_id");
  //   this.props.history.push("/");
  // };

  onToken = token => {
    console.log("onToken", token);
  };

  render() {
    return (
      <div className="home-container">
        <StripeCheckout
          amount="499"
          billingAddress
          description="EatWell Meal Tracker"
          image={CheckOut}
          locale="auto"
          name="eat-well.app"
          label="Get Premium!"
          panelLabel="Purchase for {{amount}}"
          stripeKey="pk_test_rMbD3kGkxVoOsMd0meVqUlmG"
          token={this.onToken}
          zipCode
        />

        {/* <div className="sidebar">
          <Link to="/homepage" style={{ textDecoration: "none" }}>
            <h2 className="titlelinks">Home</h2>
          </Link>
          <Link to="/homepage/recipes" style={{ textDecoration: "none" }}>
            <h2 className="titlelinks">Recipes</h2>
          </Link>
          <Link to="/homepage/alarms" style={{ textDecoration: "none" }}>
            <h2 className="titlelinks">Alarms</h2>
          </Link>
          <Link to="/homepage/meals" style={{ textDecoration: "none" }}>
            <h2 className="titlelinks">Meals</h2>
          </Link>
          <Link to="/homepage/billing" style={{ textDecoration: "none" }}>
            <h2 className="titlelinks">Billing</h2>
          </Link>
          <Link to="/homepage/settings" style={{ textDecoration: "none" }}>
            <h2 className="titlelinks">Settings</h2>
          </Link>
          <Button color="danger" onClick={this.toggle}>
            Log Out
          </Button>
          <Link to="homepage/billing">
            <Button className="danger" color="danger">
              Upgrade to Premium
            </Button>
          </Link>
        </div>
        <div className="dynamic-display">
          <StripeProvider apiKey="pk_test_rMbD3kGkxVoOsMd0meVqUlmG">
            <div className="example">
              <Elements>
                <CheckoutForm />
              </Elements>
            </div>
          </StripeProvider> */}
        {/* <form action="your-server-side-code" method="POST">
            <script
              src="https://checkout.stripe.com/checkout.js"
              class="stripe-button"
              data-key="pk_test_rMbD3kGkxVoOsMd0meVqUlmG"
              data-amount="999"
              data-name="Meal Helper"
              data-description="Example charge"
              data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
              data-locale="auto"
            />
          </form> */}
        {/* </div> */}

        {/* <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Do you wish to log out?
          </ModalHeader>
          <Button onClick={this.logout} color="danger" className="danger">
            Log out
          </Button>
          <Button onClick={this.toggle} color="primary">
            Cancel
          </Button>
        </Modal> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { addUser }
)(withRouter(Billing));
