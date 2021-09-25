exports.up = function(knex, Promise) {
<<<<<<< HEAD
	return knex.schema.createTable('landlords', (table) => {
		table.increments();
		table.string('email').notNullable().unique();
		table.text('password').notNullable();
		table.text('firstName').notNullable();
		table.text('lastName').notNullable();
		table.string('phone').notNullable().unique();
		table.decimal('cost').notNullable().defaultTo(0);
		table.boolean('emailSubscribe').notNullable().defaultTo(false);
		table.boolean('textSubscribe').notNullable().defaultTo(false);
		table.text('application');
		table.string('property');
	})
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('landlords')
}
=======
  return knex.schema.createTable("landlords", table => {
    table.increments();
    table
      .string("email")
      .notNullable()
      .unique();
    table.text("password").notNullable();
    table.text("firstName").notNullable();
    table.text("lastName").notNullable();
    table
      .string("phone")
      .notNullable()
      .unique();
    table
      .decimal("cost")
      .notNullable()
      .defaultTo(0);
    table
      .boolean("emailSubscribe")
      .notNullable()
      .defaultTo(false);
    table
      .boolean("textSubscribe")
      .notNullable()
      .defaultTo(false);
    table.text("application");
    table.string("property");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("landlords");
};
>>>>>>> add6ab6c6f5bdd671336816568f391b6b24c14a1
