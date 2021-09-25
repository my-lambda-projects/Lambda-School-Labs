import React from "react";
import View from "../features/view/container";
import { Row, Col } from "reactstrap";

class Browse extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col>
              <View />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Browse;
