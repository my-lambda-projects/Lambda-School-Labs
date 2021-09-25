
exports.up = function(knex, Promise) {
  return knex.schema.createTable('vote', (table) => {
    table
      .uuid('id')
      .notNullable();

    table
      .primary(['parentId', 'userId']);

    table
      .string('parentId')
      .notNullable();

    table
      .string('userId')
      .references('user.id');

    table
      .string('voteType')
      .notNullable();
    
    table
      .string('parentType')
      .notNullable();

    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now());
    
    table
      .timestamp('updatedAt')
      .defaultTo(null);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('vote');
};
