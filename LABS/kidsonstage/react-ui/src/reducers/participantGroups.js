import { GET_PART_GROUPS, ADD_PART_GROUP, EDIT_PART_GROUP, DELETE_PART_GROUP } from '../actions';
/* eslint-disable no-console, no-case-declarations */
export default (partGroups = [], action) => {
  switch (action.type) {
    case GET_PART_GROUPS:
      // console.log(`PartGroup reducer action.payload: ${JSON.stringify(action.payload)}`);
      return action.payload;
    case ADD_PART_GROUP:
      return [action.payload, ...partGroups];
    case DELETE_PART_GROUP:
      return partGroups.filter(partGroup => partGroup.id !== action.payload);
    case EDIT_PART_GROUP:
      return [...partGroups.filter(partGroup => partGroup.id !== action.payload.id),
        action.payload];
    default:
      return partGroups;
  }
};
