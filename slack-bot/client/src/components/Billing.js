import React, { Component } from "react";
import { Button } from 'react-bootstrap'

class Billing extends Component {
  render() {
    return (
    <div>
      <h1>Billing</h1>
      <p>If you would like to purchase and receive immediate access <br /> please click below</p>
      <Button bsStyle='success' bsSize="large">
        Buy!!
      </Button>

    </div>

  );
  }
}

export default Billing;
