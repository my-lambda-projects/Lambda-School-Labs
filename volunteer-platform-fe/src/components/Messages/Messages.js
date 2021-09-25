import React, {useEffect, useState} from 'react';
import {useStateValue} from '../../hooks/useStateValue';
import styled from 'styled-components';
import moment from 'moment';
import {Input, Comment, Avatar, Tooltip} from 'antd';
import {sendMessage, getFileUrl} from '../../actions';
import {Link} from 'react-router-dom';

const Messages = ({messageId, selectedUid}) => {
  const [{auth, messages, org}, dispatch] = useStateValue();
  const [text, setText] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const messageRef = React.createRef();
  
  let messageThread = [];
  if (messages.messages[ selectedUid ] &&
    messages.messages[ selectedUid ].filter(
      messageThread => messageThread.id === messageId).length > 0){
    messageThread = messages.messages[ selectedUid ].filter(
      messageThread => messageThread.id === messageId);
  }
  
  const {Search} = Input;
  
  useEffect(() => {
    
    if (messageThread[ 0 ] && messageThread[ 0 ].imagePath){
      getFileUrl(messageThread[ 0 ].imagePath).then(url => {
        setImageUrl(url);
      });
    }
    
    const scrollHeight = messageRef.current.scrollHeight;
    const height = messageRef.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    messageRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }, [messageId, selectedUid]);
  
  const getAuthor = (from) => {
    
    if (messageThread[ 0 ].contactType === 'users'){
      if (from === messageThread[ 0 ].id){
        return <Link
          to={`profile/${messageThread[ 0 ].id}`}>{messageThread[ 0 ].name}</Link>;
      }else{
        return <Link
          to={`organization/${selectedUid}`}>{org.userOrganizations.filter(
          org => org.orgId === from)[ 0 ].organizationName}</Link>;
      }
    }else{
      if (from === auth.googleAuthUser.uid){
        return <Link
          to={`profile/${auth.googleAuthUser.uid}`}>{auth.registeredUser &&
        auth.registeredUser.firstName +
        ' ' + auth.registeredUser.lastName}</Link>;
      }else{
        return <Link
          to={`organization/${messageThread[ 0 ].id}`}>{messageThread[ 0 ].name}</Link>;
      }
    }
  };
  
  const send = () => {
    
    const message = {
      createdAt: moment().unix(),
      from: selectedUid,
      to: messageThread[ 0 ].id,
      text: text,
      read: false,
    };
    
    const to = {
      type: messageThread[ 0 ].contactType,
      uid: messageThread[ 0 ].id,
    };
    
    const from = {
      type: selectedUid === auth.googleAuthUser.uid ? 'users' : 'organizations',
      uid: selectedUid,
    };
    setText('');
    sendMessage(to, from, message);
  };
  
  const getAvatarUrl = (from) => {
    if (messageThread[ 0 ].contactType === 'users'){
      if (from === messageThread[ 0 ].id){
        return imageUrl;
      }else{
        return org.userOrganizations.filter(
          org => org.orgId === selectedUid)[ 0 ].imageUrl;
      }
    }else{
      if (from === auth.googleAuthUser.uid && auth.registeredUser){
        return auth.registeredUser.imageUrl;
      }else{
        return imageUrl;
      }
    }
  };
  
  const getCommentClassName = (from) => {
    if (messageThread[ 0 ].contactType === 'users'){
      if (from === messageThread[ 0 ].id){
        return 'other';
      }else{
        return 'me';
      }
    }else{
      if (from === auth.googleAuthUser.uid){
        return 'me';
      }else{
        return 'other';
      }
    }
  };
  
  return (
    <StyledMessages>
      <StyledMessageThread ref={messageRef}>
        {messageThread.length > 0 &&
        messageThread[ 0 ].messages.map((message, i) => {
          
          return (
            <Comment
              key={message.createdAt}
              className={getCommentClassName(message.from)}
              author={getAuthor(message.from)}
              avatar={
                <Avatar
                  src={getAvatarUrl(message.from)}
                  icon={'user'}
                  alt={message.from === auth.googleAuthUser.uid &&
                  auth.registeredUser ? auth.registeredUser.firstName + ' ' +
                    auth.registeredUser.lastName : ''}
                />
              }
              content={
                <p>
                  {message.text}
                </p>
              }
              datetime={
                <Tooltip title={moment().format('LLL')}>
                  <span>{moment.unix(message.createdAt).fromNow()}</span>
                </Tooltip>
              }
            />
          );
        })}
        {messageThread.length === 0 && <h2>No messages to display</h2>}
      </StyledMessageThread>
      <Search
        placeholder={'Message'}
        onSearch={send}
        enterButton={'Send'}
        size={'large'}
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </StyledMessages>
  );
};

const StyledMessages = styled.div`

width: 100%;

p {
  margin: 0;
  color: ${props => props.theme.gray10}
}

.me {
  max-width: 60%;
  margin-left: 1rem;
  border-radius: 10px;
  padding: 0 1rem;
  margin-bottom: 1rem;
  background-color: ${props => props.theme.primary6};
}

.me:last-child {
  margin-bottom: 3rem;
  
}

.other {
  margin-left: 40%;
  margin-bottom: 1rem;
  max-width: 60%;
  background-color: ${props => props.theme.accent6};
  padding: 0 1rem;
  border-radius: 10px;
}

.other:last-child {
  margin-bottom: 3rem;
 
}

.message {
  margin: 0 0 0 2rem;
  font-size: 1.5rem;
  color: black;
`;

const StyledMessageThread = styled.div`
  height: 65Vh;
  overflow-y: scroll;
  s
`;

export default Messages;
