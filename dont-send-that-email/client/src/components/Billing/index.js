import React, { Component } from "react";
import { Col, Container, Row, Card, CardBody, CardHeader } from "reactstrap";
import "../../index.css";
import CheckoutComponent from "./Checkout";

class Billing extends Component {
  render() {
    return (
      <Container className="billing-component">
        <Row>
          <Col xs={12}>
            <Card className="no-transition">
              <CardHeader>Free User Privileges</CardHeader>
              <CardBody>
                <ul>
                  <li>
                    <p>100 email analyses per 30 days</p>
                  </li>
                  <li>
                    <p>Storage for 5 emails in home page</p>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12}>
            <Card className="no-transition">
              <CardHeader>Premium User Privileges</CardHeader>
              <CardBody>
                <ul>
                  <li>
                    <p>Unlimited email analyses</p>
                  </li>
                  <li>
                    <p>Storage for unlimited emails in home page</p>
                  </li>
                  <li>
                    <p>Can send emails through our email service provider</p>
                  </li>
                </ul>
                {!this.props.user.subscribed ? (
                  <CheckoutComponent
                    name={"30 Days"}
                    description={
                      "30 Days subscription of Don't send that email"
                    }
                    amount={10}
                  />
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Billing;
