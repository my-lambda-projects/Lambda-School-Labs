

exports.up = function(knex, Promise) {
    return knex.schema.table('users', table => {
    
        table
        .string('emailaddress', 128)
        .defaultTo('a@b.com')
        .unique()
      })
    
    };
    
    exports.down = function(knex, Promise) {
    return knex.schema.table('users', table => {
        table.dropColumn('emailaddress')
    })
    
    };
