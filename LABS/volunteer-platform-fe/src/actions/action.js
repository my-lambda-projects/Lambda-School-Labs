/**
 * Create Action
 *
 * @function
 * @param {ActionType} type
 * @param {*} [payload]
 * @returns {Action} action - action for reducer
 */
export const action = ( type, payload ) => {
  if( payload ){
    return { type, payload };
  }
  return { type };
};