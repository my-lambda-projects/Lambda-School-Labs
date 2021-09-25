exports.up = function(knex) {
  return knex.schema
    .createTable('term', table => {
      table.increments();
      table.text('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('group_type', table => {
      table.increments();
      table.text('short_description').notNullable();
      table.text('long_description').notNullable();
      table.timestamps(true, true);
    })
    .createTable('course_type', table => {
      table.increments();
      table
        .text('description')
        .notNullable()
        .unique();
      table.timestamps(true, true);
    })
    .createTable('pacing_guide', table => {
      table.increments();
      table.text('name').notNullable();
      table.text('section').notNullable();
      table.integer('lesson').notNullable();
      table.text('content').notNullable();
      table.timestamps(true, true);
    })
    .createTable('level', table => {
      table.increments();
      table
        .text('textbook')
        .notNullable()
        .unique();
      table
        .text('description')
        .notNullable()
        .unique();
      table.text('cef_equivalent').notNullable();
      table
        .integer('pacing_guide_id')
        .unsigned()
        .references('id')
        .inTable('pacing_guide')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table.text('certificate_text').notNullable();
      table.timestamps(true, true);
    })
    .createTable('course_schedule', table => {
      table.increments();
      table
        .text('short_description')
        .notNullable()
        .unique();
      table
        .text('long_description')
        .notNullable()
        .unique();
      table
        .text('sql')
        .notNullable()
        .unique();
      table.timestamps(true, true);
    })
    .createTable('room', table => {
      table.increments();
      table.integer('chairs');
      table.text('availability');
      table.timestamps(true, true);
    })
    .createTable('staff', table => {
      table.increments();
      table.text('teaching_rate');
      table.boolean('active').defaultTo(true);
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .index();
      table.text('cpr').unique();
      table.text('mobile_number');
      table.text('accent');
      table.text('gender').notNullable();
      table.date('birthdate');
      table.timestamps(true, true);
    })
    .createTable('course', table => {
      table.increments();
      table
        .integer('term_id')
        .unsigned()
        .references('id')
        .inTable('term')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table
        .integer('course_type_id')
        .unsigned()
        .references('id')
        .inTable('course_type')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table
        .integer('group_type_id')
        .unsigned()
        .references('id')
        .inTable('group_type')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table
        .integer('school_grade_id')
        .unsigned()
        .references('id')
        .inTable('school_grade')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table
        .integer('level_id')
        .unsigned()
        .references('id')
        .inTable('level')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table.text('section');
      table.text('hourly_rate');
      table
        .integer('course_schedule_id')
        .unsigned()
        .references('id')
        .inTable('course_schedule')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table
        .integer('room_id')
        .unsigned()
        .references('id')
        .inTable('room')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table.time('start_time');
      table.time('end_time');
      table.date('start_date');
      table.date('end_date');
      table
        .integer('teacher_id')
        .unsigned()
        .references('id')
        .inTable('staff')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table.text('notes');
      table.text('status');
      table.timestamps(true, true);
    })
    .createTable('result_type', table => {
      table.increments();
      table.integer('result_type_code').unique();
      table
        .text('short_description')
        .notNullable()
        .unique();
      table.text('long_description').notNullable();
      table.timestamps(true, true);
    })
    .createTable('course_enrollment', table => {
      table.increments();
      table
        .integer('course_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('course')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table
        .integer('student_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('student')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table.date('first_day');
      table.date('last_day');
      table
        .integer('result_type_code')
        .references('result_type_code')
        .inTable('result_type')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index();
      table.text('notes');
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('course_enrollment')
    .dropTableIfExists('result_type')
    .dropTableIfExists('course')
    .dropTableIfExists('staff')
    .dropTableIfExists('room')
    .dropTableIfExists('course_schedule')
    .dropTableIfExists('level')
    .dropTableIfExists('pacing_guide')
    .dropTableIfExists('course_type')
    .dropTableIfExists('group_type')
    .dropTableIfExists('term');
};
