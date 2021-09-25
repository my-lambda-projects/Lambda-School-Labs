import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand } from 'mdbreact';
import PropTypes from 'prop-types';
import { getEvent, getGroups, getPartGroups } from '../actions';
import './css/events.css';
import normalizeDate from './normalizers/normalizeDate';

/* eslint-disable no-console */

class EventCard extends Component {
  static defaultProps = {
    inviteCode: undefined,
  }
  constructor(props) {
    super(props);
    const { id } = props;
    this.state = { id };
    console.log(`EventCard id ${id} activated: ${props.activated}`);
  }

  componentDidMount() {
  }

  render() {
    // console.log(`eventCard pre-render return id ${this.state.id}`);
    const admin = (Number(sessionStorage.getItem('id')) === this.props.owner) ? 1 : 0;
    const queryRoute = `/events/details?eventId=${this.props.id}&admin=${admin}`;
    return (
      <LinkContainer
        exact
        to={queryRoute}
        onClick={() => {
          sessionStorage.setItem('eventId', this.state.id); // not used for EventDetail
          console.log(`EventCard click eventId ${this.state.id}`);
          this.props.setEvent(this.state.id);
          this.props.setGroups(this.state.id);
          this.props.setParts(this.state.id);
          this.props.reload('EventCard');
        }}
      >
        <div className="eventCard--Container">
          {process.env.REACT_APP_ShowEventId === 'true' &&
          <h2>eventId: {this.state.id} admin: {admin} </h2>
          }
          <Navbar className="eventCard--box_navbar" dark>
            <NavbarBrand tag="span">{this.props.title}</NavbarBrand>
          </Navbar>

          {/* <div className="eventCard--Title"></div> */}
          <div className="eventCard--Date">{normalizeDate(this.props.eventDate)}<br />
            {/* Active Status: {this.props.title === true ? "TRUE" : "FALSE"} */}
          </div>
          {this.props.inviteCode &&
          <div className="eventCard--Invite">Event Invite Code {this.props.inviteCode}</div>
          }
        </div>
      </LinkContainer>
    );
  }
}

EventCard.propTypes = {
  reload: PropTypes.func.isRequired,
  setEvent: PropTypes.func.isRequired,
  setGroups: PropTypes.func.isRequired,
  setParts: PropTypes.func.isRequired,
  eventDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  inviteCode: PropTypes.string,
  id: PropTypes.number.isRequired,
  owner: PropTypes.number.isRequired,
  activated: PropTypes.bool.isRequired,
};

// export default EventCard;
const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  setEvent: id => dispatch(getEvent(id, 1)),
  setGroups: id => dispatch(getGroups(id)),
  setParts: id => dispatch(getPartGroups(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
