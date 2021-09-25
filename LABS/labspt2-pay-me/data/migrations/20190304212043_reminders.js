
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reminders', reminders =>{
    reminders.increments();
    reminders.integer('invoice_number').notNullable()
    reminders.string('frequency_text').notNullable();
    reminders.string('frquency_email').notNullable();
    reminders.string('custom_text').notNullable();
    reminders.date('start_date');
    reminders.integer('invoices_id').unsigned().notNullable().references('id').inTable('invoices');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExist('reminders');
};
