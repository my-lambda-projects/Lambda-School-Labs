import { RANDOM_TEAM_ACTION } from '../Actions';
/** this is to be used for choosing random order of teams in the race card view */
const initialState = {
    team: null
};
export default (state = initialState, action) => {
    switch (action.type) {
        
        case RANDOM_TEAM_ACTION: 
            return {
                team: action.team
            };
        default:
            return state;
    }
}


/***
 * 
 * 
 * REMINDER: in order for this to work we must pass the random values as arguments to the action creator outside of this reducer.
 * so, whatever component that will call for a random color must first import RandomTeam from RandomGenerator.js and also import the action creator for
 * this reducer which is RandomTeamAction.
 * 
 * and then dispatch the action like so:    RandomTeamAction(RandomTeam());
 * 
 * 
 */