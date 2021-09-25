const db = require('../config/db-config');


module.exports = {
  find
};

function find() {
  return db.select('*').from('population');
}
