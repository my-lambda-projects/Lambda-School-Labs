import {store} from '../firebase/FirebaseConfig';
import {action} from './action';
import {arrayUnion} from 'firebase';
import firebase from '../firebase/FirebaseConfig';
import moment from 'moment';

export const MESSAGE_CREATED_SUCESSFULLY = 'MESSAGE_CREATED_SUCESSFULLY';

/**
 * Message Actions
 * @module actions/messaging
 *
 */

/**
 * Send a message to another user.
 * @function
 * @param {MessageContact} to Who the message is to
 * @param {MessageContact} from Who the message is from
 * @param {Message} message Message to be sent.
 */
export const sendMessage = (to, from, message) => {
  attachMessageToUsersMessages(to, from, message);
  attachMessageToUsersMessages(from, to, message);
};

const attachMessageToUsersMessages = (to, from, message) => {
  store
    .collection(to.type)
    .doc(to.uid)
    .collection('messages')
    .doc(from.uid)
    .get()
    .then(res => {
      // message thread does not exist.
      if (!res.exists){
        createNewMessageThread(from, to, message);
      }else{
        const data = res.data();
        
        res.ref
          .update({
            updatedAt: moment().unix(),
            unreadMessages:
              message.from === to.uid ? 0 : data.unreadMessages + 1,
            messages: firebase.firestore.FieldValue.arrayUnion(message),
          })
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * Creates a new message thread for the desired contacts.
 * @function
 * @param {MessageContact} to Who the message is to
 * @param {MessageContact} from Who the message is from
 * @param {String} message
 */
export const createNewMessageThread = (to, from, message = null) => {
  store
    .collection(from.type)
    .doc(from.uid)
    .collection('messages')
    .doc(to.uid)
    .get()
    .then(res => {
      if (!res.exists){
        store
          .collection(to.type)
          .doc(to.uid)
          .get()
          .then(res => {
            const contact = res.data();
            
            const messageThread = {
              name:
                to.type === 'organizations'
                  ? contact.organizationName
                  : `${contact.firstName} ${contact.lastName}`,
              contactType: to.type,
              messages: message ? [message] : [],
              updatedAt: moment().unix(),
              unreadMessages: message ? 1 : 0,
            };
            // create messageThread in users messages
            store
              .collection(from.type)
              .doc(from.uid)
              .collection('messages')
              .doc(to.uid)
              .set(messageThread)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const USER_HAS_NO_MESSAGES = 'USER_HAS_NO_MESSAGES';
export const COLLECTED_USER_MESSAGES = 'COLLECTED_USER_MESSAGES';
export const COLLECTING_USER_MESSAGES_INIT = 'COLLECTING_USER_MESSAGES_INIT';

/**
 * Subscribe to the users messages.
 * @function
 * @param {MessageContact} contact
 * @param {Dispatch} dispatch
 */
export const subscribeToMessages = (contact, dispatch) => {
  dispatch(action(COLLECTING_USER_MESSAGES_INIT));
  return store
    .collection(contact.type)
    .doc(contact.uid)
    .collection('messages')
    .orderBy('updatedAt', 'desc')
    .onSnapshot((snapshot) => {
      if (snapshot.empty){
        dispatch(action(USER_HAS_NO_MESSAGES, contact.uid));
        return;
      }
      const messageThreads = [];
      snapshot.forEach(async doc => {
        const messageThread = doc.data();
        messageThread.id = doc.id;
        if (!messageThread.imagePath){
          messageThread.imagePath = `images/${messageThread.id}`;
          doc.ref.update(messageThread);
        }
        messageThreads.push(messageThread);
      });
      
      const messageObject = {[ contact.uid ]: messageThreads};
      
      dispatch(action(COLLECTED_USER_MESSAGES, messageObject));
    });
};

/**
 * Marks the message thread as read.
 * @function
 * @param {MessageContact} contact The contact that has read the thread.
 * @param {MessageThread} messageThread The message thread that has been read.
 */
export const markMessagesRead = (contact, messageThread) => {
  store
    .collection(contact.type)
    .doc(contact.uid)
    .collection('messages')
    .doc(messageThread.id)
    .update({unreadMessages: 0})
    .then(res => {
    })
    .catch(err => {
      console.log(err);
    });
};

