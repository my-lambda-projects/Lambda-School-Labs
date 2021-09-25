import React, { Component } from "react";
import axios from "axios";
import {
  Sidebar,
  Button,
  Segment,
  Menu,
  Icon,
  Image,
  Dropdown
} from "semantic-ui-react";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      // friends: [],
      options: [],
      visible: false
    };
  }

  async componentDidMount() {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
      .then(res => {
        this.setState({
          options: res.data.users
        });
      });
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleHide = () => this.setState({ visible: false });
  handleShow = () => this.setState({ visible: true });
  handleHideSidebar = () => this.setState({ visible: false });

  render() {
    console.log("OPTIONS DATA", this.state.options);
    const { visible, options } = this.state;
    return (
      <div>
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShow}>
            Hi
          </Button>
          <Button disabled={!visible} onClick={this.handleHide}>
            Bye
          </Button>
        </Button.Group>

        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="push"
            icon="labeled"
            inverted
            onHide={this.handleHideSidebar}
            vertical
            visible={visible}
            width="wide"
          >
            <Menu.Item as="a">
              <Icon name="home" />
              Home
            </Menu.Item>

            <Dropdown
              onChange={this.handleInputChange}
              placeholder="Select Friend"
              clearable
              fluid
              multiple
              search
              selection
              options={this.state.options.map(item => (
                <option key={item.id} value={item.id}>
                  {item.username}
                </option>
              ))}
            />
            {/* <Menu.Item as="a" /> */}
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              {/* placeholder img */}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SideBar;
