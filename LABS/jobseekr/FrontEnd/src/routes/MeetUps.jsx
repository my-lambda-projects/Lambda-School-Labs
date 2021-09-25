import React, { Component } from 'react';
import { Button, Glyphicon, } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Header } from '../components/AllComponents';
import axios from 'axios';
import ROOT_URL from './config';
import 'react-datepicker/dist/react-datepicker.css';

class MeetUps extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dateOfEvent: moment(),
      eventName: '',
      linkToEvent: '',
      notes: '',
      token: localStorage.getItem('token'),
      meetups: [],
    };
  }
  componentDidMount() {
    this.getMeetups();
  }


  getMeetups = () => {
    const token = this.state.token;
    axios.get(`${ROOT_URL}/meetups`,
    {
      headers: {
        token
      }
    })
    .then(response => {
      const gotMeetups = response.data
        // added to sort the meetups by date.
        .sort((a, b) => a.dateOfEvent > b.dateOfEvent);
        // added to turn links to absolute urls
        gotMeetups.map(meetup => {
          let test1 = meetup.linkToEvent.substring(0,7);
          if (test1 !== "http://") {
              if (test1.match(/\//) && !test1.match(/:/)) {
                meetup.linkToEvent = meetup.linkToEvent.replace(/\/\//, "://")
              }
              if (!test1.match(/http/i)) {
                meetup.linkToEvent = "http://" + meetup.linkToEvent;
              }
              if (test1.match(/:\//) && !test1.match(/\/\//)) {
                meetup.linkToEvent = meetup.linkToEvent.replace(/:\//, "://")
              }
            } 
          return meetup;
        });
      this.setState({ meetups: gotMeetups });
    })
    .catch(err => console.log(err));
  }

  destroyMeetup = (e, id) => {
    e.preventDefault();
    let data = { id }
    axios.delete(`${ROOT_URL}/meetups`, { data })
    .then(() => {
      this.getMeetups();
    })
    .catch(err => console.log(err));
  }

  handleDateChange = (date) => {
    this.setState({
      dateOfEvent: date
    });
  }
  

  handleCreateMeetup = e => {
    e.preventDefault();
    let body = { ...this.state };
    axios
      .post(`${ROOT_URL}/meetups`, {
        dateOfEvent: body.dateOfEvent.format(),
        eventName: body.eventName,
        linkToEvent: body.linkToEvent,
        notes: body.notes,
        token: body.token,
      })
      .then(() => {
        this.getMeetups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // validateLink(link) {
  //   if (link.substring(0,6) === "http://") return 'success';
  //   else if (link.substring(0,7) === "https://") return 'success';
  //   else return 'warning;'
  // }

  render() {
    return (
      <div className="parent">
        <Header />
        <div className="MeetupsWrapper">
          <h1>MeetUps</h1>
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Activity | Link</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
            {this.state.meetups.length > 0 ? this.state.meetups.map((meetup) => {
              const id = meetup._id;
              return (
                  <tr key={id}>
                    <th scope="row">{meetup.dateOfEvent.substring(0,10)}</th>
                    <td>
                      {meetup.eventName}
                      <Button bsSize="small" className="meetups--btn">
                        <a href={meetup.linkToEvent} target="blank">
                          <Glyphicon glyph="link" />
                        </a>
                      </Button>
                    </td>
                    <td>{meetup.notes}</td>
                    <td>
                      <Button 
                        bsStyle="primary"
                        className="meetups--btn"
                        onClick={e => this.destroyMeetup(e, id)}
                        >
                        X
                      </Button>
                    </td>
                  </tr>
                )
              }) : null}
              </tbody>
            </table>
          <form>
            <div className="form-row">
              <div className="form-col">
              <Glyphicon glyph="calendar" /> &nbsp;
              <DatePicker
                  className="form-control"
                  selected={this.state.dateOfEvent}
                  onChange={this.handleDateChange}
                  />
              </div>
              <div className="form-col">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Activity" 
                  onChange={e => this.setState({ eventName: e.target.value })}
                  /> &nbsp;
                <input 
                  type="text"
                  className="form-control" 
                  placeholder="Link" 
                  onChange={e => this.setState({ linkToEvent: e.target.value })}
                    />
              </div>
              <div className="form-col">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Notes" 
                  onChange={e => this.setState({ notes: e.target.value })}
                  />
                <Button 
                  bsStyle="primary"
                  onClick={e => this.handleCreateMeetup(e)}
                  className="meetups--btn"
                  >
                  <Glyphicon glyph="plus" className="meetups--btn__plus"/>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MeetUps;
