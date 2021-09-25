import firebase, {store} from '../firebase/FirebaseConfig';
import {action} from './action';

export const ADD_COMMENT_INIT = 'ADD_COMMENT_INIT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILED = 'ADD_COMMENT_FAILED';

/**
 * Comments Actions
 * @module actions/comments
 *
 */

/**
 * Add a comment to a event
 * @function
 * @param {Comment} comment Comment to add to the event
 * @param {Event} event Event to add the comment to.
 * @param {Dispatch} dispatch Dispatch for reducer
 * @param {String} eventType Type of event, ["recurring events", "events"]
 */
export const addComment = (comment, event, dispatch, eventType = 'events') => {
  dispatch(action(ADD_COMMENT_INIT));
  store.collection(eventType).doc(event.eventId).get().then(res => {
    if (!res.exists){
      addComment(comment, event, dispatch, 'recurring events');
      return;
    }
    res.ref.update({comments: firebase.firestore.FieldValue.arrayUnion(comment)})
      .then(res => {
        dispatch(action(ADD_COMMENT_SUCCESS));
      })
      .catch(err => {
        dispatch(action(ADD_COMMENT_FAILED, err.message));
      });
    
  });
};

export const ADD_COMMENT_TO_COMMENT_INIT = 'ADD_COMMENT_TO_COMMENT_INIT';
export const ADD_COMMENT_TO_COMMENT_SUCCESS = 'ADD_COMMENT_TO_COMMENT_SUCCESS';
export const ADD_COMMENT_TO_COMMENT_FAIL = 'ADD_COMMENT_TO_COMMENT_FAIL';

/**
 * Add a comment to a event comment.
 * @function
 * @param {Comment} comment Comment to add to the comment
 * @param {Event} event Event the comment is on.
 * @param {Comment} commentToAddTo Comment which to add the comment to.
 * @param {Dispatch} dispatch Dispatch for the reducer.
 * @param {String} [eventType] Type of event, ["recurring events", "events"]
 */
export const addCommentToComment = (comment, event, commentToAddTo,
  dispatch, eventType = 'events') => {
  dispatch(action(ADD_COMMENT_TO_COMMENT_INIT));
  store.collection(eventType).doc(event.eventId).get().then(res => {
    
    if (!res.exists){
      addCommentToComment(
        comment,
        event,
        commentToAddTo,
        dispatch, 'recurring events');
      return;
    }
    
    const data = res.data();
    const comments = data.comments.map(commentInDb => {
      if (commentInDb.commentId === commentToAddTo.commentId){
        commentInDb.replies = commentInDb.replies ?
          [...commentInDb.replies, comment] :
          [comment];
      }
      return commentInDb;
    });
    res.ref.update({comments}).then(res => {
      dispatch(action(ADD_COMMENT_TO_COMMENT_SUCCESS));
    });
  }).catch(err => {
    dispatch(action(ADD_COMMENT_TO_COMMENT_FAIL, err.message));
  });
};

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED';

/**
 *  Deletes a comment from a event.
 * @param {Comment} commentToDeleteId Comment that needs to be deleted.
 * @param {Event} event Event to delete the comment from.
 * @param {Dispatch} dispatch Dispatch for reducers.
 * @param {String} [eventType] Type of event, ["recurring events", "events"]
 * */
export const deleteComment = (commentToDeleteId, event, dispatch,
  eventType = 'events') => {
  
  store.collection(eventType).doc(event.eventId).get().then(res => {
    if (res.exists){
      const data = res.data();
      
      //get new array of comments.
      let comments = data.comments.map(comment => {
        
        //return comment if id !== the commentToDelete id.
        if (comment.commentId !== commentToDeleteId){
          
          //check nested comments
          if (comment.replies){
            
            comment.replies = comment.replies.map(nestedComment => {
              
              // return nested comment if nestedComment !== commentToDeleteId.
              if (nestedComment.commentId !== commentToDeleteId){
                return nestedComment;
              }
            });
            comment.replies = comment.replies.filter(
              nestedComment => nestedComment !== undefined);
          }
          return comment;
        }
      });
      
      comments = comments.filter(comment => comment !== undefined);
      
      res.ref.update({comments}).then(res => {
        dispatch(action(DELETE_COMMENT_SUCCESS));
      });
    }else{
      deleteComment(commentToDeleteId, event, dispatch, 'recurring events');
    }
  }).catch(err => {
    console.log(err);
    dispatch(action(DELETE_COMMENT_FAILED));
  });
};

export const DELETE_COMMENT_CLEAR_SUCCESS = 'DELETE_COMMENT_CLEAR_SUCCESS';

export const deleteCommentClearSuccess = (dispatch) => {
  dispatch(action(DELETE_COMMENT_CLEAR_SUCCESS));
};