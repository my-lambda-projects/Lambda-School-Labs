import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import './styles/CalendarEvent.sass';
import {clickedDate} from '../actions/actions.js'
import EditScheduleForm from './EditScheduleForm';
import './styles/ScheduleForm.sass';



import Checkbox from './Checkbox.jsx'
import EventItem from './EventItem.js'


import './styles/ScheduleView.sass'

class EventGroup extends Component {
  state = {
    
  };

  Update = () => {
    this.forceUpdate()
  }

  // exerciseReplace = () => {
  //   this.props.exerciseProp.map( exer => {return this.props.exercises.filter( EXERCISE => {return EXERCISE.id === exer.id}  ) })
  //   }

  handleEditEvent = (e) => {
    e.preventDefault();
    this.props.clickedDate(moment(Date.now()).format());
  };
  

  render() {


  let final = this.props.exerciseProp.map( exer => {
    
    return this.props.exercises.filter( EXERCISE => {return EXERCISE.id === exer.id}  )[0] })


    return (
        
        <div className='event-all'>
        <EditScheduleForm exercises={this.props.exercises} dateClicked={this.props.dateClicked} categories={this.props.categories} className="editScheduleForm" />        {/* <h1 className='cat'>{this.props.item["category"]}</h1> */}

        <div className='event-group'>
        <div className="schedule-header">
       <p className="head">{this.props.title}</p>
       <p className="head">{moment(this.props.time).format("h:mm a")}</p>
        </div>
        <div className="scheduled">

       {final.map((exercise) => {
          return <EventItem key={exercise.id} category={this.props.category} onClick={this.Done} Update={this.Update} item={exercise} />

       })}
        </div>
        </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    error: state.error,
    events: state.events,
    byDate: state.byDate,
    exercises: state.exercises,
    dateClicked: state.dateClicked,
    categories: state.categories
  };
};

export default connect(mapStateToProps, {clickedDate})(EventGroup);
