import firebase from '../firebase/FirebaseConfig';
import uuid4 from 'uuid4';

/**
 * Auth File
 * @module actions/file
 *
 */

/**
 * Upload file to storage
 * @function
 * @param {File} file
 * @param {Function} onError
 * @param {Function} onSuccess
 * @param {String} imageName
 * @returns {Promise<*>}
 */
export async function uploadImage(
  file,
  onError,
  onSuccess,
  imageName = uuid4()
) {
  const storage = firebase.storage();
  const nameSplit = file.name.split('.');
  const imageType = nameSplit[nameSplit.length - 1];
  const storageRef = await storage.ref();
  const imgFile = storageRef.child(`images/${imageName}`);
  try {
    const image = await imgFile.put(file);
    onSuccess(null, image);
    return image;
  } catch (e) {
    onError(e);
    return e;
  }
}

/**
 *
 * @param {String} path The path to the file in storage.
 * @function
 * @returns {Promise<any>} promise will return the url for the file path
 */
export const getFileUrl = async path => {
  const storageRef = firebase.storage().ref();
  return await storageRef
    .child(path)
    .getDownloadURL()
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

/**
 * Remove the file from storage.
 * @function
 * @param path
 */
export const deleteFile = path => {
  firebase
    .storage()
    .ref()
    .child(path)
    .delete()
    .then(res => {})
    .catch(err => {});
};
