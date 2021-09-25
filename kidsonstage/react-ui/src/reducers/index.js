import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import UsersReducer from './users';
import EventReducer from './events';
import GroupReducer from './groups';
import ActiveEvent from './activeEvent';
import PartGroupReducer from './participantGroups';
import InvitedEventsReducer from './invitedEvents';
import EventInvitesReducer from './eventInvites';
import StripeErrorReducer from './stripe';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  users: UsersReducer,
  events: EventReducer,
  event: ActiveEvent,
  groups: GroupReducer,
  partGroups: PartGroupReducer,
  invitedEvents: InvitedEventsReducer,
  eventInvites: EventInvitesReducer,
  stripeError: StripeErrorReducer,
});

export default rootReducer;
