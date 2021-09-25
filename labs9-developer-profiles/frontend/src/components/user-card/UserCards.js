import React, { Component } from "react";
import UserCard from "../../components/user-card/UserCard";
import { UserCardsDiv, LoaderContainer } from "./UserCards.styles";

export default class UserCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      raw: [],
      loading: false
    };

  window.onscroll = () => {
    const { error, loading } = this.props.publicPageState;
    const UserCardsDiv = document.querySelector("#scroll");
    if (error || loading) {
      return;
    } else {
      if (UserCardsDiv) {
         if (
            window.innerHeight + document.documentElement.scrollTop ===
              UserCardsDiv.scrollHeight
            ) {
              this.props.filter();
            }
      }
    }
    }
   }

  render() {
    if (this.props.publicPageState.scrollToTop) {
      document.documentElement.scrollTop = 0;
    }
    console.log(this.props.publicPageState.modUsers)
    return (
      <UserCardsDiv id="scroll">
        {this.props.publicPageState.modUsers.map(user => {
          return <UserCard
                badgeURL={user.badgeURL}
                preview={false}
                id={user.id}
                github={user.github}
                linkedin={user.linkedin}
                portfolio={user.portfolio}
                badge={user.badge}
                key={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                image={user.image}
                summary={user.summary}
                desired_title={user.desired_title}
                location={user.current_location_name}
              />
        })}
        {this.props.publicPageState.loading ? (
          <LoaderContainer><i className="loading fas fa-spinner fa-5x fa-spin"></i></LoaderContainer>
        ) : null}
        {this.props.publicPageState.error ? (
          <div>
            <p>Oops! There has been an error</p>
            <p>Error: {this.props.publicPageState.errorMsg}</p>
          </div>
        ) : null}
        {this.props.publicPageState.endOfUsers ? (
          <div>
            <p>No more users, modify filters</p>
          </div>
        ) : null}
      </UserCardsDiv>
    );
  }
}