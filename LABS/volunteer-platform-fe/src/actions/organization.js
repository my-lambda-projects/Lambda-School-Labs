import { action } from './action';
import { deleteFile } from './files';
import firebase, { store } from '../firebase/FirebaseConfig';
import { getLatLong } from '../utility/geoCode';

/**
 * Auth Actions
 * @module actions/organizations
 *
 */

export const CREATED_ORGANIZATION = 'CREATED_ORGANIZATION';
export const CREATE_ORGANIZATION_INIT = 'CREATE_ORGANIZATION_INIT';
export const CREATE_ORGANIZATION_FAIL = 'CREATE_ORGANIZATION_FAIL';

/**
 * Register a new non profit organization.
 * @function
 * @param {Organization} org - non profit to be registered
 * @param {Dispatch} dispatch
 */
export const registerOrganization = (org, dispatch) => {
  dispatch({ type: CREATE_ORGANIZATION_INIT });
  return store
    .collection('organizations')
    .add(org)
    .then(res => {
      org.orgId = res.id;
      dispatch(action(CREATED_ORGANIZATION, org))
    })
    .catch(err => {
      dispatch({ type: CREATE_ORGANIZATION_FAIL, payload: err.message });
    });
};

export const GET_USER_ORGANIZATIONS_INIT = 'GET_USER_ORGANIZATIONS_INIT';
export const GET_USER_ORGANIZATIONS = 'GET_USER_ORGANIZATIONS';
export const GET_USER_ORGANIZATIONS_FAILED = 'GET_USER_ORGANIZATIONS_FAILED';

/**
 * Gets all the users organizations
 * @function
 * @param {string} uid User unique id from google auth.
 * @param {Dispatch} dispatch From useStateValue hook
 */
export const subscribeToUserOrganizations = (uid, dispatch) => {
  dispatch(action(GET_USER_ORGANIZATIONS_INIT));
  return store
    .collection('organizations')
    .where('organizationOwnerUID', '==', uid)
    .onSnapshot(snapShot => {
      const orgs = [];
      if (!snapShot.empty) {
        localStorage.setItem('createdOrg', 'true');
      } else {
        localStorage.setItem('createdOrg', 'false');
      }
      snapShot.forEach(doc => {
        const org = doc.data();
        org.orgId = doc.id;
        orgs.push(org);
      });
      dispatch(action(GET_USER_ORGANIZATIONS, orgs));
    });
};

export const GET_ORG_BY_ID_INIT = 'GET_ORG_BY_ID_INIT';
export const GET_ORG_BY_ID = 'GET_ORG_BY_ID';
export const GET_ORG_BY_ID_FAILED = 'GET_ORG_BY_ID_FAILED';

/**
 * Get Organization by org_id
 * @function
 * @param {String} orgId
 * @param {Dispatch} dispatch
 */
export const getOrganizationByOrgId = (orgId, dispatch) => {
  dispatch(action(GET_ORG_BY_ID_INIT));
  store
    .collection('organizations')
    .doc(orgId)
    .get()
    .then(res => {
      if (res.exists) {
        const org = res.data();
        org.orgId = res.id;
        getLatLong(
          org.address || org.streetAddress + ' ' + org.city + ', ' + org.state
        ).then(({ lat, lng }) => {
          org.lat = lat;
          org.lng = lng;
        });
        dispatch(action(GET_ORG_BY_ID, org));
      }else {
        dispatch(action(GET_ORG_BY_ID_FAILED));
      }
    })
    .catch(err => {
      dispatch(action(GET_ORG_BY_ID_FAILED, err));
    });
};

export const UPDATE_ORGANIZATION_INIT = 'UPDATE_ORGANIZATION_INIT';
export const UPDATE_ORGANIZATION_SUCCESS = 'UPDATE_ORGANIZATION_SUCCESS';
export const UPDATE_ORGANIZATION_FAIL = 'UPDATE_ORGANIZATION_FAIL';

/**
 * Update an organization in the db
 * @function
 * @param {String} orgId
 * @param {Organization} updates
 * @param {Dispatch} dispatch
 */

export const updateOrganization = (orgId, updates, dispatch) => {
  dispatch({ type: UPDATE_ORGANIZATION_INIT });
  store
    .collection('organizations')
    .doc(orgId)
    .set(updates)
    .then(res => {
      dispatch({ type: UPDATE_ORGANIZATION_SUCCESS });
    })
    .catch(err => {
      dispatch({ type: UPDATE_ORGANIZATION_FAIL });
    });
};

export const DELETE_ORG_INIT = 'DELETE_ORG_INIT';
export const DELETE_ORG = 'DELETE_ORG';
export const DELETE_ORG_FAILED = 'DELETE_ORG_FAILED';

/**
 * Delete an organization in the db
 * @function
 * @param {String} orgId
 * @param {Dispatch} dispatch
 */
export const deleteOrganization = (orgId, dispatch) => {
  dispatch(action(DELETE_ORG_INIT));
  store
    .collection('organizations')
    .doc(orgId)
    .delete()
    .then(res => {
      dispatch(action(DELETE_ORG, orgId));
    })
    .catch(err => {
      console.log(err);
      dispatch(action(DELETE_ORG_FAILED));
    });
};

/**
 * Delete an organization from the db.
 * @function
 * @param {Organization} organization Organization to delete.
 */
export const deleteOrganizationImage = organization => {
  deleteFile(organization.imagePath);
  delete organization.imagePath;
  delete organization.imageUrl;

  store
    .collection('organizations')
    .doc(organization.orgId)
    .set(organization)
    .then(res => {})
    .catch(err => {
      console.log(err);
    });
};

export const GET_TOP_ORGANIZATIONS_INIT = 'GET_TOP_ORGANIZATIONS_INIT';
export const GET_TOP_ORGANIZATIONS = 'GET_TOP_ORGANIZATIONS';
export const THERE_ARE_NO_ORGANIZATIONS = 'THERE_ARE_NO_ORGANIZATIONS';
export const GET_TOP_ORGANIZATIONS_FAILED = 'GET_TOP_ORGANIZATIONS_FAILED';

/**
 * Gets the top organizations to display on the front page.
 * @function
 * @param {Dispatch} dispatch
 */
export const getTopOrganizations = dispatch => {
  dispatch(action(GET_TOP_ORGANIZATIONS_INIT));
  store
    .collection('organizations')
    .limit(20)
    .get()
    .then(res => {
      if (!res.empty) {
        const topOrgs = [];
        res.forEach(org => {
          const data = org.data();
          data.orgId = org.id;

          topOrgs.push(data);
        });
        return dispatch(action(GET_TOP_ORGANIZATIONS, topOrgs));
      }
      return dispatch(action(THERE_ARE_NO_ORGANIZATIONS));
    })
    .catch(err => {
      console.log(err);
      dispatch(action(GET_TOP_ORGANIZATIONS_FAILED, err.message));
    });
};

export const GET_ORGANIZATIONS_BY_STATE_INIT =
  'GET_ORGANIZATIONS_BY_STATE_INIT';
export const GET_ORGANIZATIONS_BY_STATE_SUCCESS =
  'GET_ORGANIZATIONS_BY_STATE_SUCCESS';
export const GET_ORGANIZATIONS_BY_STATE_EMPTY =
  'GET_ORGANIZATIONS_BY_STATE_EMPTY';

export const GET_ORGANIZATIONS_BY_STATE_FAILED =
  'GET_ORGANIZATIONS_BY_STATE_FAILED';

export const getOrganizationsByState = (state, dispatch) => {
  dispatch(action(GET_ORGANIZATIONS_BY_STATE_INIT));
  store
    .collection('organizations')
    .where('state', '==', state)
    .get()
    .then(res => {
      if (res.empty) {
        dispatch(action(GET_ORGANIZATIONS_BY_STATE_EMPTY));
        return;
      }

      const organizations = [];
      res.forEach(org => {
        const data = org.data();
        data.orgId = org.id;
        organizations.push(data);
      });
      dispatch(action(GET_ORGANIZATIONS_BY_STATE_SUCCESS, organizations));
    })
    .catch(err => {
      console.log(err);
      dispatch(action(GET_ORGANIZATIONS_BY_STATE_FAILED, err.message));
    });
};
