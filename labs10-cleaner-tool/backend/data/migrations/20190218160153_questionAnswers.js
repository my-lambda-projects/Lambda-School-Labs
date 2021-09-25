exports.up = function(knex, Promise) {
  return knex.schema.createTable('questionAnswers', (table) => {
    table
      .increments('id')
      .unique()
      .primary();
    table.string('answer').unsigned();
    table.integer('answer_type');
    table.integer('question_id');
    table
      .foreign('question_id')
      .references('questions.id')
      .onDelete('CASCADE');
    table.integer('stay_id').unsigned();
    table
      .foreign('stay_id')
      .references('stay.id')
      .onDelete('CASCADE');
    table.string('guest_name');
    table.string('photo');
    table.string('house_name');
    table
    .date('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questionAnswers');
};
