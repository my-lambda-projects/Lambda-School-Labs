import React from "react";
import Landing from "../layouts/landingPage/Landing";
import { Row, Col } from "reactstrap";

class LandingView extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col>
              <Landing />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default LandingView;
