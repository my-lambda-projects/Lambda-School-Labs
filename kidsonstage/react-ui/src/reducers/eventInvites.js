import { GET_EVENTINVITES_EVENTS, ADD_EVENTINVITES_EVENT } from '../actions';
/* eslint-disable no-case-declarations, no-console */
const lastIndex = (arr, item) => {
  let i = arr.length - 1;
  for (; i >= 0; i--) {
    if ((item.eventId === arr[i].eventId) && (item.userId === arr[i].userId)) {
      break;
    }
  }
  // if (pI === i) {
  //   console.log(`passed i ${pI} returned i ${i} eventId ${item.eventId} userId ${item.userId} `);
  // }
  return i;
};
export default (eventInvites = [], action) => {
  switch (action.type) {
    case GET_EVENTINVITES_EVENTS:
      console.log(`GET_EVENTINVITES_EVENTS reducer action.payload.length: ${action.payload.length}`);
      return action.payload
        .filter((item, i, self) => lastIndex(self, item, i) === i); // remove dups
    case ADD_EVENTINVITES_EVENT:
      const { eventId, userId } = action.payload;
      console.log(`eventId: ${eventId} userId: ${userId}`);
      const invites = [action.payload, ...eventInvites]
        .filter((item, i, self) => lastIndex(self, item, i) === i); // remove dups
      invites.forEach(invite => console.log(`invite eventId ${invite.eventId}  userId ${invite.userId}`));
      console.log(`ADD_EVENTINVITES_EVENTS reducer length: ${invites.length}`);
      return invites;
    // case EDIT_EVENTINVITES_EVENT:
    //   return [action.payload, ...eventInvites.filter(iE =>
    //     (iE.eventId !== action.payload.eventId) ||
    //     (iE.userId !== action.payload.userId))];
    // case DELETE_INVITED_EVENT:
    //   return eventInvites.filter(event => event.id !== action.payload.id);
    // case ADD_EVENT_GR
    default:
      return eventInvites;
  }
};
