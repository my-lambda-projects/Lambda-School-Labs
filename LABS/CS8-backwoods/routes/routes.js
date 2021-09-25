const { createUser } = require('../controllers/createUser');
const { login } = require('../controllers/login');
const { payment } = require('../controllers/payment');
const authenticate = require('../middleware/authMiddleware');
const { changePassword } = require('../controllers/changePassword');
const { emailCheckAndTrips } = require('../controllers/emailCheckAndTrips');
const { createTrip, getTrip, archiveTrip, getTripAchived, getOneTripBySlug } = require('../controllers/trips');
const { createMarker, getMarkers } = require('../controllers/markers');

module.exports = app => {
  app.route('/signup').post(createUser);
  app.route('/login').post(login);
  app.route('/charge').post(payment);
  app.route('/trips/settings').put(authenticate, changePassword);
  app.route('/createTrips').post(authenticate, createTrip);
  app.route('/createMarker').post(authenticate, createMarker);
  app.route('/getMarkers/:tripId').get(getMarkers);
  app.route('/:user').get(emailCheckAndTrips, getTrip);
  app.route('/:user/archiveTrip').put(authenticate, archiveTrip);
  app.route('/:user/getArchivedTrips').get(getTripAchived)
  app.route('/:user/:slug').get(getOneTripBySlug)
};
