exports.up = function(knex, Promise) {
    return knex.schema.createTable('scheduledEvent', scheduledEvent => {
        scheduledEvent
          .increments()
          .notNullable()

        scheduledEvent
          .string('scheduledEvent_name', 128)
          .notNullable()

        scheduledEvent
          .datetime('eventStart', 128)
          .notNullable()

        scheduledEvent
          .datetime('eventEnd', 128)
          .notNullable()
        
        scheduledEvent
          .integer('familyID')
          .references('family.id')
          .notNullable()

        scheduledEvent
          .integer('eventTypeID')
          .references('eventType.id')
          .notNullable()

          scheduledEvent
          .integer('createdBy')
          .references('user.id')
          .notNullable()

        scheduledEvent
          .integer('locationID')
          .references('location.id')
          .notNullable()

        scheduledEvent
          .boolean('dayAlert')
          .notNullable()
          .defaultTo(false)

        scheduledEvent
          .boolean('approved')
          .defaultTo(false)

        scheduledEvent
          .boolean('declined')
          .defaultTo(false)

        scheduledEvent
          .boolean('pendingApproval').defaultTo(false)
          
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('scheduledEvent');
};
