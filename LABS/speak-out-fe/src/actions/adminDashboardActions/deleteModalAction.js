export const TOGGLE_DELETE_MODAL = 'TOGGLE_DELETE_MODAL';

export const toggleDeleteModel = boolValue => {
  return { type: TOGGLE_DELETE_MODAL, payload: boolValue };
};
