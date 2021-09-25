import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { Navbar, NavbarBrand } from 'mdbreact';

import './css/events.css';

class NewEventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LinkContainer exact to="/events/new">
        <div className="eventCard--Container">
          <Navbar className="eventCard--box_navbar" dark>
            <NavbarBrand tag="span">Add Event</NavbarBrand>
          </Navbar>

          <div className="eventCard--Body">
            <FontAwesomeIcon size="5x" icon={faPlusCircle} />
          </div>
        </div>
      </LinkContainer>
    );
  }
}

export default NewEventCard;
