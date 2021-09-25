import React, { useState, useContext } from 'react';
import { DashboardContext } from '../../contexts/Contexts'
import { useForm } from 'react-hook-form';
import { Input, Textarea } from '@chakra-ui/core';
import { useAuth } from '../../contexts/auth';
import styled from 'styled-components';
import { convertEvents } from '../../utils/helperFunctions'

// this component is to edit individual event from calendar
const EditEventForm = props => {
    const { event, setIsEditing } = props

    const { setEventsUpdated, setEventDisplay } = useContext(DashboardContext);

    const { api } = useAuth();

    const { register, handleSubmit } = useForm();

    const [input, setInput] = useState({
        title: event.title,
        notes: event.notes,
        starttime: event.starttime.substring(0,5),
        endtime: event.endtime.substring(0,5),
        eventDate: event.start.dateTime.substring(0,10)
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    // handles cancel button - go back to event display
    const handleCancelButton = e => {
        e.preventDefault();
        setIsEditing(false);
    }

    // save event changes
    const handleSaveButton = async (e) =>{
        e.preventDefault();
        let date = new Date().toString().split("GMT");

        // takes the first few characters of offset with + or - to be slotted in the start and end times
        let zone = date[1].split(' ')[0].slice(0, 3);

        // converts events to user's timezone
        const newEvent = convertEvents([input.eventDate], input.starttime, input.endtime, zone, input.title, input.notes)[0];
        
        // edit the event through gapi
        await api.editEvent(event.id, newEvent);
  
        //necessary so that event is sent to api before the page reloads. As of now, page must reload to show new event list that contains the added events
        // setTimeout(()=>{window.location.reload(false)}, 500);
        await setEventsUpdated(true);
        setEventDisplay(false);
    }

    return (
        <EventForm>
            <form>
                <div>
                    <EventInfo>Event Name
                        <Input
                            type="text"
                            name="title"
                            placeholder="Event name"
                            ref={register({ maxLength: 80, required: true })}
                            style={{ marginBottom: '5%', background: "white", paddingLeft: '5%', fontSize: '1em' }}
                            value={input.title}
                            onChange={handleChange}
                        />
                    </EventInfo>
                </div>

                <div>
                    <EventInfo>Time
                    <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        paddingTop: '3%', paddingBottom: '3%', marginBottom: '1%'
                    }}>
                        <p style={{ paddingLeft: '5%', fontWeight: 'normal' }}>starts</p>
                        <Input
                            type="time"
                            name="starttime"
                            ref={register({ required: true })}
                            style={{ width: '65%', border: 'none', background: "white", paddingLeft: '5%', fontSize: '1em' }}
                            value={input.starttime}
                            onChange={handleChange}
                        />
                    </div>
                    <hr style={{ width: '90%', margin: "0 auto" }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '3%', marginBottom: '1%' }}>
                        <p style={{ paddingLeft: '5%', fontWeight: 'normal' }}>ends</p>
                        <Input
                            type="time"
                            name="endtime"
                            ref={register({ required: true })}
                            style={{ width: '65%', border: 'none', marginBottom: '3%', background: "white", paddingLeft: '5%', fontSize: '1em' }}
                            value={input.endtime}
                            onChange={handleChange}
                        />
                    </div>
                    </EventInfo>
                </div>

                <div>
                    <EventInfo>Notes
                        <Input
                            type="text"
                            name="notes"
                            placeholder="Event notes"
                            ref={register({ maxLength: 100 })}
                            style={{ marginBottom: '5%', background: "white", paddingLeft: '5%', fontSize: '1em', lineHeight: '1.5em' }}
                            value={input.notes}
                            onChange={handleChange}
                        />
                    </EventInfo>
                </div>

                <ButtonsDiv>
                    <SaveButton onClick={handleSaveButton} >Save</SaveButton>
                    <CancelButton onClick={handleCancelButton}>Cancel</CancelButton>
                </ButtonsDiv>

            </form>
        </EventForm>
    )
}

export default EditEventForm;

// Event Form styling

const EventForm = styled.div`
  font-size: 90%;
  background: #E0E0E0;
  display: flex;
  flex-direction: column;
`
const EventInfo = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 1.5em;
    line-height: 2em;
    color: #2E5780;
`

const ButtonsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 10% auto;
`
const SaveButton = styled.button`
    background: #FFFFFF;
    font-size: 1.2em;
    line-height: 2em;
    color: #28807D;
    padding: 2% 10%;
    border: 2px solid #28807D;
    box-sizing: border-box;
    border-radius: 15px;
`
const CancelButton = styled.button`
    background: #28807D;
    font-size: 1.2em;
    line-height: 2em;
    color: #FFFFFF;
    padding: 2% 10%;
    border: 2px solid #28807D;
    box-sizing: border-box;
    border-radius: 15px;
`