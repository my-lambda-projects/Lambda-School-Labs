
exports.up = function(knex) {
    return knex.schema.createTable('demo', (demo) => {
        demo.increments()
        demo.string('gender',15)
        demo.string('age',25)
        demo.string('race',25);
        demo
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('demo')
};
