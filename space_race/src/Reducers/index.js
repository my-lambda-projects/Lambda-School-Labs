import { combineReducers } from 'redux';
import RTeamReducer from './RandomTeamReducer';
import RColorReducer from './RandomColorReducer';
import CreateReducer from './CreateRaceReducer';
import showRacesReducer from './showRaces';
import LogInReducer from './LogIn';
import adminDeliveryReducer from './adminDeliveryReducer';
import StudentReducer from './studentReducer';
import CreateRaceReducer from './CreateRaceReducer';

import AuthReducer from  './AuthenticationReducer';
import BillingReducer from './BillingReducer';
const RootReducers = combineReducers({
    Auth: AuthReducer,
    RandomTeamData: RTeamReducer,
    RandomColorData: RColorReducer,
    modal: BillingReducer,
    // TeamsArray: ShuffleReducer,
    FormData: CreateReducer,
    Races: showRacesReducer,
    LogIn: LogInReducer,
    AdminDelivery: adminDeliveryReducer,
    Student: StudentReducer,
    CreateRace: CreateRaceReducer,
})

export default RootReducers;
