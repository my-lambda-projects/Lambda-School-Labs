import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../contexts/Contexts';
import Dashboard from './Dashboard';
import Events from '../events/Events';
import Nav from '../navigation/Nav';
import NewEventForm from '../events/NewEventForm';
import UpdateEventForm from '../events/UpdateEventForm';
import Groups_Contacts from '../groups/Groups_Contacts';
import CreateNewGroup from '../groups/CreateNewGroup';
import InviteeAddContactForm from '../groups/InviteeAddContactForm';
import EditGroupForm from '../groups/EditGroupForm';
import AdminAddContactForm from '../groups/AdminAddContactForm';
import InviteLink from '../groups/InviteLink';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { useAuth } from '../../contexts/auth';
import styled from 'styled-components';
import useWindowDimensions from '../../hooks/useWindowDimensions.js';

//gets list of templates from backend
const getTemplateList = async ({ googleId, token }) => {

  console.log('googleId: ', googleId, 'token: ', token);

  try {
    const response = await axiosWithAuth(token).get(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${googleId}`
    );
    return response.data.templates;
  } catch (error) {
    console.log(error);
  }
};

const Home = () => {
  // 0 = calendar, 1 = events, 2 = groups, 5 = createNewGroup,
  const [navState, setNavState] = useState(0);

  //deals with toggling event selection mode
  const [formOpen, setFormOpen] = useState(false);
  const [templateFormOpen, setTemplateFormOpen] = useState(false);

  //list of event templates from backend
  const [templateList, setTemplateList] = useState([]);

  const [groupList, setGroupList] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({});
  const [viewContacts, setViewContacts] = useState([]);

  //holds the start and end time of currently selected event.
  const [conStart, setConStart] = useState('');
  const [conEnd, setConEnd] = useState('');

  //holds the current title (event name)
  const [title, setTitle] = useState('');

  //holds the current notes (event description)
  const [notes, setNotes] = useState('');

  //toggles whether the nav is shown or not, also controls the confirm dates button
  const [toggleNav, setToggleNav] = useState(true);

  //holds dates selected before confirming and sending to calendar api
  const [selected, setSelected] = useState([]);

  //controls state of nav button colors
  const [colors, setColors] = useState(['#999898', '#999898', '#999898']);

  // holds the id of the template to update
  const [templateIdToUpdate, setTemplateIdToUpdate] = useState(null);

  // holds the admin Info
  const [adminInfo, setAdminInfo] = useState({});

  // holds window dimentions
  const { height, width } = useWindowDimensions();

  //changes the color of the nav icons depending on which components are rendered
  useEffect(() => {
    let newColors = [...colors];
    newColors[newColors.indexOf('#28807D')] = '#BDBDBD';
    newColors[navState] = '#28807D';
    setColors(newColors);
  }, [navState]);

  //google OAuth2
  const { googleApi, api } = useAuth();
  const { currentUser } = googleApi;

  // gets adminId from backend
  useEffect(() => {
    (async () => {
      let adminDetails = await {
        name: currentUser.name,
        email: currentUser.email,
        googleId: currentUser.googleId
      };
      axiosWithAuth(currentUser.token)
        .post('/api/admin', adminDetails)
        .then(res => {
          setAdminInfo({ ...adminDetails, adminId: res.data.adminId });
        })
        .catch(err => {
          console.log('error in fetching adminId', err);
        });
    })();
  }, [currentUser]);

 
  //fetches list of groups for current user
  const getGroupList = () => {
    let sortedGroupList = [];
    axiosWithAuth(currentUser.token)
      .get(`/api/groups/${adminInfo.adminId}`)
      .then(res => {
        sortedGroupList = [...res.data.groups];
        sortedGroupList.sort((a, b) => {
          let nameA = a.groupName.toUpperCase();
          let nameB = b.groupName.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        setGroupList([...sortedGroupList]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //fetches a particular group's data
  const fetchGroupData = (groupId, adminId, token) => {
    let sortedGroupContacts = [];
    axiosWithAuth(token)
      .get(`/api/groups/${adminId}/${groupId}`)
      .then(async res => {
        sortedGroupContacts = [...res.data.contacts];
        await sortedGroupContacts.sort((a, b) => {
          let groupA = a.firstName.toUpperCase();
          let groupB = b.firstName.toUpperCase();
          if (groupA < groupB) {
            return -1;
          }
          if (groupA > groupB) {
            return 1;
          }
          return 0;
        });
        setCurrentGroup({ ...res.data, contacts: [...sortedGroupContacts] });
      })
      .catch(err => {
        console.log('Error', err);
      });
  };

  useEffect(() => {
    getGroupList();
  }, [adminInfo]);

  //gets list of templates from backend when the user or date selection mode has changed, may be unnecessary given new organization of components
  useEffect(() => {
    (async () => {
      const templates = await getTemplateList(currentUser);
      setTemplateList(templates);
    })();
  }, [currentUser, formOpen]);

  return (
    <Div>
      <Context.Provider
        value={{
          navState,
          width,
          groupList,
          setGroupList,
          getGroupList,
          fetchGroupData,
          currentGroup,
          adminInfo,
          formOpen,
          colors,
          setFormOpen,
          setTemplateFormOpen,
          templateFormOpen,
          conStart,
          conEnd,
          title,
          notes,
          selected,
          setSelected,
          toggleNav,
          setToggleNav,
          setNavState,
          setConStart,
          setConEnd,
          setTitle,
          setNotes,
          templateList,
          setTemplateList,
          templateIdToUpdate,
          setTemplateIdToUpdate,
          viewContacts,
          setViewContacts
        }}
      >
        {navState === 0 && <Dashboard />}

        {navState === 1 && <Events />}

        {navState === 2 && <Groups_Contacts />}

        {navState === 3 && <NewEventForm />}

        {navState === 4 && <UpdateEventForm />}

        {navState === 5 && <CreateNewGroup />}

        {navState === 6 && <AdminAddContactForm />}

        {navState === 7 && <InviteLink />}

        {navState === 8 && <EditGroupForm />}

        {navState === 9 && <AdminAddContactForm />}

        {toggleNav && <Nav />}
      </Context.Provider>
    </Div>
  );
};

export default Home;

const Div = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
