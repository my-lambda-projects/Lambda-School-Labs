const {
  addSchool,
  getAllSchools,
  searchSchools,
} = require('../controllers/SchoolController');

const { authenticate } = require('../../common/common');

module.exports = (server) => {
  server.route('/api/schools').post(authenticate, addSchool);
  server.route('/api/schools').get(getAllSchools);
  server.route('/api/schools/search').get(searchSchools);
};
