import React, { useState, useEffect, useContext } from 'react';
import TemplateContainer from './TemplateContainer.js';
import styled from 'styled-components';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { useAuth } from '../../contexts/auth';
import { Context } from '../../contexts/Contexts';

//gets template list from backend
const getTemplateList = async ({ googleId, token }) => {
  try {
    const response = await axiosWithAuth(token).get(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${googleId}`
    );
    return response.data.templates;
  } catch (error) {
    console.log(error);
  }
};

const Events = () => {
  const { formOpen, setTemplateList } = useContext(Context);
  const { googleApi, api } = useAuth();
  const { currentUser } = googleApi;

  useEffect(() => {
    (async () => {
      const templates = await getTemplateList(currentUser);
      setTemplateList(templates);
    })();
  }, [currentUser, formOpen]);

  //???
  const [events, setEvents] = useState(null);

  // get events from api and set to state
  useEffect(() => {
    (async () => {
      try {
        const data = await api.listEvents();
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [api]);

  return (
    <Fixed>
      <TemplateContainer />
    </Fixed>
  );
};

export default Events;

const Fixed = styled.div`
  border: 5px black;
`;
