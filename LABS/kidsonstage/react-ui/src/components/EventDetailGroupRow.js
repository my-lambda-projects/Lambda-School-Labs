import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { TextField } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faEdit,
  faFlagCheckered,
} from '@fortawesome/fontawesome-free-solid';
import formatTime from './normalizers/normalizeTime';

// import completedBI from './graphics/completed.png';
// import pencilBI from './graphics/pencil.png';
// import trashBI from './graphics/trash.png';
import {
  addGroup,
  editGroup,
  deleteGroup,
  addPartGroup,
  deletePartGroup,
  editPartGroup,
  // getPartGroups,
} from '../actions';

import AxiosPromise from './axiosPromise';
import './css/eventDetail.css';
/* eslint-disable react/forbid-prop-types, no-console, no-nested-ternary,
    jsx-a11y/no-static-element-interactions */
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

const renderTextFieldTime = ({
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
    {...custom}
    errorText={touched && error}
    {...input}
    {...custom}
    style={{
        color: 'red',
        width: '50px',
        marginLeft: '20px',
        textDecoration: 'line-through',
      }}
  />
);
renderTextFieldTime.defaultProps = {
  meta: { touched: PropTypes.bool, error: PropTypes.string },
  label: '',
};
renderTextFieldTime.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
};

const tab = (e) => {
  if (e.which === 13) {
    e.target.nextSibling.focus();
    e.preventDefault();
  }
};

class EventDetailGroupRow extends Component {
  constructor(props) {
    super(props);
    const ng = Number(sessionStorage.getItem('pushingNewGroup')) === 1;
    sessionStorage.setItem('pushingNewGroup', 0);
    const thisGroup = !ng ? this.props.group : undefined;
    // if (!ng) {
    //   console.log(`thisGroup: ${JSON.stringify(thisGroup, null, 2)}
    //   value: ${JSON.stringify(this.props.value, null, 2)}`);
    // }

    const readOnly =
      (thisGroup !== undefined &&
        thisGroup.name &&
        thisGroup.name.length > 1) ||
      this.props.admin === 0;
    this.props.isValid(this.props.index, (!ng) && readOnly);
    this.state = {
      readOnly,
      group: (thisGroup !== undefined) ? thisGroup : {
        id: -1, eventId: this.props.eventId, name: '', time: '00:00', completed: false,
        // never should be a new empty group for checked and partGroup fields
      },
      completed: ((thisGroup !== undefined) ? thisGroup.completed : false),
      eventId: this.props.eventId,
      admin: this.props.admin,
      checked: ((thisGroup !== undefined) ? thisGroup.checked : false),
      loaded: !((this.props.eventId > 0) &&
        ((thisGroup !== undefined) ? thisGroup.id : -1) > 0),
      activated: this.props.activated || false,
    };
    if ((this.state.eventId > 0) && (this.state.group.id > 0)) {
      const url = `/events/${this.state.eventId}/groups/${this.state.group.id}`;
      AxiosPromise({ verb: 'get', url, idOption: 'param' }, (err, result) => {
        if (err || result.data.length === 0) {
          console.log(`detail row constructor partGroup not found or empty for
          ${this.state.group.id} ${this.state.group.name}`);
          this.setState({
            checked: false,
            loaded: true,
            group: {
              ...this.state.group,
              time: formatTime(this.state.group.time, this.state.group.time),
            },
          });
        } else {
          // console.log(`checked ${this.state.checked}
          //     detail row constructor partGroup result for group
          //     ${this.state.group.id} ${this.state.group.name}
          //     ${JSON.stringify(result.data[0], null, 2)}`);
          this.setState({
            checked: result.data[0].subscribed,
            loaded: true,
            group: {
              ...this.state.group,
              time: formatTime(this.state.group.time, this.state.group.time),
            },
          });
        }
      });
    }
    this.loggedFields = [];
  }
  add(group) {
    console.log(`eventId: ${this.state.eventId} group name: ${group.name}`);
    this.props.add(this.state.eventId, group);
    setTimeout(() => {
      document.location.reload(false);
    }, 100);
  }
  toCurrentTime() {
    if (this.state.group.time && this.state.group.time.length > 0 && this.state.group.time[0] === ' ') {
      return `0${this.state.group.time.slice(1)}`;
    }
    return this.state.group.time;
  }
  sendGroup(group, edit) {
    if (
      group.name &&
      group.time &&
      group.time !== '00:00' &&
      group.time.length >= 5
    ) {
      console.log(`group.name: ${group.name} group.time: ${group.time} group.eventId: ${
        group.eventId
      }`);
      this.props.isValid(this.props.index, (group.id > 0) && this.state.readOnly && group.name &&
        (group.name.length > 0) && (group.time !== '00:00') && (group.time.length >= 5));
      return group.id > 0 ? edit(group) : this.add(group);
    }
    return null;
  }
  // logNew = (o) => {
  //   const s = JSON.stringify(o, null, 2);
  //   if (this.loggedFields.findIndex(e => e === s) < 0) {
  //     this.loggedFields.push(s);
  //     console.log(s);
  //   }
  // }
  render() {
    const {
      fields, groupText, index, remove, removePart, edit,
    } = this.props;
    // this.logNew(this.state.group);
    return (
      <div onKeyPress={tab}>
        <Field
          name={`${groupText}.name`}
          type="text"
          component="input"
          // label={`${index + 1}) `}
          placeholder="name"
          readOnly={this.state.readOnly}
          className={`${this.state.completed ? 'lineThrough' : 'name'}`}
          style={{
            textDecoration: this.state.completed ? 'line-through' : 'none',
          }}
          onBlur={(event) => {
            const newName = event.target.value;
            if (this.state.group.name !== newName) {
              this.setState(
                {
                  group: { ...this.state.group, name: newName },
                },
                this.sendGroup(this.state.group, edit),
              );
            }
          }}
        />
        <Field
          name={`${groupText}.time`}
          type="text"
          placeholder="HH:MM"
          // normalize={formatTime}
          component="input"
          readOnly={this.state.readOnly}
          style={{
            textDecoration: this.state.completed ? 'line-through' : 'none',
          }}
          onBlur={(event) => {
            // console.log(`time: ${event.target.value}`);
            const targetLength = event.target.value.length;
            if (targetLength > 7 || targetLength < 3) return;
            const l2 = event.target.value.slice(-2).toLowerCase();
            let pm = false;
            let am = false;
            switch (l2) {
              case 'pm':
                pm = true;
                break;
              case 'am':
                am = true;
                break;
              default:
            }
            if ((!am) && (!pm) && targetLength > 5) return;
            let onlyNums = event.target.value.replace(/[^\d]/g, '');
            if (onlyNums.length === 3) onlyNums = `0${onlyNums}`;
            if (onlyNums < 4) return;
            const minutes = Number(onlyNums.slice(2));
            let hour = Number(onlyNums.slice(0, 2));
            if ((am || pm) && (hour > 12)) return;
            if (hour > 12) { // military time
              hour -= 12;
              am = false;
              pm = true;
            } else if (hour < 7 && (!am)) {
              pm = true;
            } else if (hour > 9 && (!pm)) {
              am = true;
            } else if ((!am) && (!pm)) {
              if (this.state.group.pm) {
                pm = true;
                am = false;
              } else if (hour === 12) {
                pm = true;
                am = false;
              } else {
                am = true;
                pm = false;
              }
            }
            if (am) pm = false;
            // 7,8,9,11,12
            const currentTime = this.toCurrentTime();
            // if (hour === 0) hour = 12;
            let newTime =
              `${(hour || 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            if ((Number(currentTime.slice(0, 2)) !== hour) ||
              (Number(currentTime.slice(-2)) !== minutes) ||
              (pm !== this.state.group.pm)
            ) {
              // console.log(`time: |${group.time}| newTime |${newTime}|
              // isEqual ${group.time == newTime}`);
              this.setState({
                group: { ...this.state.group, time: `${formatTime(newTime, currentTime)}`, pm },
              }, () => {
                console.log(`this.state.group.time: ${this.state.group.time} pm: ${this.state.group.pm}`);
                // convert am/pm to military
                if (this.state.group.pm && (hour < 12)) hour += 12;
                if (am && (hour === 12)) hour = 0;
                newTime =
                  `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                const group = Object.assign(this.state.group);
                group.time = `${newTime}:00`;
                this.sendGroup(group, edit);
                setTimeout(() => {
                  document.location.reload(false);
                }, 100);
              });
            } else {
              newTime =
                `${hour.toString().padStart(2, ' ')}:${minutes.toString().padStart(2, '0')}`;
              this.setState({
                group: { ...this.state.group, time: newTime, pm },
              }, () => {
                setTimeout(() => {
                  document.location.reload(false);
                }, 100);
              });
            }
          }}
        />
        {this.state.admin === 0 && this.state.loaded && (
          // <div className="subscribeCheckbox">
          // should always be activated here
          <span
            id="Subscribe"
            style={{
              enabled: ((!this.state.completed) && this.state.activated),
              fontWeight: (this.state.completed || (!this.state.activated)) ? 100 : 800,
            }}
          >
            <Field
              name={`${groupText}.subscribed`}
              id="subscribeGroup"
              title="Subscripe to Group"
              label="subscibed"
              checked={this.state.checked}
              component="input"
              type="checkbox"
              className="checkbox"
              onClick={(/* event */) => {
                // const checked = event.target.value;
                this.setState({
                  checked: !this.state.checked,
                }, () => {
                  const url = `/events/${this.state.eventId}/groups/${this.state.group.id}`;
                  AxiosPromise({ verb: 'get', url, idOption: 'param' }, (err, result) => {
                    if (err || result.data.length === 0) {
                      this.props.addPart({
                        eventId: this.state.eventId,
                        groupId: this.state.group.id,
                        subscribed: this.state.checked,
                      });
                    } else {
                      this.props.editPart({
                        eventId: this.state.eventId,
                        groupId: this.state.group.id,
                        subscribed: this.state.checked,
                      });
                    }
                  });
                });
              }}
            />
            <span>Subscribe</span>
          </span>
        )}
        {/* <div className="mycheckbox">
          <Field name={`${group}.completed`} id="competedGroup" title="Complete Group"
          label="completed" component="input" type="checkbox" className="checkbox" />
          <label htmlFor="completedGroup" />
        </div> */}
        {this.state.admin > 0 && (
          <button
            type="button"
            title="Complete Group"
            name={`${groupText}.complete`}
            style={{
              opacity: this.state.completed ? 0 : (this.state.activated ? 1 : 0.5),
              enabled: (!this.state.completed) && this.state.activated,
            }}
            onClick={() => {
              if (this.state.group.name && this.state.group.time) {
                const group = Object.assign(this.state.group);
                console.log(`group name ${group.name} complete click`);
                group.completed = true;
                if (group.id <= 0) {
                  group.id = sessionStorage.getItem(`group.id:${this.state.group.name}`);
                }
                this.setState({
                  group,
                  completed: true,
                }, () => {
                  // this.setLineThrough(`${groupText}.name`);
                  // this.setLineThrough(`${groupText}.time`);
                  console.log(`set completed for ${group.name}`);
                  this.sendGroup(group, edit);
                });
                AxiosPromise(
                  { verb: 'get', url: `/notify/events/${this.state.eventId}` },
                  (err, result) => {
                    if (result) {
                      console.log('Notified subscribers of Event', result.data);
                    } else {
                      console.log('Did not notify subscribers', err);
                    }
                  },
                );
              }
            }}
          >
            {/* <img
              src={completedBI}
              id="completedBI"
              alt="completed"
              className="BI"
            /> */}
            <FontAwesomeIcon icon={faFlagCheckered} />
          </button>
        )}
        {this.state.admin > 0 && (
          <button
            type="button"
            title="Edit Group"
            onClick={() => {
              this.setState({
                readOnly: !this.state.readOnly,
              }, () => {
                this.props.isValid(this.props.index, this.state.readOnly);
              });
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
            {/* <img src={pencilBI} id="pencilBI" alt="edit" className="BI" /> */}
          </button>
        )}
        {this.state.admin > 0 && (
          <button
            type="button"
            title="Remove Group"
            onClick={() => {
              console.log(`remove id ${this.state.group.id} eventId ${this.state.eventId}`);
              if (this.state.group.id <= 0) {
                const { id, ...group } = this.state.group;
                group.id = sessionStorage.getItem(`group.id:${this.state.group.name}`);
                this.setState(
                  {
                    group,
                  },
                  () => {
                    console.log(`session removing ${this.state.group.id}`);
                    remove(group);
                    fields.remove(index);
                  },
                );
              } else {
                removePart({ eventId: this.state.eventId, groupId: this.state.group.id });
                remove(this.state.group);
                fields.remove(index);
                document.location.reload(false);
              }
            }}
          >
            {/* <img src={trashBI} id="pencilBI" alt="edit" className="BI" /> */}
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
    );
  }
}
EventDetailGroupRow.defaultProps = {
  group: undefined,
};
EventDetailGroupRow.propTypes = {
  group: PropTypes.object,
  fields: PropTypes.object.isRequired,
  groupText: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  removePart: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  addPart: PropTypes.func.isRequired,
  eventId: PropTypes.number.isRequired,
  admin: PropTypes.number.isRequired,
  editPart: PropTypes.func.isRequired,
  // partGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  activated: PropTypes.bool.isRequired,
  isValid: PropTypes.func.isRequired,
};

// const n1Check = (groups) => {
//   groups.forEach((group) => {
//     if (group.id <= 0 && group.name.length > 1) {
//       console.log(`name: ${group.name} time: ${group.time}`);
//     }
//   });
//   return groups;
// };
export default connect(
  state => ({
    // groups: n1Check(state.groups),
    partGroups: state.partGroups,
  }),
  dispatch => ({
    edit: group => dispatch(editGroup(group)),
    remove: group => dispatch(deleteGroup(group.eventId, group.id)),
    add: (eventId, group) => dispatch(addGroup(eventId, group)),
    removePart: partGroup =>
      dispatch(deletePartGroup(partGroup)),
    addPart: partGroup => dispatch(addPartGroup(partGroup)),
    editPart: partGroup => dispatch(editPartGroup(partGroup)),
  }),
)(EventDetailGroupRow);
