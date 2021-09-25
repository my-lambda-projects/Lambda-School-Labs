import { GET_INVITED_EVENTS, ADD_INVITED_EVENT, DELETE_INVITED_EVENT } from '../actions';

const lastIndex = (arr, item) => {
  let i = arr.length - 1;
  for (; i >= 0; i--) {
    if (item.eventId === arr[i].eventId) {
      break;
    }
  }
  return i;
};

export default (invitedEvents = [], action) => {
  switch (action.type) {
    case GET_INVITED_EVENTS:
      console.log(`reducer action.payload.length: ${action.payload.length}`);
      return action.payload;
    case ADD_INVITED_EVENT:
      return [action.payload, ...invitedEvents]
        .filter((item, i, self) => lastIndex(self, item) === i); // remove dups
    case DELETE_INVITED_EVENT:
      return invitedEvents.filter(event => event.id !== action.payload.id);
    // case ADD_EVENT_GR
    default:
      return invitedEvents;
  }
};
