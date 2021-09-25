import React from "react";
import { Route, Link } from "react-router-dom";
import {
  Menu,
  Sidebar,
  Button,
  Segment,
  Icon,
  Modal,
  Header
} from "semantic-ui-react";
import logo from "../../img/logowhite.png";
import Auth from "../AuthContainer/Auth";
import Callback from "../AuthContainer/Callback";
import Fail from "../AuthContainer/Fail";
import Landing from "../Landing";
import FriendListView from "../NavContainer/FriendListView";
import MapContainer from "../MapContainer/MapContainer";
import DevCard from "./DevCard";
import CheckoutForm from "../CheckoutForm";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const auth = new Auth();
    return (
      <div>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            className="sidebar"
            inverted
            vertical
            visible={this.props.visible}
            width="wide"
          >
            <Button.Group className="closebutton">
              <Button onClick={this.props.onToggle} icon="close" inverted />
            </Button.Group>
            <Menu.Item as={Link} to="/">
              <img src={logo} alt="" />
            </Menu.Item>
            {this.props.isLoggedIn ? (
              <Link
                to={{
                  pathname: "/map",
                  state: {
                    user: window.localStorage.getItem("SAMUserID")
                  }
                }}
              >
                <Menu.Item
                  onClick={() =>
                    this.props.getUserData(
                      window.localStorage.getItem("SAMUserID")
                    )
                  }
                >
                  <Icon name="map" inverted />
                  My Map
                </Menu.Item>{" "}
              </Link>
            ) : (
              <Modal
                trigger={
                  <Menu.Item>
                    <Icon name="map" inverted />
                    My Map
                  </Menu.Item>
                }
                basic
                size="large"
                closeIcon
              >
                <Modal.Content>
                  <p style={{ textAlign: "center" }}>
                    Please Log In to Access Map
                  </p>
                </Modal.Content>
              </Modal>
            )}

            <FriendListView />
          </Sidebar>
          <div className="Menu">
            <div className="leftNav">
              <Button
                className="navbutton"
                inverted
                onClick={this.props.onToggle}
              >
                MENU
              </Button>
            </div>
            <div className="rightNav">
              <Modal
                trigger={
                  <Button inverted className="premium">
                    <Icon name="gem" />
                    PREMIUM
                  </Button>
                }
                basic
                size="small"
                closeIcon
              >
                <Header icon="gem" content="Premium Sign Up" />
                <Modal.Content>
                  <CheckoutForm />
                </Modal.Content>
              </Modal>
              )
              <div className="AuthButtons">
                {window.localStorage.getItem("SAMUserID") ? (
                  <Button className="logout" inverted onClick={auth.logout}>
                    LOG OUT
                  </Button>
                ) : (
                  <div className="AuthButtons">
                    <Button className="logout" inverted onClick={auth.login}>
                      LOG IN
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Sidebar.Pusher
            dimmed={this.props.visible}
            onClick={this.props.onPusherClick}
            style={{ minHeight: "100vh" }}
          >
            <Segment basic>
              <Route path="/" exact render={props => <Landing />} />
              <Route path="/map" exact render={props => <MapContainer />} />
              <Route path="/callback" exact render={props => <Callback />} />
              <Route path="/fail" component={Fail} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <div className="footer" id="footer">
          <Modal
            trigger={
              <div className="contact">
                <p> ABOUT THE TEAM </p>
              </div>
            }
            basic
            size="small"
            closeIcon
          >
            <Header
              content={
                <div style={{ display: "flex" }}>
                  <p className="teamtext">THE TEAM</p>
                </div>
              }
            />
            <Modal.Content>
              <DevCard />
            </Modal.Content>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.updateLoginReducer.isLoggedIn
  };
};
export default withRouter(connect(mapStateToProps)(NavBar));
