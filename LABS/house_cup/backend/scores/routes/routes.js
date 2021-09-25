const {
  updateScore,
} = require('../controllers/ScoreController');

const { authenticate } = require('../../common/common');

module.exports = (server) => {
  server.route('/api/scoreboard').put(authenticate, updateScore);
};
