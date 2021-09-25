import React, {useState} from 'react';
import Groups from './Groups';
import CreateNewGroup from './CreateNewGroup';
import styled from 'styled-components';
import Contacts from '../contacts/Contacts';
import AdminAddContactForm from './AdminAddContactForm';
import EditGroupForm from './EditGroupForm';


const GroupsContainer = () => {
    const [showCreateNewGroup, setShowCreateNewGroup] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [showAdminAddContact, setShowAdminAddContact] = useState(false);
    const [showEditGroupForm, setShowEditGroupForm] = useState(false);

    const handleGroupsContainer = (e) => {
        e.stopPropagation();
    }

    return (
        <div onClick={(e) => handleGroupsContainer(e)}>
            <Groups setShowEditGroupForm={setShowEditGroupForm} />
            <AddGroupBtn onClick={() => setShowCreateNewGroup(true)}>Add group</AddGroupBtn>
            {showCreateNewGroup && <CreateNewGroup setShowContacts={setShowContacts} setShowCreateNewGroup={setShowCreateNewGroup} />}
            {showContacts && <Contacts setShowAdminAddContact={setShowAdminAddContact} />}
            {showAdminAddContact && <AdminAddContactForm setShowAdminAddContact={setShowAdminAddContact} /> }
            {showEditGroupForm && <EditGroupForm setShowEditGroupForm={setShowEditGroupForm} />}
        </div>
    )
}

export default GroupsContainer;



const AddGroupBtn = styled.div`
    margin: 0.5rem auto;
    cursor: pointer;
    width: 90%;
    color: #28807d;
    font-weight: bold;
    border: 2px solid  #28807d;
    border-radius: 0.5rem;
    text-align: center;
    padding: 0.25rem 1rem;
    font-size: 1rem;
`;



