exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', review => {
    review.increments('id');
    review.string('title').notNullable();
    review.string('body', 1000).notNullable();
    review.float('rating');
    review.string('business_image', 1000);
    review.string('business_name');
    review.string('business_id', 1000);
    review.integer('reviewer_id');
    review.string('gravatar', 1000);
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};
