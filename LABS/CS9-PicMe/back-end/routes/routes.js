const {signup} = require("../controllers/signup")
const {signin} = require("../controllers/signin")
const {update} = require("../controllers/update")
const {StripeCharge} = require("../controllers/StripeCharge")
const {validateToken} = require("../controllers/validateToken")
const {uploadImage} = require("../controllers/uploadImage")
const {uploads} = require("../controllers/uploads")
const {collection} = require("../controllers/collection")
const {currentuser} = require("../controllers/currentuser")
const {users} = require("../controllers/users")
const {friendAction} = require("../controllers/friendAction")
const {fetchImages} = require("../controllers/fetchImages")
const {friendsImages} = require("../controllers/friendsImages")
const {fetchFriendUploads} = require("../controllers/fetchFriendUploads")
const {addImageToCollection} = require("../controllers/addImageToCollection")
const {fetchUserId} = require("../controllers/fetchUserId")
const {removeFromCollection} = require("../controllers/removeFromCollection")


// save
module.exports = server => {
    server.route('/signup').post(signup); //Export all routes from controllers
    server.route('/signin').post(signin);
    server.route('/update').put(validateToken, update);
    server.route('/charge').post(validateToken, StripeCharge);
    server.route('/upload').post(validateToken, uploadImage);
    server.route('/uploads').post(validateToken, uploads);
    server.route('/collection/:email').get(validateToken, collection);
    server.route('/browse').get(validateToken, fetchImages);
    server.route('/friends-images/:email').get(validateToken, friendsImages);
    server.route('/currentuser/').get(currentuser);
    server.route('/users/:email').get(validateToken, users);
    server.route('/friend-action').post(validateToken, friendAction);
    server.route('/friend/:id').get(fetchFriendUploads);
    server.route('/add-images-to-collection').post(validateToken, addImageToCollection);
    server.route('/fetchUserId').post(fetchUserId);
    server.route('/removeFromCollection').post(removeFromCollection);
  };
