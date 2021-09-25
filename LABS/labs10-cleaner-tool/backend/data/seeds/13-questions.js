const data = require('./data/questions');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('questions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('questions').insert(data);
    });
};
