import { SET_EVENT_ID, GET_EVENT_ID } from '../actions';
/* eslint-disable no-console */
export default (eventId = -1, action) => {
  switch (action.type) {
    case SET_EVENT_ID:
      console.log(`setting eventID state to ${action.payload}`);
      return action.payload;
    case GET_EVENT_ID:
    default:
      return eventId;
  }
};
