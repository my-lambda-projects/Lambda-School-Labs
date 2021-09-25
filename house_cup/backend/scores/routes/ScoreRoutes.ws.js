const { authenticate } = require('../../common/common.ws');
const { updateScore } = require('../controllers/ScoreController.ws');

module.exports = (io, socket) => {

  socket.use(authenticate);

  socket.on('updateScoreRequest', (data) => {
    updateScore(data, io);
  });

};
