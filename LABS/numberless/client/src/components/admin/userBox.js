import React from 'react';

import './userBox.css';

const UserBox = props => {
  return (
    <div className="contentBox">
      { props.users.map((user) => {
        return (
          <div>{ user.email }</div>
        )
      })}
    </div>
  )
}

export default UserBox;