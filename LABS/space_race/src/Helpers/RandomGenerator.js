
/***THESE FORMULAS CAN BE USED IN A FEW DIFFERENT WAYS:
 * 
 * 
 * example 1: You only want to assign students to a random team.  you will use rando().  it is assumed the teacher will enter the names of the teams
 * .  these teams will be passed in as an array arr.
 *    
 *    const arr = [team1, team2, team3];
 *    (now a student enters the game):
 *    rando(arr) = team1.         
 * 
 * IMPORTANT!! THESE FUNCTIONS CAN BE USED INSIDE REDUX OR JUST IN A REACT COMPONENT WITHOUT REDUX.  IF NEEDING REDUX, REFER TO THE NOTES AT BOTTOM SHOWING HOW TO 
 * USE THESE WITH THE ACTION CREATOR!!!!
 * 
 * 
 * 
 * These are all helper functions to assist in choosing random elements from an array, and likewise producing an array of random elements.
 */
/*****get a random element from an array use this function to randomize teams where arr = array containing all teams
 *  THIS METHOD IS TO BE USED IF IF THE TEACHER FILLS IN THE NAMES OF THE TEAMS AND DOES NOT USE RANDOMIZE WHICH WILL PRODUCE TEAM NAMES RANDOMLY.
*/
export function rando(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**************************************************************************************************** */

/**** produces a random string use this function if you want the app to produce a team name for you***/   
export function Randomize() {
    const adjectives = ['orbital', 'planetary', 'cosmic', 'astral', 'astranomical', 'celestial', 'galactic', 'heavenly', 'intergalactic', 'lunar', 'martian', 'meteoric', 'solar', 'stellar', 'quantum', 'blazingly'];
  
    const nouns = ['nebula', 'epsilon', 'gundam', 'robo', 'lightspeed', 'supernova', 'antimatter', 'asteroid', 'black hole', 'cluster', 'comet', 'exoplanet', 'galling star', 'galaxy', 'moon', 'orb', 'wormhole', 'quasar', 'universe', 'Uranus', 'Pluto', 'Mars', 'martian', 'alien', 'Draconian', 'Grey', 'flux capacitor', 'invaders'];
  
    return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
  }


  /****************************************************************************************************** */
/*****produces an array of length n, of colors */
export function RandomColor(n=1) {
    const ColorArray = ['#FFFF00', '#FFA500', '#FF1493', '#FF0000', '#00FF00', '#008000', '#40E0D0', '#4682B4', '#B0C4DE', '#0000FF', '#A52A2A', '#C0C0C0', '#808080', '#000000'];
    let tempArray = [];
    for (let i = 0; i < ColorArray.length; i++ ) {
        tempArray.push(i);
    }
    let choiceArray = [];
    for (let j = 0; j < n; j++) {
        let randIndex = rando(tempArray);
        let choice = ColorArray.splice(randIndex, 1);
        choiceArray.push(choice);
        }
    return choiceArray;
}
/****************************************************************************************************************************** */



/****produces an array of length n,  of random team names.  this function is only to be used to produce n amount of automatically generated 
 * team names.  the return value will be 3 randomly generated team names if n is three. by default n is 1.  once you have your array of team names, 
 * you can randomly assign them to students with  rando().  again, this doesn't balance the teams or ensure you get an even number of players per team
 * THAT IS THE ISSUE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
*/
export function RandomTeams(n=1) {
  teamsArray=[];
  for (let i =0; i < n; i++) {
    let team = Randomize();
    teamsArray.push(team);
  }
  return teamsArray;
} 

/**
 * this part is tricky. previously, the action was set up incorrectly, because it calls for an impure function in the reducer.  Albeit the random function to shuffle the teams was fine on its own, but since I have to 
 * redo it, Ive expanded the random function to also randomize colors as well, and the random function will not modify its arguments, however, since it still calls for a random action, it is 
 * still impure.  NOTE:  to get around this I will pass the random return values as arguments to the action creator.
 * 
 * 
 * (in the actions file we will have this action creator)
 * 
* ex:     function RandomTeamAction(team) {
 *            return {
 *              type: 'RANDOM_TEAM_ACTION',
 *              payload: team
 *                     
 *            }
 *        }
 * **************************************************************************
 * 
 * outside of this elsewhere in the code we will do this:
 *        
 *        import RandomTeamAction from './Actions';
 *        import RandomTeams from './RandomGenerator';
 * 
 *        // somewhere in the component code we will dispatch the action like so:
 *        // NOTE: as usual we will probably need the context 'this', or 'this.props'
 *        
 *          RandomTeamAction(RandomTeams());
 * 
 * **************************************************************************
 *  Since the action creator is being passed the portion that caused the reducer to 
 *  originally be impure, we no longer get undesired side effects.  The randomizing logic
 *  is implemented outside of the reducer through the function below and finally handled by
 *  the action creator inside of the component.
 * 
 *      function RandomTeams();  which is defined above, so all that is needed is that both RandomTeamAction and RandomTeams be imported 
 *                               into the component that needs to use them.  This same rule applies for RandomColor.
 *     
 * 
 */
