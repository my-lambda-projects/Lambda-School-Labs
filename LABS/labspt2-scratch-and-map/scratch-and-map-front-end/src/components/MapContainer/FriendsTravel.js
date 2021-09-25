import React from "react";
import { Icon } from "semantic-ui-react";

class FriendsTravel extends React.Component {
  render() {
    let friends = this.props.friends;
    // let users = this.props.users;
    let user = [
      "Abi Franklin",
      "Brandon Moll",
      "Courtney Buratto",
      "Javier Alvarez",
      "Pascale Pierre",
      "Ryan Matthews",
      "Ryan Matthews",
      "Courtney Miqael",
      "Pascale Pierre",
      "Brandon Moll",
      "Bob Villa",
      "Rick Alcejiiggfihh",
      "Abi Franklin"
    ];
    let color = [null, null, "#017B7B", "#98016D", "#CD5D01", "#8FC201"];
    if (friends.length > 0) {
      return (
        <div className="statusbox">
          {friends.map(function(person, index) {
            if (person.status > 1) {
              return (
                <div className="friendStatus">
                  <p key={index}>{user[person.user_id - 1]}</p>
                  <Icon
                    size="large"
                    name="circle"
                    style={{ color: `${color[person.status + 1]}` }}
                  />
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return (
        <div>
          <p
            style={{ fontSize: "1em", margin: "5px auto", textAlign: "center" }}
          >
            No friends have scratched this country.
          </p>
        </div>
      );
    }
  }
}

export default FriendsTravel;
