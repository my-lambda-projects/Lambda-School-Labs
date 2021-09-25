import React, { Component } from 'react';
import { getData, postCategory, postExercise } from '../actions/actions';
import { connect } from 'react-redux';
import './styles/ScheduleForm.sass';
import Checkbox from './Checkbox.jsx';
import { closedEventForm, eventScheduled } from '../actions/actions.js';
import moment from 'moment';
import CalendarEvents from './CalendarEvents';

class ScheduleForm extends Component {
  state = {
    allDay: { name: 'allDay', checked: false },
    categoryId: 1,
    title: this.props.categories[0].categoryName,
    start: this.props.dateClicked,
    end: this.props.dateClicked,
    exercises: [...this.props.exercises]
  };

  closeHandler = e => {
    e.preventDefault();
    this.props.closedEventForm();
  };
  // changeHandler = e => {
  //   console.log('event value:', e.target.value);
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // selectChange = e => {
  //   document.getElementById('myText').value = e.target.value;
  // };

  changedCategory = e => {
    this.setState({
      categoryId: Number(e.target.options[e.target.selectedIndex].value),
      title: e.target.options[e.target.selectedIndex].getAttribute(
        'categoryname'
      )
    });
    // console.log(this.props.categories[0].categoryName);
  };

  inputHandler = event => {
    let value = event.target.value;
    let property = event.target.dataset.property;
    let date = this.props.dateClicked.replace(
      this.props.dateClicked.substring(11),
      moment(value, 'h:mm a')
        .format()
        .substring(11, 19)
    );
    this.setState({ [property]: date });
  };

  Update = () => {
    this.forceUpdate();
  };

  sendData = e => {
    console.log(this.props.events);

    let selectedExercises = this.state.exercises.filter(exercise => {
      return exercise.checked === true;
    });
    e.preventDefault();
    this.setState({
      exercises: selectedExercises,
      allDay: this.state.allDay.checked
    });
    let packagedEvent = {
      title: this.state.title,
      start: this.state.start,
      end: this.state.end,
      allDay: this.state.allDay.checked,
      exercises: selectedExercises
    };
    console.log(packagedEvent);
    this.props.events.push(packagedEvent);
    console.log(this.props.events);

    this.props.eventScheduled(this.props.events);
  };

  render() {
    const { data } = this.props;
    const { grabbedCategory } = this.state;

    return (
      <div className='component-container events-form'>
        <form className='form-container' onSubmit={this.submitHandler}>
          <button className='closeButton' onClick={this.closeHandler}>
            X
          </button>
          <label className='events-heading'>Schedule An Event</label>
          <div className='allDay' onClick={this.Selected}>
            <Checkbox
              name={'All Day'}
              Update={this.Update}
              item={this.state.allDay}
              Selected={this.Selected}
            />
          </div>
          <input
            type='text'
            onChange={this.inputHandler}
            disabled={this.state.allDay.checked}
            data-property='start'
            placeholder='Start Time'
          />
          <input
            type='text'
            onChange={this.inputHandler}
            disabled={this.state.allDay.checked}
            data-property='end'
            placeholder='End Time'
          />
          <select name='' onChange={this.changedCategory}>
            {this.props.categories.map(category => {
              return (
                <option
                  key={category.id}
                  value={category.id}
                  categoryname={category.categoryName}
                >
                  {category.categoryName}
                </option>
              );
            })}
          </select>
          {this.props.exercises
            .filter(exercise => {
              return exercise.categoryId === this.state.categoryId;
            })
            .map((item, index) => {
              return (
                <div key={item + index} className='event-full'>
                  <Checkbox
                    Update={this.Update}
                    name={item.exerciseName}
                    item={item}
                    value={this.sendOff}
                  />
                </div>
              );
            })}

          <button onClick={this.sendData} className='submit' type='text'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    error: state.error,
    fetchingUsers: state.fetching,
    categories: state.categories,
    exercises: state.exercises,
    dateClicked: state.dateClicked,
    events: state.events
  };
};

export default connect(
  mapStateToProps,
  { closedEventForm, eventScheduled }
)(ScheduleForm);
