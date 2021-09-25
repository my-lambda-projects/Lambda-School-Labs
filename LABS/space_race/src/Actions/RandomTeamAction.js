/**
 * 
 * NOTE!!! READ THIS!!!
 * Since we are calling MathRandom in part of the reducer function, it breaks the rule of redux by making it an impure function i.e. it doesn't give the 
 * same result everytime.  To get around this, we must pass the random result as arguments to the action creator.  See notes in RandomGenerator.js
 * 
 * 
 * 
 * 
 */
export const RANDOM_TEAM_ACTION = 'random_team';

export function RandomTeamAction(team) {
  return {
    type: RANDOM_TEAM_ACTION,
    payload: team
  };
}