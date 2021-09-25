
exports.up = function(knex, Promise) {
  return knex.schema.createTable('payments', payments =>{
  payments.increments();
  payments.integer('amount').notNullable();
  payments.integer('client_id').unsigned().notNullable().references('id').inTable('clients');
  payments.integer('user_id').unsigned().notNullable().references('id').inTable('users');
  payments.integer('invoice_id').unsigned().notNullable().references('id').inTable('invoices');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('payments');
};
