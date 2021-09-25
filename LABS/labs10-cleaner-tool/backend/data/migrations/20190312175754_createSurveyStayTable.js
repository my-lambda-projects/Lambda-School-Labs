exports.up = function(knex, Promise) {
  return knex.schema.createTable('stayssurveys', (table) => {
    table
      .increments('id')
      .unique()
      .primary();
    table.integer('stay_id').unsigned();
    table.integer('survey_id').unsigned();
    table
      .foreign('stay_id')
      .references('stay.id')
      .onDelete('CASCADE');
    table
      .foreign('survey_id')
      .references('surveys.id')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('stayssurveys');
};
