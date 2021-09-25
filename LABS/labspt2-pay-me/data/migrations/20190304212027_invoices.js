
exports.up = function(knex, Promise) {
  return knex.schema.createTable('invoices', invoices =>{
    invoices.increments();
    invoices.integer('invoice_number').notNullable()
    invoices.string('company_name', 128).notNullable();
    invoices.string('inv_url').notNullable().unique();
    invoices.string('notes').notNullable().unique();
    invoices.integer('client_id').unsigned().notNullable().references('id').inTable('clients');
  })
};

exports.down = function(knex, Promise) {
  return kenex.schema.dropTableIfExists('invoices')
};
