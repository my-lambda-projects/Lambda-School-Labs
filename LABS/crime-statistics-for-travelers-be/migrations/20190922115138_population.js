
exports.up = function(knex) {
return knex.schema.createTable('population',(population) => {
    population.increments();
    population.text('total',200)
})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('population')
};
