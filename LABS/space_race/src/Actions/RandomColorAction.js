/**************
 * 
 * 
 * 
 * 
 * SEE NOTES IN RandomGenerator.js file on the workarounds for this type of action.
 */

 export const RANDOM_COLOR_ACTION = 'random_color';

 export function RandomColorAction(color) {
     return {
         type: RANDOM_COLOR_ACTION,
         payload: color
     };
 }