import React, { useState, useEffect, useContext } from 'react';
import {useParams} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';


const InviteeAddContactForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    groupId: ''
  });

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };
  
  console.log(errors);

  // check to see if link is invalid
  const [linkValidity, setLinkValidity] = useState(false);

  const [inviteeAdded, setInviteeAdded] = useState(false);

  
  const { groupInviteHash } = useParams();
  
  // state for adminInfo and groupInfo
  const [adminInfo, setAdminInfo] = useState();
  const [groupInfo, setGroupInfo] = useState();
  
  

  useEffect(() => {
    console.log(groupInviteHash);
    axios
      .get(`${process.env.REACT_APP_ENDPOINT_URL}/api/inviteToGroup/verify/${groupInviteHash}`)
      .then(res => {
        if(res.status == 200){
          setAdminInfo(res.data.adminInfo);
          setGroupInfo(res.data.groupInfo);
          setLinkValidity(true);
        } else {
          setLinkValidity(false);
        }
      })
      .catch(err => {
        console.log('error in verifying invite link', err);
      })
  }, [groupInviteHash]);


  const onSubmit = data => {
    // format phone number
    const re = /\D/g;
    let cleanPhoneNumber = data.phoneNumber.replace(re, "");    
    const payload = {
      ...input,
      phoneNumber: cleanPhoneNumber,
      adminId: adminInfo.id,
      groupId: groupInfo.id
    }   
    console.log("payload", payload);
    axios.post(`${process.env.REACT_APP_ENDPOINT_URL}/api/inviteToGroup/addContact`, payload)
      .then(res => {
        console.log(res);
        if(res.status === 201){
          setInviteeAdded(true);
        }
      })
      .catch(err => {
        console.log('error in adding contact', err);
      })
  };

  const handleCancel = () => {
    setInput({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      groupId: ''
    })
  }

  return (
    <AddContact>
      {!linkValidity &&(
        <Headline>
        <Tag>This link has expired</Tag>
       </Headline>
      )}
      {linkValidity && inviteeAdded && (
        <Headline>
        <Tag>Thank you, you have been added as a contact!</Tag>
       </Headline>
      )}
      {linkValidity && !inviteeAdded && (
        <Headline>       
          <Tag>You've been invited to join:</Tag>
          <GroupName>{groupInfo.groupName}</GroupName>
        </Headline>
      )}
      { linkValidity && !inviteeAdded && (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Tag>Name</Tag>
        <NameDiv>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={handleChange}
            ref={register({ required: true, maxLength: 80 })}
          />
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={handleChange}
            ref={register({ required: true, maxLength: 100 })}
          />
        </NameDiv>
        <Tag>Phone number</Tag>
        <Label htmlFor="phoneNumber">Phone number</Label>
        <Input
          type="tel"
          placeholder="1234567890"
          name="phoneNumber"
          id="phoneNumber"
          
          ref={register({required: true, maxLength: 14, pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i})} 
        />
       

        
        <Tag>Email</Tag>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="Email address"
          name="email"
          id="email"
          onChange={handleChange}
          ref={register({ required: false, pattern: /^\S+@\S+$/i })}
        />
       
        
        <ButtonDiv>
          <CancelBtn><button onClick={handleCancel}>Cancel</button></CancelBtn>
          <SaveBtn><button type="submit">Save</button></SaveBtn>
        </ButtonDiv>
      </Form>
      )}
    </AddContact>
  );
};

// styled components
const size = {
  tablet: '768px',
  desktop: '1024px'
};
const device = {
  desktop: `(min-width: ${size.desktop})`
};

const AddContact = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
`;

const Headline = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;

  #firstName,
  #lastName {
    width: 45%;
  }
`;

const Tag = styled.p`
  font-size: 1.15rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const GroupName = styled.div`
  font-size: 1.15rem;
  width: 80%;
  text-align: center;
  border-radius: 5px;
  color: #c70c00;
  font-weight: bold;
  background: #f8dfde;
`;

const NameDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  border-bottom: 1px solid gray;
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
  padding: 2%;
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

export default InviteeAddContactForm;
