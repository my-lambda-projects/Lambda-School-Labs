exports.up = function (knex) {
  return knex.schema
    .createTable('school_grade', table => {
      table.increments();
      table.text('name').notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable('user', table => {
      table.increments();
      table.string('user_type').notNullable();
      table.text('password').notNullable();
      table.text('email').unique().notNullable();
      table.text('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('student', table => {
      table.increments();
      // CPR is Govt issued ID number
      table.text('cpr').unique().notNullable();
      table
        .date('registration_date')
        .defaultTo(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          ).toUTCString()
        );
      table.text('first_name');
      table.text('additional_names');
      table.date('birthdate');
      table.text('gender');
      table
        .integer('school_grade_id')
        .unsigned()
        .references('id')
        .inTable('school_grade')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table.text('school_name');
      table.text('phone_number').notNullable();
      table
        .date('grade_updated')
        .defaultTo(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          ).toUTCString()
        );
      table.text('address').notNullable();
      table.text('email');
      table.text('primary_emergency_contact_name');
      table.text('primary_emergency_relationship');
      table.text('primary_emergency_phone');
      table.text('emergency_contact_name');
      table.text('emergency_relationship');
      table.text('emergency_phone');
      table.text('notes');
      table.boolean('no_call').defaultTo(false);
      table.boolean('delinquent').defaultTo(false);
      table.boolean('expelled').defaultTo(false);
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      // table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('student')
    .dropTableIfExists('user')
    .dropTableIfExists('school_grade');
};
