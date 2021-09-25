import {
  EVENTS_CREATE_START,
  EVENTS_CREATE_COMPLETE,
  EVENTS_CREATE_ERROR,

  EVENT_DELETE_START,
  EVENT_DELETE_COMPLETE,
  EVENT_DELETE_ERROR,

  EVENT_UPDATE_START,
  EVENT_UPDATE_COMPLETE,
  EVENT_UPDATE_ERROR,

  EVENTS_GET_START,
  EVENTS_GET_COMPLETE,
  EVENTS_GET_ERROR,

  EVENT_GET_START,
  EVENT_GET_COMPLETE,
  EVENT_GET_ERROR,

  EVENTS_INVITE_START,
  EVENTS_INVITE_COMPLETE,
  EVENTS_INVITE_ERROR
} from "../actions/eventsActions";

const initialState = {
  event: {},
  events: [],
  attendees: [],
  pendingCount: 0,
  fetchingEvents: false,
  fetchedEvents: false,

  fetchingEvent: false,
  fetchedEvent: false,

  updatingEvent: false,
  updatedEvent: false,

  creatingEvent: false,
  createdEvent: false,

  deletingEvent: false,
  deletedEvent: false,

  invitingEvent: false,
  invitedEvent: false,

  error: null
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS_GET_START:
      return {
        ...state,
        fetchingEvents: true,
        fetchedEvents: false
      };
    case EVENT_GET_START:
      return {
        ...state,
        fetchingEvent: true,
        fetchedEvent: false
      };
    case EVENTS_GET_COMPLETE:
      return {
        ...state,
        events: action.payload,
        pendingCount: action.payload.pending.length,
        fetchingEvents: false,
        fetchedEvents: true,
        error: null
      };
    case EVENT_GET_COMPLETE:
      return {
        ...state,
        event: action.payload,
        attendees: action.payload.users,
        fetchingEvent: false,
        fetchedEvent: true,
        error: null
      };
    case EVENTS_GET_ERROR:
      return {
        ...state,
        error: "Error fetching events"
      };
    case EVENT_GET_ERROR:
      return {
        ...state,
        error: "Error fetching this event"
      };
    case EVENT_DELETE_START:
      return {
        ...state,
        deletingEvent: true
      };
    case EVENT_DELETE_COMPLETE:
      return {
        ...state,
        events: action.payload,
        deletingEvent: false,
        deletedEvent: true,
        error: null
      };
    case EVENT_DELETE_ERROR:
      return {
        ...state,
        error: "Error deleting events"
      };
    case EVENTS_CREATE_START:
      return {
        ...state,
        creatingEvent: true,
        createdEvent: false
      };

    case EVENTS_CREATE_COMPLETE:
      return {
        ...state,
        events: action.payload,
        creatingEvent: false,
        createdEvent: true,
        error: null
      };
    case EVENTS_CREATE_ERROR:
      return {
        ...state,
        creatingEvent: false,
        createdEvent: false,
        error: "Error deleting events"
      };

    case EVENT_UPDATE_START:
      return {
        ...state,
        events: action.payload,
        updatingEvents: true,
        updatedEvents: false
      };

    case EVENT_UPDATE_COMPLETE:
      console.log(action.payload);
      return {
        ...state,
        updatingEvents: false,
        updatedEvents: true,
        error: null,
        events: action.payload
      };

    case EVENT_UPDATE_ERROR:
      return {
        ...state,
        error: "Error updating Events"
      };

    case EVENTS_INVITE_START:
      return {
        ...state,
        invitingEvent: true,
        invitedEvent: false,        
      };
          
    case EVENTS_INVITE_COMPLETE:
      return {
        ...state,
        invitingEvent: false,
        invitedEvent: true,        
      };

    case EVENTS_INVITE_ERROR:
      return {
        ...state,
        error: "Events invite Error D;"
      };

    default:
      return state;
  }
};

export default eventsReducer;
