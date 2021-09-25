
exports.up = function(knex) {
  return (
      knex.schema
        .createTable('admin', tbl => {
            tbl.increments('id');
            tbl.string('name', 128);
            tbl.string('email', 128);
            tbl.string('googleId', 128)
                .notNullable();
        })
        .createTable('contacts', tbl => {
            tbl.increments('id');
            tbl.string('firstName', 128)
                .notNullable();
            tbl.string('lastName', 128)
                .notNullable();
            tbl.string('phoneNumber', 128)
                .notNullable();
            tbl.string('email', 128);
        })
        .createTable('contact_admin', tbl => {
            tbl.increments('id');
            tbl.integer('adminId')
                .notNullable()
                .references('id')
                .inTable('admin')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('contactId')
                .notNullable()
                .references('id')
                .inTable('contacts')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('groups', tbl => {
            tbl.increments('id');
            tbl.string('groupName', 128)
                .notNullable();
            tbl.text('groupDescription');
            tbl.integer('adminId')
                .references('id')
                .inTable('admin')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.string('groupColor')
            tbl.string('groupIcon')
            tbl.string('groupInviteHash', 128);
        })
        .createTable('contact_group', tbl => {
            tbl.increments('id');
            tbl.integer('contactId')
                .references('contacts.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');;
            tbl.integer('groupId')
                .references('groups.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
  
    )}

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('contact_group')
    .dropTableIfExists('groups')
    .dropTableIfExists('contact_admin')
    .dropTableIfExists('contacts')
    .dropTableIfExists('admin');
};
