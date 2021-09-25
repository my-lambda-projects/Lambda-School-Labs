import React from 'react';

// Flow type checking
type Props = {
  time: string,
  body: string
};
const Message = (props: Props) => {
  return (
    <div className={`message d-flex`}>
      <h4>{props.time}</h4>
      <p>{props.body}</p>
    </div>
  );
};

// Still need to add propTypes validation
export default Message;
