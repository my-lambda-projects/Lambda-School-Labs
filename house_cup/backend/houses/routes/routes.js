const {
  addHouse,
  deleteHouse,
  updateHouse,
  getHouseBySchool,
} = require('../controllers/HouseController');

const { authenticate } = require('../../common/common');

module.exports = (server) => {
  server.route('/api/house').post(authenticate, addHouse);
  server.route('/api/house').get(authenticate, getHouseBySchool);
  server.route('/api/house/:id').delete(authenticate, deleteHouse);
  server.route('/api/house/:id').put(authenticate, updateHouse);
};
