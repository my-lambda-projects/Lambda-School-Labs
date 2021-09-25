import { RANDOM_COLOR_ACTION } from '../Actions';

const initialState = {
    color: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case RANDOM_COLOR_ACTION: 
            return {
                color: action.color  //we do not set it to action.payload because we need a pure function, the random generator logic cannot be implemented here.
            };
        default:
            return state;
    }
}

/***
 * 
 * 
 * REMINDER: in order for this to work we must pass the random values as arguments to the action creator outside of this reducer.
 * so, whatever component that will call for a random color must first import RandomColor from RandomGenerator.js and also import the action creator for
 * this reducer which is RandomColorAction.
 * 
 * and then dispatch the action like so:    RandomColorAction(RandomColor());
 * 
 * 
 */