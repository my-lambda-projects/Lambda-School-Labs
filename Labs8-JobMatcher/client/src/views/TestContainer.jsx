import React from "react";
import TestingCard from "./TestingView";
import TransitionGroup from "react-transition-group/TransitionGroup"; // ES6
import { Button } from "reactstrap";

class TestingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [0, 1, 2, 3, 4],
      active: false
    };
  }
  moveRight = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    return (
      <div style={{ width: "900px", margin: "100px 300px", height: "400px" }}>
        <TransitionGroup>
          {this.state.active ? <TestingCard onClick={this.moveRight} /> : null}
        </TransitionGroup>
        <div>
          <Button>skip</Button>
          <Button onClick={this.moveRight}>Super </Button>
          <Button onClick={this.moveRight}>APP</Button>
        </div>
      </div>
    );
  }
}
export default TestingContainer;
