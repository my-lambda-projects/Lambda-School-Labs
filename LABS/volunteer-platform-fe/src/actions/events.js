import {action} from './action';
import firebase, {store} from '../firebase/FirebaseConfig';
import moment from 'moment';
import faker from 'faker';
import {interests, causeAreas, requirements} from '../reducers/initialState';
import {findNextEvents} from '../utility/findNextRecurEvent';
import {getLatLong} from '../utility/geoCode';

/**
 * Auth Actions
 * @module actions/events
 *
 */

export const CREATE_EVENT_INIT = 'CREATE_EVENT_INIT';
export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATE_EVENT_FAILED = 'CREATE_EVENT_FAILED';

/**
 * Creates a new event in firebase.
 * @function
 * @param {Event} event New event to be created in db.
 * @param {Dispatch} dispatch
 */
export const createEvent = (event, dispatch) => {
  dispatch(action(CREATE_EVENT_INIT));
  store
    .collection('events')
    .add(event)
    .then(result => {
      event.eventId = result.id;
      dispatch(action(CREATE_EVENT, event));
    })
    .catch(error => {
      console.log(error);
      dispatch(action(CREATE_EVENT_FAILED));
    });
};

export const DELETE_EVENT_INIT = 'DELETE_EVENT_INIT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const DELETE_EVENT_FAILED = 'DELETE_EVENT_FAILED';

/**
 * Delete a event in the db.
 * @function
 * @param {String} eventId
 * @param {Dispatch} dispatch
 */
export const deleteEvent = (eventId, dispatch) => {
  dispatch(action(DELETE_EVENT_INIT));
  store
    .collection('events')
    .doc(eventId)
    .delete()
    .then(res => {
      dispatch(action(DELETE_EVENT, eventId));
    })
    .catch(error => {
      console.log(error);
      dispatch(action(DELETE_EVENT_FAILED));
    });
};

export const EDIT_EVENT_INIT = 'EDIT_EVENT_INIT';
export const EDIT_EVENT = 'EDIT_EVENT';
export const EDIT_EVENT_FAILED = 'EDIT_EVENT_FAILED';

/**
 * Update/Edit a event in the db.
 * @function
 * @param {Event} event Event to be updated.
 * @param {Dispatch} dispatch
 */
export const editEvent = (event, dispatch) => {
  dispatch(action(EDIT_EVENT_INIT));
  store
    .collection('events')
    .doc(event.eventId)
    .set(event)
    .then(res => {
      dispatch(action(DELETE_EVENT, event.eventId));
    })
    .catch(error => {
      console.log(error);
      dispatch(action(DELETE_EVENT_FAILED));
    });
};

export const GET_EVENTS_BY_ORG_INIT = 'GET_EVENTS_BY_ORG_INIT';
export const GET_EVENTS_BY_ORG = 'GET_EVENTS_BY_ORG';
export const GET_EVENTS_BY_ORG_FAILED = 'GET_EVENTS_BY_ORG_FAILED';
export const ORG_HAS_NO_EVENTS = 'ORG_HAS_NO_EVENTS';

/**
 * Gets all events a organization has created.
 * @function
 * @param {String} orgId Organization Id.
 * @param {Dispatch} dispatch
 */
export const getAllEventsByOrg = (orgId, dispatch) => {
  dispatch(action(GET_EVENTS_BY_ORG_INIT));
  const time = moment().unix();
  store
    .collection('events')
    .where('orgId', '==', orgId)
    .get()
    .then(res => {
      if (res.empty){
        dispatch(action(ORG_HAS_NO_EVENTS));
        return;
      }
      
      const events = [];
      res.forEach(event => {
        let eventToAdd = event.data();
        eventToAdd.eventId = event.id;
        
        if (eventToAdd.startTimeStamp > time){
          events.push(eventToAdd);
        }
      });
      
      dispatch(action(GET_EVENTS_BY_ORG, events));
    })
    .catch(error => {
      console.log(error);
      dispatch(action(GET_EVENTS_BY_ORG_FAILED));
    });
};

export const GET_EVENTS_BY_STATE = 'GET_EVENTS_BY_STATE';
export const GET_EVENTS_BY_STATE_FAILED = 'GET_EVENTS_BY_STATE_FAILED';
export const NO_EVENTS_FOR_THAT_STATE = 'NO_EVENTS_FOR_THAT_STATE';

/**
 * Get all the events for a given state.
 * @function
 * @param {String} state Two digit state code
 * @param {Dispatch} dispatch
 */
export const getAllEventsByState = (state, dispatch) => {
  store
    .collection('events')
    .where('state', '==', state)
    .where('startTimeStamp', '>', moment().unix())
    .orderBy('startTimeStamp')
    .limit(20)
    .get()
    .then(res => {
      if (res.empty){
        dispatch(action(NO_EVENTS_FOR_THAT_STATE));
        return;
      }
      
      const events = [];
      res.forEach(event => {
        const data = event.data();
        data.eventId = event.id;
        events.push(data);
      });
      
      dispatch(action(GET_EVENTS_BY_STATE, events));
    })
    .catch(err => {
      console.log(err);
      dispatch(GET_EVENTS_BY_STATE_FAILED, err);
    });
};

export const CREATE_RECURRING_EVENT_INIT = 'CREATE_RECURRING_EVENT_INIT';
export const CREATE_RECURRING_EVENT = 'CREATE_RECURRING_EVENT';
export const CREATE_RECURRING_EVENT_FAILED = 'CREATE_RECURRING_EVENT_FAILED';

export const createRecurringEvent = (event, dispatch) => {
  dispatch(action(CREATE_RECURRING_EVENT_INIT));
  store
    .collection('recurring events')
    .add(event)
    .then(res => {
      dispatch(action(CREATE_RECURRING_EVENT));
    })
    .catch(err => {
      dispatch(action(CREATE_RECURRING_EVENT_FAILED));
      console.log(err);
    });
};

export const GET_RECURRING_EVENTS_BY_STATE = 'GET_RECURRING_EVENTS_BY_STATE';
export const RECURRING_EVENTS_BY_STATE_EMPTY =
  'RECURRING_EVENTS_BY_STATE_EMPTY';

/**
 * Gets all the recurring events for the state. Updates the recurring events in events reducer.
 * @param {String} state - two letter abbreviation of the state.
 * @param dispatch
 */
export const getAllRecurringEventsByState = (state, dispatch) => {
  store
    .collection('recurring events')
    .where('state', '==', state)
    .get()
    .then(res => {
      if (res.empty){
        dispatch(action(RECURRING_EVENTS_BY_STATE_EMPTY));
      }else{
        const events = [];
        res.forEach(event => {
          const data = event.data();
          data.eventId = event.id;
          
          data.registeredVolunteers = findNextEvents(data);
          event.ref.update({
            registeredVolunteers: data.registeredVolunteers,
          });
          
          events.push(data);
        });
        
        dispatch(action(GET_RECURRING_EVENTS_BY_STATE, events));
      }
    });
};

export const GET_RECURRING_EVENTS_BY_ORG_INIT =
  'GET_RECURRING_EVENTS_BY_ORG_INIT';
export const GET_RECURRING_EVENTS_BY_ORG = 'GET_RECURRING_EVENTS_BY_ORG';
export const RECURRING_EVENTS_BY_ORG_EMPTY = 'RECURRING_EVENTS_BY_ORG_EMPTY';

/**
 * Gets all the recurring events for the organization. Updated recurring events in the events reducer.
 * @param {String} orgId None profits id
 * @param {Dispatch} dispatch
 */
export const getAllRecurringEventsByOrg = (orgId, dispatch) => {
  dispatch(action(GET_RECURRING_EVENTS_BY_ORG_INIT));
  store
    .collection('recurring events')
    .where('orgId', '==', orgId)
    .get()
    .then(res => {
      if (res.empty){
        dispatch(action(RECURRING_EVENTS_BY_ORG_EMPTY));
      }else{
        const events = [];
        res.forEach(event => {
          const data = event.data();
          data.eventId = event.id;
          data.registeredVolunteers = findNextEvents(data);
          event.ref.update({
            registeredVolunteers: data.registeredVolunteers,
          });
          events.push(data);
        });
        
        dispatch(action(GET_RECURRING_EVENTS_BY_ORG, events));
      }
    })
    .catch(err => console.log(err));
};

export const GET_EVENT_BY_ID_INIT = 'GET_EVENT_BY_ID_INIT';
export const GET_EVENT_BY_ID = 'GET_EVENT_BY_ID';

/**
 * Gets event by id. If normal event doesn't exist in db then it checks for a recurring event.
 * @function
 * @param {String} eventId Event id.
 * @param {Dispatch} dispatch Dispatch for reducer
 * @param eventType Event type, ["events", "recurring events"]
 */
export const getEventById = (eventId, dispatch, eventType = 'events') => {
  dispatch(action(GET_EVENT_BY_ID_INIT));
  store
    .collection(eventType)
    .doc(eventId)
    .onSnapshot(res => {
      if (!res.exists){
        getEventById(eventId, dispatch, 'recurring events');
        return;
      }
      const event = res.data();
      event.eventId = res.id;
      
      if (event.lat === undefined || event.lng === undefined){
        const address =
          event.address ||
          event.streetAddress + ' ' + event.city + ', ' + event.state;
        getLatLong(address).then(({lat, lng}) => {
          event.lat = lat;
          event.lng = lng;
          res.ref
            .update(event)
            .then(ressult => {
              dispatch(GET_EVENT_BY_ID, event);
            })
            .catch(err => {
              console.log(err);
            });
        });
      }else{
        dispatch(action(GET_EVENT_BY_ID, event));
      }
    });
};

export const generateRandomEvents = () => {
  store
    .collection('organizations')
    .get()
    .then(res => {
      const orgs = [];
      res.forEach(org => {
        const data = org.data();
        data.orgId = org.id;
        orgs.push(data);
      });
      
      orgs.forEach(org => {
        for (let i = 0; i < 3; i++){
          const date = moment(faker.date.future());
          
          const poc1 = {
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
          };
          
          const website = 'http://' + faker.internet.domainName();
          
          const event = {
            nameOfEvent: faker.company.catchPhrase(),
            city: org.city ? org.city : faker.address.city(),
            state: org.state ? org.state : faker.address.state(),
            email: poc1.email,
            date: date.unix(),
            startTime: date.format('LT'),
            startTimeStamp: date.unix(),
            endTime: date
              .add(Math.ceil(Math.random() * 5), 'hours')
              .format('LT'),
            endTimeStamp: date.unix(),
            firstName: poc1.firstName,
            lastName: poc1.lastName,
            interest: getRandomInterests(),
            numberOfVolunteers: Math.ceil(Math.random() * 20) + 5,
            orgId: org.orgId,
            phoneNumber: faker.phone.phoneNumber(),
            pointOfContact: poc1,
            typesOfCauses: getRandomCauses(),
            volunteerRequirements: getRandomRequirements(),
            otherNotes: faker.lorem.paragraph(),
            website,
            eventDetails: faker.lorem.paragraphs(),
          };
          
          store
            .collection('events')
            .add(event)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    });
};

const getRandomInterests = () => {
  const randomInterests = [];
  const randomNumber = Math.ceil(Math.random() * 5);
  const selectedNumber = [];
  for (let i = 0; i < randomNumber; i++){
    let randomInterestNumber = Math.floor(Math.random() * interests.length);
    while (selectedNumber.includes(randomInterestNumber)){
      randomInterestNumber = Math.floor(Math.random() * interests.length);
    }
    selectedNumber.push(randomInterestNumber);
    randomInterests.push(interests[ randomInterestNumber ]);
  }
  
  return randomInterests;
};

const getRandomCauses = () => {
  const randomCauses = [];
  const randomNumber = Math.ceil(Math.random() * 5);
  const selectedNumber = [];
  for (let i = 0; i < randomNumber; i++){
    let randomCusesNumber = Math.floor(Math.random() * causeAreas.length);
    while (selectedNumber.includes(randomCusesNumber)){
      randomCusesNumber = Math.floor(Math.random() * causeAreas.length);
    }
    selectedNumber.push(randomCusesNumber);
    randomCauses.push(causeAreas[ randomCusesNumber ]);
  }
  
  return randomCauses;
};

const getRandomRequirements = () => {
  const randomRequirements = [];
  const randomNumber = Math.ceil(Math.random() * 5);
  const selectedNumber = [];
  for (let i = 0; i < randomNumber; i++){
    let randomRequirementNumber = Math.floor(
      Math.random() * requirements.length,
    );
    while (selectedNumber.includes(randomRequirementNumber)){
      randomRequirementNumber = Math.floor(Math.random() * requirements.length);
    }
    selectedNumber.push(randomRequirementNumber);
    randomRequirements.push(requirements[ randomRequirementNumber ]);
  }
  
  return randomRequirements;
};

export const SIGN_UP_FOR_EVENT_INIT = 'SIGN_UP_FOR_EVENT_INIT';
export const SIGNED_UP_VOLUNTEER_FOR_EVENT = 'SIGNED_UP_VOLUNTEER_FOR_EVENT';
export const SIGNED_UP_FOR_EVENT = 'SIGNED_UP_FOR_EVENT';
export const SIGN_UP_FOR_EVENT_FAILURE = 'SIGN_UP_FOR_EVENT_FAILURE';

/**
 * Sign up a volunteer for an event. Add the user id to the event document. Add the event to the user document.
 * @function
 * @param {Event} event
 * @param {User} user
 * @param {Dispatch} dispatch
 */

export const signUpForEvent = (event, user, dispatch) => {
  let volunteers = event.registeredVolunteers || [];
  let events = user.registeredEvents || [];
  let updatedEvent = {
    ...event,
    registeredVolunteers: [
      ...volunteers,
      {
        userId: user.uid,
        name: user.firstName + ' ' + user.lastName,
        hours: 0,
        isVerified: false,
      },
    ],
  };
  let updatedUser = {
    ...user,
    registeredEvents: [
      ...events,
      {
        nameOfEvent: event.nameOfEvent,
        pointOfContact: event.pointOfContact,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        location: `${event.city}, ${event.state}`,
        eventId: event.eventId,
        orgId: event.orgId,
        hours: 0,
        isVerified: false,
      },
    ],
  };
  
  dispatch(action(SIGN_UP_FOR_EVENT_INIT));
  store
    .collection('events')
    .doc(event.eventId)
    .set(updatedEvent)
    .then(res => {
      dispatch(action(SIGNED_UP_VOLUNTEER_FOR_EVENT, updatedEvent));
      store
        .collection('users')
        .doc(user.uid)
        .set(updatedUser)
        .then(res => {
          dispatch(action(SIGNED_UP_FOR_EVENT, updatedUser));
        })
        .catch(error => {
          dispatch(action(SIGN_UP_FOR_EVENT_FAILURE));
        });
    })
    .catch(error => {
      dispatch(action(SIGN_UP_FOR_EVENT_FAILURE));
    });
};

export const CANCEL_SIGNED_UP_EVENT_INIT = 'CANCEL_SIGNED_UP_EVENT_INIT';
export const CANCELED_VOLUNTEER_FOR_EVENT = 'CANCELED_VOLUNTEER_FOR_EVENT';
export const CANCELED_SIGNED_UP_EVENT = 'CANCELED_SIGNED_UP_EVENT';
export const CANCEL_SIGNED_UP_EVENT_FAILURE = 'CANCEL_SIGNED_UP_EVENT_FAILURE';

/**
 * Cancel a signed up event for an user. Delete the volunteer in the event document. Delete the event in the user document.
 * @function
 * @param {Event} event
 * @param {User} user
 * @param {Dispatch} dispatch
 */

export const cancelSignedUpEvent = (event, user, dispatch) => {
  let updatedEvent = {
    ...event,
    registeredVolunteers: event.registeredVolunteers.filter(
      item => item.userId !== user.uid
    ),
  };
  let updatedUser = {
    ...user,
    registeredEvents: user.registeredEvents.filter(
      item => item.eventId !== event.eventId,
    ),
  };
  
  dispatch(action(CANCEL_SIGNED_UP_EVENT_INIT));
  store
    .collection('events')
    .doc(event.eventId)
    .set(updatedEvent)
    .then(res => {
      dispatch(action(CANCELED_VOLUNTEER_FOR_EVENT, updatedEvent));
      store
        .collection('users')
        .doc(user.uid)
        .set(updatedUser)
        .then(res => {
          dispatch(action(CANCELED_SIGNED_UP_EVENT, updatedUser));
        })
        .catch(error => {
          dispatch(action(CANCEL_SIGNED_UP_EVENT_FAILURE));
        });
    })
    .catch(error => {
      dispatch(action(CANCEL_SIGNED_UP_EVENT_FAILURE));
    });
};

export const SIGN_UP_FOR_RECURRING_EVENT_INIT =
  'SIGN_UP_FOR_RECURRING_EVENT_INIT';
export const SIGNED_UP_VOLUNTEER_FOR_RECURRING_EVENT =
  'SIGNED_UP_VOLUNTEER_FOR_RECURRING_EVENT';
export const SIGNED_UP_FOR_RECURRING_EVENT = 'SIGNED_UP_FOR_RECURRING_EVENT';
export const SIGN_UP_FOR_RECURRING_EVENT_FAILURE =
  'SIGN_UP_FOR_RECURRING_EVENT_FAILURE';

/**
 * Sign up a volunteer for a recurring event. Add the user id to the event document. Add the event to the user document.
 * @function
 * @param {Event} event
 * @param {User} user
 * @param {Date} date //target date the recurring event occurs on
 * @param {Dispatch} dispatch
 */

export const signUpForRecurringEvent = (event, user, date, dispatch) => {
  let volunteers = event.registeredVolunteers || {};
  let targetDate = date;
  let events = user.registeredEvents || [];

  const personSigningUp = {
    userId: user.uid,
    name: user.firstName + ' ' + user.lastName,
    hours: 0,
    isVerified: false,
  };

  if (!volunteers[targetDate]) {
    volunteers[targetDate] = [personSigningUp];
  } else {
    volunteers[targetDate] = [...volunteers[targetDate], personSigningUp];
  }
  
  let updatedEvent = {
    ...event,
    registeredVolunteers: volunteers,
  };
  
  let updatedUser = {
    ...user,
    registeredEvents: [
      ...events,
      {
        nameOfEvent: event.nameOfEvent,
        pointOfContact: event.pointOfContact,
        date: targetDate,
        startTime: event.startTime,
        endTime: event.endTime,
        location: `${event.city}, ${event.state}`,
        eventId: event.eventId,
        orgId: event.orgId,
        hours: 0,
        isVerified: false,
        isRecurring: true,
      },
    ],
  };
  
  dispatch(action(SIGN_UP_FOR_RECURRING_EVENT_INIT));
  store
    .collection('recurring events')
    .doc(event.eventId)
    .set(updatedEvent)
    .then(res => {
      dispatch(action(SIGNED_UP_VOLUNTEER_FOR_RECURRING_EVENT, updatedEvent));
      store
        .collection('users')
        .doc(user.uid)
        .set(updatedUser)
        .then(res => {
          dispatch(action(SIGNED_UP_FOR_RECURRING_EVENT, updatedUser));
        })
        .catch(error => {
          dispatch(action(SIGN_UP_FOR_RECURRING_EVENT_FAILURE));
        });
    })
    .catch(error => {
      dispatch(action(SIGN_UP_FOR_RECURRING_EVENT_FAILURE));
    });
};

export const CANCEL_SIGNED_UP_RECURRING_EVENT_INIT =
  'CANCEL_SIGNED_UP_RECURRING_EVENT_INIT';
export const CANCELED_VOLUNTEER_FOR_RECURRING_EVENT =
  'CANCELED_VOLUNTEER_FOR_RECURRING_EVENT';
export const CANCELED_SIGNED_UP_RECURRING_EVENT =
  'CANCELED_SIGNED_UP_RECURRING_EVENT';
export const CANCEL_SIGNED_UP_RECURRING_EVENT_FAILURE =
  'CANCEL_SIGNED_UP_RECURRING_EVENT_FAILURE';

/**
 * Cancel a signed up recurring event for an user. Delete the volunteer in the event document. Delete the event in the user document.
 * @function
 * @param {Event} event
 * @param {User} user
 * @param {Date} date //target date the recurring event occurs on
 * @param {Dispatch} dispatch
 */

export const cancelSignedUpRecurringEvent = (event, user, date, dispatch) => {
  let targetDate = date;
  let updatedVolunteers = event.registeredVolunteers[targetDate].filter(
    item => item.userId !== user.uid
  );
  
  let updatedEvent = {
    ...event,
    registeredVolunteers: {
      ...event.registeredVolunteers,
      [ targetDate ]: updatedVolunteers,
    },
  };
  let updatedUser = {
    ...user,
    registeredEvents: user.registeredEvents.filter(
      item => !(item.eventId === event.eventId && item.date === targetDate),
    ),
  };
  
  dispatch(action(CANCEL_SIGNED_UP_RECURRING_EVENT_INIT));
  store
    .collection('recurring events')
    .doc(event.eventId)
    .set(updatedEvent)
    .then(res => {
      dispatch(action(CANCELED_VOLUNTEER_FOR_RECURRING_EVENT, updatedEvent));
      store
        .collection('users')
        .doc(user.uid)
        .set(updatedUser)
        .then(res => {
          dispatch(action(CANCELED_SIGNED_UP_RECURRING_EVENT, updatedUser));
        })
        .catch(error => {
          dispatch(action(CANCEL_SIGNED_UP_RECURRING_EVENT_FAILURE));
        });
    })
    .catch(error => {
      dispatch(action(CANCEL_SIGNED_UP_RECURRING_EVENT_FAILURE));
    });
};

export const updateRecurringEvents = () => {
  store
    .collection('recurring events')
    .get()
    .then(res => {
      res.forEach(event => {
        const data = event.data();
        if (data.pointOfContact === undefined){
          data.pointOfContact = data.pointOfcontact;
        }
        delete data.pointOfcontact;
        event.ref.set(data);
      });
    });
};

/**
 * Call this to verify the number of hours for a user in a event.
 * @param {Event} event
 * @param {User} user
 * @param {Number} hours
 * @param {String} eventType
 */
export const verifyHours = (event, user, hours, eventType = 'events') => {
  const updatedEventVolunteers = event.registeredVolunteers.map(volunteer => {
    if (volunteer.userId === user.uid) {
      volunteer.hours = hours;
      volunteer.isVerified = true;
    }
  });

  const updatedUserEvents = user.registeredEvents.map(usersEvent => {
    if (usersEvent.eventId === event.eventId) {
      usersEvent.hours = hours;
      usersEvent.isVerified = true;
    }
  });

  store
    .collection(eventType)
    .doc(event.eventId)
    .get()
    .then(res => {
      if (!res.exists) {
        verifyHours(event, user, hours, 'recurring events');
      }
      event.registeredVolunteers = updatedEventVolunteers;
      res.ref
        .update(event)
        .then(ressult => {
          user.registeredEvents = updatedUserEvents;
          store
            .collection('users')
            .doc(user.uid)
            .update(user)
            .then(() => {});
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
  
  
};

export const updateEvents = (eventType = 'events') => {
  
  store.collection('users').get().then(res => {
    res.forEach(user => {
      const data = user.data();
      if (data.registeredEvents){
        data.registeredEvents = data.registeredEvents.map(registeredEvent => {
          registeredEvent.hours = Math.floor(Math.random() * 5);
          registeredEvent.isVerified = Math.random() > .5;
          return registeredEvent;
        });
        user.ref.update(data).then(res => {
        
        }).catch(err => {
          console.log(err);
        });
      }
    });
  });
  store
    .collection(eventType)
    .get()
    .then(res => {
      res.forEach(event => {
        const data = event.data();
        if (data.registeredVolunteers) {
          const registeredVolunteers = [];
          data.registeredVolunteers.forEach(async uid => {
            const user = await store
              .collection('users')
              .doc(uid)
              .get();
            const data = user.data();
            registeredVolunteers.push({
              userId: uid,
              fullName: data.firstName + ' ' + data.lastName,
              hours: 0,
              isValidated: false,
            });
          });
          data.registeredVolunteers = registeredVolunteers;
          event.ref.update(data);
        }
      });
    });
};

/**
 * Cancel a signed up event for an user from the user profile. Delete the event in the user document. Delete the volunteer in the event document.
 * @function
 * @param {String} eventId //event id
 * @param {String} eventDate //event date
 * @param {User} user
 * @param {Dispatch} dispatch
 * @param {Boolean} isRecurring //wether event is recurring
 */

export const cancelSignedUpEventViaUserProfile = async (
  eventId,
  eventDate,
  user,
  dispatch,
  isRecurring
) => {
  if (isRecurring) {
    let event = await store
      .collection('recurring events')
      .doc(eventId)
      .get()
      .then(res => {
        if (res.exists) {
          let foundEvent = res.data();
          foundEvent.eventId = res.id;
          return foundEvent;
        } else {
          return null;
        }
      });
    return cancelSignedUpRecurringEvent(event, user, eventDate, dispatch);
  } else {
    let event = await store
      .collection('events')
      .doc(eventId)
      .get()
      .then(res => {
        if (res.exists) {
          let foundEvent = res.data();
          foundEvent.eventId = res.id;
          return foundEvent;
        } else {
          return null;
        }
      });
    return cancelSignedUpEvent(event, user, dispatch);
  }
};
