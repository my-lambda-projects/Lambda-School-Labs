import React from "react";
import MatchContainer from "../features/matches/container";
import { Row, Col } from "reactstrap";

class Matches extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col>
              <MatchContainer />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Matches;
