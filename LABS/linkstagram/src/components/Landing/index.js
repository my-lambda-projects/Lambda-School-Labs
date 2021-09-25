
import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import Carousel from "./Carousel";
import Header from "./Header";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Button><Link to="/SignUp"> SignUp </Link> </Button>
        <Button><Link to="/Login"> Login </Link> </Button>
        <Carousel />
        <Button>
          <Link to="/Billing">BUY NOW </Link>
        </Button>
      </div>
    );
  }
}
export default LandingPage;
