import React from "react";
import ProfileContainer from "../features/forms/containers";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";

class Profile extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                {/* <CardHeader>
                  <h5 className="title">Profile Title Here</h5>
                </CardHeader> */}
                <ProfileContainer />
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={
                          this.props.currentUser.photo ||
                          require("assets/img/anime3.png")
                        }
                      />
                      <h5 className="title">
                        {this.props.currentUser.first_name +
                          " " +
                          this.props.currentUser.last_name}
                      </h5>
                    </a>
                    <p className="description">
                      {this.props.currentUser.is_seeker &&
                      !this.props.currentUser.is_employer
                        ? this.props.currentUser.desired_title
                        : this.props.currentUser.company_name}
                    </p>
                  </div>
                  <div className="card-description">
                    {this.props.currentUser.summary}
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const MapPropsToState = state => ({
  ...state.user
});
export default connect(MapPropsToState)(Profile);
