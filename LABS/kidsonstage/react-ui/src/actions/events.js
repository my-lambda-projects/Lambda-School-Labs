import axios from 'axios';
import { ROOT_URL, authError } from './index';

export const ADD_EVENT = 'ADD_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const GET_EVENTS = 'GET_EVENTS';
export const ADD_INVITED_EVENT = 'ADD_INVITED_EVENT';
export const DELETE_INVITED_EVENT = 'DELETE_INVITED_EVENT';
export const GET_INVITED_EVENTS = 'GET_INVITED_EVENTS';
export const GET_EVENT = 'GET_EVENT';
export const ADD_GROUPS = 'ADD_GROUPS';
export const GET_GROUPS = 'GET_GROUPS';
export const GET_PART_GROUPS = 'GET_PART_GROUPS';
export const DELETE_GROUP = 'DELETE_GROUP';
export const DELETE_PART_GROUP = 'DELETE_PART_GROUP';
export const ADD_GROUP = 'ADD_GROUP';
export const ADD_PART_GROUP = 'ADD_PART_GROUP';
export const EDIT_PART_GROUP = 'EDIT_PART_GROUP';
export const EDIT_GROUP = 'EDIT_GROUP';
export const SET_EVENT_ID = 'SET_EVENT_ID';
export const GET_EVENT_ID = 'GET_EVENT_ID';
export const GET_EVENTINVITES_EVENTS = 'GET_EVENTINVITES_EVENTS';
export const ADD_EVENTINVITES_EVENT = 'EDIT_EVENTINVITES_EVENT';
export const SET_STRIPE_ERROR = 'SET_STRIPE_ERROR';
export const CLEAR_STRIPE_ERROR = 'CLEAR_STRIPE_ERROR';
/* eslint-disable no-console, semi-style */

axios.defaults.withCredentials = true;

// invites/events/:eventId/userId/:userId
// export const geteventInvites = eventId => (dispatch) => {
//   console.log(`loadEvent eventId: ${eventId}`);
//   const token = sessionStorage.getItem('token');
//   const id = sessionStorage.getItem('id');
//   if (!id || !token) {
//     dispatch(authError('Not logged in'));
//     return;
//   }
//   const config = {
//     headers: {
//       authorization: token,
//     },
//   };
//   axios
//     // .get(`${ROOT_URL}/events`, config)
//     .get(`${ROOT_URL}/invites/event/userId/${id}`, config)
//     .then((response) => {
//       console.log(`loadEvent data: ${JSON.stringify(response, null, 2)}`);
//       dispatch({
//         type: ADD_EVENT,
//         payload: response.data || [],
//       });
//     })
//     .catch((err) => {
//       console.log(`loadEvent ${err}`);
//       dispatch(authError('Failed to load Event'));
//     });
// };
// /invites/events/byUser/:userId
// export const getInvitedEvents = () => (dispatch) => {
//   const token = sessionStorage.getItem('token');
//   const id = sessionStorage.getItem('id');
//   if (!id || !token) {
//     dispatch(authError('Not logged in'));
//     return;
//   }
//   const config = {
//     headers: {
//       authorization: token,
//     },
//   };
//   axios
//     // .get(`${ROOT_URL}/events`, config)
//     .get(`${ROOT_URL}/envites/events/byUser/${id}`, config)
//     .then((response) => {
//       console.log(`getInvitedEvents data: ${response.data}`);
//       dispatch({
//         type: GET_INVITED_EVENTS,
//         payload: response.data || [],
//       });
//     })
//     .catch((err) => {
//       console.log(`getInvitedEvents ${err}`);
//       dispatch(authError('Failed to fetch events'));
//     });
// };

export const invitedEventSubscribe = eventId => (dispatch) => {
  console.log(`Subscribe Event eventId: ${eventId}`);
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .post(`${ROOT_URL}/invites/events/${eventId}/userId/${id}`, config)
    .then(() => {
      // console.log(`subscribe Event data: ${JSON.stringify(response, null, 2)}`);
      // document.location.reload();
      dispatch({
        type: ADD_EVENTINVITES_EVENT,
        payload: { eventId, userId: id },
      });
    })
    .catch((err) => {
      console.log(`subscibe Event ${err}`);
      dispatch(authError('Failed to save Subscribe Event'));
    });
};
export const getEvents = () => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    // .get(`${ROOT_URL}/events`, config)
    .get(`${ROOT_URL}/events/byUser/${id}`, config)
    .then((response) => {
      // console.log(`getEvents data: ${response.data}`);
      dispatch({
        type: GET_EVENTS,
        payload: response.data || [],
      });
    })
    .catch(() => {
      // console.log(err);
      dispatch(authError('Failed to fetch events'));
    });
};
export const getEventInvites = () => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    // .get(`${ROOT_URL}/events`, config)
    .get(`${ROOT_URL}/invites/events/userId/${id}`, config)
    .then((response) => {
      // console.log(`getEvents data length: ${response.data.length}`);
      dispatch({
        type: GET_EVENTINVITES_EVENTS,
        payload: response.data || [],
      });
    })
    .catch(() => {
      // console.log(err);
      dispatch(authError('Failed to fetch events'));
    });
};

// eventsRouter.get('/:eventId/userId/:userId
export const getPartGroups = eventId => (dispatch) => {
  if (!eventId) return;
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .get(`${ROOT_URL}/events/${eventId}/userId/${id}`, config)
    .then((response) => {
      // console.log(`getPartGroups ${JSON.stringify(response.data, null, 2)}`);
      dispatch({
        type: GET_PART_GROUPS,
        payload: response.data || [],
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(authError('Failed to fetch groups'));
    });
};
// eventsRouter.post('/:eventId/groups/:groupId',
export const addPartGroup = partGroup => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const { eventId, groupId, subscribed } = partGroup;
  const body = { userId: id, subscribed };
  console.log(`addPartGroup groupId ${groupId} eventId ${eventId} userId ${id}`);
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .post(`${ROOT_URL}/events/${eventId}/groups/${groupId}`, body, config)
    .then((response) => {
      console.log(`addPartGroup id ${JSON.stringify(response.data[0], null, 2)}`);
      dispatch({
        type: ADD_PART_GROUP,
        payload: {
          id: response.data[0],
          eventId,
          userId: id,
          groupId,
        },
      });
    })
    .catch((error, err) => {
      console.log(`addPartGroup ${error} ${err} `);
      dispatch(authError('Failed to add partGroup'));
    });
};

export const getGroups = eventId => (dispatch) => {
  if (!eventId) return;
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const body = { userId: id };
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .get(`${ROOT_URL}/events/${eventId}/groups`, body, config)
    .then((response) => {
      dispatch({
        type: GET_GROUPS,
        payload: response.data || [],
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(authError('Failed to fetch groups'));
    });
};
export const addEvent = event => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id'); sessionStorage.getItem('id');
  console.log(`addEvent ${JSON.stringify(event)}`);
  if (!id || !token) {
    console.log('addEvent not logged in');
    dispatch(authError('Not logged in'));
    return;
  }
  if (id !== event.owner) {
    console.log(`addEvent Illegal id: ${id} event.owner: ${event.owner}`);
    dispatch(authError('Illegal'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .post(`${ROOT_URL}/events`, event, config)
    .then((response) => {
      console.log(`addEvent id ${JSON.stringify(response.data[0])}`);
      // to do verify JSON.parse(response.config.data == event)
      dispatch({
        type: ADD_EVENT,
        payload: { id: response.data[0], ...event },
      });
    })
    .catch((err) => {
      console.log(`addEvent ${err}`);
      dispatch(authError('Failed to fetch users'));
    });
};
export const addGroup = (eventId, group) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const body = { userId: id, eventId, ...group };
  console.log(`addGroup group.name ${group.name} group.time: ${group.time}`);
  console.log(`addGroup body.name ${body.name} body.time: ${body.time}  eventId: ${eventId}`);
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .post(`${ROOT_URL}/events/${eventId}/groups`, body, config)
    .then((response) => {
      console.log(`addGroup id ${response.data}`);
      // to do verify JSON.parse(response.config.data == group)
      sessionStorage.setItem(`group.id:${group.name}`, response.data);
      dispatch({
        type: ADD_GROUP,
        payload: {
          id: response.data,
          eventId,
          name: group.name,
          time: group.time,
          completed: group.completed,
        },
      });
    })
    .catch((err) => {
      console.log(`addGroup ${err}`);
      dispatch(authError('Failed to add group'));
    });
};

export const deleteEvent = event => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .delete(`${ROOT_URL}/events`, event, config)
    .then((response) => {
      console.log(`delete event response ${JSON.stringify(response.data)}`);
      dispatch({
        type: DELETE_EVENT,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(authError('Failed to delete event'));
    });
};

export const deleteGroup = (eventId, groupId) => (dispatch) => {
  console.log(`delete groupId ${groupId} eventId: ${eventId}`);
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .delete(`${ROOT_URL}/events/${eventId}/groups/${groupId}`, config)
    .then((response) => {
      console.log(`delete group response ${Number(response.data)}`);
      dispatch({
        type: DELETE_GROUP,
        payload: Number(response.data),
      });
    })
    .catch((err) => {
      console.log(`delete error: ${JSON.stringify(err, null, 2)}`);
      dispatch(authError('Failed to delete group'));
    });
};
// ('/:eventId/groups/:groupId/userId/:userId',
export const deletePartGroup = partGroup => (dispatch) => {
  const { eventId, groupId } = partGroup;
  console.log(`delete groupId ${groupId} eventId: ${partGroup.eventId}`);
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .delete(`${ROOT_URL}/events/${eventId}/groups/${groupId}/userId/${id}`, config)
    .then((response) => {
      console.log(`delete group response ${JSON.stringify(response, null, 2)}`);
      // console.log(`delete group response ${Number(response.data[0])}`);
      if (partGroup.id) {
        dispatch({
          type: DELETE_PART_GROUP,
          payload: partGroup.id,
        });
      }
    })
    .catch((err) => { // ignore errors
      console.log(`deletePartGroup error: ${JSON.stringify(err, null, 2)}`);
      // dispatch(authError('Failed to delete group'));
    });
};
// ('/:eventId/groups/:groupId/userId/:userId',
export const editPartGroup = partGroup => (dispatch) => {
  const { eventId, groupId, subscribed } = partGroup;
  console.log(`edit groupId ${groupId} eventId: ${partGroup.eventId} subscribed: ${subscribed}`);
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .put(`${ROOT_URL}/events/${eventId}/groups/${groupId}/userId/${id}`, { subscribed }, config)
    .then((response) => {
      console.log(`edit group response ${JSON.stringify(response, null, 2)}`);
      // console.log(`delete group response ${Number(response.data[0])}`);
      dispatch({
        type: EDIT_PART_GROUP,
        payload: {
          eventId, groupId, userId: id, subscribed,
        },
      });
    })
    .catch((err) => { // ignore errors
      console.log(`editPartGroup error: ${JSON.stringify(err, null, 2)}`);
      // dispatch(authError('Failed to delete group'));
    });
};
export const editGroup = group => (dispatch) => {
  // console.log(`editGroup group id: ${group.id} name ${group.name} eventId: ${group.eventId}`);
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const body = { userId: id, ...group };
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .put(`${ROOT_URL}/events/${group.eventId}/groups/${group.id}`, body, config)
    .then((response) => {
      console.log(`edit group response ${JSON.stringify(response.config.data)}`);
      dispatch({
        type: EDIT_GROUP,
        payload: JSON.parse(response.config.data),
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(authError('Failed to edit group'));
    });
};
// /:eventId/groups/:groupId
export const getEvent = (eventId, type = 0) => (dispatch) => {
  // console.log(`getEvent eventId: ${eventId}`);
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .get(`${ROOT_URL}/events/${eventId}`, config)
    .then((response) => {
      // console.log(`getEvent title: ${response.data[0].title}`);
      // console.log(`getEvent eventDate: ${response.data[0].eventDate}`);
      let data = response.data[0] || {};
      if (data.title) {
        data = { ...data, eventId };
      }
      if (type === 2) {
        console.log(`adding invited ${data.title} activated: ${data.activated} eventId: ${data.eventId} id: ${data.id}`);
        dispatch({
          type: ADD_INVITED_EVENT,
          payload: data,
        });
      } else if (type === 1) {
        dispatch({
          type: GET_EVENT,
          payload: data,
        });
      } else {
        dispatch({
          type: ADD_EVENT,
          payload: data,
        })
        ;
      }
    })
    .catch((err) => {
      console.log(`getEvent ${err}`);
      dispatch(authError('Failed to fetch event'));
    });
};
export const setEventId = eventId => (dispatch) => {
  if (!eventId) dispatch(authError('bad event id'));
  sessionStorage.setItem('eventId', eventId);
  console.log(`dispatching eventID ${eventId}`);
  dispatch({
    type: SET_EVENT_ID,
    payload: eventId,
  });
};
export const getEventId = () => (dispatch) => {
  const eventId = sessionStorage.getItem('eventId');
  dispatch({
    type: SET_EVENT_ID,
    payload: eventId,
  });
};
export const setStripeError = stripeError => (dispatch) => {
  dispatch({
    type: SET_STRIPE_ERROR,
    payload: stripeError,
  });
};
export const clearStripeError = () => (dispatch) => {
  dispatch({
    type: CLEAR_STRIPE_ERROR,
  });
};
