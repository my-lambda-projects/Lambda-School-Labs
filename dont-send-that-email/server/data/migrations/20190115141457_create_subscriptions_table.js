exports.up = function(knex, Promise) {
    return knex.schema.createTable("subscriptions", table => {
        table.increments();
        table.string("transaction_id").notNullable();
        table.bigInteger("date_created").notNullable();
        table.bigInteger("duration").defaultTo(2592000000);
        table.integer("user_id").notNullable().unsigned().references("id").inTable("users");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("subscriptions");
};
