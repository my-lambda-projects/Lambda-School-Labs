import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../contexts/Contexts';
import styled, { css } from 'styled-components';
import btn from '../navigation/NavImgs/addgroupbtn.png';
import { useAuth } from '../../contexts/auth';
import CreateNewGroup from './CreateNewGroup';
import Contacts from '../contacts/Contacts.js';
import AddContactToGroupForm from '../contacts/AddContactToGroupForm';
import circleBtn from '../navigation/circle-plus.png';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { useToasts } from 'react-toast-notifications'

const Groups = ({ setShowEditGroupForm }) => {
  const { googleApi } = useAuth();
  const { currentUser } = googleApi;
  const { token } = currentUser;
  const { adminInfo, width, setNavState, groupList, setGroupList, getGroupList, fetchGroupData, currentGroup } = useContext(Context)
  const [isDisplayingGroup, setIsDisplayingGroup] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState({});
  const [isAddingContactToGroup, setIsAddingContactToGroup] = useState(false)
  //handles group toggle and calls function to fetch data according to condition
  const handleGroupDisplay = async (groupId, adminId, token) => {
    if(isDisplayingGroup === true && groupId !== currentGroup.id){
      await fetchGroupData(groupId, adminId, token)
      setIsDisplayingGroup(false)
      setIsDisplayingGroup(true)
      }else if(isDisplayingGroup === false){
      await fetchGroupData(groupId, adminId, token)
      setIsDisplayingGroup(true)
      }else{
      setIsDisplayingGroup(false)
    }
  } 
  // deletes group
  const handleDelete = (groupId, adminId, token) => {
    console.log(`/api/groups/${adminId}/${groupId}`)
    axiosWithAuth(token, googleApi)
    .delete(`/api/groups/${adminId}/${groupId}`)
    .then(res => {
        setDeleteGroup({
            ...deleteGroup,
    })
    getGroupList()
  })
    .catch(error => console.log(error.response))
  } 

  // handle edit group
  const handleEdit = () => {
    if(width < 768){
      setNavState(8);
    } else {
      setShowEditGroupForm(true);
    }
  }
  //sets groupList state to state and sorts aplphabetically
  // const getGroupList = () => {
  //   let sortedGroupList = [];
  //   axiosWithAuth(token)
  //     .get(`/api/groups/${adminInfo.adminId}`)
  //     .then(res => {
  //       sortedGroupList = [...res.data.groups];
  //       sortedGroupList.sort((a, b) => {
  //         let nameA = a.groupName.toUpperCase();
  //         let nameB = b.groupName.toUpperCase();
  //         if (nameA < nameB) {
  //           return -1;
  //         }
  //         if (nameA > nameB) {
  //           return 1;
  //         }
  //         return 0;
  //       });
  //       setGroupList([...sortedGroupList]);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //};
  const handleContactDelete = (e, relationshipId, adminId, groupId) => {
    e.stopPropagation()
    e.preventDefault()
    axiosWithAuth(token)
    .delete(`/api/groups/${adminId}/${groupId}/contacts/${relationshipId}`)
    .then(res => {
        console.log('res: ', res.data)
        fetchGroupData(groupId, adminId, token)
    })
    .catch(err => {
        console.log(err)
    })
}
  useEffect(() => {
    getGroupList();
  }, []);
    if(isAddingContactToGroup){
      return <AddContactToGroupForm currentGroup={currentGroup} setIsAddingContactToGroup={setIsAddingContactToGroup}/>
    }
      return (
        <GroupList>
          {groupList.map(group => {
            return (
              <Group key={group.id} onClick={()=>{handleGroupDisplay(group.id, adminInfo.adminId, token)}}>
                <GroupTitle color={group.groupColor}>
                  <i
                    className={group.groupIcon}
                    style={{
                      fontSize: '1.6rem',
                      margin: '0 3% 0 0',
                      color: `${group.groupColor}`
                    }}
                  ></i>
                  {group.groupName}
                </GroupTitle>
                {/* <Arrow className={group.id === currentGroup.id  && isDisplayingGroup === true ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}/> */}
                <Arrow className={'fas fa-chevron-down'} isDisplayingGroup={isDisplayingGroup} group={group} currentGroup={currentGroup}/>
                {isDisplayingGroup === true && group.id === currentGroup.id && (
                  <ContactList isDisplayingGroup={isDisplayingGroup} group={group} currentGroup={currentGroup}>
                    {currentGroup.contacts.map(contact => {
                      // console.log('CONTACT: ', contact)
                      return(
                      <ContactDiv key={contact.contactId} isDisplayingGroup={isDisplayingGroup} group={group} currentGroup={currentGroup}>
                        <i className="fas fa-user-alt"></i>
                        <ContactInfoContainer>
                          <p>{`${contact.firstName} ${contact.lastName}`}</p>
                          <IconContainer>
                            <i className="fas fa-phone"></i>
                            <i className="fas fa-comment-medical"></i>
                            <i className="fas fa-envelope"></i>
                            {/* IMPORTANT id key is not the contact's id, instead it is the id in the many to many table (contact_group) */}
                            <i className="fas fa-trash" onClick={(e)=>{handleContactDelete(e, contact.id, adminInfo.adminId, group.id)}}></i>
                          </IconContainer>
                        </ContactInfoContainer>
                      </ContactDiv>
                      )
                    })}
                   { ( <BtnContainer>
                      <i className="fa fa-user-plus" onClick={()=>{setIsAddingContactToGroup(true)}} style={{fontSize: '3rem', color: '#2e8380'}}></i>
                      <EditBtn onClick={handleEdit}>Edit</EditBtn>
                      <DeleteBtn onClick={() => handleDelete(group.id, adminInfo.adminId, token)}>Delete</DeleteBtn>
                    </BtnContainer>)}
                  </ContactList>
                )}
              </Group>
            );
          })}
          {width < 768 && (<BtnDiv>
            <Btn
              src={btn}
              onClick={() => {
                setNavState(5);
              }}
            ></Btn>
          </BtnDiv>)}
        </GroupList>
    );
};
export default Groups;
// styled components
const size = {
  tablet: '768px',
  desktop: '1024px'
};
const device = {
  desktop: `(min-width: ${size.desktop})`
};
const BtnDiv = styled.div`
  width: 100%;
  display: flex;
  margin: 2% 0 0;
`;
const Btn = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
const GroupList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 6% 5% 30%;
  @media ${device.desktop} {
    width: 90%;
    margin: 0 auto;
    }
`;
const Group = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 3% 0 1%;
`;
const GroupTitle = styled.h1`
  width: 80%;
  font-size: 1.6rem;
  color: ${props => props.color};
  @media ${device.desktop} {
    font-size: 1.25rem;
    }
`
const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 4% 0 0 0;

  @media ${device.desktop} {
    i{
      width: 28%;
      font-size: 0.2rem;
    }
  }
`
const EditBtn = styled.button`
    width: 36%;
    text-align: center;
    background: #FFFFFF;
    font-size: 1.2em;
    line-height: 2em;
    color: #28807D;
    border: 2px solid #28807D;
    box-sizing: border-box;
    border-radius: 15px;

    @media ${device.desktop} {
      width: 28%;
      font-size: 0.9rem;
    }
`
const DeleteBtn = styled.button`
    width: 36%;
    text-align: center;
    background: #28807D;
    font-size: 1.2em;
    line-height: 2em;
    color: #FFFFFF;
    border: 2px solid #28807D;
    box-sizing: border-box;
    border-radius: 15px;

    @media ${device.desktop} {
      width: 28%;
      font-size: 0.9rem;
    }
`
const Arrow = styled.i`
  width: 10%;
  text-align: right;
  color: gray;
  font-size: 1.4rem;
  transform: rotate(0deg);
  transition: transform .3s ease-out;

  ${props => props.isDisplayingGroup && props.group.id === props.currentGroup.id && css`
    transform: rotateY(180deg) scale(1.4);
  `}
`
const ContactList = styled.div`
  visibility: ${({isDisplayingGroup}) => isDisplayingGroup ? 'visible' : 'none'};
  width: 100%;
  opacity: ${({isDisplayingGroup}) => isDisplayingGroup ? '1' : '0'};
  transition: all 5s linear;


`
const ContactDiv = styled.div`
  width: 100%;
  margin: 5% 0;
  display: flex;
  justfiy-content: space-between;
  opacity: 0;
  transition: opacity 5s linear;
  i{
    width: 20%;
    margin: 2% 0 0 0;
    font-size: 2.4rem;
    color: #28807D;
  }

  ${props => props.isDisplayingGroup && props.group.id === props.currentGroup.id && css`
  opacity: 1;
`}
`
const ContactInfoContainer = styled.div`
  width: 70%
  display: flex;
  flex-wrap: wrap;
`
const IconContainer = styled.div`
  width: 100%;
  display: flex;
  i{
    width: 20%;
    font-size: 1.4rem;
    color: #AFC9D9;
    margin: 4px 0 0 24px;
  }
  `
const TabsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: 1rem;
    button{
      border: 1px solid #AFC9D9;
      border-radius: 10px 10px 0 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 5px 10px;
    }
`
const BtnContact1 = styled.button`
    border: 4px solid #28807D;
    padding: 3px 55px;
    border-radius: 9px;
    margin: 3% 0 0 1%;
    width: 50%;
`;