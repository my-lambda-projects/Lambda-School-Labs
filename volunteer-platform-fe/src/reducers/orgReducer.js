import {
  GET_USER_ORGANIZATIONS,
  GET_USER_ORGANIZATIONS_FAILED,
  CREATE_ORGANIZATION_INIT,
  CREATED_ORGANIZATION,
  CREATE_ORGANIZATION_FAIL,
  GET_ORG_BY_ID,
  GET_ORG_BY_ID_FAILED,
  UPDATE_ORGANIZATION_INIT,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_FAIL,
  DELETE_ORG,
  DELETE_ORG_FAILED,
  GET_TOP_ORGANIZATIONS,
  GET_TOP_ORGANIZATIONS_FAILED,
  THERE_ARE_NO_ORGANIZATIONS,
  GET_ORGANIZATIONS_BY_STATE_FAILED,
  GET_ORGANIZATIONS_BY_STATE_SUCCESS,
  GET_ORGANIZATIONS_BY_STATE_EMPTY,
  GET_ORGANIZATIONS_BY_STATE_INIT,
  GET_ORG_BY_ID_INIT,
  GET_USER_ORGANIZATIONS_INIT,
  DELETE_ORG_INIT,
  GET_TOP_ORGANIZATIONS_INIT
} from '../actions/organization';

import {initialState} from './initialState'
import { SIGNED_OUT } from '../actions';

export const orgReducer = (state, action) => {
  switch (action.type) {
    case GET_ORGANIZATIONS_BY_STATE_INIT:
    case GET_USER_ORGANIZATIONS_INIT:
    case GET_ORG_BY_ID_INIT:
    case DELETE_ORG_INIT:
    case GET_TOP_ORGANIZATIONS_INIT:
    case CREATE_ORGANIZATION_INIT:
    case UPDATE_ORGANIZATION_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case CREATED_ORGANIZATION:
        return {
            ...state,
            isLoading: false,
            newOrgId: action.payload.orgId
        }
    case CREATE_ORGANIZATION_FAIL:
    case UPDATE_ORGANIZATION_FAIL:
    case UPDATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case GET_ORGANIZATIONS_BY_STATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        organizations: action.payload,
      };
    case GET_ORGANIZATIONS_BY_STATE_EMPTY:
      return {
        ...state,
        isLoading: false,
        organizations: [],
        error: 'There are no organizations for that state.',
      };
    case GET_ORGANIZATIONS_BY_STATE_FAILED:
      return {
        ...state,
        isLoading: false,
        organizations: [],
        error: action.payload,
      };
    case GET_USER_ORGANIZATIONS:
      let orgs = action.payload;
      return {
        ...state,
        createdOrg: orgs.length > 0,
        userOrganizations: action.payload,
        isLoading: false,
      };
    case GET_USER_ORGANIZATIONS_FAILED:
      return {
        ...state,
        createdOrg: false,
        userOrganizations: [],
        getOrganizationFailedError: 'Failed to get organizations',
        isLoading: false,
      };
    case GET_ORG_BY_ID:
      return {
        ...state,
        organization: action.payload,
        isLoading: false
      };
    case GET_ORG_BY_ID_FAILED:
      return {
        ...state,
        organization: {},
        getOrganizationFailedError: 'Failed to get specified organization',
        isLoading: false
      };
    case DELETE_ORG:
      return {
        ...state,
        deleteEventFailedError: '',
        userOrganizations: state.userOrganizations.filter(
          org => org.orgId !== action.payload
        ),
        isLoading: false
      };
    case DELETE_ORG_FAILED:
      return {
        ...state,
        deleteOrgFailedError: 'Failed to remove org.',
        isLoading: false
      };
    case GET_TOP_ORGANIZATIONS:
      return {
        ...state,
        topOrganizations: action.payload,
        isLoading: false
      };
    case GET_TOP_ORGANIZATIONS_FAILED:
      return {
        ...state,
        topOrganizations: [],
        error: action.payload,
        isLoading: false
      };
    case THERE_ARE_NO_ORGANIZATIONS:
      return {
        topOrganizations: [],
        error: 'There are no organizations.',
        isLoading: false
      };
    case SIGNED_OUT:
      return {
        ...initialState.org,
      };
    default:
      return state;
  }
};
