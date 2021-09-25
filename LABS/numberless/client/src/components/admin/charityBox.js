import React from 'react';

import './charityBox.css';

const CharityBox = props => {
  return (
    <div className="contentBox">
      { props.charities.map((charity) => {
        return (
          <div>{ charity.charity }</div>
        )
      })}
    </div>
  )
}

export default CharityBox;