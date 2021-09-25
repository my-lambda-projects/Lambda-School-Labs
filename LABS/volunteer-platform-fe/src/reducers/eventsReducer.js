import {
  CREATE_EVENT_INIT,
  CREATE_EVENT,
  CREATE_EVENT_FAILED,
  DELETE_EVENT_INIT,
  DELETE_EVENT_FAILED,
  DELETE_EVENT,
  EDIT_EVENT_INIT,
  EDIT_EVENT,
  EDIT_EVENT_FAILED,
  GET_EVENTS_BY_ORG_FAILED,
  GET_EVENTS_BY_ORG,
  ORG_HAS_NO_EVENTS,
  GET_EVENTS_BY_STATE,
  GET_EVENTS_BY_STATE_FAILED,
  NO_EVENTS_FOR_THAT_STATE,
  CREATE_RECURRING_EVENT_INIT,
  CREATE_RECURRING_EVENT,
  CREATE_RECURRING_EVENT_FAILED,
  GET_RECURRING_EVENTS_BY_STATE,
  RECURRING_EVENTS_BY_STATE_EMPTY,
  GET_RECURRING_EVENTS_BY_ORG,
  RECURRING_EVENTS_BY_ORG_EMPTY,
  SIGN_UP_FOR_EVENT_INIT,
  SIGNED_UP_VOLUNTEER_FOR_EVENT,
  SIGN_UP_FOR_EVENT_FAILURE,
  CANCEL_SIGNED_UP_EVENT_INIT,
  CANCELED_VOLUNTEER_FOR_EVENT,
  CANCEL_SIGNED_UP_EVENT_FAILURE,
  GET_EVENT_BY_ID,
  GET_RECURRING_EVENT_BY_ID,
  SIGN_UP_FOR_RECURRING_EVENT_INIT,
  SIGNED_UP_VOLUNTEER_FOR_RECURRING_EVENT,
  SIGN_UP_FOR_RECURRING_EVENT_FAILURE,
  CANCEL_SIGNED_UP_RECURRING_EVENT_INIT,
  CANCELED_VOLUNTEER_FOR_RECURRING_EVENT,
  CANCEL_SIGNED_UP_RECURRING_EVENT_FAILURE,
  GET_EVENTS_BY_ORG_INIT,
  GET_RECURRING_EVENTS_BY_ORG_INIT,
  GET_EVENT_BY_ID_INIT,
} from '../actions/events';

export const eventsReducer = (state, action) => {
  switch (action.type) {
    case GET_EVENT_BY_ID_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case GET_EVENT_BY_ID:
      return {
        ...state,
        event: action.payload,
        isLoading: false,
      };
    case CREATE_EVENT_INIT:
      return {
        ...state,
        createEventFailedError: '',
        isSaving: true,
      };
    case CREATE_EVENT:
      return {
        ...state,
        createEventFailedError: '',
        isSaving: false,
        events: [...state.events, action.payload],
      };
    case CREATE_EVENT_FAILED:
      return {
        ...state,
        isSaving: false,
        createEventFailedError: 'Failed to create event.',
      };
    case DELETE_EVENT_INIT:
      return {
        ...state,
        deleteEventFailedError: '',
        isSaving: true,
      };
    case DELETE_EVENT:
      return {
        ...state,
        deleteEventFailedError: '',
        isSaving: false,
        events: state.events.filter(event => event.eventId !== action.payload),
      };
    case DELETE_EVENT_FAILED:
      return {
        ...state,
        isSaving: false,
        deleteEventFailedError: 'Failed to remove event.',
      };
    case CREATE_RECURRING_EVENT_INIT:
      return {
        ...state,
        isSaving: true,
        createRecurringEventFailedError: '',
      };
    case CREATE_RECURRING_EVENT:
      return {
        ...state,
        isSaving: false,
        createRecurringEventFailedError: '',
      };
    case CREATE_RECURRING_EVENT_FAILED:
      return {
        ...state,
        isSaving: false,
        createRecurringEventFailedError: 'Failure to create recurring event.',
      };
    case GET_RECURRING_EVENTS_BY_STATE:
      return {
        ...state,
        recurringEvents: action.payload,
      };
    case RECURRING_EVENTS_BY_STATE_EMPTY:
      return {
        ...state,
        recurringEvents: [],
      };
    case GET_RECURRING_EVENTS_BY_ORG_INIT:
      return { ...state, isLoading: true };
    case GET_RECURRING_EVENTS_BY_ORG:
      return {
        ...state,
        recurringEvents: [...action.payload],
        isLoading: false,
      };
    case RECURRING_EVENTS_BY_ORG_EMPTY:
      return {
        ...state,
        recurringEvents: [],
        isLoading: false,
      };
    case EDIT_EVENT_INIT:
      return {
        ...state,
        editEventFailedError: '',
        isSaving: true,
      };
    case EDIT_EVENT:
      return {
        ...state,
        editEventFailedError: '',
        isSaving: false,
        events: state.events.map(event => {
          if (event.eventId === action.payload.eventId) {
            return action.payload;
          }
          return event;
        }),
      };
    case EDIT_EVENT_FAILED:
      return {
        ...state,
        isSaving: false,
        editEventFailedError: 'Failed to edit the event.',
      };
    case GET_EVENTS_BY_ORG_INIT:
      return { ...state, isLoading: true };
    case GET_EVENTS_BY_ORG:
      return {
        ...state,
        getEventsFailedError: '',
        events: action.payload,
        isLoading: false,
      };
    case GET_EVENTS_BY_ORG_FAILED:
      return {
        ...state,
        getEventsFailedError: 'Failed to get events',
        isLoading: false,
      };
    case ORG_HAS_NO_EVENTS:
      return {
        ...state,
        events: [],
        getEventsFailedError: '',
        isLoading: false,
      };
    case GET_EVENTS_BY_STATE:
      return { ...state, events: action.payload, getEventsFailedError: '' };
    case GET_EVENTS_BY_STATE_FAILED:
      return {
        ...state,
        events: [],
        getEventsFailedError: 'Failed to get' + ' events for that state.',
      };
    case NO_EVENTS_FOR_THAT_STATE:
      return { ...state, events: [], getEventsFailedError: '' };
    case SIGN_UP_FOR_EVENT_INIT:
      return {
        ...state,
        isSaving: true,
        signUpVolunteerError: '',
      };
    case SIGNED_UP_VOLUNTEER_FOR_EVENT:
      return {
        ...state,
        isSaving: false,
        signUpVolunteerError: '',
        events: state.events.map(event => {
          return event.eventId === action.payload.eventId
            ? action.payload
            : event;
        }),
      };
    case SIGN_UP_FOR_EVENT_FAILURE:
      return {
        ...state,
        isSaving: false,
        signUpVolunteerError: 'Error signing up volunteer for the event',
      };
    case CANCEL_SIGNED_UP_EVENT_INIT:
      return {
        ...state,
        isSaving: true,
        cancelSignedUpVolunteerError: '',
      };
    case CANCELED_VOLUNTEER_FOR_EVENT:
      return {
        ...state,
        isSaving: false,
        cancelSignedUpVolunteerError: '',
        events: state.events.map(event => {
          return event.eventId === action.payload.eventId
            ? action.payload
            : event;
        }),
      };
    case CANCEL_SIGNED_UP_EVENT_FAILURE:
      return {
        ...state,
        isSaving: false,
        cancelSignedUpVolunteerError:
          'Error canceling signed up volunteer for the event',
      };
    case SIGN_UP_FOR_RECURRING_EVENT_INIT:
      return {
        ...state,
        isSaving: true,
        signUpVolunteerError: '',
      };
    case SIGNED_UP_VOLUNTEER_FOR_RECURRING_EVENT:
      return {
        ...state,
        isSaving: false,
        signUpVolunteerError: '',
        recurringEvents: state.recurringEvents.map(event => {
          return event.eventId === action.payload.eventId
            ? action.payload
            : event;
        }),
      };
    case SIGN_UP_FOR_RECURRING_EVENT_FAILURE:
      return {
        ...state,
        isSaving: false,
        signUpVolunteerError:
          'Error signing up volunteer for the recurring event',
      };
    case CANCEL_SIGNED_UP_RECURRING_EVENT_INIT:
      return {
        ...state,
        isSaving: true,
        cancelSignedUpVolunteerError: '',
      };
    case CANCELED_VOLUNTEER_FOR_RECURRING_EVENT:
      return {
        ...state,
        isSaving: false,
        cancelSignedUpVolunteerError: '',
        recurringEvents: state.recurringEvents.map(event => {
          return event.eventId === action.payload.eventId
            ? action.payload
            : event;
        }),
      };
    case CANCEL_SIGNED_UP_RECURRING_EVENT_FAILURE:
      return {
        ...state,
        isSaving: false,
        cancelSignedUpVolunteerError:
          'Error canceling signed up volunteer for the recurring event',
      };
    default:
      return state;
  }
};
