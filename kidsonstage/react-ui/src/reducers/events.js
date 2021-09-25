import { GET_EVENTS, ADD_EVENT, DELETE_EVENT } from '../actions';

export default (events = [], action) => {
  switch (action.type) {
    case GET_EVENTS:
      return action.payload;
    case ADD_EVENT:
      return [action.payload, ...events];
    case DELETE_EVENT:
      return events.filter(event => event.id !== action.payload.id);
    // case ADD_EVENT_GR
    default:
      return events;
  }
};
