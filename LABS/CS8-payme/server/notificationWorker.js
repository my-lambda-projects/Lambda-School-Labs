const Reminder = require('./models/Reminder.js');

const queryWorker = function() {
  return {
    run: function() {
      Reminder.query();
      // console.log('query works');
    },
  };
};

module.exports = {
  queryWorker: queryWorker(),
};
