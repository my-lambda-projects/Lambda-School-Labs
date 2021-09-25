const data = require('./data/questionAnswers');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('questionAnswers')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('questionAnswers').insert(data);
    });
};
