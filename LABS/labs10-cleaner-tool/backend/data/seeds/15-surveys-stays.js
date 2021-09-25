const data = require('./data/surveysstaysData');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stayssurveys')
    .del()
    .then(function() {
      return knex('stayssurveys').insert(data);
    });
};
