import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import request from "superagent";
import { InfiniteScroll } from "./InfineScroll.style";

class InfiniteUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: []
    };

    // window.onscroll = () => {
    //   const {
    //     loadUsers,
    //     state: { error, isLoading, hasMore }
    //   } = this;
    //   if (error || isLoading || !hasMore) return;
    //   if (
    //     window.innerHeight + document.documentElement.scrollTop ===
    //     document.documentElement.offsetHeight
    //   ) {
    //     loadUsers();
    //   }
    // };
  }

  componentWillMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    this.setState({ isLoading: true }, () => {
      request
        .get(`${process.env.REACT_APP_BACKEND_SERVER}/users?results=10`)
        .then(results => {
          // Creates a massaged array of user data
          const nextUsers = results.body.map(user => ({
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
            title: user.title,
            linkedIn: user.linkedin
          }));
          
          // Merges the next users into our existing users
          this.setState({
            hasMore: this.state.users.length < 10,
            isLoading: false,
            users: [...this.state.users, ...nextUsers]
          });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });
  };

  render() {
    const { error, hasMore, isLoading, users } = this.state;

    return (
      <InfiniteScroll>
        <h1>Dev Profiles</h1>
        {users.map(user => (
          <Fragment key={user.linkedIn}>
            <hr />
            <div style={{ display: "flex" }}>
              <div>
                <h2 style={{ marginTop: 0 }}>{user.title}</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>
            </div>
          </Fragment>
        ))}
        <hr />
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {!hasMore && <div>End of Users</div>}
      </InfiniteScroll>
    );
  }
}

const container = document.createElement("div");
document.body.appendChild(container);

export default InfiniteUsers;
