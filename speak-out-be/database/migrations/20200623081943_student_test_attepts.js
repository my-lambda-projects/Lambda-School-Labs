
exports.up = function(knex) {
  return knex.schema.table('student', tbl => {
    tbl.integer('attempts')
    .defaultTo(0)
  })
};

exports.down = function(knex) {
  return knex.schema.table('student', tbl => {
    tbl.dropColumn('attempts')
  })
};
