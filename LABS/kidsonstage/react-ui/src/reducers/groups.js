import { GET_GROUPS, ADD_GROUP, DELETE_GROUP, EDIT_GROUP } from '../actions';
/* eslint-disable no-console, no-case-declarations */
export default (groups = [], action) => {
  switch (action.type) {
    case GET_GROUPS:
      return action.payload;
    case ADD_GROUP:
      if (action.payload.id <= 0) console.log(`bad add id ${action.payload.name}`);
      // return [action.payload, ...groups];
      // const thisGroup = groups.filter(group =>
      //   group.id === -1 && group.name === action.payload.name &&
      //   group.time === action.payload.time && group.completed === action.payload.completed)[0];
      // if (thisGroup) thisGroup.id = action.payload.id;
      return groups;
    case DELETE_GROUP:
      // if (action.payload.id <= 0) console.log(`bad delete id ${action.payload.name}`);

      // const group = groups.filter(group => group.id === action.payload.id)[0];
      // const newGroups = groups.filter(event => event.id !== action.payload.id);
      // group.id = -1;
      // group.eventId = -1;
      // group.name = '';
      // group.time = '00:00';
      // group.completed = false;
      // return newGroups;
      return groups;
    case EDIT_GROUP:
      // // if (action.payload.id <= 0) console.log(`bad id ${action.payload.name}`);
      // return [action.payload, ...(groups.filter(group => group.id !== action.payload.id))];
      return groups;
    default:
      return groups;
  }
};
