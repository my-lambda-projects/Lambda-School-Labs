// still in progress

import { combineReducers } from 'redux';
import jobListing from './jobListingReducers';
import hirePartner from './hirePartnerReducers';
import clients from './clientsReducers';

const reducers = combineReducers({
  jobListing,
  hirePartner,
  clients
});

export default reducers;