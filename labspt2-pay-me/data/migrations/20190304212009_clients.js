
exports.up = function(knex, Promise) {
  return knex.schema.createTable('clients', clients =>{
    clients.increments();
    clients.string('client_name', 128 ).notNullable()
    clients.string('company_name', 128).notNullable();
    clients.string('email').notNullable().unique();
    clients.string('phone_number').notNullable().unique();
    clients.integer('user_id').unsigned().notNullable().references('id').inTable('users');
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('clients')
};
