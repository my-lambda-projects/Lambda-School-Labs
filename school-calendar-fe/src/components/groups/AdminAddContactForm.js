import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {Context} from '../../contexts/Contexts';
import {useAuth} from '../../contexts/auth';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { useToasts } from 'react-toast-notifications';

const AdminAddContactForm = ({ setShowAdminAddContact }) => {
  // get groupData
  const {groupList, navState, setNavState, adminInfo, width} = useContext(Context);
  const { register, handleSubmit, errors } = useForm();

  const { addToast } = useToasts();

  const {googleApi} = useAuth();
  const {currentUser} = googleApi;

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

  const handleCancel = () => {
    if (width < 768) {
      setNavState(2);
    } else {
      setShowAdminAddContact(false);
    }
    
  }
  const onSubmit = data => {
    // format phone number
    const re = /\D/g;
    let cleanPhoneNumber = data.phoneNumber.replace(re, "");    
    const payload = {
      ...input,
      phoneNumber: cleanPhoneNumber,
      adminId: adminInfo.adminId
    }   
    console.log('payload: ', payload)
      // create contact
      axiosWithAuth(currentUser.token).post("/api/contacts/", payload)
        .then(res => {
          console.log("response from the post request", res);
          let newContactId = res.data;
          // notify that contact was created!
          addToast('Contact created!', {
            appearance: 'info',
            autoDismiss: true,
            autoDismissTimeout: 6000
          });
          //  add contact to group
          if(payload.groupId){
            console.log("PAYLOAD GROUPID", payload.groupId, newContactId)
            axiosWithAuth(currentUser.token).post(`/api/groups/${payload.adminId}/${payload.groupId}/contacts`, {contacts: [newContactId]})
              .then(res => {
                console.log('the second res', res);
                if(res.status === 201){
                  //  notify the user that contact was successfully added to group
                  addToast('Contact added to the group!', {
                    appearance: 'info',
                    autoDismiss: true,
                    autoDismissTimeout: 6000
                  });
                }
              })
              .catch(err => {
                console.log('error in adding contact to the group', err);
              })
          }
          //  redirect user 
          if(width < 768){
            setNavState(2);
          } else {
            setShowAdminAddContact(false);
          }
          
          })
        .catch(err => console.log(err))
  };

  return (
    <AddContact>
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
          <GroupDiv>
            <Tag>Group</Tag>
            <Label htmlFor="groupId">Group</Label>
            <select onChange={handleChange} name="groupId" id="groupId" ref={register({ required: true })}>
              <option value=''> Select Group </option>
              {groupList.map(g => {
                return (
                  <option value={g.id}> {g.groupName} </option>
                )
              })}
            </select>
          </GroupDiv>
        <ButtonDiv>
          <CancelBtn><button onClick={handleCancel}>Cancel</button></CancelBtn>
          <SaveBtn><button type="submit">Save</button></SaveBtn>
        </ButtonDiv>
      </Form>
    </AddContact>
  );
};

export default AdminAddContactForm;

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

const GroupDiv = styled.div`
  display: flex;
  flex-direction: column;
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
