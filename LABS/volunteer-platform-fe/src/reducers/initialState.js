export const causeAreas = [
  'Animal Care',
  'Health & Medicine',
  'Computers & Technology',
  'Immigrants & Refugees',
  'Seniors',
  'Faith-Based',
  'Crisis Support',
  'Hunger',
  'Sports & Recreation',
  'Disaster Relief',
  'Education & Literacy',
  'Justice & Legal',
  'Women',
  'Media & Broadcasting',
  'Emergency & Safety',
  'Children & Youth',
  'Politics',
  'Homeless & Housing',
  'People with Disabilities',
  'Environment',
  'Veterans & Military Families',
  'Advocacy & Human Rights',
].sort((a, b) => (a > b ? 1 : -1));

export const requirements = [
  'Background Check',
  'Light Lifting Required',
  'Orientation or Training',
  'Access to Computer',
  'Heavy Lifting Required',
  'Children Require Parent/Guardian',
  'Waiver for Youth',
  'Application Required',
  'Basic Computer Skills',
].sort((a, b) => (a > b ? 1 : -1));

export const interests = [
  'Work with Animals',
  'Virtual',
  'Group Friendly',
  'New' + ' Volunteer Friendly',
  'Religion',
  'Customer Service',
  'Senior Friendly',
  'Helping Homeless',
  'Indoor Work',
  'Family Friendly',
  'Tutoring',
  'Youth Friendly',
  'Wheelchair Accessible',
  'Outdoor Work',
].sort((a, b) => (a > b ? 1 : -1));

const checkLoggedIn = localStorage.getItem('loggedIn') === 'true';
const checkRegistered = localStorage.getItem('userRegistered') === 'true';

export const initialState = {
  auth: {
    loggedIn: checkLoggedIn || false,
    signedUp: checkRegistered || false,
    googleAuthUser: null,
    registeredUser: null,
    topVolunteers: [],
    signInError: null,
    signUpError: null,
    topVolunteersError: null,
    isLoading: false,
    signUpEventError: null,
    cancelSignedUpEventError: null,
    userSearch: null,
  },
  org: {
    createdOrg: false,
    userOrganizations: [],
    topOrganizations: [],
    organizations: [],
    getOrganizationFailedError: '',
    organization: {},
    deleteOrgFailedError: '',
    error: '',
    isLoading: false,
    newOrgId: '',
  },
  events: {
    events: [],
    event: {},
    recurringEvents: [],
    createEventFailedError: '',
    createRecurringEventFailedError: '',
    deleteEventFailedError: '',
    editEventFailedError: '',
    getEventsFailedError: '',
    signUpVolunteerError: '',
    cancelSignedUpVolunteerError: '',
    isLoading: false,
    isSaving: false,
  },
  tags: {
    interests: interests,
    requirements: requirements,
    causeAreas: causeAreas,
    isGetting: false,
    errorMessage: '',
  },
  messages: {
    messages: {},
    orgMessages: {},
    isLoading: false,
    error: '',
  },
  comments: {
    isLoading: false,
    error: '',
    isLoadingReplyToComment: false,
    deletedComment: false,
  },
};

/**
 * State
 * @module State
 *
 */

/**
 * @typedef comments
 * @type {Object}
 * @property {Boolean} isLoading If submitting message has started.
 * @property {String} error Error message if failed.
 * @property {String} isLoadingReplyToComment Error message if failed.
 */

/**
 * @typedef tags
 * @type {Object}
 * @property {Tag[]} interests Array of Tags for the event interests.
 * @property {Tag[]} requirements Array of Tags for the volunteer requirements.
 * @property {Tag[]} causeAreas Array of Tags for organization cause areas.
 * @property {boolean} isGetting Is getting tags from the DB.
 * @property {String} errorMessage Error message for getting tags from DB.
 */

/**
 * @typedef auth
 * @type {Object}
 * @property {boolean} loggedIn Indicates if the user is logged in or not.
 * @property {boolean} signedUp Indicates if the user has completed registration
 * @property {Object} googleAuthUser User object given to use from google auth.
 * @property {User} registeredUser Registered user data
 * @property {User[]} topVolunteers Array of top volunteers
 */

/**
 * @typedef org
 * @type {Object}
 * @property {boolean} createdOrg Indicates if the user has created an org.
 * @property {Organization[]} userOrganizations Organizations user created.
 * @property {String} getOrganizationFailedError Error message
 * @property {Organization} organization Organization from get org by id action.
 * @property {String} deleteOrgFailedError Error message
 * @property {Organization[]} organizations Organizations by state
 */

/**
 * @typedef events
 * @type {Object}
 * @property {Event[]} events Array of events collected from db.
 * @property {RecurringEvent[]}
 * @property {Event} event Event for event page.
 * @property {String} createEventFailedError Create Event Error Message
 * @property {String} createEventFailedError Create Event Error Message
 * @property {String} editEventFailedError Edit Event Error Message
 * @property {String} getEventsFailedError Get Events Error Message
 */

/**
 * @typedef messages
 * @type {Object}
 * @property {MessagesObject} messages Object of messages
 * @property {MessagesObject} orgMessages Object of messages
 * @property {Boolean} isLoading Boolean indicating if we are collecting the user messages.
 * @property {String} error Error message if there is one.
 */
