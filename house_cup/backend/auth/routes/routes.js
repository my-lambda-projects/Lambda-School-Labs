const {
  validateEmail,
  hashPassword,
  matchPassword,
  validatePasswords,
  validateUsername,
} = require('../middleware/middleware');
const { authenticate, getUserRoles } = require('../../common/common');

const {
  createUser,
  signin,
  signout,
  forgotPassword,
  sendResetEmailAndRedirect,
  updateUserPassword,
  sendResetPasswordEmail,
} = require('../controllers/UserController');

module.exports = (server) => {
  server
    .route('/signup')
    .post(
      validateUsername,
      validatePasswords,
      validateEmail,
      hashPassword,
      createUser,
    );
  server.route('/signin').post(matchPassword, signin);
  server.route('/signout').get(authenticate, signout);
  server
    .route('/forgotpassword')
    .post(forgotPassword, sendResetEmailAndRedirect);
  server
    .route('/reset')
    .post(
      authenticate,
      validatePasswords,
      hashPassword,
      updateUserPassword,
      sendResetPasswordEmail,
    );
  server
    .route('/settings')
    .post(
      authenticate,
      validatePasswords,
      validateEmail,
      hashPassword,
      updateUserPassword,
      sendResetPasswordEmail,
    );
  server
    .route('/getuserroles')
    .get(
      authenticate,
      getUserRoles,
    );
};
