exports.up = function(knex) {
	return knex.schema
		.createTable('meeting', table => {
			table.increments();
			table
				.integer('course_id')
				.unsigned()
				.references('id')
				.inTable('course')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
				.index();
			table.date('meeting_date');
			table
				.integer('teacher_id')
				.unsigned()
				.references('id')
				.inTable('staff')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table.text('material_covered');
			table.text('notes');
			table.boolean('unpaid').defaultTo(false);
			table.timestamps(true, true);
		})
		.createTable('attendance', table => {
			table.increments();
			table
				.integer('meeting_id')
				.unsigned()
				.references('id')
				.inTable('meeting')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
				.index();
			table
				.integer('student_id')
				.unsigned()
				.references('id')
				.inTable('student')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
				.index();
			table
				.text('attendance')
				.notNullable()
				.defaultTo('present');
			table.timestamps(true, true);
		});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('attendance').dropTableIfExists('meeting');
};
