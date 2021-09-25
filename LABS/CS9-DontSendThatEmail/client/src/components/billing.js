import React, { Component, Fragment } from "react";
import { Col, Row, Form, Label } from "reactstrap";
import Checkout from "./checkout.js";
import "./settings.css";
import "./billing.css";

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { auth } = this.props.context.userData;

    return (
      <Col className="billing-bg" md="10">
        <Fragment>
          <br />
          <Label className="billing-label">Payment Plan</Label>
          <Row className="billing-styles">
            <Col className="billingBoxes-styles" md="4" sm="6">
              <Col md="12">
                <h1>Free</h1>
              </Col>
              <Col md="12">
                <p>Limited Analysis</p>
                <p>Up to 10 drafts</p>
              </Col>
              <br />
            </Col>
            <Col className="billingBoxes-styles premium" md="4" sm="6">
              <Col md="12">
                <div className="premium-logo" />
              </Col>
              <Col md="12">
                <p>Unlimited Analysis</p>
                <p>Up to 50 drafts</p>
                <p>Directly send emails</p>
                <p className="price">Only $19 month!</p>
              </Col>
              <br />
              <Col md="12">
                <Checkout
                  name={"Premium Subscription"}
                  description={"1 month reccuring"}
                  amount={19}
                />{" "}
              </Col>
            </Col>
          </Row>
        </Fragment>
      </Col>
    );
  }
}
export default Billing;
