const db = require('../config/db-config');

module.exports = {
    postDemo
}

function postDemo(demo) {
    return db('demo').insert(demo);
}