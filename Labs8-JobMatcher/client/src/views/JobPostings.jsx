import React from "react";
import Job from "../features/job/component/Job";
import { Row, Col } from "reactstrap";

class JobPostings extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col>
              <Job />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default JobPostings;
