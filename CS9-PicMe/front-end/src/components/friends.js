import React , { Component, Fragment } from 'react'
import { Card } from 'semantic-ui-react'
import axios from "axios";

import FriendCard from './friend-card';

class Friends extends Component {
  state = {
    users: {
      noRelationship: [],
      pending: [],
      requests: [],
      friends: []
    } 
  }

  async componentDidMount() {
    const headers = { headers: { "Authorization": `Bearer ${window.localStorage.token}` }};
    const users = (await axios.get(`${process.env.REACT_APP_API}/users/${localStorage.email}`, headers)).data
    this.setState({ users });
  }

  friendAction = async (user, action) => {
    const payload = {
      friend: user,
      action: action,
      email: localStorage.email
    }

    const headers = {
      headers: {
        "Authorization": `Bearer ${window.localStorage.token}`
      }
    };

    const users = (await axios.post(`${process.env.REACT_APP_API}/friend-action`, payload, headers)).data;
    this.setState({ users });
  }
  

  render() {
    const users = this.state.users;
    return (
      <Fragment>
        <h4>Current Friends</h4><br />
        <Card.Group>
          { users.friends.map(user => <FriendCard handleButton1Click={this.friendAction.bind(this, user, 'unFriend')} key={user.id} {...user} btnTxt="Unfriend" btnColor="red" />) }
        </Card.Group>

        <br />
        <h4>Search for new Friends</h4>
        <Card.Group>
          { users.noRelationship.map(user => <FriendCard handleButton1Click={this.friendAction.bind(this, user, 'requestFriend')} key={user.id} {...user} btnTxt="Request Friend" />) }
        </Card.Group>

        <br />
        <h4>Pending Friend Requests</h4>
        <Card.Group>
          { users.pending.map(user => <FriendCard handleButton1Click={this.friendAction.bind(this, user, 'accept')} handleButton2Click={this.friendAction.bind(this, user, 'decline')} key={user.id} {...user} pending />) }
        </Card.Group>

        <br />
        <h4>Your Friend Requests</h4>
        <Card.Group>
          { users.requests.map((user, i) => <FriendCard key={user.id} {...user} />) }
        </Card.Group>
      </Fragment>
    )
  }
}
export default Friends
