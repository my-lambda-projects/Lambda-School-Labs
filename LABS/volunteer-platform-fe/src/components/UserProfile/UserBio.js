import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AntTextArea } from '../../styled/index';
import { Icon } from 'antd';

export const UserBio = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (!props.user.bio) {
      setIsEditing(true);
    } else {
      setBio(props.user.bio);
      setIsEditing(false);
    }
  }, [props.user.bio])

  const openTextArea = () => {
    setIsEditing(true);
  }

  const inputBio = event => {
    setBio(event.target.value);
  }

  const updateBio = event => {
    event.preventDefault();
    let updatedUser = {
      ...props.user,
      bio: bio
    }
    props.updateUser(updatedUser);
    setIsEditing(false);
  }

  return (
    <StyledDiv>
      <div className='top-row'>
        <p>Bio</p> 
        <div>
          <Icon onClick={openTextArea} type='edit' style={{ fontSize: '24px', cursor: 'pointer'}}/>
          <Icon onClick={updateBio} type="save" style={{ fontSize: '24px', cursor: 'pointer'}} />
        </div>
      </div>
      {isEditing ? (
        <AntTextArea 
          name='bio'
          value={bio}
          autosize={{ minRows: 7}}
          onChange={inputBio}
          placeholder='Add a blurb about yourself here'
        />
      ) : (
        <div className='bio'>
          <p>{props.user.bio}</p>
        </div>
      )}
    </StyledDiv>
  )
}

export default UserBio;

const StyledDiv = styled.div`
  width: 50%;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.gray3};
  border-radius: 10px;
  box-shadow: none;

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .bio {
    padding: 2rem;
  }
`