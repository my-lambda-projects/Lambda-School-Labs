import React from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
// import parseQueryString from 'query-string';
import { Navbar, NavbarBrand } from 'mdbreact';
import PropTypes from 'prop-types';
// import TextField from 'material-ui/TextField';


import { TextField } from 'material-ui';
import Billing from './stripe';
import { getEvent, getGroups, getPartGroups, getUser, clearStripeError } from '../actions';
import RenderGroups from './EventDetailGroups';
import './css/eventDetail.css';
import normalizeDate from './normalizers/normalizeDate';

/* eslint-disable react/forbid-prop-types */

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    floatingLabelText={label}
    floatingLabelFocusStyle={{
      color: 'black',
    }}
    underlineFocusStyle={{
      borderColor: 'white',
    }}
    underlineStyle={{
      borderColor: 'grey',
    }}
    errorText={touched && error}
    {...input}
    {...custom}
    style={{
      color: 'red',
    }}
  />
);
renderTextField.defaultProps = {
  meta: { touched: PropTypes.bool, error: PropTypes.string },
  label: '',
};
renderTextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
};

/* eslint-disable react/prop-types, no-console, no-param-reassign,
        jsx-a11y/no-noninteractive-element-interactions */
/*

     tbl.increments('id').primary(); // primary key
        tbl.integer('eventId').references('id').inTable('events');
        tbl.string('name',100).notNullable();
        tbl.dateTime('time').notNullable();
        tbl.boolean('completed').notNullable().defaultTo(false);
*/

/*
    return knex.schema.createTable('events', function(tbl) {
      tbl.increments('id').primary(); // primary key
      tbl
        .integer('owner')
        .references('id')
        .inTable('users');
      tbl.string('title', 100).notNullable();
      tbl.dateTime('eventDate').notNullable();
      tbl.boolean('activated').notNullable().defaultTo(false);
      tbl.boolean('completed').notNullable().defaultTo(false);
    });
*/
const nomalizeEventDate = (event) => {
  if (event && event.eventDate) {
    const newDate = normalizeDate(event.eventDate);
    // console.log(`eventDate: ${event.eventDate} newDate: ${newDate}`);
    if (newDate) {
      event.formattedDate = newDate;
      // console.log(`set formattedDate: ${event.formattedDate}`);
    }
  }
  return event;
};
class EventsForm extends React.Component {
  constructor(props) {
    super(props);
    const queryString = props.location.search;
    // "?eventId=1&admin=1"
    const queryParams = queryString.match(/eventId=(\d+)&admin=(\d+)/);
    /* eslint-disable prefer-destructuring */
    this.state = {
      eventId: Number(queryParams[1]),
      admin: Number(queryParams[2]),
    };
    this.props.setUser(); // restore global state user after reset
    this.props.clearStripeError();
  }
  componentWillMount() {
  //   clearInterval(this.timerID);

    const { eventId } = this.state;
    // console.log(`EventsForm componentDidMount eventId ${eventId} admin ${admin}`);
    this.props.load(eventId);
    this.props.setGroups(eventId);
    this.props.setPart(eventId);
  }
  // componentDidUpdate() {
  //   console.log(`componentDidUpdate props error: ${this.props.error}
  //   state error ${this.state.error}`);
  // }
  renderAlert() {
    if (!this.props.error) return null;
    return <h3 className="error">{this.props.error}</h3>;
  }
  // tick = () => {
  //   console.log(`in tick title: ${this.props.event.title}`);
  //   const newEvent = nomalizeEventDate(this.props.event);
  //   this.props.changeFieldValues('eventdetail', {
  //     // event: {
  //     title: newEvent.title,
  //     formattedDate: newEvent.formattedDate,
  //     keepDirty: false,
  //     // },
  //     // initialValues: { event: nomalizeEventDate(this.props.event) },
  //   });
  //   this.props.changeFieldValues('eventdetailGroups', {
  //     groupFA: this.props.loadRowData(this.props.groups, this.props.partGroups),
  //   });

  //   // const iresult = initialize('eventdetail', {
  //   //   title: newEvent.title,
  //   //   formattedDate: newEvent.formattedDate,
  //   //   keepDirty: false,
  //   // });
  //   // console.log(`iresult: ${JSON.stringify(iresult, null, 2)}`);
  // };
  render() {
    // console.log(`showEventId ${JSON.stringify(process.env, null, 2)}`);
    // const { load } = this.props;
    const { eventId, admin } = this.state;
    const loading = (sessionStorage.getItem('loading') === 'true');

    // if (eventId > 0) this.props.load(eventId);
    // console.log(`event ${JSON.stringify(event)}`);
    return (
      <div className="eventDetail--container">
        {loading &&
          <div>Loading...</div>
          }
        <div className="eventDetail--form_container">
          <Navbar className="eventDetail--box_navbar" dark>
            <NavbarBrand tag="span">Event Info</NavbarBrand>
          </Navbar>
          {process.env.REACT_APP_ShowEventId === 'true' &&
            <div>
              <Field
                name="event.id"
                type="number"
                component={renderTextField}
                placeholder="id"
                readOnly="true"
              />
              <Field
                name="event.activated"
                type="bool"
                component={renderTextField}
                placeholder="activated"
                readOnly="true"
              />
            </div>
          }
          <div className="eventDetail--box_content">
              Event Name:{'  '}
            <Field
              name="event.title"
              type="text"
              component={renderTextField}
              placeholder="title"
              readOnly="true"
              className="primary-data"
            />
            <br />
              Event Date:{'  '}
            <Field
              name="event.formattedDate"
              type="text"
              component={renderTextField}
              placeholder="Event Date"
              readOnly="true"
              className="primary-data"
            />
          </div>
        </div>
        {!loading &&
        <div className="eventDetail--form_container">
          <Navbar className="eventDetail--box_navbar" dark>
            <NavbarBrand tag="span">Group Info</NavbarBrand>
          </Navbar>
          <RenderGroups
            activated={this.props.initialValues.event.activated}
            eventId={eventId}
            admin={admin}
            history={this.props.history}
          />
        </div>
        }
        {admin > 0 && (
          <div className="eventDetail--form_container">
            <Navbar className="eventDetail--box_navbar" dark>
              <NavbarBrand tag="span">Event Status</NavbarBrand>
            </Navbar>
            <br />
            <div className="eventDetail--box_content">
              {/* Display stripe payment box if event isn't activated */}

              {this.props.initialValues.event.activated === true ? (
                <div className="eventDetail--activated">ACTIVATED Invite Code {this.props.initialValues.event.inviteCode}</div>
              ) : (
                <Billing eventId={eventId} />
              )}
            </div>
          </div>
        )}
        {this.renderAlert()}
      </div>
    );
  }
}


// EventsForm.propTypes = {
//   // loadEvent: PropTypes.func.isRequired,
// };

const EventDetail = reduxForm({
  form: 'eventdetail', // a unique identifier for this form
  touchOnBlur: true,
  enableReinitialize: true,
  keepDirty: true,
})(EventsForm);
// export default EventDetail;
const fiveLenthDate = (groups, partGroups) => groups.map((group) => {
  const userId = Number(sessionStorage.getItem('id'));
  const partIndex = partGroups.findIndex(partGroup =>
    (partGroup.groupId === group.id) &&
        (partGroup.userId === userId));

  const partGroup = (partIndex >= 0 ? partGroups[partIndex] : undefined);

  // this.setState({
  //   group: { ...group, partGroup },
  // });
  const checked = (partIndex >= 0);
  const { time, ...rest } = group;
  // if (checked) {
  //   console.log(`partIndex: ${partIndex} partGroups.length: ${state.partGroups.length}
  //     partGroup.groupId ${partGroup ? partGroup.groupId : null} group.id ${group.id}
  //     group.name |${group.name}| checked ${checked} `);
  // }
  //  else {
  //   console.log(`group ${group.id} |${group.name}| is unchecked`);
  // }
  // rest.time = time.substring(0, 5);
  return {
    ...rest, time: time.substring(0, 5), checked, partGroup,
  };
});
export default connect(
  state => ({
    initialValues: { event: nomalizeEventDate(state.event) },
    loadRowData: (groups, partGroups) => fiveLenthDate(groups, partGroups),
    groups: state.groups,
    partGroups: state.partGroups,
    error: state.stripeError,
  }),
  dispatch => ({
    load: eventId => dispatch(getEvent(eventId, 1)),
    // setEvent: id => dispatch(getEvent(id, 1)),
    setGroups: id => dispatch(getGroups(id)),
    setPart: eventId => dispatch(getPartGroups(eventId)),
    setUser: () => dispatch(getUser()),
    clearStripeError: () => dispatch(clearStripeError()),
    changeFieldValues: (formName, data) =>
      dispatch(initialize(formName, data)),
  }),
)(EventDetail);
// export default connect(state => ({
//   initialValues: { event: state.event },
// }), { load: eventId => getEvent(eventId) })(EventDetail);
