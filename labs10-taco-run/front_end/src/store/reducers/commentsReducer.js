import {
  COMMENTS_GET_START,
  COMMENTS_GET_COMPLETE,
  COMMENTS_GET_ERROR,
  MAKE_COMMENT_START,
  MAKE_COMMENT_COMPLETE,
  MAKE_COMMENT_ERROR,
  UPDATE_COMMENT_START,
  UPDATE_COMMENT_COMPLETE,
  UPDATE_COMMENT_ERROR,
  DELETE_COMMENT_START,
  DELETE_COMMENT_COMPLETE,
  DELETE_COMMENT_ERROR
} from "../actions/commentsActions";

const initialState = {
  comments: [],
  fetchingComments: false,
  fetchedComments: false,
  makingComment: false,
  updatingComment: false,
  deletingComment: false,
  error: null
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_GET_START:
      return {
        ...state,
        fetchingEvents: true,
        fetchedEvents: false
      };
    case COMMENTS_GET_COMPLETE:
      return {
        ...state,
        comments: action.payload,
        fetchingEvents: false,
        fetchedEvents: true,
        error: null
      };

    case COMMENTS_GET_ERROR:
      return {
        ...state,
        error: "Error fetching events"
      };

    case MAKE_COMMENT_START:
      return {
        ...state,
        makingComment: true,
        error: null
      };
    case MAKE_COMMENT_COMPLETE:
      return {
        ...state,
        makingComment: false,
        comments: action.payload
      };
    case MAKE_COMMENT_ERROR:
      return {
        ...state,
        error: "failed making comment"
      };
    case UPDATE_COMMENT_START:
      return {
        ...state,
        updatingComment: true
      };
    case UPDATE_COMMENT_COMPLETE:
      return {
        ...state,
        updatingComment: false,
        comments: action.payload
      };
    case UPDATE_COMMENT_ERROR:
      return {
        ...state,
        updatingComment: false,
        error: "error updating comment"
      };
    case DELETE_COMMENT_START:
      return {
        ...state,
        deletingComment: true,
        error: null
      };
    case DELETE_COMMENT_COMPLETE:
      return {
        ...state,
        deletingComment: false,
        error: null,
        comments: state.comments.filter(c => c.id !== action.id)
      };
    case DELETE_COMMENT_ERROR:
      return {
        ...state,
        deletingComment: false,
        error: "error deleting comment"
      };
    default:
      return state;
  }
};

export default eventsReducer;
