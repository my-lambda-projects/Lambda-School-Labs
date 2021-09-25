import React, { useState, useContext } from 'react';
import { Context } from '../../contexts/Contexts';
import { useForm } from 'react-hook-form';
import { Input } from '@chakra-ui/core';
import { useAuth } from '../../contexts/auth';
import styled from 'styled-components';
import { addTemplate } from '../../utils/helperFunctions';
import { useToasts } from 'react-toast-notifications';

//style
const size = {
  tablet: '768px',
  desktop: '1024px'
};
const device = {
  desktop: `(min-width: ${size.desktop})`
};

const EventForm = styled.div`
  //border: 5px solid blue;
  background-color: #e5e5e5;
  width: 100%;
  height: 100vh;
  @media ${device.desktop} {
    background-color: white;
  }
`;

const NewEventForm = props => {
  const {
    formOpen,
    setTemplateList,
    templateList,
    setToggleNav,
    setNavState,
    setTitle,
    setNotes,
    setConStart,
    setConEnd,
    setTemplateFormOpen,
    setFormOpen,
    groupList,
    width
  } = useContext(Context);

  const { googleApi } = useAuth();
  const { currentUser } = googleApi;
  const { register, handleSubmit } = useForm();
  const [input, setInput] = useState({
    title: '',
    notes: '',
    starttime: '',
    endtime: '',
    groupId: ''
  });
  const { addToast } = useToasts();

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  // Submit for template form
  const onSubmit = async formData => {
    addToast('Event created. Pick dates on the calendar to apply the event.', {
      appearance: 'info',
      autoDismiss: true,
      autoDismissTimeout: 6000
    });
    setToggleNav(false);
    setTemplateFormOpen(true);
    setFormOpen(true);
    setTitle(input.title);
    setNotes(input.notes);
    setConStart(input.starttime);
    setConEnd(input.endtime);
    setNavState(0);

    const template = addTemplate(formData, currentUser);
    console.log('formData', formData);
    console.log('template', template);
    console.log('templateList', templateList);
    // console.log('destructured template list', [...templateList]);
    setTemplateList([...templateList, template]);
    setFormOpen(!formOpen);
  };

  return (
    <EventForm>
      <div
        style={{
          background: 'white',
          marginBottom: '5%',
          paddingTop: '8%',
          paddingBottom: '4%',
          display: 'flex',
          width: '100%'
        }}
      >
        <p
          style={{ paddingLeft: '2%', color: '#28807D', cursor: 'pointer' }}
          onClick={() => {
            setNavState(0);
            props.setShowAddEventForm && props.setShowAddEventForm(false);
          }}
        >
          Cancel
        </p>
        <h2 style={{ textAlign: 'right', position: 'relative', left: '30%' }}>
          New event
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div style={{ paddingLeft: '5%' }}>Event name</div>
          <Input
            type="text"
            name="title"
            placeholder="Event name"
            ref={register({ maxLength: 80, required: true })}
            style={{
              marginBottom: '5%',
              background: 'white',
              paddingLeft: '5%'
            }}
            value={input.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <div style={{ paddingLeft: '5%' }}>Notes</div>
          <Input
            type="text"
            name="notes"
            placeholder="Event notes"
            ref={register({ maxLength: 100 })}
            style={{
              marginBottom: '5%',
              background: 'white',
              paddingLeft: '5%'
            }}
            value={input.notes}
            onChange={handleChange}
          />
        </div>

        <div
          style={{
            background: 'white',
            borderBottom: '1px solid #28807D'
          }}
        >
          <div style={{ paddingLeft: '5%', background: '#E5E5E5' }}>Time</div>
          <div
            style={{
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '3%',
              paddingBottom: '3%',
              marginBottom: '1%'
            }}
          >
            <p style={{ paddingLeft: '5%' }}>starts</p>
            <Input
              type="time"
              name="starttime"
              ref={register({ required: true })}
              style={{
                width: '65%',
                //border: 'none',
                background: 'white',
                paddingLeft: '5%'
              }}
              value={input.starttime}
              onChange={handleChange}
            />
          </div>
          <hr style={{ width: '90%', margin: '0 auto' }} />
          <div
            style={{
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '3%',
              marginBottom: '1%'
            }}
          >
            <p style={{ paddingLeft: '5%' }}>ends</p>
            <Input
              type="time"
              name="endtime"
              ref={register({ required: true })}
              style={{
                width: '65%',
                border: 'none',
                marginBottom: '3%',
                background: 'white',
                paddingLeft: '5%'
              }}
              value={input.endtime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div style={{ marginTop: '5%', background: 'white' }}>
          <div style={{ paddingLeft: '5%', background: '#E5E5E5' }}>
            Add Groups
          </div>
          {/* <Label htmlFor="groupId">Add Groups</Label> */}
          <select
            onChange={handleChange}
            name="groupId"
            id="groupId"
            ref={register({ required: false })}
            style={{
              width: '100%',
              border: 'none',
              background: 'white',
              padding: '5%'
            }}
          >
            <option value="">Choose Group</option>
            {groupList.map(g => {
              return <option value={g.id}> {g.groupName} </option>;
            })}
          </select>
        </div>

        <div style={{ width: '100%', textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              width: '70%',
              background: '#28807D',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              marginTop: '8%',
              marginBottom: '8%',
              padding: '4%',
              borderRadius: '10px'
            }}
          >
            Select dates
          </button>
        </div>
      </form>
    </EventForm>
  );
};

export default NewEventForm;
