import React, {useEffect, useState, useContext} from 'react';
import {Context} from '../../contexts/Contexts'
import styled from 'styled-components'
import { useAuth } from '../../contexts/auth';
import {convertTime, handleDelete, deleteTemplate} from '../../utils/helperFunctions'
import './ChooseDateForm.css'


const ChooseDateForm = ({starttime, endtime, title, id, group}) => {


  const { setTemplateIdToUpdate, templateList, setFormOpen, setTemplateFormOpen, conStart, conEnd, setSelected, setToggleNav, setNavState, setConStart, setConEnd, setTitle, setTemplateList} = useContext(Context);

  const { googleApi} = useAuth();
  const { currentUser } = googleApi;


  const clearSelected = () => {
    setSelected([]);
  }


  //sets the title and time displayed on event page
  useEffect(()=>{
    setTitle(title);
    if (starttime){
      setConStart(convertTime(starttime))
    }
    if (endtime){
      setConEnd(convertTime(endtime))
    }
  },[starttime, endtime])
  

  //sets the title and starttime of the event actually being applied
  const handleCalendarView = () =>{
    setTitle(title);
    if (starttime){
      setConStart(starttime)
    }
    if (endtime){
      setConEnd(endtime)
    }
    setNavState(0)
    setTemplateFormOpen(true)
    setFormOpen(true)
    setToggleNav(false)
  }

  //sets state based on whether user has long-pressed an event (to delete)
  const [del, setDel] = useState(false)

  //controls classlist for the event object to control the red highlight transition
  const [eventClass, setEventClass] = useState('')

  //controls the hiding and showing of the actual delete button through toggling a class
  const [delClass, setDelClass] = useState('hide')

  //long-touch to delete an event
  const handleTouch = e => {
    e.stopPropagation()
    setTimeout(()=>{setDel(!del)
      if(!del){
        setEventClass('deleting')
        setDelClass('show')
      } else {
        setEventClass('')
        setDelClass('hide')
      }

    },1000)
    
  }

 

  //stops a tap/click on delete button from re-routing immediately to date selection, and deletes the event template
  const handleDeleteClick = e => {
    e.stopPropagation();
  
    handleDelete(id, currentUser, deleteTemplate, templateList, setTemplateList, clearSelected, setTemplateFormOpen);
    
  }

  const handleUpdate = e => {
    e.stopPropagation();
    setNavState(4);
    setTemplateIdToUpdate(id);
  }

  console.log('group', group);


  return (
    <Container className={eventClass} onTouchStart={handleTouch} onContextMenu={(e)=> e.preventDefault()}>     
      <EventDiv>
        <Title style={{color: group.groupColor}}>
          <span><i class={group.groupIcon} /></span>
           {title}
        </Title>
        <Time fontSize="m" fontWeight="normal">
          {convertTime(starttime)}-{convertTime(endtime)}
        </Time>        
      </EventDiv>

      <ButtonsDiv>
        <EditBtn type="button" onClick={handleUpdate}>Edit</EditBtn>
        <DeleteBtn type="button" onClick={handleDeleteClick}>Delete</DeleteBtn>
      </ButtonsDiv>

      <ArrowDiv onClick={handleCalendarView}>
        >
      </ArrowDiv>
    </Container>
  );
};



export default ChooseDateForm;

const Container = styled.div`
    width: 100%;
    display: flex;
    border-bottom: 1px solid #BDBDBD;
    padding: 2% 3%;
    justify-content: space-between;
`;

const EventDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    width: 40%;
    -moz-user-select: none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   -ms-user-select: none;
   user-select: none;
`;

const Title = styled.p`
    font-weight: bold;
    font-size: 1rem;
`;

const Time = styled.p`
    font-weight: bold;
    font-size: .75rem;
`;

const ButtonsDiv = styled.div`
    width: 40%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
`

const ArrowDiv = styled.div`
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 210%;
    color: #BDBDBD;
    cursor: pointer;
    &:hover{
      color: #28807D;
    }
`;

const EditBtn = styled.div`
color: #28807D;
background-color: white;
font-size: 1em;
width: 9em;
text-align: center;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid #28807D;
border-radius: 1em;
&:hover{
  cursor: pointer;
}
`;

const DeleteBtn = styled.div`
color: white;
background-color: #28807D;
font-size: 1em;
width: 9em;
text-align: center;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid #28807D;
border-radius: 1em;
&:hover{
  cursor: pointer;
}
`;