exports.up = function(knex, Promise) {
    return knex.schema.createTable("Users", function(table) {
        table.increments();
        table.string("username").notNullable();
        table.string("password").notNullable();
        table.string("name");
        table.string("email").notNullable();
        table.string("phone");
        table.string("logo");
        table.integer("credit_card");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("Users");
};
