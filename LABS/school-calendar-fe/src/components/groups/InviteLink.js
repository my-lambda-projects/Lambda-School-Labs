import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {Context} from '../../contexts/Contexts';
import {useAuth} from '../../contexts/auth';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { useToasts } from 'react-toast-notifications';

const InviteLink = () => {
  const {groupList} = useContext(Context);
  const { register, handleSubmit, errors } = useForm();

  const {googleApi} = useAuth();
  const {currentUser} = googleApi;

  // state for group id
  const [groupID, setGroupID] = useState(groupList[0].id);

  // state for invite link
  const [groupInviteLink, setGroupInviteLink] = useState('');

  const handleChange = e => {
    setGroupID(e.target.value);
  };
  
  const handleCopy = () => {
      document.getElementById('groupInviteLink').select();
      document.execCommand('copy');
  }
  console.log(errors);

  const {adminInfo, setNavState} = useContext(Context);


  const handleCancel = () => {
    setNavState(2);
  }
  const onSubmit = data => {
    axiosWithAuth(currentUser.token)
        .get(`/api/groups/${adminInfo.adminId}/${groupID}`)
        .then(res => {
            console.log(res.data);
            console.log(`Invite Link Generated: ${process.env.REACT_APP_BASE_URL}/invitee/${res.data.groupInviteHash}`);
            setGroupInviteLink(`${process.env.REACT_APP_BASE_URL}/invitee/${res.data.groupInviteHash}`);
        })
        .catch(err => console.log('error in getting invite link', err));
  };

  return (
    <InviteLinkContainer>
        {!groupInviteLink && (
            <Form onSubmit={handleSubmit(onSubmit)}>
                <GroupDiv>
                    <Tag>Add Groups</Tag>
                    <Label htmlFor="groupId">Add Groups</Label>
                    <select onChange={handleChange} name="groupId" id="groupId" ref={register({ required: true })}>
                    {groupList.map(g => {
                        return (
                        <option value={g.id}> {g.groupName} </option>
                        )
                    })}
                    </select>
                </GroupDiv>
                <ButtonDiv>
                <SaveBtn><button type="submit">Generate Invite Link</button></SaveBtn>
                <CancelBtn><button onClick={handleCancel}>Cancel</button></CancelBtn>
                </ButtonDiv>
            </Form>
        )}
        {groupInviteLink && (
            <LinkContainer>
            <Headline>Invite Link Generated Successfully!</Headline>
            <LinkDiv>
                <textarea id='groupInviteLink' rows='5' cols='50'>{groupInviteLink}</textarea>
            </LinkDiv>
            <ButtonDiv>
                <SaveBtn><button onClick={handleCopy}>Copy Link</button></SaveBtn>
            </ButtonDiv>
            </LinkContainer>
        )}
    </InviteLinkContainer>
  );
};

export default InviteLink;

// styled components
const size = {
  tablet: '768px',
  desktop: '1024px'
};
const device = {
  desktop: `(min-width: ${size.desktop})`
};

const InviteLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: 100%;
`;

const Headline = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 2%;
  color: #c70c00;
  font-weight: bold;
  background: #f8dfde;
  border-radius: 0.5rem;
  font-size: 1.15rem;
`;

const LinkContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 5% auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
`;

const Tag = styled.p`
  font-size: 1.15rem;
  font-weight: bold;
  margin: 1rem 0;
`;


const GroupDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkDiv = styled.div`
  display: flex;
  width: 80%;
  height: auto;
  margin: 2% auto;
  padding: 2%;
  word-break: break-all;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 5%;
`;

const SaveBtn = styled.div`
  width: 48%;
  background: #28807d;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 1.15rem;
  padding: 2% 5%;
  margin: 2%; auto;
  border: 2px solid #28807d;
  border-radius: 5rem;
  &:hover {
    cursor: pointer;
  }
  @media ${device.desktop} {
    width: 30%; 
    padding: 2%;
    margin: 0;
    }
`;

const CancelBtn = styled.div`
  width: 48%;
  color: #28807d;
  background: white;
  text-align: center;
  font-weight: bold;
  font-size: 1.15rem;
  padding: 2%;
  margin: 2% auto;
  border: 1px solid #28807d;
  border-radius: 5rem;
  &:hover {
    cursor: pointer;
  }
  @media ${device.desktop} {
    width: 30%;
    padding: 2%;
    margin: 0;
  }
`;

// the code below makes the labels invisible
// so that they're hidden visually but
// still available to screen readers
const Label = styled.label`
    border: 0;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip; rect(1px, 1px, 1px, 1px);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;
