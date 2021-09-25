import React, { Component, Fragment } from "react";
import { Col, Nav } from "reactstrap";
import { Link } from "react-router-dom";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { auth } = this.props.context.userData;

    return (
      <Col className="sidebar" lg="2">
        {auth ? (
          <Fragment>
            <Nav vertical className="nav">
              <Link to="/dashboard">
                <div className="dash-logo" />
              </Link>
              <div className="avat">
                <i className="fa fa-user" aria-hidden="true" />
              </div>
              <div className="user">
                Hello, {this.props.context.userData.username}
              </div>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/dashboard"
              >
                <div className="link-mod documents">
                  <i className="far fa-file" />
                  <div>Documents</div>
                </div>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/dashboard/billing"
              >
                <div className="link-mod billing">
                  <i className="fas fa-money-bill-wave-alt" />
                  <div>Billing</div>
                </div>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/dashboard/settings/options"
              >
                <div className="link-mod setting">
                  <i className="fas fa-cogs" />

                  <div>Settings</div>
                </div>
              </Link>

              <Link
                onClick={() => localStorage.removeItem("token")}
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="link-mod">
                  <i className="fa fa-power-off" />
                  <div>Log Out</div>
                </div>
              </Link>
            </Nav>
          </Fragment>
        ) : (
          this.props.history.push("/")
        )}
      </Col>
    );
  }
}

export default Dashboard;
