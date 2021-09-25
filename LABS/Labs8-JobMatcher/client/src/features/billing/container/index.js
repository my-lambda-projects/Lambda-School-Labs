import React, { Component } from "react";
import { connect } from "react-redux";
import { CardElement, injectStripe } from "react-stripe-elements";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  CustomInput,
  CardBody,
  CardFooter
} from "reactstrap";
import { billUser } from "../store/action";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const CardInfo = styled.blockquote`
  background: white;
`;
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: ""
    };
    this.submit = this.submit.bind(this);
  }

  updateItemSelected = e => {
    this.setState({ item: e.target.value });
  };
  async submit() {
    let { token } = await this.props.stripe.createToken({
      user_id: this.props.currentUser.id,
      name:
        this.props.currentUser.first_name +
        " " +
        this.props.currentUser.last_name
    });
    console.log(token);
    this.props.billUser({ token, item: this.state.item });
  }

  render() {
    console.log("Billing:", this.props);
    if (this.props.complete) return <Redirect to={"/seek"} />;
    return (
      <>
        <CardBody>
          <Form>
            <Row>
              <Col>
                <CardInfo className="blockquote">
                  <FormGroup>
                    <CardElement />
                  </FormGroup>
                </CardInfo>
              </Col>
            </Row>

            {/* <Form>
        <FormGroup> */}
            {/* <Label>Payment info</Label> */}
            {/* <CardElement /> */}
            {/* </FormGroup> */}
            <Row>
              <Col>
                <FormGroup onChange={this.updateItemSelected}>
                  {/* <div> */}
                  <CustomInput
                    type="radio"
                    name="item"
                    id="exampleCustomradio"
                    label="100 Credits - $9.99"
                    value="CREDIT100"
                  />
                  <CustomInput
                    type="radio"
                    name="item"
                    id="exampleCustomradio2"
                    label="5 Credits - $0.99"
                    value="CREDIT5"
                  />
                  {this.props.currentUser &&
                  this.props.currentUser.is_employer ? (
                    <CustomInput
                      type="radio"
                      name="item"
                      id="exampleCustomCheckbox3"
                      label="Post Job - $9.99"
                      value="POSTING1"
                    />
                  ) : null}
                  {/* </div> */}
                </FormGroup>{" "}
              </Col>
            </Row>
            {/* <FormGroup> */}
            {/* <Button
            className="btn-round"
            color="primary"
            size="lg"
            onClick={this.submit}
          >
            Buy Now!
          </Button>{" "} */}
          </Form>
        </CardBody>

        <CardFooter>
          <Button
            className="btn-fill"
            color="primary"
            type="submit"
            onClick={this.submit}
          >
            Buy Now!
          </Button>
        </CardFooter>
        {/* </FormGroup> */}
      </>
    );
  }
}

// export default injectStripe(CheckoutForm);

const MapStateToProps = state => ({
  data: state.billing.data,
  complete: state.billing.complete,
  errors: state.billing.errors,
  currentUser: state.user.currentUser
  // FETCHING_GET_PROFILE: state.randomUser.FETCHING_GET_PROFILE
});
export default injectStripe(
  connect(
    MapStateToProps,
    { billUser }
  )(CheckoutForm)
);
